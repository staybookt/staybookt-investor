import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import HeroCta from '@/components/v4/HeroCta';
import SiteFooter from '@/components/SiteFooter';

const SHARE =
  'Six things make an owner-operated business worth more than the jobs it does this month. Here they are, and here is which ones we do for you.';

export const metadata = {
  title: 'Long-term value',
  description: SHARE,
  alternates: { canonical: '/long-term' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Long-term value · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/long-term',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'Long-term value · StayBookt', description: SHARE },
};

/* THIS PAGE REPLACED /enjoy-life (Richard, review round 2, July 2026).
 *
 * The /enjoy-life version was the same argument wearing the wrong title. Richard:
 * "This feels like the weakest part of the site. Enjoy Life has a different connotation
 * than I think the page is doing so it feels clunky. The 4 points lack flow." And:
 * "We have done a great job messaging Enjoy Life embedded in the other pages... I would
 * focus on long-term value as a stand alone. By just focusing on this, the page will get
 * crisper."
 *
 * He was right about the diagnosis. The page was titled after a feeling and argued
 * economics, so the reader had to hold two ideas at once and neither landed. Enjoy Life is
 * the payoff and it lands everywhere else. This page does one job: what makes the thing
 * worth something later, and which parts of that we actually do.
 *
 * He also asked for the chart, and the chart is the point of the page: "I like a chart that
 * highlights the things that create long-term value and that StayBookt checks the box."
 *
 * KEPT from the old page (he said "I like some of the messaging"): the second-job engine,
 * "a buyer is not buying your van", "we take none of it", and the refusal to put a number
 * on anything. CUT: the three doors, and the Enjoy Life framing throughout.
 *
 * THE RULE THAT KILLED THE FIRST VERSION OF THIS PAGE, STILL IN FORCE: no valuation
 * numbers. Not one. Not a multiple, not a range, not "typically". State the mechanism,
 * never the number. The $420,000 counter and the valuation FAQ were both removed for this.
 */

/* Richard's chart. Rows are the things that actually make one of these worth more than the
   jobs it did this month. NOTHING here is a result: every "with StayBookt" cell is a
   mechanism we perform, not an outcome we measured. If a row ever needs a number to make
   its point, the row is wrong. */
const DRIVERS: { d: string; you: string; sb: string }[] = [
  {
    d: 'It runs when you are not there',
    you: 'Every call lands on your mobile. If you are up a ladder, it rings out.',
    sb: 'Answered, booked and followed up whether you are on a roof or on a beach.',
  },
  {
    d: 'Customers come back',
    you: 'You mean to call them. You are on a job. You do not.',
    sb: 'Past customers brought back for the work they are due, before they drift.',
  },
  {
    d: 'The customer list is complete, and it is yours',
    you: 'Your head, your phone, a notebook, and whatever the last guy left you.',
    sb: 'Every customer, job and conversation in one record. Exported whenever you ask.',
  },
  {
    d: 'Work arrives without you hunting it',
    you: 'Word of mouth, and whoever happens to call.',
    sb: 'Found on search, on the map, and when somebody asks an AI for your trade.',
  },
  {
    d: 'The reputation compounds',
    you: 'Four reviews. The newest one is from 2023.',
    sb: 'A review asked for after every finished job, and every one answered.',
  },
  {
    d: 'Somebody else could pick it up',
    you: 'Only you know the prices, the rules, and which customers to watch.',
    sb: 'Written down. That is what the playbook is, and it is yours.',
  },
];

const CSS = `
.lt{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);}
.lt .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.lt .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.lt h1,.lt h2{font-weight:600;letter-spacing:-.035em;}

.lt-hero{position:relative;overflow:hidden;background:#050506;padding:clamp(104px,13vh,144px) 0 clamp(70px,8vw,100px);}
.lt-hero::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(58% 70% at 14% 0%,rgba(79,70,229,.16),transparent 62%),
             radial-gradient(52% 70% at 88% 12%,rgba(16,185,129,.10),transparent 62%);}
.lt-hero .wrap{position:relative;z-index:1;}
.lt-k{display:inline-flex;align-items:center;gap:9px;font-size:12.5px;font-weight:700;letter-spacing:.15em;
  text-transform:uppercase;color:#eef1f6;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);
  border-radius:999px;padding:9px 18px 9px 13px;}
.lt-k::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--sb-grad);
  box-shadow:0 0 10px 1px rgba(16,185,129,.75);}
.lt-hero h1{margin:20px 0 0;font-size:clamp(38px,5.6vw,72px);line-height:1.0;color:#fff;max-width:16ch;}
.lt-hero h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.lt-hero p{margin:24px 0 0;font-size:clamp(17px,2vw,21px);line-height:1.6;color:#aeb6c4;max-width:56ch;}

.lt-sec{padding:clamp(76px,9vw,116px) 0;border-top:1px solid #e6e6e1;}
.lt-sec:first-of-type{border-top:0;}
.lt-sec h2{margin-top:14px;font-size:clamp(28px,4.2vw,52px);line-height:1.04;max-width:19ch;}
.lt-sec p{margin-top:22px;font-size:clamp(16.5px,1.9vw,20px);line-height:1.65;color:#42474f;max-width:62ch;}
.lt-sec p b{font-weight:600;color:var(--v4-ink);}
.lt-kick{margin-top:clamp(34px,4vw,46px);padding-left:clamp(16px,2vw,22px);border-left:3px solid transparent;
  border-image:var(--sb-grad-ink) 1;font-size:clamp(20px,2.6vw,32px);font-weight:600;letter-spacing:-.025em;
  line-height:1.25;color:var(--v4-ink);max-width:24ch;}

/* THE CHART (Richard's ask). Deliberately NOT a competitor chart: no answering service, no
   agency, no crosses to get wrong. Six rows have carried false crosses on the other chart
   already. This one only claims things about us. */
.lt-tbl{margin-top:clamp(36px,4.4vw,52px);border:1px solid #e6e6e1;border-radius:20px;overflow:hidden;background:#fff;
  box-shadow:0 40px 80px -56px rgba(6,12,20,.34);}
.lt-hd,.lt-row{display:grid;grid-template-columns:1.15fr 1fr 1.25fr;gap:clamp(12px,2vw,26px);
  padding:clamp(16px,2vw,22px) clamp(16px,2.4vw,28px);align-items:start;}
.lt-hd{background:#f2f2ee;border-bottom:1px solid #e6e6e1;}
.lt-hd div{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8a8f98;}
.lt-hd .sb{color:#059669;}
.lt-row{border-top:1px solid #eeeeea;}
.lt-row:first-of-type{border-top:0;}
.lt-d{font-size:clamp(15.5px,1.7vw,18px);font-weight:600;letter-spacing:-.02em;color:var(--v4-ink);line-height:1.35;}
.lt-you{font-size:14.5px;line-height:1.55;color:#9aa1ab;}
.lt-sb{display:flex;gap:10px;font-size:14.5px;line-height:1.55;color:#42474f;}
.lt-sb svg{width:17px;height:17px;flex:0 0 auto;margin-top:2px;color:#059669;}
@media(max-width:820px){
  .lt-hd{display:none;}
  .lt-row{grid-template-columns:1fr;gap:8px;padding:20px clamp(16px,4vw,22px);}
  .lt-you::before{content:'You, today: ';font-weight:600;color:#6b7280;}
  .lt-sb::before{content:'';}
}
.lt-fine{margin-top:22px;font-size:14px;line-height:1.6;color:#8a8f98;max-width:70ch;}

.lt-none{background:#050506;padding:clamp(76px,9vw,116px) 0;}
.lt-none .eyebrow{color:#8a8f98;}
.lt-none h2{margin-top:14px;font-size:clamp(30px,4.6vw,58px);color:#fff;max-width:14ch;}
.lt-none h2 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.lt-none p{margin-top:22px;font-size:clamp(16.5px,1.9vw,20px);line-height:1.65;color:#aeb6c4;max-width:60ch;}
.lt-none p b{color:#fff;font-weight:600;}
`;

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
  </svg>
);

