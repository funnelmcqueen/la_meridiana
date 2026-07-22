'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Newsletter signup — the "owned audience" fix. Posts to /api/newsletter.
 * Two visual variants: `dark` (footer) and `light` (What's On page).
 */
export function NewsletterForm({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const dark = variant === 'dark';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
      setMessage("You're on the list — we'll be in touch with what's on.");
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <p
        className={`rounded-card px-4 py-3 text-sm ${
          dark ? 'bg-panna/10 text-panna-50' : 'bg-olive/10 text-olive-dark'
        }`}
        role="status"
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`nl-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`nl-${variant}`}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="you@email.com"
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? `nl-${variant}-err` : undefined}
          className={`w-full rounded-full px-5 py-3 text-sm outline-none transition ${
            dark
              ? 'bg-panna-50/10 text-panna-50 placeholder:text-panna-50/50 focus:bg-panna-50/15'
              : 'border border-espresso/20 bg-white text-espresso placeholder:text-espresso-500 focus:border-terracotta'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={dark ? 'btn-ghost-dark shrink-0' : 'btn-primary shrink-0'}
        >
          {status === 'loading' ? 'Joining…' : 'Sign up'}
        </button>
      </div>
      {status === 'error' && (
        <p
          id={`nl-${variant}-err`}
          className={`mt-2 text-xs ${dark ? 'text-ochre-light' : 'text-terracotta'}`}
          role="alert"
        >
          {message}
        </p>
      )}
    </form>
  );
}
