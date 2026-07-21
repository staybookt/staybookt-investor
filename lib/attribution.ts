/* FIRST TOUCH ATTRIBUTION.
 *
 * The only conversion on this site is a cal.com booking on /start. Cal.com knows
 * the booking happened. It does not know which page, ad, post or search brought
 * the person here, because by the time they book they have usually clicked
 * through three of our pages and the original query string is long gone.
 *
 * So the first time anyone lands, we write down where they came from and keep it
 * for thirty days. FIRST TOUCH WINS: if a record already exists and has not
 * expired we do not overwrite it, because the thing worth paying for is whatever
 * introduced us, not whichever tab they happened to have open at booking time.
 *
 * Stored in localStorage under one key. First party, our own origin, no third
 * party cookie, nothing shared with anyone. It holds the five standard UTM
 * fields, the referring URL, the first page they landed on, and a timestamp.
 * Nothing personal, and nothing typed by a human.
 *
 * Read by components/v4/CalEmbed.tsx, which hands it to the booking. See the
 * comment there for where the values surface in cal.com. */

const KEY = 'sb_attr_v1';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  /* Full referring URL as the browser reported it, or 'direct'. */
  referrer: string;
  /* The first path on this site they saw, e.g. /how-it-works. */
  landing: string;
  /* Epoch ms of the first touch. */
  ts: number;
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

function read(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    if (!parsed || typeof parsed.ts !== 'number') return null;
    if (Date.now() - parsed.ts > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    /* Private mode, disabled storage, corrupted value. All the same to us. */
    return null;
  }
}

/* Called once per page load from AnalyticsEvents. Writes only when there is no
 * live record, so the first landing of the last thirty days is the one that
 * sticks. Returns whatever is on file afterwards. */
export function captureFirstTouch(): Attribution | null {
  if (typeof window === 'undefined') return null;
  const existing = read();
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const next: Attribution = {
    referrer: document.referrer || 'direct',
    landing: window.location.pathname || '/',
    ts: Date.now(),
  };
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) next[k] = v.slice(0, 120);
  }

  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* Storage refused. The visit still works; we just cannot attribute it. */
  }
  return next;
}

export function getAttribution(): Attribution | null {
  return read();
}

/* Turn the record into the five standard UTM fields cal.com tracks on every
 * booking with no setup at all.
 *
 * If the visitor arrived with real UTM parameters we pass them through
 * untouched. If they did not, we still owe an answer to "where did this booking
 * come from", so we build one from what we do know: the referring host, or
 * 'direct' when the browser reported no referrer. Medium says how we got the
 * value, so nobody later mistakes a derived source for a tagged campaign, and
 * campaign carries the landing page, which is the question this site can
 * actually answer: which page produced the call. */
export function toCalUtm(a: Attribution | null): Record<string, string> {
  if (!a) return {};
  let host = '';
  try {
    host = a.referrer && a.referrer !== 'direct' ? new URL(a.referrer).hostname : '';
  } catch {
    host = '';
  }
  const sameSite = !!host && typeof window !== 'undefined' && host === window.location.hostname;

  const out: Record<string, string> = {
    utm_source: a.utm_source || (!host || sameSite ? 'direct' : host),
    utm_medium: a.utm_medium || (a.utm_source ? 'unknown' : host && !sameSite ? 'referral' : 'direct'),
    utm_campaign: a.utm_campaign || 'landing:' + a.landing,
  };
  if (a.utm_term) out.utm_term = a.utm_term;
  if (a.utm_content) out.utm_content = a.utm_content;
  return out;
}
