import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import Coming from '@/components/v4/Coming';
import Matrix from '@/components/v4/Matrix';

/* Hero backdrop. This page was the only one still sitting on a flat black gradient
 * while every other hero had something behind it (Jacob, July 14 2026). Same
 * treatment as /how-it-works: a still, not a film, with a slow drift so it breathes
 * without costing a second mp4.
 *
 * The image is one owner, alone, working in a real workshop with the windows blown
 * out behind him. Not glossy, not staged, nobody smiling at a laptop. That is the
 * register of this page: no asterisks, no fine print. */
const HERO_IMG =
  'https://images.pexels.com/photos/7484157/pexels-photo-7484157.jpeg?auto=compress&cs=tinysrgb&w=2000';
import { START_LINK } from '@/lib/site';

const SHARE =
  'The whole list, in plain English. Everything $199 a month actually buys, what you still do, and the things we do not do.';

export const metadata = {
  title: "What's included",
  description: SHARE,
  alternates: { canonical: '/whats-included' },
  openGraph: {
    title: "What's included · StayBookt",
    description: SHARE,
    url: 'https://www.staybookt.com/whats-included',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: "What's included · StayBookt", description: SHARE },
};

const HUMAN = [
  {
    h: 'The AI does the everyday.',
    p: 'The routine calls, texts, bookings, confirmations, reminders, and follow-ups. It is trained on your prices, your service area, the jobs you take, and how you talk to a customer. It is fast, it never sleeps, and it never gets tired at 11pm.',
  },
  {
    h: 'A person steps in on anything unusual.',
    p: 'The AI knows when it is out of its depth. Anything it is not sure about, anything unusual, and anything high-stakes gets pulled by a real person on our team before it ever reaches your customer. That is the whole point of the safety net. You are never the one picking up the slack.',
  },
  {
    h: 'And a couple of times a week, we ask you.',
    p: 'When something genuinely needs your judgment, it comes to you as a short question with the context attached. Not a support ticket. Not a queue. Usually one or two a week.',
  },
];

const YOURS = [
  'The work itself. You show up, you do the job, you get paid directly',
  'The big calls: your prices, new services, who you hire, where you work',
  'A couple of edge cases a week where we ask what you would do',
  'Thirty seconds on the morning brief',
];

const NOT = [
  {
    h: 'We do not do your books.',
    p: 'We chase what is owed and show you what came in. We are not your bookkeeper and we do not file your taxes.',
  },
  {
    h: 'We do not take your money.',
    p: 'Your customers pay you, directly, the way they always have. We never sit between you and your money.',
  },
  {
    h: 'We do not dispatch your crew.',
    p: 'We book the work and hand you a clean calendar. Who goes where, and in what truck, is still your call.',
  },
  {
    h: 'We do not spend your money on ads.',
    p: 'The plan is organic: your site, your Google presence, your reviews, your existing customers. If paid advertising ever makes sense, that is a separate conversation, and we will tell you honestly if we do not think you need it.',
  },
  {
    h: 'We do not promise you a number of leads.',
    p: 'Anyone who does is guessing. We promise that nothing that comes in gets dropped, and we show you the real numbers every month.',
  },
  {
    h: 'We do not pretend we will never get one wrong.',
    p: 'We answer in your voice, from your prices, and a person checks anything unusual before it reaches your customer. But if a wrong number ever does get out, we bring it straight to you, you decide what you want to honour, and we are the ones who go back to the customer and sort it out. You will hear it from us before you hear it from them, and you are never the one making that phone call.',
  },
  {
    h: 'We do not lock you in.',
    p: 'No term, no contract to be trapped in, no exit fee. Cancel any time on thirty days notice. We build the whole thing before you have paid us a dollar, which means the risk is ours, and it should be.',
  },
];

const KEEP = [
  'The website. Yours, permanently',
  'Your domain, in your name',
  'Your Google Business Profile login',
  'Your customer list, exported whenever you want it',
  'Your reviews, which were always yours anyway',
];

