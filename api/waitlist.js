export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = ['https://www.includebrake.com', 'https://includebrake.com'];
const FROM = 'IncludeBrake <support@em.includebrake.com>';

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
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
    if (err.category === 'CONFLICT') return;
    // Unknown/invalid property — retry without the optional field.
    res = await post(base);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (err.category !== 'CONFLICT') {
      throw new Error(err.message || 'HubSpot API error');
    }
  }
}

function sendEmail(payload) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`
    },
    body: JSON.stringify({ from: FROM, ...payload })
  });
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

    const fullName = `${firstname} ${lastname || ''}`.trim();

    // 1. HubSpot contact creation — the actual lead capture. Fatal if it fails.
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

    // Everything below is notification. A notification failure must never cost
    // a lead that HubSpot already accepted, so these are logged, not thrown.

    // 2. Confirmation email to the lead.
    try {
      const res = await sendEmail({
        to: [email],
        subject: "You're on the list — IncludeBrake",
        html: `
          <p>Hey ${escapeHtml(firstname)},</p>
          <p>Thanks for reaching out. We got your info and will be in touch within 24 hours.</p>
          <p>In the meantime, if you have any questions you can reply directly to this email.</p>
          <p>— Jes<br>IncludeBrake</p>
        `
      });
      if (!res.ok) {
        console.error('Resend (lead confirmation) failed:', await res.text().catch(() => ''));
      }
    } catch (err) {
      console.error('Resend (lead confirmation) threw:', err.message);
    }

    // 3. Internal notification. Replaces the old Twilio SMS alert.
    //    Set NOTIFY_EMAIL in the Vercel project to receive these.
    const notify = process.env.NOTIFY_EMAIL;
    if (notify) {
      try {
        const rows = [
          ['Name', fullName],
          ['Email', email],
          ['Business', company || 'not provided'],
          ['Interest', service || 'not specified'],
          ['Source', source || 'not specified'],
          ['Bottleneck', bottleneck || 'not provided']
        ]
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 12px 4px 0;vertical-align:top;"><strong>${k}</strong></td><td style="padding:4px 0;">${escapeHtml(v)}</td></tr>`
          )
          .join('');

        const res = await sendEmail({
          to: [notify],
          reply_to: email,
          subject: `New IncludeBrake lead: ${fullName}`,
          html: `<p>New inquiry from the website.</p><table>${rows}</table>`
        });
        if (!res.ok) {
          console.error('Resend (internal notification) failed:', await res.text().catch(() => ''));
        }
      } catch (err) {
        console.error('Resend (internal notification) threw:', err.message);
      }
    } else {
      console.error('NOTIFY_EMAIL is not set — no internal lead notification sent.');
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
