import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { LegalPage, type Section } from '@/components/v4/Legal';
import { EMAIL } from '@/lib/site';

/* DRAFT. Written in plain English on purpose: a service business owner has to be
 * able to read this without a lawyer. It reflects what we promise everywhere else
 *  * on the site (nothing upfront, $199/mo, NO term, 30-day cancel, unconditional 90-day refund, you own
 * your stuff) so the marketing and the contract cannot drift apart.
 *
 * NOT reviewed by a lawyer. Do that before the first paying client. */

export const metadata = {
  title: 'Terms and conditions',
  description:
    'The terms of working with StayBookt, in plain English. What we do, what it costs, what you own, and how to leave.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

const SECTIONS: Section[] = [
  {
    id: 'who',
    h: 'Who we are',
    body: (
      <>
        <p>
          StayBookt (&ldquo;StayBookt&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is based in
          Toronto, Ontario, Canada. You can reach a human at{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <p>
          These terms apply when you use this website and when you buy our service. If you sign a
          separate written agreement with us, that agreement wins wherever the two disagree.
        </p>
      </>
    ),
  },
  {
    id: 'service',
    h: 'What we actually do',
    body: (
      <>
        <p>
          We are an operator, not a software vendor. We run the front office of your business. In
          practice that means we do some or all of the following on your behalf:
        </p>
        <ul>
          <li>Build, host and maintain your website.</li>
          <li>Set up and manage your Google Business Profile and other listings.</li>
          <li>Answer calls and texts to your business, using a mix of AI and real people.</li>
          <li>Book jobs onto your calendar, confirm them and send reminders.</li>
          <li>Follow up the quotes you send until you get a yes or a no.</li>
          <li>Ask your customers for reviews and bring past customers back.</li>
          <li>Send you a short brief each morning.</li>
        </ul>
        <p>
          The exact scope for your business is agreed with you before we start, and it can change by
          agreement. <b>We do not do the work itself</b> and we are not responsible for the
          quality, safety, licensing or insurance of the work you perform.
        </p>
      </>
    ),
  },
  {
    id: 'acting',
    h: 'Acting on your behalf',
    body: (
      <>
        <p>
          To do this job, we communicate with your customers as your business. You authorise us to
          answer, text and email on your behalf, and to tell your customers your prices, using your
          name, your prices and your service area, as agreed with you during setup.
        </p>
        <p>
          You remain responsible for what your business promises. You must give us accurate pricing,
          availability and service information, and tell us promptly when it changes. If we tell a
          customer a price because that is the price you gave us, that price is yours.
        </p>
        <p>
          We follow Canadian anti-spam law (CASL) and equivalent rules when we message on your
          behalf. We will not send marketing messages to people who have not consented, and we
          honour unsubscribes.
        </p>
      </>
    ),
  },
  {
    id: 'fees',
    h: 'Fees, billing and the term',
    body: (
      <>
        <p>
          The plan is <b>$199 CAD per month</b>, plus applicable taxes. There is nothing to pay
          upfront: no build fee, no setup fee. Billing starts when your service goes live and runs
          monthly in advance.
        </p>
        <p>
          {/* SAID "we build your website AND RUN YOUR FRONT OFFICE before you have paid us a
              dollar". The clause directly above says billing runs monthly IN ADVANCE, so the
              front office is paid for before it runs. Only the build precedes payment.
              The claim was in three places. It is now true in all three. */}
          <b>There is no fixed term and no lock-in.</b> The plan runs month to month from the day it
          goes live. You may cancel at any time on <b>thirty days written notice</b>, with no
          penalty and no exit fee. We build your website{' '}
          <b>before you have paid us a dollar</b>, so the risk of that sits with us, which is where
          it belongs.
        </p>
        <p>
          Calls and texts are unlimited. We do not bill per minute and we do not charge overage,
          whatever your busiest month looks like.
        </p>
        <p>
          {/* "or paid advertising you ask us to run" is gone. /whats-included says "Do you
              spend my money on ads? No", and /pricing says the domain is the entire list of
              pass-throughs. The contract was granting a service two other pages refuse.
              Third time the terms held the worst of it. */}
          Your domain registration, roughly twenty dollars a year, is passed through at cost. That is
          the only third-party cost there is. If another one ever comes up, we agree it with you in
          writing first, or we do not spend it.
        </p>
      </>
    ),
  },
  {
    id: 'guarantee',
    h: 'The ninety-day money-back guarantee',
    body: (
      <>
        <p>
          For the first ninety days of live service you may change your mind{' '}
          <b>for any reason at all</b>, and <b>we refund every month you have paid</b>. You do not
          have to show that we failed, and we do not get to decide whether your reason is good
          enough. No forms and no argument. Email us and say so.
        </p>
        <p>
          You keep the website either way. We will hand over the code, the domain and the logins,
          and we will not hold anything hostage.
        </p>
        <div className="note">
          The guarantee is a real promise, not a marketing line. If you ask for it, you get it.
        </div>
      </>
    ),
  },
  {
    id: 'cancel',
    h: 'Cancelling',
    body: (
      <>
        <p>
          Inside the first ninety days, cancel for any reason and get every month back. See above.
        </p>
        <p>
          After that, you can cancel at any time on thirty days written notice, with no penalty and
          no exit fee. Email us. We will confirm in writing, stop the billing after the notice
          period, and run a proper handover: your website, your domain, your Google Business
          Profile, your customer list and your reviews all go with you.
        </p>
        <p>We do not charge an exit fee, and we do not hold your business hostage to keep you.</p>
      </>
    ),
  },
  {
    id: 'own',
    h: 'What you own, and what we own',
    body: (
      <>
        <p>
          <b>Yours.</b> Your business name and brand. Your domain. Your website, including the code
          we write for it. Your Google Business Profile. Your customer list, your call recordings and
          your reviews. Your phone number. All of it is yours during the engagement and after it.
        </p>
        <p>
          <b>Ours.</b> The systems, tooling, automations, prompts, models and internal playbooks we
          use to run front offices. Those stay ours. You get the benefit of them while you work with
          us; you do not get to keep or resell the machinery.
        </p>
      </>
    ),
  },
  {
    id: 'you',
    h: 'What we need from you',
    body: (
      <>
        <ul>
          <li>Accurate information about your prices, your service area and your availability.</li>
          <li>The licences, certifications and insurance your work requires.</li>
          <li>The access we need to do the job: your listing, your calendar, your phone number.</li>
          <li>A reply when we ask you to approve something that only you can approve.</li>
        </ul>
        <p>
          If we cannot get the access or the answers we need, we cannot do the job, and we will tell
          you that rather than quietly under-deliver.
        </p>
      </>
    ),
  },
  {
    id: 'ai',
    h: 'How we use AI',
    body: (
      <>
        <p>
          We use AI to handle everyday calls, texts and bookings so nothing gets missed at two in the
          morning. A real person on our team steps in on anything unusual or high-stakes before it
          reaches your customer.
        </p>
        <p>
          AI is a tool we use to deliver the service. It is not the product, and it does not remove
          our responsibility. If our system gets something wrong, that is on us, not on the software.
        </p>
      </>
    ),
  },
  {
    id: 'enjoy',
    h: 'We take no share of your business',
    body: (
      <>
        <p>
          <b>The monthly fee is the entire commercial relationship.</b> We do not take a commission
          on your jobs, a percentage of your revenue, a success fee, or any share of what your
          business is worth, now or when you sell it. There is no equity, no earn-out and no claim
          on the value of your company, and nothing on this website or in your plan creates one.
        </p>
        <p>
          If we ever want to work with you on a different basis, that would be a separate
          conversation and a separate written agreement that you would be entirely free to decline.
          Until you sign such a thing, it does not exist.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    h: 'Limits on our liability',
    body: (
      <>
        <p>
          We will do this job properly, and if we get something wrong we will fix it. But we are a
          small company and we have to be honest about limits.
        </p>
        <p>
          We are not liable for indirect or consequential losses, and our total liability to you in
          any twelve-month period is limited to the fees you paid us in that period. We are not
          liable for outages or failures in third-party services we depend on, such as Google,
          telecom carriers or your own hosting, though we will work to resolve them.
        </p>
        <p>
          Nothing here limits liability that cannot be limited by law, including for fraud or for
          death or personal injury caused by negligence.
        </p>
      </>
    ),
  },
  {
    id: 'law',
    h: 'Governing law and changes',
    body: (
      <>
        <p>
          These terms are governed by the laws of the Province of Ontario and the laws of Canada
          that apply there. Any dispute goes to the courts of Ontario.
        </p>
        <p>
          If we change these terms, we will post the new version here and update the date at the top.
          If a change materially affects an existing client, we will tell that client directly rather
          than expecting them to notice a webpage.
        </p>
        <p>
          Questions about any of this go to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and a founder
          will answer.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="v4" style={{ background: '#fff' }}>
      <Nav />
      <LegalPage
        eyebrow="Terms and conditions"
        title="The deal, in plain English."
        intro="You should not need a lawyer to understand what you are buying. This is the whole agreement, written the way we would explain it to you on the phone."
        updated="13 July 2026"
        sections={SECTIONS}
      />
      <SiteFooter />
    </main>
  );
}
