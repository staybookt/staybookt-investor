'use client';

import { useEffect, useState } from 'react';
import { min } from '@/lib/css';

/* WHAT'S INCLUDED — the work-transfer chart.
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
 * IT USED TO BE A FOUR COLUMN COMPARISON. IT IS NOT ANY MORE (Linda, cold read, July
 * 2026; approved by Jacob). Two of the four columns priced up the usual alternatives
 * and ticked what each of them covers. Linda: "the comparison to a marketing agency
 * and call service isn't necessary; it adds clutter." She is right, and the code
 * history agrees with her: those two columns carried SIX separate false marks against
 * rivals over their life, each one caught in review, each one a checkable lie on a
 * site whose fifth published promise is that we will never fake proof. A column you
 * have to keep re-auditing to stop it lying costs more than it earns.
 * THE RULE THOSE INCIDENTS BOUGHT SURVIVES THEM, and applies anywhere on this site:
 * never mark a competitor down for something they genuinely do. Check the claim on
 * their own pricing page before you publish a cross. If those columns ever come back,
 * read this paragraph twice first.
 *
 * WHAT IS LEFT IS NOT A COMPARISON TABLE, AND MUST NOT BE DRESSED AS ONE. Every one
 * of the thirteen rows is identical: on you today, on us tomorrow. Thirteen identical
 * rows in a two column grid reads as broken. THE UNIFORMITY IS THE ARGUMENT. Not
 * "we do more than they do", but "every single one of these moves off you". So the
 * chart is drawn as a transfer, left to right, with one axis running the length of
 * the list (Richard: start with what the person is doing today, then draw an arrow
 * across to the StayBookt tick).
 *
 * WHY THE ARROWHEAD IS DRAWN ONCE AND NOT THIRTEEN TIMES. A heavy arrow repeated on
 * every row is thirteen pieces of chrome saying the same sentence, and repetition at
 * that weight reads as decoration, which the eye then stops reading. So the statement
 * lives once, big, in the header lane: amber at the owner's end, green at ours,
 * labelled "all of it". Each row then carries only the quiet continuation of that same
 * axis, a hairline rail into a small chevron, enough to make a single row read left to
 * right on its own if that is where the eye lands first. One argument, stated once,
 * echoed thirteen times.
 *
 * The exhaustive detail did not die, it moved: every row opens to the full list of
 * what we actually do for that job. Richard gets his complete list. The reader does
 * not get hit with it.
 *
 * LIGHT, not dark (Jacob, July 14 2026). A specs table is a document you read and
 * study, and documents are dark-on-light. It also fixes the page rhythm: dark hero,
 * light matrix, dark platform, cream, white, dark, white. */

type Cell = 'you' | 'yes';
type Row = { job: string; you: Cell; sb: Cell; detail: string[] };

