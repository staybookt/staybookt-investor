import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { LegalPage, type Section } from '@/components/v4/Legal';
import { EMAIL } from '@/lib/site';

/* DRAFT. Canadian (PIPEDA) framing, plain English.
 *
 * This page is also the thing that unblocks paid acquisition: Google Ads and
 * Meta both refuse to run traffic to a site without a real privacy policy.
 *
 * NOT reviewed by a lawyer. Do that before the first paying client, and re-check
 * the third-party list below whenever the stack changes. */

export const metadata = {
  title: 'Privacy policy',
  description:
    'What data StayBookt collects, why, who we share it with, and how to get it deleted. Plain English, no dark patterns.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

const SECTIONS: Section[] = [
  {
    id: 'short',
    h: 'The short version',
    body: (
      <>
        <ul>
          <li>We do not sell your data. We never will.</li>
          <li>We do not sell or rent your customers&rsquo; data either. It is yours, not ours.</li>
          <li>We collect what we need to run your front office, and nothing else.</li>
          <li>You can ask us what we hold, correct it, or have it deleted. Just email us.</li>
        </ul>
        <div className="note">
          If any of the rest of this page ever contradicts the four lines above, the four lines
          above are what we meant.
        </div>
      </>
    ),
  },
  {
    id: 'who',
    h: 'Who is responsible',
    body: (
      <>
        <p>
          StayBookt, based in Toronto, Ontario, Canada, is responsible for the personal information
          described here. For anything at all, including a request to see or delete your data, email{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. A founder reads that inbox.
        </p>
      </>
    ),
  },
  {
    id: 'visitors',
    h: 'If you are just visiting the website',
    body: (
      <>
        <p>
          We collect basic, aggregated analytics: which pages were viewed, roughly where in the world
          the visit came from, what device was used, and which site referred you. We use this to
          understand whether the website is working. It is not used to identify you personally.
        </p>
        <p>
          You are not required to give us anything to read this site. There is no account, no
          paywall, and no forced sign-up.
        </p>
      </>
    ),
  },
  {
    id: 'booking',
    h: 'If you book a call with us',
    body: (
      <>
        <p>
          When you book a call we collect your name, your email address, and whatever you choose to
          tell us about your business. Before the call we also look at publicly available information
          about your business: your website, your Google listing, your reviews, and how you appear in
          search.
        </p>
        <p>
          <b>We also mystery-shop you.</b> We call your business line, text your listing and try to
          book a job, as an ordinary customer would, so we can show you what actually happens. We use
          that only to prepare for your call and to show you the result. We do not publish it, share
          it, or sell it, and if you ask us to delete it, we delete it.
        </p>
      </>
    ),
  },
  {
    id: 'clients',
    h: 'If you become a client',
    body: (
      <>
        <p>
          To run your front office we handle information about your business and about your
          customers, including names, phone numbers, email addresses, addresses, job details, call
          recordings, message threads and payment status.
        </p>
        <p>
          <b>Your customers&rsquo; data belongs to you, not to us.</b> We handle it on your behalf, to
          do the job you have hired us to do, and for nothing else. We do not use it to build a
          product, to market to your customers on our own behalf, or to help another business. If you
          leave, you take it with you and we delete our working copies on request.
        </p>
      </>
    ),
  },
  {
    id: 'why',
    h: 'Why we collect it',
    body: (
      <>
        <ul>
          <li>To answer your calls and texts and book your jobs. That is the service.</li>
          <li>To send quotes, reminders and follow-ups on your behalf.</li>
          <li>To ask your customers for reviews, where they have consented to be contacted.</li>
          <li>To give you your morning brief and show you what happened.</li>
          <li>To bill you, and to keep the records the law requires us to keep.</li>
        </ul>
        <p>
          We do not collect information &ldquo;in case it is useful later&rdquo;. If we do not need
          it to do the job, we do not want it.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    h: 'Who else touches the data',
    body: (
      <>
        <p>
          We use a small number of service providers to run the business. They only get what they
          need, and they are not allowed to use it for their own purposes:
        </p>
        <ul>
          <li>Hosting and website infrastructure.</li>
          <li>Calendar and booking software, for scheduling calls with us.</li>
          <li>Telephony and messaging providers, to carry the calls and texts.</li>
          <li>Website analytics.</li>
          <li>AI providers, to draft and handle everyday responses.</li>
          <li>Google, for your Business Profile and search presence.</li>
        </ul>
        <p>
          Some of these providers process data outside Canada, including in the United States. Where
          that happens, the data is subject to the laws of that country. We will name any specific
          provider on request; just ask.
        </p>
        <p>
          We will also disclose information if the law requires it. We will tell you when that
          happens, unless we are legally forbidden from telling you.
        </p>
      </>
    ),
  },
  {
    id: 'ai',
    h: 'How AI fits in',
    body: (
      <>
        <p>
          We use AI to handle everyday calls, texts and bookings, with a real person stepping in on
          anything unusual. That means customer messages may be processed by an AI provider in order
          to generate a reply.
        </p>
        <p>
          We do not allow those providers to train their public models on your business data or your
          customers&rsquo; data, and we configure our accounts accordingly. If that ever stops being
          true, we will tell you before it does, not after.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    h: 'Cookies',
    body: (
      <>
        <p>
          We use a small number of cookies for analytics and to make the site work. We do not use
          advertising cookies to follow you around the internet, and we do not run a consent banner
          designed to trick you into clicking yes.
        </p>
        <p>You can block cookies in your browser and this site will still work.</p>
      </>
    ),
  },
  {
    id: 'keep',
    h: 'How long we keep it',
    body: (
      <>
        <p>
          Prospect information from a call we never won: deleted within twelve months, or immediately
          if you ask. Client and customer data: kept while we work together and for as long as the
          law requires afterwards, then deleted. Financial records: kept for seven years, because
          Canadian tax law says so.
        </p>
      </>
    ),
  },
  {
    id: 'rights',
    h: 'Your rights',
    body: (
      <>
        <p>Under Canadian privacy law you can ask us to:</p>
        <ul>
          <li>Tell you what personal information we hold about you.</li>
          <li>Correct it if it is wrong.</li>
          <li>Delete it, where we are not legally required to keep it.</li>
          <li>Stop using it for a particular purpose.</li>
        </ul>
        <p>
          Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will respond within thirty days, and
          usually a lot sooner. If we get it wrong and you are not satisfied with how we handle your
          complaint, you can escalate to the Office of the Privacy Commissioner of Canada.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    h: 'Security, and changes to this policy',
    body: (
      <>
        <p>
          We protect data with access controls, encryption in transit, and the principle that people
          only get access to what they need. No system is perfect. If there is ever a breach that
          puts you at real risk, we will tell you and the regulator, promptly and in plain language.
        </p>
        <p>
          If we change this policy we will post the new version here and update the date at the top.
          If a change materially affects a client, we will tell that client directly.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="v4" style={{ background: '#fff' }}>
      <Nav />
      <LegalPage
        eyebrow="Privacy policy"
        title="We do not sell your data. Ever."
        intro="This is a real privacy policy, not a wall of copied boilerplate. It says what we collect, why, who touches it, and how to make us delete it."
        updated="13 July 2026"
        sections={SECTIONS}
      />
      <SiteFooter />
    </main>
  );
}
