import { NextResponse } from 'next/server';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@lameridiana.co.uk';
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Contact form endpoint.
 *
 * Validates server-side, then either:
 *   - sends an email via Resend when RESEND_API_KEY is set, or
 *   - logs the submission to the server console in local/dev (no key needed).
 *
 * See README → Forms to wire up your provider of choice.
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();
  const phone = String(body.phone || '').trim();
  const subject = String(body.subject || '').trim() || 'Website enquiry';

  // Honeypot (add a hidden "company" field to the form to catch bots).
  if (String(body.company || '').trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !isEmail(email) || message.length < 10) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 422 });
  }

  const text = [
    `New enquiry from the La Meridiana website`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Subject: ${subject}`,
    ``,
    message,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    await deliver({ to: CONTACT_EMAIL, replyTo: email, subject: `[Website] ${subject}`, text });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] delivery failed:', err);
    return NextResponse.json({ error: 'Could not send your message. Please call us.' }, { status: 502 });
  }
}

/**
 * Delivery helper. Uses Resend if configured; otherwise logs to the console so
 * the form is fully functional in development without any external account.
 */
async function deliver(msg: { to: string; replyTo: string; subject: string; text: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log('\n─── [DEV] Contact submission (set RESEND_API_KEY to email) ───');
    console.log(`To: ${msg.to}\nReply-To: ${msg.replyTo}\nSubject: ${msg.subject}\n\n${msg.text}\n`);
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // Update `from` to a verified sender on your Resend domain.
      from: 'La Meridiana Website <website@lameridiana.co.uk>',
      to: [msg.to],
      reply_to: msg.replyTo,
      subject: msg.subject,
      text: msg.text,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}