const ROWS: Row[] = [
  {
    job: 'Answer every call and text, 24/7',
    you: 'you', sb: 'yes',
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
    job: 'Sort the emergency call from the one that can wait',
    you: 'you', sb: 'yes',
    detail: [
      'Emergency and after-hours calls sorted against the rules you set',
      'What is urgent, what waits until morning, and what is worth waking you for',
      'You set the rules once, and we stick to them at 2am',
    ],
  },
  {
    job: 'Book the job onto your calendar',
    you: 'you', sb: 'yes',
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
     deliver. A chart that lies in our favour is worth less than no chart.

     What survives is what is true. We answer a price question from the playbook ("$180
     for the visit"), and we chase the quote YOU sent until it closes. Stating a known
     price and drafting a quote are not the same job.

     When we can genuinely draft quotes, this row comes back. Not before. */
  {
    job: 'Chase the quote until you get a yes or a no',
    you: 'you', sb: 'yes',
    detail: [
      'Every quote you send followed up until you have a yes or a no. Not a maybe',
      'The quote you sent on Thursday and forgot about is the most expensive thing in your business',
      'You see what is outstanding, what is won and what went cold, without digging',
    ],
  },
  {
    job: 'Take the payment',
    you: 'you', sb: 'yes',
    detail: [
      'The customer can pay when the job is done, not a fortnight after it',
      'Nobody standing in a driveway asking for a cheque',
      'The money is yours. We never take a cut of a job',
    ],
  },
  {
    job: 'Chase the invoice nobody chased',
    you: 'you', sb: 'yes',
    detail: [
      'Unpaid invoices chased, politely and persistently, so the money actually lands',
      'You see what is owed and what is overdue without going looking for it',
      'We are not your bookkeeper. We chase what is owed and show you what came in',
    ],
  },
  {
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
    you: 'you', sb: 'yes',
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
    /* EMAIL CAMPAIGNS WERE MISSING FROM THE WHOLE SITE (Richard, review, July 2026).
       They live here rather than in a row of their own, because that is what they
       honestly are: the mechanism for bringing past customers back, not a separate
       product. We do not run cold campaigns at strangers. The plan is organic, which
       every other page already says. */
    job: 'Bring past customers back before they drift',
    you: 'you', sb: 'yes',
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
    you: 'you', sb: 'yes',
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
    you: 'you', sb: 'yes',
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
    you: 'you', sb: 'yes',
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
       table a person actually reads. Every claim below matches what the assistant panel
       further down this page already shows. */
    /* WAS 'Answer your questions about your own business' — a description of a feature
       nobody asked for, in a chart people skim. Richard: "the description is nebulous — I
       would headline it as an AI Assistant. Everybody wants an assistant!" He is right that
       the label is the only part most readers read, so the label has to carry the noun.
       The detail still does the work of saying it is not a chatbot. */
    job: 'An AI Assistant that knows your business',
    you: 'you', sb: 'yes',
    detail: [
      'Ask in plain English: how did last week go, who has not paid, who has gone quiet',
      'Tell it what to do and it does it. Chase the quote, chase the invoice, book the visit',
      'No dashboard to learn and nothing to log into. A conversation you already know how to have',
      'It knows your customers because it is the thing that has been talking to them',
    ],
  },
  {
    job: 'Hand you one short brief each morning',
    you: 'you', sb: 'yes',
    detail: [
      'What is booked today, and who is expecting you',
      'Anything that needs a decision from you, and nothing that does not',
      'What came in overnight and how it was handled',
      'A monthly report of what actually happened: calls, bookings, quotes, reviews, revenue',
      'Thirty seconds. No dashboard you are forced to live in',
    ],
  },
];

/* LEFT IS TODAY. RIGHT IS AFTER (Linda). The old left header read "You, today" while the
   cell under it also read "You", so the word did the same job twice and the reader lost the
   sense that these are two points in TIME rather than two suppliers. The header now names
   the moment, the cell names who is holding the work. "at nine at night" stays: it is the
   best line on the page. */
/* ORDER (Richard, 8-5-26: "the website, google listing, and CRM should be at the top. The
   rest looks thoughtful.") ROWS stays in its original authoring order; this maps the render
   order: website (8), Google listing (9), CRM (10) first, then everything else as it was. */
const ORDERED = [8, 9, 10, 0, 1, 2, 3, 4, 5, 6, 7, 11, 12].map((i) => ROWS[i]);

const COLS: { k: keyof Pick<Row, 'you' | 'sb'>; label: string; sub: string; short: string }[] = [
  { k: 'you', label: 'On your plate today', sub: 'at nine at night', short: 'Today' },
  { k: 'sb', label: 'With StayBookt', sub: '$199/mth USD', short: 'With StayBookt' },
];

/* THE WHOLE CHART ANNOUNCED AS NOTHING.
 * These marks carried aria-label on a bare <span>. A span maps to role="generic", and
 * generic does not support an accessible name, so EVERY aria-label here was silently
 * discarded — and one of the marks had no text content at all. A screen reader got six job
 * titles and silence. The transfer IS the argument of this section.
 * The marks are decorative now and the ROW says the whole line (see say() and the button's
 * aria-label below), which also fixes the second half of the bug: this grid declared
 * role="table" while its data rows were <button>s, so the column headers never associated
 * with any cell and the table was exposed as broken or empty. Do not put role="table" or
 * role="columnheader" back. */
function Mark({ v }: { v: Cell }) {
  if (v === 'yes')
    return (
      <span className="mk yes" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
        </svg>
      </span>
    );
  return (
    <span className="mk youtag" aria-hidden="true">
      You
    </span>
  );
}

/* Self-contained on purpose: with no table semantics to lean on, each value has to state
   its own column, or a bare "yes" floating alone means nothing. The trailing cue is the
   visible wording on the control, and it has to appear in the accessible name too, or the
   label you can see and the label you can hear disagree. */
const say = (v: Cell) => (v === 'yes' ? 'we do this for you' : 'you do this yourself');
const rowLabel = (r: Row, isOpen: boolean) =>
  r.job +
  '. ' +
  COLS.map((c) => c.label + ': ' + say(r[c.k])).join('. ') +
  '. ' +
  (isOpen ? 'Hide the detail.' : 'See what this includes.');

/* THE FOURTEENTH BEAT (Linda, cold read, July 2026: "at the bottom, prompt people to
 * consider what they would do with all the time they get back"; Richard added the half
 * she did not: it is not only about leaving, it is about doing more of the part of the
 * job you actually like).
 *
 * SO THE ENTRIES ALTERNATE, on purpose, inside the work then outside it, all the way
 * down. Never two of a kind in a row. If somebody adds a ninth line, it goes in the
 * slot the alternation asks for, not on the end.
 *
 * NO NUMBER GOES NEAR THIS. The obvious version of this section says "get back about
 * fourteen hours a week". We have no such figure, this site publishes a promise that we
 * never fake proof, and two separate invented numbers have already had to be killed off
 * other pages. The reader fills the blank. We only show the shape of an answer.
 *
 * NOT A BENEFITS LIST EITHER. One line at a time, in one slot. The moment it becomes
 * three bullets it stops being a question and starts being a pitch. */
const FILL = [
  'On the tools.',
  'Dinner at home, on time.',
  'The big install you keep turning down.',
  'Saturday on the dock.', /* was "your kid's game": the ICP is 50+, the kids are grown */
  'Training the apprentice properly.',
  'A Friday afternoon off.',
  'Walking the job before you quote it.',
  'A week away you don’t cut short.',
];

/* ONE SLOT, FADING. Not a fourth scroll film: this page is a scannable list and the
   site already carries three films. A fade in a single slot is the right weight.
   The slot is aria-hidden and the full set is published once in an sr-only list right
   after it, the same static-twin pattern the films use. aria-live here would make a
   screen reader announce a new fragment every three seconds forever. */
function Fill() {
  const [i, setI] = useState(0);
  const [on, setOn] = useState(true);

  useEffect(() => {
    const mq =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    if (mq && mq.matches) return;
    let out: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setOn(false);
      out = setTimeout(() => {
        setI((n) => (n + 1) % FILL.length);
        setOn(true);
      }, 420);
    }, 3000);
    return () => {
      clearInterval(tick);
      clearTimeout(out);
    };
  }, []);

  return (
    <span className={'cl-slot' + (on ? ' on' : '')} aria-hidden="true">
      {FILL[i]}
    </span>
  );
}