export default function LongTermPage() {
  return (
    <main className="lt v4" id="top">
      <style>{CSS}</style>
      <Nav />

      <header className="lt-hero">
        <div className="wrap">
          <Reveal as="div"><div className="lt-k">Long-term value</div></Reveal>
          <Reveal>
            <h1>One day, this has to be <span className="g">worth something.</span></h1>
          </Reveal>
          <Reveal>
            <p>
              Not today. But every year you spend as the only person who can answer the phone is a
              year spent building a job instead of a business. Here is the difference, and the part
              of it we actually do.
            </p>
          </Reveal>
        </div>
      </header>

      {/* THE ONE FACT. This section used to be called "The trap" and opened on
          "There is no time, and there is nothing to sell. Same reason." Richard:
          "confusing without context below which I don't like." He was right: it was a riddle,
          and the answer arrived two paragraphs later. His own rewrite carried the logic
          properly, so the section leads with the fact now and the riddle is gone. */}
      <section className="lt-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The one fact</Reveal>
          <Reveal><h2>If it cannot run without you, there is nothing to hand anyone.</h2></Reveal>
          <Reveal>
            <p>
              Every call comes to you. Every quote waits on you. On a Tuesday that is just the job.
              It only becomes the problem on the day you want to step back, hand it to your
              daughter, or sell it.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Because a buyer is not buying your van and your customer list. <b>They are buying
              whether any of it works when you are not standing there.</b> The more the answer to
              every question is you, the harder it is to hand over, and the less anyone will pay for
              it. That is not our opinion. Ask anyone who buys these businesses for a living.
            </p>
          </Reveal>
          <Reveal><div className="lt-kick">You do not own the business. You are the business.</div></Reveal>
        </div>
      </section>

      {/* RICHARD'S CHART. "I like a chart that highlights the things that create long-term
          value and that StayBookt checks the box." */}
      <section className="lt-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">What actually counts</Reveal>
          <Reveal><h2>Six things make one of these worth more than the jobs it did this month.</h2></Reveal>
          <Reveal>
            <p>
              None of them are the van, the tools, or how hard you work. They are all the same
              question asked six ways: does this thing work without you in the middle of it?
            </p>
          </Reveal>

          <div className="lt-tbl">
            <div className="lt-hd">
              <div>What counts</div>
              <div>You, today</div>
              <div className="sb">With StayBookt</div>
            </div>
            {DRIVERS.map((r) => (
              <Reveal key={r.d}>
                <div className="lt-row">
                  <div className="lt-d">{r.d}</div>
                  <div className="lt-you">{r.you}</div>
                  <div className="lt-sb"><Tick />{r.sb}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Says what the chart is NOT. Every right-hand cell is a mechanism we perform, not
              a result we measured, and the page has to say so out loud or the chart reads as
              a claim about outcomes. */}
          <Reveal>
            <p className="lt-fine">
              Every line in that last column is something we do, not something we promise it earns
              you. We have not measured what any of it is worth, and we are not going to guess on a
              website.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE ENGINE. Kept from the /enjoy-life version — Richard said he liked the messaging,
          and it is the mechanism that makes rows 2 and 5 of the chart actually happen. */}
      <section className="lt-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">What compounds</Reveal>
          <Reveal><h2>The cheapest job you will ever win is the second one.</h2></Reveal>
          <Reveal>
            <p>
              Somebody who already likes you does not need to be found, or sold, or convinced. They
              need to be <b>asked</b>. And asking is the first thing that falls off the list when you
              are the one doing everything.
            </p>
          </Reveal>
          <Reveal>
            <p>
              A business that starts every January from zero is worth what it can bill this year. A
              business with a list that comes back is worth something else entirely, and the
              difference between the two is whether anybody asked.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="lt-none">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The part nobody believes</Reveal>
          <Reveal><h2>And we take <span className="g">none of it.</span></h2></Reveal>
          <Reveal>
            <p>
              No commission on your jobs. No share of your revenue. No share of what the business
              sells for, if it ever sells. <b>$199 a month is the entire commercial relationship</b>,
              and it stays $199 whether the business doubles, triples, or you hand it to your
              daughter on a Tuesday.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Everyone else circling this industry wants a piece of the upside, because the upside is
              where the real money is. We would rather be easy to leave.
            </p>
          </Reveal>
          {/* THE RULE. Do not put a number here, ever. */}
          <Reveal>
            <p>
              <b>And we are not going to tell you what your business is worth.</b> We do not know,
              and anybody who puts a number on that on a website has made it up.
            </p>
          </Reveal>
        </div>
      </section>

      <HeroCta />
      <SiteFooter />
    </main>
  );
}
