import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import HeroCta from '@/components/v4/HeroCta';
import SiteFooter from '@/components/SiteFooter';

const SHARE =
  'Enjoy Life does not mean stop working. It means the business stops needing you to be the one answering at nine at night. Here is what that is worth, and why we take none of it.';

export const metadata = {
  title: 'Enjoy Life',
  description: SHARE,
  alternates: { canonical: '/enjoy-life' },
  openGraph: {
    title: 'Enjoy Life · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/enjoy-life',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Enjoy Life · StayBookt', description: SHARE },
};

/* THIS ROUTE WAS A GHOST AND IS DELIBERATELY BACK (Jacob, July 2026).
 *
 * The old /enjoy-life sold the 20% value share: we agree what the business is worth, we
 * take twenty percent of the increase. Richard killed the share, so the page had nothing
 * holding it up and it was 308'd to /pricing with /economics and /long-term.
 *
 * Richard asked what the thinking was on not having it. The honest answer was that its
 * whole spine was the fee. So this is not that page restored. It is the argument rebuilt
 * around taking nothing, which is a harder and better argument.
 *
 * TERRITORY. The homepage film's third beat already has the sunset and the three doors.
 * That is the FEELING. This page is the ARGUMENT: why owner-dependence is the trap, what
 * actually compounds, and what it costs us to take no share of it. If this page ever
 * turns into a second emotional beat, it is dead weight and should go back to being a
 * redirect.
 *
 * THE RULE THAT KILLED THIS PAGE THE FIRST TIME: no valuation numbers. Not one. The
 * $420,000 counter and "a business worth more than ever" were both removed for being
 * claims we cannot back. State the mechanism, never the number. */

const DOORS: { t: string; d: string }[] = [
  { t: 'Keep it, and love it', d: 'Go back to the part of the work you actually enjoy, and let somebody else hold the phone. Most owners pick this one.' },
  { t: 'Hand it off', d: 'Pass over an operation that already works, instead of a job only you know how to do.' },
  { t: 'Sell it', d: 'A business that keeps booking when you are not there is one a buyer actually wants.' },
];

const CSS = `
.el{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);}
.el .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.el .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}

.el-hero{position:relative;overflow:hidden;background:#050506;padding:clamp(104px,13vh,144px) 0 clamp(70px,8vw,100px);}
.el-hero::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(58% 70% at 14% 0%,rgba(245,158,11,.14),transparent 62%),
             radial-gradient(52% 70% at 88% 12%,rgba(16,185,129,.12),transparent 62%);}
.el-hero .wrap{position:relative;z-index:1;}
.el-k{display:inline-flex;align-items:center;gap:9px;font-size:12.5px;font-weight:700;letter-spacing:.15em;
  text-transform:uppercase;color:#eef1f6;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);
  border-radius:999px;padding:9px 18px 9px 13px;}
.el-k::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--sb-grad);
  box-shadow:0 0 10px 1px rgba(16,185,129,.75);}
.el-hero h1{margin:20px 0 0;font-size:clamp(38px,5.6vw,76px);font-weight:600;letter-spacing:-.042em;
  line-height:1.0;color:#fff;max-width:15ch;}
.el-hero h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.el-hero p{margin:24px 0 0;font-size:clamp(17px,2vw,21px);line-height:1.6;color:#aeb6c4;max-width:52ch;}

.el-sec{padding:clamp(76px,9vw,120px) 0;border-top:1px solid #e6e6e1;}
.el-sec:first-of-type{border-top:0;}
.el-sec h2{margin-top:14px;font-size:clamp(28px,4.2vw,54px);font-weight:600;letter-spacing:-.035em;
  line-height:1.04;max-width:18ch;}
.el-sec p{margin-top:22px;font-size:clamp(16.5px,1.9vw,20px);line-height:1.65;color:#42474f;max-width:62ch;}
.el-sec p b{font-weight:600;color:var(--v4-ink);}
.el-kick{margin-top:clamp(34px,4vw,46px);padding-left:clamp(16px,2vw,22px);border-left:3px solid transparent;
  border-image:var(--sb-grad-ink) 1;font-size:clamp(20px,2.6vw,32px);font-weight:600;letter-spacing:-.025em;
  line-height:1.25;color:var(--v4-ink);max-width:24ch;}

/* the part nobody believes: dark, because it is the punch */
.el-none{background:#050506;padding:clamp(76px,9vw,120px) 0;}
.el-none .eyebrow{color:#8a8f98;}
.el-none h2{margin-top:14px;font-size:clamp(30px,4.6vw,60px);font-weight:600;letter-spacing:-.04em;color:#fff;max-width:14ch;}
.el-none h2 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.el-none p{margin-top:22px;font-size:clamp(16.5px,1.9vw,20px);line-height:1.65;color:#aeb6c4;max-width:60ch;}
.el-none p b{color:#fff;font-weight:600;}

.el-doors{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.4vw,26px);margin-top:clamp(34px,4vw,48px);}
@media(max-width:820px){.el-doors{grid-template-columns:1fr;}}
/* Reveal renders a wrapper div, so the GRID ITEM is the .reveal, not the .el-door.
   Without these two rules the cards size to their own copy and the row looks ragged.
   Same fix as .xcard{height:100%} on the homepage. */
.el-doors > .reveal{display:flex;}
.el-door{flex:1;background:#fff;border:1px solid #e6e6e1;border-radius:20px;padding:clamp(22px,2.6vw,30px);
  box-shadow:0 30px 60px -44px rgba(6,12,20,.3);}
.el-door .n{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#b45309;}
.el-door .t{margin-top:12px;font-size:clamp(18px,2vw,23px);font-weight:600;letter-spacing:-.025em;color:var(--v4-ink);}
.el-door .d{margin-top:10px;font-size:15.5px;line-height:1.6;color:#6b7280;}
.el-note{margin-top:clamp(30px,3.6vw,42px);font-size:clamp(18px,2.2vw,26px);font-weight:600;
  letter-spacing:-.02em;line-height:1.3;color:var(--v4-ink);max-width:30ch;}
.el-note span{display:block;margin-top:10px;font-size:16px;font-weight:400;color:#6b7280;letter-spacing:0;line-height:1.6;}
`;

export default function EnjoyLifePage() {
  return (
    <main className="el v4" id="top">
      <style>{CSS}</style>
      <Nav />

      <header className="el-hero">
        <div className="wrap">
          <Reveal as="div"><div className="el-k">Enjoy Life</div></Reveal>
          <Reveal>
            <h1>
              It does not mean <span className="g">stop working.</span>
            </h1>
          </Reveal>
          <Reveal>
            <p>
              It means the business stops needing you to be the one answering at nine at night.
              What you do with that is the whole point, and it is nobody&rsquo;s call but yours.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="el-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The trap</Reveal>
          <Reveal><h2>There is no time, and there is nothing to sell. Same reason.</h2></Reveal>
          <Reveal>
            <p>
              Every call comes to you. Every quote waits on you. Every follow-up is a thing you meant
              to get to. That is why the day never ends.
            </p>
          </Reveal>
          <Reveal>
            <p>
              It is also why there is not much to hand anyone, if you ever wanted to. A buyer is not
              looking at your van and your customer list. They are looking at whether any of it works
              when you are not standing there. The more the answer is you, the less there is to buy.
            </p>
          </Reveal>
          <Reveal><div className="el-kick">You do not own the business. You are the business.</div></Reveal>
        </div>
      </section>

      <section className="el-sec">
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
              When every finished job gets the review asked for, every happy customer gets the
              referral asked for, and the maintenance visit gets booked before they drift somewhere
              else, the work starts arriving instead of being hunted. That is the difference between a
              year that starts from zero every January and a year that starts with a list.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="el-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">Why it is worth more</Reveal>
          <Reveal><h2>A buyer is not buying your van.</h2></Reveal>
          <Reveal>
            <p>
              They are buying whether it keeps working when you are not there. That is not our
              opinion, it is just how these businesses get valued: the more the whole thing leans on
              the owner, the harder it is to hand over and the less anyone will pay for it. A front
              office that answers, books and follows up whether you are on a roof or on a beach is
              what turns a job into something you own.
            </p>
          </Reveal>
          <Reveal>
            {/* The rule that killed this page the first time. Do not put a number here. */}
            <p>
              <b>We are not going to tell you what your business is worth.</b> We do not know, and
              anybody who puts a number on that on a website has made it up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="el-none">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The part nobody believes</Reveal>
          <Reveal><h2>And we take <span className="g">none of it.</span></h2></Reveal>
          <Reveal>
            <p>
              No commission on your jobs. No share of your revenue. No share of what the business
              sells for, if it ever sells. <b>$199 a month is the entire commercial relationship</b>,
              and it stays $199 whether the business doubles, triples, or you hand it to your daughter
              on a Tuesday.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Everyone else circling this industry wants a piece of the upside, because the upside is
              where the real money is. We would rather be easy to leave. It costs us the bigger
              cheque, and it is the only version of this we could look at you and describe.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="el-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">So what is it</Reveal>
          <Reveal><h2>Three doors. You pick.</h2></Reveal>
          <div className="el-doors">
            {DOORS.map((d, i) => (
              <Reveal key={d.t}>
                <div className="el-door">
                  <div className="n">{`0${i + 1}`}</div>
                  <div className="t">{d.t}</div>
                  <div className="d">{d.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="el-note">
              You never have to use the last door.
              <span>
                You just get to have it. Most owners do not want out. They want the good half of the
                job back, and the half that eats their evenings gone.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      <HeroCta />
      <SiteFooter />
    </main>
  );
}