export default function Matrix() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx">
      <style>{min(CSS)}</style>
      <div className="wrap">
        <div className="mx-head">
          <div className="eyebrow">What&apos;s included</div>
          {/* ONE LEAD-IN, NOT TWO (Richard, July 2026): "I don't love this main tag line,
              prefer the secondary statement as it is crisper to me. Maybe just have one here
              for a simpler lead-in."
              The tagline that used to sit here was "All of this work is getting done today.
              You are the one doing it, at nine at night." He is right about it. It was a two
              part construction that took a whole headline to arrive at an idea the sentence
              underneath stated outright, with actual numbers in it. So the sentence
              underneath is the headline now and the tagline is gone. One statement.
              The gradient sits on the price, which is the part worth looking at.
              An earlier version of the paragraph opened three sentences the same way, which
              is anaphora and the exact AI tell the voice pass spent a night removing. Do not
              let it back in. */}
          <h2>
            Thirteen jobs, and the business does not run without any of them. You are doing all
            thirteen tonight.{' '}
            <span className="g">For $199 USD a month we do them instead.</span>
          </h2>
        </div>

        <div className="mx-scroll">
          {/* role="table" is GONE. It was invalid: the data rows are <button>s, not
              role="row", so AT exposed the table as broken and never tied a header to a
              cell. The header row is visual only now — every row states its own columns in
              its accessible name, which is also what makes the stacked mobile view work. */}
          <div className="mx-grid">
            <div className="mx-r mx-hd" aria-hidden="true">
              <div className="mx-j" />
              <div className="mx-c today">
                <b>{COLS[0].label}</b>
                <i>{COLS[0].sub}</i>
              </div>
              {/* The one arrow. Amber at the owner's end, green at ours, head at ours. Drawn
                  as a gradient rule and a rotated corner rather than an SVG, so it stretches
                  with the column without distorting the head. */}
              <div className="mx-lane hd-lane">
                <i className="ax-t">all of it</i>
                <span className="axis" />
              </div>
              <div className="mx-c us">
                <b>{COLS[1].label}</b>
                <i>{COLS[1].sub}</i>
              </div>
            </div>

            {ORDERED.map((r, i) => (
              <div key={r.job} className={'mx-row' + (open === i ? ' open' : '')}>
                <button
                  type="button"
                  className="mx-r"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-label={rowLabel(r, open === i)}
                >
                  <span className="mx-j">
                    <span className="jt">{r.job}</span>
                    {/* L4: LINDA NEVER SAW THAT THE ROWS OPEN. The only affordance was a 20px
                        circle holding a plus at #8a8f98 on white, which measures exactly
                        3.00:1. It cleared the 3:1 non-text bar and was still undiscoverable,
                        because contrast is not discoverability: nothing on the row said it
                        was a control. So there is now a worded cue on every row, in the same
                        green as our column at 6.4:1 on white, inside a pill with a real
                        border, and it says what pressing it does. The whole row is the
                        button. This is the part that tells you so. */}
                    <span className="cue" aria-hidden="true">
                      <span className="cue-t">
                        {open === i ? 'Hide the detail' : 'See what this includes'}
                      </span>
                      <span className="pl">+</span>
                    </span>
                  </span>
                  {/* data-lbl feeds the stacked mobile view: below 760px there are no columns,
                      so each cell names itself. */}
                  <span className="mx-c today" data-lbl={COLS[0].short}>
                    <Mark v={r.you} />
                  </span>
                  <span className="mx-lane" aria-hidden="true" />
                  <span className="mx-c us" data-lbl={COLS[1].short}>
                    <Mark v={r.sb} />
                  </span>
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

            {/* THE LEFT COLUMN, EMPTY. Thirteen amber pills, then nothing: the reader has
                just watched all of it leave that column, and now they are made to look at
                it. The dashed outline keeps it reading as an empty slot rather than a
                rendering fault. The StayBookt column carries straight on underneath,
                because the work did not stop, it just stopped being theirs. */}
            <div className="mx-close">
              <div className="mx-r">
                <div className="mx-j">
                  <p className="cl-h">That column is yours again.</p>
                  <p className="cl-q">What goes in it?</p>
                  <ul className="sr-only">
                    {FILL.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                {/* THE ANSWER GOES IN THE SLOT (Richard, July 2026): "It would be better if
                    the empty space with the dotted line has the comments rolling through
                    rather than in the bottom left, which seems too understated. Okay with the
                    empty space shape getting bigger." He is right, and it is better than the
                    original: the page asks what goes in the empty column, and now the answers
                    literally appear inside it. The sr-only list above still carries the full
                    set for screen readers; everything in this cell is presentation. */}
                <div className="mx-c today" data-lbl={COLS[0].short} aria-hidden="true">
                  <span className="ghost"><Fill /></span>
                </div>
                <div className="mx-lane" aria-hidden="true" />
                {/* THE GREEN COLUMN WAS EMPTY HERE and read as a rendering fault: a large
                    flat green rectangle with nothing in it. The fix is not to shrink it, it
                    is to say the thing this whole page has been building to. The owner's
                    column empties completely and the number does not move. That is the
                    value, stated where the eye already is. Both figures are real: thirteen
                    is the row count above, $199 is the price. */}
                <div className="mx-c us cl-us">
                  <span className="cl-all">All thirteen.</span>
                  <span className="cl-price">Still $199 USD a month.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
/* MAKING IT POP, IN LIGHT MODE (Jacob, live review, July 2026).
   The chart was white type on a white section with hairline rules: a spreadsheet, not
   a designed piece. Four moves, no dark mode needed:
     1. the section goes cream so a white card can exist on it at all
     2. the grid becomes that card: real border, real radius, real shadow
     3. the StayBookt column becomes an actual column, tinted, bordered and capped
     4. our checks become filled badges while the left side stays flat amber, so the eye
        is told which way the work is moving before a single word is read */
.mx{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);padding:clamp(80px,10vw,130px) 0;}
.mx .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.mx .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.mx-head{max-width:64ch;}
/* Smaller and wider than a tagline, because this is a sentence doing a headline's job.
   At the old clamp(28,4vw,50) and 20ch it wrapped into a wall six lines deep. */
.mx-head h2{margin-top:14px;font-size:clamp(23px,2.9vw,36px);font-weight:600;letter-spacing:-.03em;line-height:1.18;color:var(--v4-ink,#06080d);max-width:34ch;}
.mx-head h2 .g{background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}
.mx-head p{margin-top:20px;font-size:clamp(16px,1.75vw,18px);line-height:1.62;color:#69707d;max-width:58ch;}

.mx-scroll{margin-top:clamp(40px,5vw,58px);overflow-x:auto;-webkit-overflow-scrolling:touch;
  background:#fff;border:1px solid #e6e6e1;border-radius:24px;
  box-shadow:0 40px 80px -46px rgba(6,12,20,.35),0 2px 6px -2px rgba(6,12,20,.06);
  padding:clamp(16px,2.2vw,28px) clamp(14px,2vw,24px) clamp(8px,1.2vw,14px);}
.mx-grid{min-width:760px;}

/* job | today | the lane the work crosses | us */
.mx-r{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(140px,.66fr) minmax(78px,.36fr) minmax(140px,.66fr);
  align-items:center;width:100%;
  background:transparent;border:0;padding:0;font-family:inherit;color:inherit;text-align:left;}

/* header row */
.mx-hd{padding-bottom:14px;border-bottom:1px solid #dedeD6;}
.mx-hd .mx-c{display:flex;flex-direction:column;align-items:center;gap:3px;padding:0 6px;}
.mx-hd .mx-c b{font-size:12.5px;font-weight:700;letter-spacing:.04em;text-align:center;line-height:1.25;color:#69707d;}
.mx-hd .mx-c i{font-style:normal;font-size:11px;color:#69707d;}
.mx-hd .mx-c.today b{color:#6d28d9;}
.mx-hd .mx-c.today i{color:#6d28d9;}
.mx-hd .mx-c.us b{font-size:14px;color:#046c4e;}
.mx-hd .mx-c.us i{color:#046c4e;font-weight:700;font-size:12px;}

/* THE AXIS. Stated once, at full weight, across the whole list. */
.hd-lane{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;padding:0 8px;}
.hd-lane .ax-t{font-style:normal;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#046c4e;white-space:nowrap;}
.hd-lane .axis{position:relative;display:block;width:100%;height:2px;border-radius:2px;
  background:linear-gradient(90deg,rgba(124,58,237,.5),rgba(4,108,78,.95));}
.hd-lane .axis::after{content:'';position:absolute;right:0;top:50%;width:9px;height:9px;
  border-top:2px solid #046c4e;border-right:2px solid #046c4e;transform:translate(1px,-50%) rotate(45deg);}

/* body rows */
.mx-row{border-bottom:1px solid #ededea;}
.mx-row>button{cursor:pointer;padding:16px 0;transition:background .25s ease;}
.mx-row>button:hover{background:#fbfbfa;}
/* The press state lives here rather than only in globals.css because this component's
   :hover rule ships in a <style> in the body, which is later in document order and would
   otherwise win the tie on a touch press. Thirteen rows, and each one has to answer the
   thumb: the tap highlight that used to do that is off site-wide now. */
.mx-row>button:active{background:#f2f2ef;}
.mx-row>button:focus-visible{outline:2px solid #059669;outline-offset:-2px;border-radius:10px;}
.mx-j{display:flex;align-items:center;gap:12px;padding-right:16px;}
.mx-j .jt{font-size:15.5px;line-height:1.4;color:#26292f;}

/* THE AFFORDANCE: a control that looks like a control */
/* THE CUE IS TEXT, NOT A BUTTON. It shipped as a bordered pill because Linda missed the
   old 3.00:1 grey plus entirely, and loud was the right correction. But thirteen bordered
   pills down the page read as thirteen calls to action stacked on top of each other, and
   they ended up carrying more visual weight than the job names they point at. The list is
   the argument; the cue is a footnote to it.
   So: keep the words, which are what made it discoverable, and drop the chrome. Green text
   plus a chevron at 6.44:1 is still unmissable and stops competing with the content. The
   affordance now lives in the hover and open states rather than in a permanent border. */
.cue{display:inline-flex;align-items:center;gap:5px;flex:0 0 auto;margin-left:auto;
  border:1px solid transparent;border-radius:999px;padding:4px 8px 4px 9px;background:transparent;
  transition:background .25s ease,border-color .25s ease;}
.cue .cue-t{font-size:11.5px;font-weight:600;letter-spacing:.01em;color:#046c4e;white-space:nowrap;}
.cue .pl{width:15px;height:15px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;
  font-size:13px;line-height:1;color:#046c4e;transition:transform .4s cubic-bezier(.16,1,.3,1);}
.mx-row>button:hover .cue{background:rgba(16,185,129,.1);border-color:rgba(4,108,78,.45);}
.mx-row.open .cue{background:rgba(16,185,129,.12);border-color:rgba(4,108,78,.4);}
.mx-row.open .pl{transform:rotate(45deg);}

.mx-c{display:flex;align-items:center;justify-content:center;}

/* the quiet continuation of the header axis, one per row */
.mx-row .mx-lane{display:flex;align-items:center;justify-content:center;padding:0 10px;}
.mx-row .mx-lane::before{content:'';flex:1 1 auto;height:0;border-top:1px dashed rgba(4,108,78,.4);}
.mx-row .mx-lane::after{content:'';flex:0 0 auto;width:6px;height:6px;margin-left:-3px;
  border-top:1.5px solid rgba(4,108,78,.65);border-right:1.5px solid rgba(4,108,78,.65);transform:rotate(45deg);}

/* the column everything lands in */
/* Emma Beatty p10 #2/#4: checks now read on white (the light-green column tint is
   gone), and the "With StayBookt" header is a standalone green pill instead of a
   capped tinted column. */
.mx-row .mx-c.us{background:transparent;}
.mx-grid .mx-row:last-child .mx-c.us{border:0;border-radius:0;}
.mx-hd .mx-c.us{background:rgba(16,185,129,.12);
  border:1px solid rgba(4,108,78,.35);border-radius:999px;padding:9px 14px;}

.mk{display:block;}
.mk.yes{display:grid;place-items:center;width:19px;height:19px;color:#10b981;}
.mk.yes svg{width:100%;height:100%;}
.mx-c.us .mk.yes{width:26px;height:26px;border-radius:50%;background:#059669;color:#fff;padding:5px;
  box-shadow:0 6px 14px -4px rgba(5,150,105,.65);}
.mk.youtag{font-size:11px;font-weight:700;letter-spacing:.06em;color:#6d28d9;background:rgba(124,58,237,.12);
  border:1px solid rgba(124,58,237,.4);border-radius:999px;padding:4px 10px;white-space:nowrap;}

/* the detail, one tap away */
.mx-body{max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.16,1,.3,1);}
.mx-row.open .mx-body{max-height:420px;}
.mx-body ul{list-style:none;margin:0;padding:2px 0 22px;}
.mx-body li{position:relative;padding:7px 0 7px 18px;font-size:14.5px;line-height:1.55;color:#69707d;max-width:70ch;}
.mx-body li::before{content:'';position:absolute;left:0;top:15px;width:5px;height:5px;border-radius:50%;background:#10b981;}

/* THE CLOSING BEAT. Same four column track as every row above it, so it reads as one
   more row of the same chart rather than a new section bolted underneath. */
.mx-grid .mx-row:last-child .mx-c.us{border-bottom:0;border-radius:0;}
.mx-close{padding:clamp(28px,3.6vw,44px) 0 clamp(10px,1.4vw,18px);}
.mx-close .mx-r{align-items:stretch;}
.mx-close .mx-j{flex-direction:column;align-items:flex-start;gap:0;padding-right:26px;}
.cl-h{font-size:clamp(19px,2.3vw,25px);font-weight:600;letter-spacing:-.025em;line-height:1.25;color:#06080d;}
.cl-q{margin-top:3px;font-size:clamp(19px,2.3vw,25px);font-weight:600;letter-spacing:-.025em;line-height:1.25;color:#69707d;}
.cl-slot{display:block;text-align:center;font-size:clamp(16px,1.8vw,19px);font-weight:600;
letter-spacing:-.015em;line-height:1.4;color:#26292f;
opacity:0;transform:translateY(4px);transition:opacity .42s ease,transform .42s ease;}
.cl-slot.on{opacity:1;transform:none;}
/* The amber dot is gone. Amber means work you owe everywhere else on this page, and this
   line is the opposite of that, so it inverted the page's own colour logic. It was also a
   bullet on a one item list. The empty dashed slot in the today column already says whose
   column this is; the words say it better than a dot can. */
.mx-close .mx-c.us.cl-us{flex-direction:column;align-items:center;justify-content:center;gap:3px;text-align:center;}
.cl-all{font-size:clamp(17px,1.9vw,21px);font-weight:700;letter-spacing:-.02em;color:#046c4e;}
.cl-price{font-size:13.5px;font-weight:600;color:#046c4e;opacity:.82;}
.mx-close .mx-c.today{align-items:flex-start;padding-top:6px;}
.ghost{display:flex;align-items:center;justify-content:center;width:100%;max-width:340px;
  min-height:64px;padding:12px 18px;border-radius:16px;border:1.5px dashed rgba(124,58,237,.5);}
.mx-close .mx-c.us{background:transparent;}

/* MOBILE: THE CHART USED TO HIDE ITS OWN PUNCHLINE.
   .mx-grid was min-width:640px inside a ~322px content box, in an overflow-x:auto scroller,
   and StayBookt is the LAST column, so the one column the whole thing exists to show was the
   one you could not see. Below 760px there are no columns at all: the row becomes a card and
   the two answers stack, each naming itself from data-lbl.
   The header does NOT vanish on mobile any more. It used to, and the arrow went with it, so
   the transfer argument would have existed only on desktop. It collapses to a single strip
   instead: today, arrow, us. Same sentence, one line. */
/* EMMA'S MOBILE REDESIGN (p11). Her note: the stacked version "almost looks like a text chain",
   and the fix is "a stronger distinction between the two columns" stated clearly. Her mockup
   anchors the whole table on a persistent two-pill HEADER — a "today" pill and a "StayBookt"
   pill with the transfer arrow between — then every row aligns to it: the job on the left, an
   arrow, the green check on the right. The per-row "You" tag and the "Today / With StayBookt"
   label on every cell are gone; repeating them down thirteen rows is what made it a chain.
   Built to her structure, in our palette (violet not orange) with the real job names.
   DESKTOP IS UNTOUCHED — every rule here lives inside this media query. */
@media(max-width:760px){
  .mx-scroll{overflow-x:visible;padding:clamp(14px,3.5vw,20px) clamp(12px,3vw,16px);}
  .mx-grid{min-width:0;}

  /* the two columns, stated once: a violet pill, an arrow, a green pill */
  .mx-hd{display:flex;align-items:stretch;gap:8px;padding-bottom:16px;}
  .mx-hd .mx-j{display:none;}
  .mx-hd .mx-c{flex:1 1 0;justify-content:center;gap:1px;padding:9px 10px;border-radius:14px;}
  .mx-hd .mx-c b{font-size:11.5px;line-height:1.2;}
  .mx-hd .mx-c.today{background:rgba(124,58,237,.1);border:1px solid rgba(124,58,237,.35);}
  .mx-hd .mx-c.us{background:rgba(16,185,129,.12);border:1px solid rgba(4,108,78,.35);border-radius:14px;padding:9px 10px;}
  .mx-hd .hd-lane{flex:0 0 30px;padding:0;justify-content:center;}
  .mx-hd .hd-lane .ax-t{display:none;}

  /* every row mirrors the header: job + cue | arrow | check */
  .mx-row .mx-r{grid-template-columns:minmax(0,1fr) auto auto;align-items:center;column-gap:14px;}
  .mx-row .mx-j{flex-direction:column;align-items:flex-start;gap:8px;padding:2px 0;}
  .mx-row .mx-j .jt{font-size:16px;font-weight:600;letter-spacing:-.01em;}
  .mx-row .cue{margin-left:0;}
  .mx-row>button{padding:15px 0;}
  .mx-row .mx-c.today{display:none;}
  .mx-row .mx-c{padding:0;}
  .mx-row .mx-c::before{display:none;}
  .mx-row .mx-lane{padding:0;justify-content:flex-end;}
  .mx-row .mx-lane::before{content:'';display:block;flex:0 0 auto;width:20px;height:0;border-top:1.5px solid rgba(4,108,78,.55);}
  .mx-row .mx-lane::after{content:'';flex:0 0 auto;width:6px;height:6px;margin-left:-3px;
    border-top:1.5px solid rgba(4,108,78,.7);border-right:1.5px solid rgba(4,108,78,.7);transform:rotate(45deg);}
  .mx-row .mx-c.us{background:transparent;border:0;border-radius:0;justify-content:center;}
  .mx-grid .mx-row:last-child .mx-c.us{border:0;}

  .mx-body{padding-left:0;}

  /* CLOSING BEAT keeps the empty-column payoff — that column emptying IS the point. Job heading
     full width, then the ghost slot and the "$199" answer stacked beneath it. */
  .mx-close{padding:clamp(24px,6vw,34px) 0 4px;}
  .mx-close .mx-r{grid-template-columns:1fr;align-items:stretch;}
  .mx-close .mx-j{padding-right:0;}
  .mx-close .mx-lane{display:none;}
  .mx-close .mx-c.today{display:flex;align-items:center;justify-content:center;padding:12px 0 4px;}
  .mx-close .mx-c.today::before{display:none;}
  .mx-close .mx-c.us.cl-us{margin-top:10px;padding:14px 12px;border-radius:12px;background:rgba(16,185,129,.09);}
  .cl-slot{font-size:16px;}
}
/* reduced motion: Fill never starts its timer, so the slot holds entry one. It is
   pinned visible here so a paused rotation can never leave an empty line on the page. */
@media(prefers-reduced-motion:reduce){.mx-body,.cue,.cue .pl,.mx-row>button{transition:none;}
.cl-slot{opacity:1;transform:none;transition:none;}}
`;
