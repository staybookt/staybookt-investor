'use client';

import { useState } from 'react';
import { min } from '@/lib/css';

/* WHAT'S INCLUDED — the comparison matrix.
 *
 * This replaced nine blocks of ticked bullets, about fifty lines, that read as a
 * laundry list (Jacob, July 14 2026).
 *
 * WHY THIS PAGE IS NOT A FILM, AND MUST NOT BECOME ONE. The homepage is the film.
 * How-it-works is the mechanism. By the time somebody clicks What's included they
 * have already bought the story and switched modes: they are not discovering, they
 * are AUDITING. They want to know exactly what $199 buys before they call. Making
 * an auditor scroll through theatre to reach a fact is the most annoying thing a
 * website can do. This is the tech-specs page, not the product film. A previous
 * attempt to turn it into a narrative tanked for exactly this reason. Do not retry.
 *
 * THE FIX WAS NOT "FEWER FACTS", IT WAS "SOMETHING TO COMPARE THEM AGAINST." A
 * matrix does three things a bullet list cannot:
 *
 *  1. It answers the objection the buyer actually has, which is never "what do you
 *     do", it is "why don't I just get an answering service, or a web guy."
 *  2. It turns completeness into a weapon instead of a wall. You see, without
 *     reading a word, that one column fills up and the others do not.
 *  3. The "You, today" column is ticked all the way down, in amber, and that is the
 *     whole argument: it is not that this work is not getting done. It is that YOU
 *     are the one doing it, at nine at night.
 *
 * HONESTY RULE, NON-NEGOTIABLE: nothing in the competitor columns is invented. Every
 * blank is true BY DEFINITION of what that business is. An answering service answers
 * the phone; it does not quote, chase or sell, because that is not the product. An
 * agency builds the site; it never picks up the phone. That is not a slur, it is the
 * job description, and it is said out loud in the footnote. A strawman would not
 * survive the one buyer we want, who has already been burned by both.
 *
 * The exhaustive detail did not die, it moved: every row opens to the full list of
 * what we actually do for that job. Richard gets his complete list. The reader does
 * not get hit with it.
 *
 * LIGHT, not dark (Jacob, July 14 2026). A specs table is a document you read and
 * study, and documents are dark-on-light. It also fixes the page rhythm: dark hero,
 * light matrix, dark platform, cream, white, dark, white. */

type Cell = 'you' | 'yes' | 'no';
type Row = { job: string; you: Cell; svc: Cell; agy: Cell; sb: Cell; detail: string[] };

