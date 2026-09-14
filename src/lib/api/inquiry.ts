/**
 * Submits a website inquiry to the IncludeBrake waitlist endpoint.
 *
 * The endpoint (`/api/waitlist`, a Vercel edge function) fans the lead out to
 * HubSpot (contact), Resend (confirmation email to the lead) and Twilio (SMS
 * alert to Jes). It is the same endpoint the static intake pages post to, so
 * the payload keeps their `firstname` / `lastname` shape.
 */

export type InquiryPayload = {
  firstname: string;
  lastname?: string;
  email: string;
  company?: string;
  service?: string;
  bottleneck?: string;
  source?: string;
};

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const response = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let detail = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      if (body?.error) detail = body.error;
    } catch {
      // Response had no JSON body — keep the status-based message.
    }
    throw new Error(detail);
  }
}
