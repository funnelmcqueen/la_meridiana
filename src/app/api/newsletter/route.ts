import { NextResponse } from 'next/server';

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Newsletter signup endpoint — the "owned audience" fix.
 *
 * Validates the email, then subscribes it via Mailchimp when configured,
 * otherwise logs it in dev. Swap in your ESP of choice (Mailchimp, Brevo,
 * Klaviyo…) in `subscribe()`. See README → Newsletter.
 */
export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const email = String(body.email || '').trim().toLowerCase();
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
  }

  try {
    await subscribe(email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[newsletter] subscribe failed:', err);
    return NextResponse.json(
      { error: 'Could not sign you up right now. Please try again.' },
      { status: 502 },
    );
  }
}

async function subscribe(email: string) {
  const key = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const prefix = process.env.MAILCHIMP_SERVER_PREFIX; // e.g. "us21"

  if (!key || !audienceId || !prefix) {
    console.log(`\n─── [DEV] Newsletter signup (configure Mailchimp to store) ───\n${email}\n`);
    return;
  }

  const res = await fetch(
    `https://${prefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${key}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    },
  );

  // 400 with "Member Exists" is fine — treat as success.
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    if (data?.title === 'Member Exists') return;
    throw new Error(`Mailchimp responded ${res.status}`);
  }
}
