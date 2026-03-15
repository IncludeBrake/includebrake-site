export const config = { runtime: 'edge' };

function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const allowedOrigins = ['https://www.includebrake.com', 'https://includebrake.com'];
  const origin = req.headers.get('origin') || '';
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  try {
    const body = await req.json();
    const { firstname, lastname, email, company } = body;

    if (!email || !firstname) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin }
      });
    }

    // 1. HubSpot contact creation
    const hsRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`
      },
      body: JSON.stringify({
        properties: {
          firstname,
          lastname: lastname || '',
          email,
          company: company || '',
          lifecyclestage: 'lead',
          hs_lead_status: 'NEW'
        }
      })
    });

    if (!hsRes.ok) {
      const err = await hsRes.json();
      if (err.category !== 'CONFLICT') {
        throw new Error(err.message || 'HubSpot API error');
      }
    }

    // 2. Resend — confirmation email to lead
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
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
      const resendErr = await resendRes.json();
      throw new Error(`Resend error: ${JSON.stringify(resendErr)}`);
    }

    // 3. Twilio — SMS alert to Jes
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const smsBody = `New IncludeBrake lead:\nName: ${firstname} ${lastname || ''}\nEmail: ${email}\nBusiness: ${company || 'not provided'}`;

    const twilioRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${toBase64(`${twilioSid}:${twilioAuth}`)}`
      },
      body: new URLSearchParams({
        From: process.env.TWILIO_FROM,
        To: process.env.TWILIO_TO,
        Body: smsBody
      })
    });
    if (!twilioRes.ok) {
      const twilioErr = await twilioRes.json();
      throw new Error(`Twilio error: ${JSON.stringify(twilioErr)}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin }
    });
  }
}
