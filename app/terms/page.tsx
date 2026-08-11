import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { LegalPage, type Section } from '@/components/v4/Legal';
import { EMAIL } from '@/lib/site';

/* DRAFT. Written in plain English on purpose: a service business owner has to be
 * able to read this without a lawyer. It reflects what we promise everywhere else
 *  * on the site (nothing upfront, $199/mth, NO term, 30-day cancel, unconditional 90-day refund, you own
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
          <li>Take payment from your customers on your behalf, into your own account.</li>
          <li>Ask your customers for reviews and bring past customers back.</li>
          <li>Reply to your reviews publicly, in your name, including the bad ones.</li>
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
          answer, text and email on your behalf, to tell your customers your prices, to take payment
          from them on your behalf, and to post public replies to your reviews under your name, using
          your name, your prices and your service area, as agreed with you during setup.
        </p>
        <p>
          {/* THE CONTRACT DID NOT COVER THE MOST PUBLIC THING WE DO. /whats-included sells
              "Every review answered, good or bad, in your voice and under your name" and "a
              person writes the reply to an angry one" — that is permanent public content, on a
              listing you own, seen by every future customer. The terms authorised answering,
              texting, emailing and taking payment, and stopped there. This is the same gap the
              money section was written to close, reopened on higher-stakes content. */}
          <b>On reviews specifically:</b> a real person writes every reply to a negative review
          before it goes anywhere near your listing, and you can tell us at any time to stop
          replying, to change how we reply, or to send anything to you first. We never write the
          review itself and we never ask anyone to write one that is not true.
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
          The plan is <b>$199/mth USD</b>, plus applicable taxes. There is nothing to pay
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
          {/* "or paid advertising you ask us to run" is gone: /whats-included says "Do you
              spend my money on ads? No", so the contract was granting a service two other
              pages refuse. Third time the terms held the worst of it.
              THEN this clause said the domain was "the only third-party cost there is",
              which went false the day we started taking payments and the client started
              absorbing the card fee. It is TWO costs now. This list, the /pricing FAQ and
              the "Money we handle for you" section must agree. If you change one, change
              all three. */}
          {/* This said "the only third-party cost there is" until Jacob confirmed the client
              absorbs card processing fees. That made it false the moment we started taking
              payments. Two costs, named, or the sentence is a lie. */}
          Two things sit outside the $199/mth USD, and this is the whole list. Your domain registration,
          roughly twenty dollars a year, passed through at cost and yours anyway. And the fee Stripe
          or Square charge on card payments, which is theirs, not ours, and which we do not mark up.
          If a third ever comes up, we agree it with you in writing first, or we do not spend it.
        </p>
      </>
    ),
  },
  {
    /* THIS SECTION DID NOT EXIST, and its absence was the single worst thing in the terms.
     * We take payment from customers, and the contract authorised us to "answer, text and
     * email" and nothing else. It said nothing about whose money it is, where it settles,
     * who bears a chargeback, or what happens to money in flight at cancellation. That is
     * the third time the terms held the worst of it.
     *
     * Every fact below was confirmed by Jacob, July 2026. Do not soften or embroider it:
     *   - funds settle to the CLIENT'S OWN account. We never hold their money.
     *   - the client absorbs the processor's fee. We do not mark it up and take no cut.
     *   - the client bears refunds and chargebacks, because it is their sale.
     * If any of those three change, this section and the /pricing FAQ both change. */
    id: 'money',
    h: 'Money we handle for you',
    body: (
      <>
        <p>
          We take payment from your customers so you are not the one chasing a card at the end of a
          job. <b>The money is yours and it goes straight to you.</b> It lands in a payment account
          in your name, with Stripe or Square. It never passes through a StayBookt account and we
          never hold it, not for a day.
        </p>
        <p>
          That account is yours. We help you set it up and we run it as part of the service, but it
          is in your name, and if you leave you keep it, along with anything in flight. There is
          nothing for us to release.
        </p>
        <p>
          <b>Stripe and Square charge their own fee on card payments</b>, in the region of 2.9% plus
          thirty cents, set by them and not by us. That fee is theirs. It comes out of what you
          collect, the same as it would with any card processing, <b>we do not mark it up, and we
          take no share of it and no cut of the job</b>.
        </p>
        <p>
          Refunds and chargebacks are yours: it is your sale, your work and your call, so you decide
          what to refund and you bear a disputed charge. The one exception is our own mistake. If a
          dispute traces back to something we got wrong, a price we quoted you did not give us or a
          job we booked you did not agree to, we tell you before your customer does, you decide what
          you want to honour, and we are the ones who go back to them and sort it out.
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
          your reviews. Your phone number. All of it is yours while we work together and after we stop.
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
    <div className="v4" style={{ background: '#fff' }}>
      <Nav />
      <main id="main" tabIndex={-1}>
      <LegalPage
        eyebrow="Terms and conditions"
        title="The deal, in plain English."
        intro="You should not need a lawyer to understand what you are buying. This is the whole agreement, written the way we would explain it to you on the phone."
        /* BUMP THIS WHENEVER THE TERMS CHANGE. Section 13 promises "we will post the new
           version here and update the date at the top", so a stale date here is the contract
           breaking its own clause. Bumped for the "Money we handle for you" section and the
           two-cost pass-through list (15 July 2026). */
        updated="15 July 2026"
        sections={SECTIONS}
      />
      </main>
      <SiteFooter />
    </div>
  );
}