const CSS = `
/* THE WORDMARK BUG.
 * This page's <main> is className="inc" and every other page is "... v4". The
 * --v4-* colour variables are declared on .v4, and <Nav> renders INSIDE <main>,
 * so on this page alone the nav had no variables: the gradient on "Bookt" fell
 * back to nothing, background-clip:text left it transparent, and the wordmark
 * rendered as "Stay        ." with a hole in it. Nobody caught it because nothing
 * linked here from the nav until today.
 * Hand the nav the four variables it needs rather than bolting .v4 onto this page
 * wholesale, which would drag in every .v4 rule and restyle the page. */
.inc,.v4-nav{--v4-ink:#06080d;--v4-paper:#fff;--v4-cream:#f6f6f3;--v4-line:#e9e9e6;--v4-muted:#7a828f;--v4-green:#10b981;--v4-green-d:#047857;--v4-violet:#7c3aed;--v4-cyan:#06b6d4;--v4-indigo:#4f46e5;}
.inc{background:#fff;color:var(--v4-ink);}
.inc .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.inc .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.inc h1,.inc h2,.inc h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.inc-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 30px;text-decoration:none;transition:transform .3s ease;}
.inc-btn:hover{transform:translateY(-1px);}

/* hero */
.inc-hero{position:relative;background:#050506;text-align:center;padding:clamp(140px,18vh,210px) 0 clamp(70px,9vw,110px);overflow:hidden;}
.inc-hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 46%;transform:scale(1.08);animation:idrift 28s ease-in-out infinite alternate;}
@keyframes idrift{from{transform:scale(1.08) translate3d(0,0,0);}to{transform:scale(1.15) translate3d(1.4%,-1%,0);}}
@media(prefers-reduced-motion:reduce){.inc-hero>img{animation:none;}}
/* graded hard, because the windows in this shot are blown out and the copy has to
   sit on top of them. Dark at the top for the nav, dark at the bottom for the seam. */
.inc-hero .hov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,6,.9) 0%,rgba(5,5,6,.7) 34%,rgba(5,5,6,.74) 70%,rgba(5,5,6,.97) 100%);}
.inc-hero .hov::after{content:'';position:absolute;inset:0;background:radial-gradient(62% 52% at 50% 2%,rgba(16,185,129,.16),transparent 62%);}
.inc-hero .wrap{position:relative;z-index:1;}
.inc-hero .eyebrow{color:#c9cdd6;}
.inc-hero h1{margin-top:18px;font-size:clamp(42px,6.6vw,86px);line-height:1.0;max-width:14ch;margin-left:auto;margin-right:auto;color:#fff;text-shadow:0 4px 44px rgba(0,0,0,.6);}
.inc-hero p{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.45;color:#c6cbd3;max-width:46ch;text-shadow:0 2px 26px rgba(0,0,0,.7);}

/* groups */

/* human */
.inc-human{background:var(--v4-cream);padding:clamp(80px,11vw,140px) 0;}
.inc-human .hd{text-align:center;max-width:620px;margin:0 auto clamp(38px,5vw,58px);}
.inc-human .hd h2{margin-top:14px;font-size:clamp(30px,4.2vw,52px);line-height:1.05;}
.inc-human .hd p{margin-top:16px;font-size:17px;line-height:1.6;color:#6b7280;}
.inc-human .row{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.inc-human .c{background:#fff;border:1px solid #e9e9e5;border-radius:22px;padding:clamp(24px,3vw,32px);box-shadow:0 26px 54px -42px rgba(6,12,20,.4);}
.inc-human .c h3{font-size:19px;line-height:1.25;}
.inc-human .c p{margin-top:12px;font-size:15px;line-height:1.6;color:#6b7280;}
@media(max-width:860px){.inc-human .row{grid-template-columns:1fr;}}

/* you / not */
.inc-split{padding:clamp(80px,11vw,140px) 0;}
.inc-split .two{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,6vw,80px);}
.inc-split h2{font-size:clamp(26px,3.2vw,40px);line-height:1.06;}
.inc-split .sub{margin-top:14px;font-size:16px;line-height:1.6;color:#6b7280;max-width:36ch;}
.inc-split ul{list-style:none;margin:26px 0 0;padding:0;}
.inc-split li{display:grid;grid-template-columns:20px 1fr;gap:12px;padding:13px 0;border-top:1px solid #f2f2f5;font-size:16px;line-height:1.55;color:#33373e;}
.inc-split li svg{margin-top:5px;}
@media(max-width:860px){.inc-split .two{grid-template-columns:1fr;gap:48px;}}

/* not-a-list (honest limits) */
.inc-not{background:#050506;color:#f5f5f7;padding:clamp(80px,11vw,140px) 0;}
.inc-not h2{color:#f5f5f7;font-size:clamp(30px,4.2vw,52px);line-height:1.05;max-width:16ch;}
.inc-not .eyebrow{color:#86868b;}
.inc-not .sub{margin-top:18px;font-size:17px;line-height:1.6;color:#aeb4c0;max-width:46ch;}
.inc-not .grid{margin-top:clamp(38px,5vw,56px);display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.09);border-radius:22px;overflow:hidden;}
.inc-not .cell{background:#050506;padding:clamp(24px,3vw,32px);}
.inc-not .cell h3{color:#f5f5f7;font-size:18px;line-height:1.3;}
.inc-not .cell p{margin-top:11px;font-size:15px;line-height:1.6;color:#9aa0ab;}
@media(max-width:760px){.inc-not .grid{grid-template-columns:1fr;}}

/* closer */
.inc-close{text-align:center;padding:clamp(100px,14vw,180px) 0;background:#fff;}
.inc-close h2{font-size:clamp(34px,5.4vw,72px);line-height:1.0;max-width:17ch;margin:0 auto;}
.inc-close p{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#52565e;max-width:44ch;}
.inc-close .cta{margin-top:34px;}
.inc-close .fine{margin-top:22px;font-size:15px;color:#8a8f98;}
.inc-close .fine a{color:#0284c7;text-decoration:none;font-weight:600;}
`;

