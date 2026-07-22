'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const fieldBase =
  'w-full rounded-lg border border-espresso/20 bg-white px-4 py-3 text-sm text-espresso placeholder:text-espresso-500 outline-none transition focus:border-terracotta';

/**
 * Contact form — validated client-side, posts to /api/contact which is
 * configured to email contact@lameridiana.co.uk (see README → Forms).
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (!String(data.get('name') || '').trim()) next.name = 'Please tell us your name.';
    const email = String(data.get('email') || '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.';
    if (String(data.get('message') || '').trim().length < 10)
      next.message = 'Please add a little more detail (10+ characters).';
    return { next, data };
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { next, data } = validate(form);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setStatus('success');
      setMessage("Thank you — we've received your message and will reply soon.");
      form.reset();
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-card border border-olive/30 bg-olive/10 p-6" role="status">
        <p className="font-display text-lg text-olive-dark">Message sent</p>
        <p className="mt-1 text-sm text-espresso-600">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} autoComplete="name" />
        <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone (optional)" name="phone" type="tel" required={false} autoComplete="tel" />
        <Field label="Subject (optional)" name="subject" required={false} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-espresso-700">
          Message <span className="text-terracotta">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-err' : undefined}
          className={fieldBase}
          placeholder="How can we help? Large party, dietary needs, private hire…"
        />
        {errors.message && (
          <p id="message-err" className="mt-1 text-xs text-terracotta" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={status === 'loading'} className="btn-primary">
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'error' && message && (
        <p className="text-sm text-terracotta" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  error,
  required = true,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-espresso-700">
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
        className={fieldBase}
      />
      {error && (
        <p id={`${name}-err`} className="mt-1 text-xs text-terracotta" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