const ROWS: Row[] = [
  {
    job: 'Answer every call and text, 24/7',
    you: 'you', svc: 'yes', agy: 'no', sb: 'yes',
    detail: [
      'Every call answered, 24 hours a day, seven days a week',
      'Every text answered, in your voice, using your prices and your rules',
      'Website forms, Google messages and emails all caught in the same place',
      'The caller gets a real answer, not a voicemail and not a promise to call back',
      'Anything unusual goes to a real person before it reaches your customer',
      'Your number stays your number. Nothing changes for your customers',
    ],
  },
  {
    /* THIS ROW USED TO CLAIM AN ANSWERING SERVICE CANNOT TRIAGE (Richard, review, July
       2026). Sorting the urgent call from the one that can wait is the single thing an
       answering service exists to do. We had it marked ✗.

       On a site whose fifth published promise is that we will never fake proof, a false
       mark against a competitor is the same category of lie as a fabricated testimonial,
       and it is a worse one, because it is checkable in thirty seconds by anyone who has
       ever hired one.

       It costs us the row. Good. Handing a rival the point they have actually earned is
       what makes the other eleven ✗s believable. Never mark a competitor down for
       something they genuinely do. */
    job: 'Sort the emergency call from the one that can wait',
    you: 'you', svc: 'yes', agy: 'no', sb: 'yes',
    detail: [
      'Emergency and after-hours calls sorted against the rules you set',
      'What is urgent, what waits until morning, and what is worth waking you for',
      'You set the rules once, and we stick to them at 2am',
    ],
  },
  {
    /* svc WAS 'no'. An answering service books jobs onto a calendar: Ruby, Smith.ai and
       AnswerConnect all advertise it on the front page. This is the same false cross
       Richard caught one row above, and we left it sitting here.

       Our own footnote never denied it either: it concedes they answer the phone and
       only denies chase and sell. The chart was arguing with its own small print. */
    job: 'Book the job onto your calendar',
    you: 'you', svc: 'yes', agy: 'no', sb: 'yes',
    detail: [
      'The job goes straight onto your calendar, in the slot that works',
      'The customer gets a confirmation, so they know it is real',
      'Reminders before the visit, so they are actually home when you get there',
      'Reschedules and cancellations handled without you touching your phone',
    ],
  },
  /* THE "SEND THE QUOTE" ROW IS GONE (Richard asked whether we could actually do it;
     Jacob: we cannot, bench it — July 2026).

     It claimed "every quote goes out, in your format, at your prices". We cannot draft
     and issue a quote document, so that was a feature we were selling and could not
     deliver. Same category as the false cross we just took off the answering service:
     a chart that lies in our favour is worth less than no chart.

     What survives is what is true. We answer a price question from the playbook ("$180
     for the visit"), and we chase the quote YOU sent until it closes. Stating a known
     price and drafting a quote are not the same job.

     When we can genuinely draft quotes, this row comes back. Not before. */
  {
    job: 'Chase the quote until you get a yes or a no',
    you: 'you', svc: 'no', agy: 'no', sb: 'yes',
    detail: [
      'Every quote you send followed up until you have a yes or a no. Not a maybe',
      'The quote you sent on Thursday and forgot about is the most expensive thing in your business',
      'You see what is outstanding, what is won and what went cold, without digging',
    ],
  },
  {
    /* svc WAS 'no', and the comment here previously certified it as "earned, not
       manufactured". It was neither. Smith.ai sells "Payment collection" on its receptionist
       plans and says so on its own pricing page; this is the SIXTH false cross this chart has
       carried, and it was introduced in the same session that fixed the fourth. Writing a
       comment asserting a mark is earned is not the same as checking it. Check it.
       The row still wins on agy and on the detail: payment taken at the door on a finished
       job, against a calendar and an invoice an answering service does not hold. Take the
       point, not the row. */
    job: 'Take the payment',
    you: 'you', svc: 'yes', agy: 'no', sb: 'yes',
    detail: [
      'The customer can pay when the job is done, not a fortnight after it',
      'Nobody standing in a driveway asking for a cheque',
      'The money is yours. We never take a cut of a job',
    ],
  },
  {
    job: 'Chase the invoice nobody chased',
    you: 'you', svc: 'no', agy: 'no', sb: 'yes',
    detail: [
      'Unpaid invoices chased, politely and persistently, so the money actually lands',
      'You see what is owed and what is overdue without going looking for it',
      'We are not your bookkeeper. We chase what is owed and show you what came in',
    ],
  },
  {
    /* agy WAS 'no'. Reputation management and review generation are standard at
       $1,000/mo. Third false cross found in this chart. The row still wins on
       "every single time, at the right moment", which is the part they cannot do
       because they are not the one who finished the job. */
    /* ANSWERING REVIEWS WAS MISSING (Richard: "we should probably state that we will
       respond to reviews automatically"). We do it, so it should be here.

       NOT described as "automatic", deliberately. Everywhere else on this site the model
       is AI for the everyday and a real person for anything high-stakes, and a public
       one-star reply written under the owner's name, permanently, in front of every
       future customer, is the most high-stakes text we will ever send. Promising it is
       automatic promises the wrong thing.

       And "we never write one for you" now has to be exact, because we DO write the
       replies. Reply, never the review. Those two sit one line apart and a reader is
       entitled to know which is which. */
    job: 'Ask for the review, and answer every one',
    you: 'you', svc: 'no', agy: 'yes', sb: 'yes',
    detail: [
      'A review asked for after every finished job, at the right moment',
      'While the work is still fresh, which is the only time it works',
      'Every review answered, good or bad, in your voice and under your name',
      'A person writes the reply to an angry one before it goes anywhere near your listing',
      'Referrals asked for from the customers who are happy',
      'Real reviews only. We write the reply. We never write the review',
    ],
  },
  {
    /* agy WAS 'no' — added in the same commit that added the campaigns line below it,
       which is precisely the thing a $1,000/mo agency does for a living. We marked a
       competitor down for the one job this row is about. Fixed to 'yes'.

       The row still wins, and wins honestly: an agency will send the campaign. It will
       not book the follow-up visit that comes out of it, because it never touches the
       phone or the calendar.

       EMAIL CAMPAIGNS WERE MISSING FROM THE WHOLE SITE (Richard, review, July 2026).
       They live here rather than in a row of their own, because that is what they
       honestly are: the mechanism for bringing past customers back, not a separate
       product. We do not run cold campaigns at strangers. The plan is organic, which
       every other page already says. */
    job: 'Bring past customers back before they drift',
    you: 'you', svc: 'no', agy: 'yes', sb: 'yes',
    detail: [
      'Past customers brought back for the work they are due',
      'The email campaigns you never get around to, written and sent for you',
      'Follow-up maintenance booked before they drift to someone else',
      'The right upsell suggested, only where it honestly makes sense',
      'The cheapest job you will ever win is the second one from someone who already likes you',
    ],
  },
  {
    job: 'Build and host the website',
    you: 'you', svc: 'no', agy: 'yes', sb: 'yes',
    detail: [
      'A custom website, built from scratch for your business. Yours to keep',
      'Fast, and built mobile first, because that is where your customers are',
      'A tap-to-call button on every screen, so calling you takes one thumb',
      'Online booking wired straight into your calendar',
      'Hosting, security and updates handled. You never touch it',
      'Written in your voice, not marketing filler',
    ],
  },
  {
    job: 'Run the Google listing and get you found',
    you: 'you', svc: 'no', agy: 'yes', sb: 'yes',
    detail: [
      'Your Google Business Profile rebuilt, filled out properly and kept current',
      'Photos, services, hours and service area, all correct and consistent',
      'Your name, address and phone made identical everywhere, which is what Google trusts',
      'Local search work so you climb the map for the searches that matter near you',
      'Set up so you show up when someone asks an AI assistant for what you do',
    ],
  },
  {
    /* Richard: "I feel we should have a more pronounced call out for a CRM... It's a big
       part of the solution and it seems underrepresented right now." It WAS underrepresented:
       we described a CRM in six bullets and never once used the word, so the sophisticated
       reader Richard has in mind scanned the chart and did not see one.
       Naming it is the whole fix. Note he ALSO had the standalone customer-record section
       cut ("don't think you gain enough from the extra complexity"), so this must stay a
       chart row — do not rebuild that section to solve this. */
    job: 'A CRM that fills itself in',
    you: 'you', svc: 'no', agy: 'no', sb: 'yes',
    detail: [
      'A real CRM: every customer, every job, every conversation, in one place',
      'What they have spent with you, and what they are worth over time',
      'Which quotes are open, which are cold, and which are about to close',
      'Who has not been back in a year and is about to be somebody else’s customer',
      'Nothing for you to enter. It fills itself in as we work',
      'QuickBooks knows what you invoiced. It does not know she has called three times',
    ],
  },
  {
    /* THE ASSISTANT WAS NOWHERE IN THIS CHART (Richard: "What about the Assistant -
       conversational AI as a feature?"). It was further down the page and not in the one
       table a person actually reads.

       It earns a row on the merits: it is the only line here no answering service and no
       agency can tick, because neither of them holds your records. Every claim below
       matches what the assistant panel further down this page already shows. */
    /* WAS 'Answer your questions about your own business' — a description of a feature
       nobody asked for, in a chart people skim. Richard: "the description is nebulous — I
       would headline it as an AI Assistant. Everybody wants an assistant!" He is right that
       the label is the only part most readers read, so the label has to carry the noun.
       The detail still does the work of saying it is not a chatbot. */
    job: 'An AI Assistant that knows your business',
    you: 'you', svc: 'no', agy: 'no', sb: 'yes',
    detail: [
      'Ask in plain English: how did last week go, who has not paid, who has gone quiet',
      'Tell it what to do and it does it. Chase the quote, chase the invoice, book the visit',
      'No dashboard to learn and nothing to log into. A conversation you already know how to have',
      'It knows your customers because it is the thing that has been talking to them',
    ],
  },
  {
    /* svc was 'no'. It was wrong, and it is the fourth false cross this chart has carried.
       Ruby, Smith.ai and AnswerConnect all send a daily call recap: the row LABEL is a
       thing they genuinely do, and the label is all most people read. The win is in the
       detail below, which needs the calendar they do not have. Never mark a competitor
       down for something they genuinely do. */
    job: 'Hand you one short brief each morning',
    you: 'you', svc: 'yes', agy: 'no', sb: 'yes',
    detail: [
      'What is booked today, and who is expecting you',
      'Anything that needs a decision from you, and nothing that does not',
      'What came in overnight and how it was handled',
      'A monthly report of what actually happened: calls, bookings, quotes, reviews, revenue',
      'Thirty seconds. No dashboard you are forced to live in',
    ],
  },
];

