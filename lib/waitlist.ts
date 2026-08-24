/* WHERE THE AGENT WAITLIST SUBMISSIONS GO.
 *
 * Deliberately a Google Form behind the scenes rather than an email-sending API route.
 * Three reasons, in order of how much they mattered:
 *
 * 1. No secret. A serverless route that emails needs an API key in Vercel, which needs
 *    Jacob in a dashboard. A Google Form endpoint is a public URL by design, so this
 *    ships without anyone handing over a credential.
 * 2. Submissions land in a Sheet in the info@staybookt.com Drive, which is where the
 *    mini-CRM already lives (see the drive-structure note). A row per agent beats an
 *    inbox of one-off emails when we start segmenting by board and deal count.
 * 3. Nothing to run. No route, no queue, no bounce handling, no deliverability problem.
 *
 * The trade is that a cross-origin POST to Google returns an opaque response, so the
 * browser cannot tell us whether it landed. WaitlistForm therefore reports success
 * optimistically. Verify captures in the Sheet, not from the UI.
 *
 * The form itself lives in the info@staybookt.com Drive, NOT Jacob's personal Google
 * account, deliberately: info@ is the central inbox for everything and the personal
 * account is already carrying more StayBookt infrastructure than it should.
 * Editor: https://docs.google.com/forms/d/1wFMSbsWCl4_A9_n57UWN9z-dwv_FdC_c0wVg2VlHFDQ/edit
 *
 * Every question is a SHORT ANSWER and none of them is marked required. That is on
 * purpose. The page is the thing an agent fills in, and it does its own validation and
 * its own dropdowns. The Google Form is a data sink, and a required field there would
 * silently reject a submission whose optional box was left empty.
 *
 * When the wing gets its own domain and identity, this is the first thing to replace.
 */

export const WAITLIST_ENDPOINT =
  'https://docs.google.com/forms/d/e/1FAIpQLSeBfJPUv4L9SGEozZMN7Kns3kQQscb4ROnVub4el3CzWxO5Ew/formResponse';

/* Google Form entry IDs, in page order. Read them off the live form's prefilled-link
 * URL, never guess them: they are not sequential and they are not stable across a
 * rebuild of the form. If you rebuild the form, refill this whole map. */
export const WAITLIST_FIELDS: Record<string, string> = {
  name: 'entry.768169516',
  email: 'entry.1035321150',
  brokerage: 'entry.1497017543',
  board: 'entry.583883318',
  deals: 'entry.1051433136',
  eats: 'entry.1290670212',
};

/* Last-resort fallback so a real agent is never silently dropped while the endpoint
 * above is empty or Google is down. Opens their mail client with the answers already
 * written out. Ugly, and much better than losing the lead. */
export const WAITLIST_FALLBACK_EMAIL = 'info@staybookt.com';
