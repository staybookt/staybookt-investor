'use client';

import { useState, type FormEvent } from 'react';
import { WAITLIST_ENDPOINT, WAITLIST_FIELDS, WAITLIST_FALLBACK_EMAIL } from '@/lib/waitlist';

/* THE ONLY INTERACTIVE THING ON /agents.
 *
 * Everything else on the page is a server component on purpose: this is a marketing page
 * that a cold agent loads once, on a phone, probably on LTE between showings, and the
 * less JavaScript it ships the better it converts. So the client boundary starts and
 * ends here.
 *
 * On the opaque-response problem and why the endpoint is a Google Form, see lib/waitlist.ts. */

const BOARDS = [
  'TRREB',
  'Ottawa Real Estate Board',
  'London and St. Thomas',
  'Niagara',
  'Central Lakes',
  'ITSO',
  'Other Ontario board',
  'Outside Ontario',
];

const DEALS = ['0', '1 to 4', '5 to 9', '10 to 19', '20 or more'];

type State = 'idle' | 'sending' | 'done' | 'error';

export default function WaitlistForm() {
  const [state, setState] = useState<State>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending' || state === 'done') return;

    const form = e.currentTarget;
    const data = new FormData(form);

    /* Honeypot. A person never sees this field, so anything in it is a bot. Report
       success rather than an error: telling a scraper it failed just invites a retry. */
    if (data.get('company')) {
      setState('done');
      return;
    }

    setState('sending');

    const configured = WAITLIST_ENDPOINT && WAITLIST_FIELDS.email;

    if (!configured) {
      /* No endpoint wired yet. Hand the answers to their mail client rather than
         swallowing them. See lib/waitlist.ts. */
      const lines = [
        `Name: ${data.get('name') ?? ''}`,
        `Email: ${data.get('email') ?? ''}`,
        `Brokerage: ${data.get('brokerage') ?? ''}`,
        `Board: ${data.get('board') ?? ''}`,
        `Deals in the last 12 months: ${data.get('deals') ?? ''}`,
        `What eats the week: ${data.get('eats') ?? ''}`,
      ].join('\n');
      window.location.href =
        `mailto:${WAITLIST_FALLBACK_EMAIL}` +
        `?subject=${encodeURIComponent('Agent waitlist')}` +
        `&body=${encodeURIComponent(lines)}`;
      setState('done');
      return;
    }

    const payload = new FormData();
    for (const [key, entry] of Object.entries(WAITLIST_FIELDS)) {
      if (entry) payload.append(entry, String(data.get(key) ?? ''));
    }

    try {
      await fetch(WAITLIST_ENDPOINT, { method: 'POST', mode: 'no-cors', body: payload });
      /* Opaque response: no status to read. Optimistic by necessity. */
      setState('done');
      /* GA4 is loaded site-wide by components/Analytics.tsx. Narrowed rather than cast to
         any, because the build lints. */
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'waitlist_submit', { page: '/agents' });
      }
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <p className="rew-ok" role="status">
        You are on the list. We will be in touch from info@staybookt.com, once and not before
        there is something worth showing you.
      </p>
    );
  }

  return (
    <form className="rew-form" onSubmit={onSubmit}>
      <div className="rew-row">
        <div className="rew-field">
          <label htmlFor="rew-name">First and last name</label>
          <input id="rew-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="rew-field">
          <label htmlFor="rew-email">Email</label>
          <input id="rew-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div className="rew-row">
        <div className="rew-field">
          <label htmlFor="rew-brokerage">Brokerage</label>
          <input id="rew-brokerage" name="brokerage" type="text" required />
        </div>
        <div className="rew-field">
          <label htmlFor="rew-board">Board</label>
          <select id="rew-board" name="board" required defaultValue="">
            <option value="" disabled>
              Select
            </option>
            {BOARDS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rew-field">
        <label htmlFor="rew-deals">Deals closed in the last twelve months</label>
        <select id="rew-deals" name="deals" required defaultValue="">
          <option value="" disabled>
            Select
          </option>
          {DEALS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="rew-field">
        <label htmlFor="rew-eats">What eats your week (optional)</label>
        <textarea
          id="rew-eats"
          name="eats"
          placeholder="Be specific. This is the part we actually read."
        />
      </div>

      <div className="rew-hp" aria-hidden="true">
        <label htmlFor="rew-company">Company</label>
        <input id="rew-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="rew-consent">
        One email when access opens, and nothing else. We will not sell your details, add you to
        a drip, or hand them to anyone. You can ask us to delete them at any time.
      </p>

      <div className="rew-form-cta">
        <button className="rew-btn rew-btn-lg" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending' : 'Join the waitlist'}
        </button>
      </div>

      {state === 'error' && (
        <p className="rew-err" role="alert">
          That did not go through. Email us at{' '}
          <a href={`mailto:${WAITLIST_FALLBACK_EMAIL}`}>{WAITLIST_FALLBACK_EMAIL}</a> and we will
          add you by hand.
        </p>
      )}
    </form>
  );
}