const COLS: { k: keyof Pick<Row, 'you' | 'svc' | 'agy' | 'sb'>; label: string; sub: string }[] = [
  { k: 'you', label: 'You, today', sub: 'at nine at night' },
  { k: 'svc', label: 'Answering service', sub: '~$400/mo' },
  { k: 'agy', label: 'Web agency', sub: '$1,000+/mo' },
  { k: 'sb', label: 'StayBookt', sub: '$199/mo' },
];

/* THE WHOLE CHART ANNOUNCED AS NOTHING.
 * These marks carried aria-label on a bare <span>. A span maps to role="generic", and
 * generic does not support an accessible name, so EVERY aria-label here was silently
 * discarded — and the "no" span has no text content at all. A screen reader got six job
 * titles and silence. The comparison IS the argument of this section.
 * The marks are decorative now and the ROW says the whole line (see say() and the button's
 * aria-label below), which also fixes the second half of the bug: this grid declared
 * role="table" while its data rows were <button>s, so the column headers never associated
 * with any cell and the table was exposed as broken or empty. */
function Mark({ v }: { v: Cell }) {
  if (v === 'yes')
    return (
      <span className="mk yes" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
        </svg>
      </span>
    );
  if (v === 'you') return <span className="mk youtag" aria-hidden="true">You</span>;
  return <span className="mk no" aria-hidden="true" />;
}

