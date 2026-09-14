export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = ['https://www.includebrake.com', 'https://includebrake.com'];

function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

/**
 * Creates the HubSpot contact.
 *
 * `message` is attempted first so the bottleneck text lands in the CRM, but a
 * property rejection must never cost us the lead — on a property error we retry
 * with the base property set that has been running in production.
 */
async function createHubspotContact(base, message) {
  const post = (properties) =>
    fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`
      },
      body: JSON.stringify({ properties })
    });

  let res = await post(message ? { ...base, message } : base);

  if (!res.ok && message) {
    const err = await res.clone().json().catch(() => ({}));
    if (err.category === 'CONFLICT') return err;
    // Unknown/invalid property — retry without the optional field.
    res = await post(base);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (err.category !== 'CONFLICT') {
      throw new Error(err.message || 'HubSpot API error');
    }
  }
  return null;
}

export default async function handler(req) {
  const origin = req.headers.get('origin') || '';
  const headers = corsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers });
  }

  try {
    const body = await req.json();
    const { firstname, lastname, email, company, service, bottleneck, source } = body;

    if (!email || !firstname) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers
      });
    }

    // 1. HubSpot contact creation
    const message = [
      service ? `Service interest: ${service}` : null,
      bottleneck ? `Bottleneck: ${bottleneck}` : null,
      source ? `Source: ${source}` : null
    ]
      .filter(Boolean)
      .join('\n');

    await createHubspotContact(
      {
        firstname,
        lastname: lastname || '',
        email,
        company: company || '',
        lifecyclestage: 'lead',
        hs_lead_status: 'NEW'
      },
      message || undefined
    );

    // 2. Resend — confirmation email to lead
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'IncludeBrake <support@em.includebrake.com>',
        to: [email],
        subject: "You're on the list — IncludeBrake",
        html: `
          <p>Hey ${firstname},</p>
          <p>Thanks for reaching out. We got your info and will be in touch within 24 hours.</p>
          <p>In the meantime, if you have any questions you can reply directly to this email.</p>
          <p>— Jes<br>IncludeBrake</p>
        `
      })
    });
    if (!resendRes.ok) {
      const resendErr = await resendRes.json().catch(() => ({}));
      throw new Error(`Resend error: ${JSON.stringify(resendErr)}`);
    }

    // 3. Twilio — SMS alert to Jes
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const smsLines = [
      'New IncludeBrake lead:',
      `Name: ${firstname} ${lastname || ''}`.trim(),
      `Email: ${email}`,
      `Business: ${company || 'not provided'}`
    ];
    if (service) smsLines.push(`Interest: ${service}`);
    if (bottleneck) {
      const trimmed = bottleneck.length > 300 ? `${bottleneck.slice(0, 297)}...` : bottleneck;
      smsLines.push(`Bottleneck: ${trimmed}`);
    }

    const twilioRes = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${toBase64(`${twilioSid}:${twilioAuth}`)}`
        },
        body: new URLSearchParams({
          From: process.env.TWILIO_FROM,
          To: process.env.TWILIO_TO,
          Body: smsLines.join('\n')
        })
      }
    );
    if (!twilioRes.ok) {
      const twilioErr = await twilioRes.json().catch(() => ({}));
      throw new Error(`Twilio error: ${JSON.stringify(twilioErr)}`);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