function Tick() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
    </svg>
  );
}

function Dot() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9298a1" strokeWidth={2.4} aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

export default function WhatsIncludedPage() {
  return (
    <main className="inc">
      <style>{CSS}</style>
      <Nav />

      <header className="inc-hero">
        <img src={HERO_IMG} alt="" fetchPriority="high" decoding="async" />
        <div className="hov" />
        <div className="wrap">
          <div className="eyebrow">What&apos;s included</div>
          <h1>Everything, in plain English.</h1>
          <p>
            The whole list. No asterisks, no fine print. Here is exactly what we do, what you still
            do, and the things we do not do.
          </p>
        </div>
      </header>

      {/* THE MATRIX replaced nine blocks of ticked bullets, about fifty lines, that
          read as a laundry list. This page is the tech-specs page, not the product
          film: by the time someone clicks here they are auditing, not discovering.
          The fix was not fewer facts, it was something to compare them against. The
          full detail is still here, it just lives inside the rows. */}
      <Matrix />

      {/* THE PLATFORM. It sits with the things we DO, because as of July 14 2026 it
          is one of them. It used to be a fenced roadmap block after "what we do not
          do", chipped "not shipping today". Jacob confirmed the features are done. */}
      <Coming />

      <section className="inc-human">
        <div className="wrap">
          <div className="hd">
            <div className="eyebrow">The honest bit</div>
            <h2>Is it AI, or a real person?</h2>
            <p>
              Both, on purpose. Anyone telling you it is all human is lying about the price. Anyone
              telling you it is all AI is lying about the quality.
            </p>
          </div>
          <div className="row">
            {HUMAN.map((h) => (
              <div className="c" key={h.h}>
                <h3>{h.h}</h3>
                <p>{h.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inc-split">
        <div className="wrap">
          <div className="two">
            <div>
              <div className="eyebrow">Still yours</div>
              <h2 style={{ marginTop: 14 }}>What you still do.</h2>
              <p className="sub">
                Short list, on purpose. If it grows, we have built the wrong thing.
              </p>
              <ul>
                {YOURS.map((y) => (
                  <li key={y}>
                    <Dot />
                    <span>{y}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">Yours to keep</div>
              <h2 style={{ marginTop: 14 }}>What you own, forever.</h2>
              <p className="sub">
                If we ever part ways, you walk out with everything that matters. Nothing here is
                held hostage.
              </p>
              <ul>
                {KEEP.map((k) => (
                  <li key={k}>
                    <Tick />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="inc-not">
        <div className="wrap">
          <div className="eyebrow">Just as important</div>
          <h2 style={{ marginTop: 14 }}>What we do not do.</h2>
          <p className="sub">
            Every company shows you the list of what they include. Almost nobody shows you the other
            list. Here it is, so nothing is a surprise on month two.
          </p>
          <div className="grid">
            {NOT.map((n) => (
              <div className="cell" key={n.h}>
                <h3>{n.h}</h3>
                <p>{n.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inc-close">
        <div className="wrap">
          <h2>That is the whole list.</h2>
          <p>
            If something on it is not what you need, tell us on the call and we will say so. We
            would rather lose the sale than sell you the wrong thing.
          </p>
          <div className="cta">
            <a className="inc-btn" href={START_LINK}>
              Pick a time
            </a>
          </div>
          <p className="fine">
            Want the story instead of the list? <a href="/how-it-works">See how it works</a>
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