/* Self-contained on purpose: with no table semantics to lean on, each value has to state
   its own column, or "yes" floating alone means nothing. */
const say = (v: Cell) => (v === 'yes' ? 'yes' : v === 'you' ? 'you do this yourself' : 'no');
const rowLabel = (r: Row) =>
  `${r.job}. ` + COLS.map((c) => `${c.label}: ${say(r[c.k])}`).join('. ') + '.';

export default function Matrix() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx">
      <style>{min(CSS)}</style>
      <div className="wrap">
        <div className="mx-head">
          <div className="eyebrow">What&apos;s included</div>
          <h2>
            All of this work is getting done today. <span className="g">You are the one doing it, at nine at night.</span>
          </h2>
          <p>
            Every job below has to happen for the business to run. Here is who is doing each one today,
            what the usual alternatives actually cover, and what we cover. Open any row for exactly what
            we do.
          </p>
        </div>

        <div className="mx-scroll">
          {/* role="table" is GONE. It was invalid: the data rows are <button>s, not
              role="row", so AT exposed the table as broken and never tied a header to a
              cell. The header row is visual only now — every row states its own columns in
              its accessible name, which is also what makes the stacked mobile view work. */}
          <div className="mx-grid">
            <div className="mx-r mx-hd" aria-hidden="true">
              <div className="mx-j" />
              {COLS.map((c) => (
                <div className={`mx-c${c.k === 'sb' ? ' us' : ''}`} key={c.k}>
                  <b>{c.label}</b>
                  <i>{c.sub}</i>
                </div>
              ))}
            </div>

            {ROWS.map((r, i) => (
              <div key={r.job} className={`mx-row${open === i ? ' open' : ''}`}>
                <button
                  type="button"
                  className="mx-r"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-label={rowLabel(r)}
                >
                  <span className="mx-j">
                    <span className="jt">{r.job}</span>
                    <span className="pl" aria-hidden>+</span>
                  </span>
                  {COLS.map((c) => (
                    /* data-lbl feeds the stacked mobile view: below 760px the header row is
                       useless because there are no columns, so each cell names itself. */
                    <span className={`mx-c${c.k === 'sb' ? ' us' : ''}`} key={c.k} data-lbl={c.label}>
                      <Mark v={r[c.k]} />
                    </span>
                  ))}
                </button>

                <div className="mx-body">
                  <ul>
                    {r.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-foot">
          Not a slur on anybody. An answering service answers the phone: it does not chase or sell,
          because that is not what it is. An agency builds you a website and never picks up the
          phone. They both do the job they sell you. The rest of yours is still sitting on your
          desk at nine at night.
        </p>
      </div>
    </section>
  );
}

const CSS = `
/* MAKING IT POP, IN LIGHT MODE (Jacob, live review, July 2026).
   The chart was white type on a white section with hairline rules: a spreadsheet, not
   a designed comparison. Four moves, no dark mode needed:
     1. the section goes cream so a white card can exist on it at all
     2. the grid becomes that card: real border, real radius, real shadow
     3. the StayBookt column becomes an actual column, tinted, bordered and capped,
        instead of a 9%-opacity wash nobody could see
     4. our checks become filled badges while the competitors stay flat and grey, so
        the eye is told who wins before a single word is read */
.mx{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);padding:clamp(80px,10vw,130px) 0;}
.mx .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.mx .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.mx-head{max-width:64ch;}
.mx-head h2{margin-top:14px;font-size:clamp(28px,4vw,50px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:var(--v4-ink,#06080d);max-width:20ch;}
.mx-head h2 .g{background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}
.mx-head p{margin-top:20px;font-size:clamp(16px,1.75vw,18px);line-height:1.62;color:#6b7280;max-width:58ch;}

.mx-scroll{margin-top:clamp(40px,5vw,58px);overflow-x:auto;-webkit-overflow-scrolling:touch;
  background:#fff;border:1px solid #e6e6e1;border-radius:24px;
  box-shadow:0 40px 80px -46px rgba(6,12,20,.35),0 2px 6px -2px rgba(6,12,20,.06);
  padding:clamp(16px,2.2vw,28px) clamp(14px,2vw,24px) clamp(8px,1.2vw,14px);}
.mx-grid{min-width:720px;}

.mx-r{display:grid;grid-template-columns:minmax(0,1.55fr) repeat(4,minmax(88px,.62fr));align-items:center;width:100%;
  background:transparent;border:0;padding:0;font-family:inherit;color:inherit;text-align:left;}

/* header row */
.mx-hd{padding-bottom:14px;border-bottom:1px solid #dedeD6;}
.mx-hd .mx-c{display:flex;flex-direction:column;align-items:center;gap:3px;padding:0 6px;}
.mx-hd .mx-c b{font-size:12.5px;font-weight:700;letter-spacing:.04em;color:#6b7280;text-align:center;line-height:1.25;}
.mx-hd .mx-c i{font-style:normal;font-size:11px;color:#9298a1;}
.mx-hd .mx-c.us b{font-size:14px;background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}
.mx-hd .mx-c.us i{color:#047857;font-weight:700;font-size:12px;}

/* body rows */
.mx-row{border-bottom:1px solid #ededea;}
.mx-row>button{cursor:pointer;padding:16px 0;transition:background .25s ease;}
.mx-row>button:hover{background:#fbfbfa;}
.mx-j{display:flex;align-items:center;gap:10px;padding-right:16px;}
.mx-j .jt{font-size:15.5px;line-height:1.4;color:#26292f;}
.mx-j .pl{width:20px;height:20px;flex:0 0 auto;border-radius:50%;border:1px solid #d8d8dd;color:#9298a1;
  display:flex;align-items:center;justify-content:center;font-size:13px;line-height:1;
  transition:transform .4s cubic-bezier(.16,1,.3,1),background .3s ease,color .3s ease,border-color .3s ease;}
.mx-row.open .pl{transform:rotate(45deg);background:#10b981;border-color:transparent;color:#fff;}
.mx-row>button:hover .pl{border-color:#a9aeb8;color:#6b7280;}
.mx-c{display:flex;align-items:center;justify-content:center;}
/* the one column that fills up */
.mx-row .mx-c.us{background:rgba(16,185,129,.07);
  border-left:1px solid rgba(16,185,129,.3);border-right:1px solid rgba(16,185,129,.3);}
.mx-grid .mx-row:last-child .mx-c.us{border-bottom:1px solid rgba(16,185,129,.3);border-radius:0 0 14px 14px;}
.mx-hd .mx-c.us{background:linear-gradient(180deg,rgba(16,185,129,.2),rgba(16,185,129,.08));
  border:1px solid rgba(16,185,129,.3);border-bottom:0;border-radius:14px 14px 0 0;
  padding-top:12px;padding-bottom:12px;box-shadow:0 -1px 0 rgba(16,185,129,.1) inset;}

.mk{display:block;}
.mk.yes{display:grid;place-items:center;width:19px;height:19px;color:#10b981;}
.mk.yes svg{width:100%;height:100%;}
/* ours is the only filled one on the row. that is the whole point of the chart. */
.mx-c.us .mk.yes{width:26px;height:26px;border-radius:50%;background:#059669;color:#fff;padding:5px;
  box-shadow:0 6px 14px -4px rgba(5,150,105,.65);}
.mk.no{width:16px;height:2px;border-radius:2px;background:#d3d3d9;}
.mk.youtag{font-size:11px;font-weight:700;letter-spacing:.06em;color:#b45309;background:rgba(245,158,11,.14);
  border:1px solid rgba(245,158,11,.42);border-radius:999px;padding:4px 10px;white-space:nowrap;}

/* the detail, one tap away */
.mx-body{max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.16,1,.3,1);}
.mx-row.open .mx-body{max-height:420px;}
.mx-body ul{list-style:none;margin:0;padding:2px 0 22px;}
.mx-body li{position:relative;padding:7px 0 7px 18px;font-size:14.5px;line-height:1.55;color:#6b7280;max-width:70ch;}
.mx-body li::before{content:'';position:absolute;left:0;top:15px;width:5px;height:5px;border-radius:50%;background:#10b981;}

.mx-foot{margin-top:clamp(26px,3vw,34px);font-size:13.5px;line-height:1.6;color:#9298a1;max-width:70ch;}

/* MOBILE: THE CHART USED TO HIDE ITS OWN PUNCHLINE.
   .mx-grid was min-width:640px inside a ~322px content box, in an overflow-x:auto scroller.
   Every row ran from x=35 to x=675, so 285px sat off-screen — and StayBookt is the LAST
   column, so the one column the whole chart exists to show was the one you could not see.
   The page never "broke", which is why it survived: the scroller swallowed the overflow and
   nothing looked wrong unless you were actually holding a phone. Nobody was.
   Below 760px there are no columns at all now. Each row becomes a card: the job, then the
   four answers stacked, each naming itself from data-lbl. No sideways scrolling, and our
   answer is always on screen. */
@media(max-width:760px){
  .mx-scroll{overflow-x:visible;padding:clamp(12px,3vw,18px) clamp(12px,3vw,16px);}
  .mx-grid{min-width:0;}
  .mx-hd{display:none;}
  .mx-r{grid-template-columns:1fr;align-items:stretch;gap:0;}
  .mx-j{padding:2px 0 10px;align-items:flex-start;justify-content:space-between;}
  .mx-j .jt{font-size:16.5px;font-weight:600;letter-spacing:-.01em;}
  .mx-row>button{padding:14px 0 10px;}
  .mx-c{justify-content:space-between;padding:7px 10px;border-radius:8px;}
  .mx-c::before{content:attr(data-lbl);font-size:12.5px;font-weight:600;color:#9298a1;letter-spacing:.01em;}
  /* Our row stays tinted and gains its label colour, so the eye still lands on it first. */
  .mx-row .mx-c.us{background:rgba(16,185,129,.09);border:0;border-radius:8px;margin-top:2px;}
  .mx-row .mx-c.us::before{color:#047857;font-weight:700;}
  .mx-grid .mx-row:last-child .mx-c.us{border:0;border-radius:8px;}
  .mx-body{padding-left:0;}
  .mx-j .jt{font-size:14.5px;}
}
@media(prefers-reduced-motion:reduce){.mx-body,.mx-j .pl{transition:none;}}
`;
