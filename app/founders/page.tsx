import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { OrgChart } from '@/components/v4/AboutScenes';
import { ThreeTuesdays, Statement } from '@/components/v4/ThreeTuesdays';
/* TheDay (the 800vh pinned clock) used to sit above ThreeTuesdays. It walked
 * through the exact same leaking Tuesday that ThreeTuesdays then replays as its
 * first tab. Two movies, one story, and the actual "about us" buried under both.
 * One mechanic now. */
import { START_LINK } from '@/lib/site';

const SHARE =
  'The difference between an owner-operator’s Tuesday and a big company’s Tuesday was never talent. It was five salaries. StayBookt is the bridge.';

export const metadata = {
  title: 'About us',
  description: SHARE,
  alternates: { canonical: '/founders' },
  openGraph: {
    title: 'About us · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/founders',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'About us · StayBookt', description: SHARE },
};

const BELIEFS = [
  {
    h: 'We are operators, not a software company.',
    p: 'We do not hand you a dashboard and wish you luck. If you ever feel like you are operating software, we have built the wrong thing.',
  },
  {
    h: 'The owner stays in charge.',
    p: 'We take the busywork, not the business. Your prices, your standards, your name, your customers.',
  },
  {
    h: 'We would rather lose the sale.',
    p: 'If the honest answer is that you do not need us, we will say so on the call.',
  },
  {
    h: 'We only get properly paid if you get free.',
    p: 'The real money comes from the value we create in your business, and only when you cash it in. If the number does not move, we do not get paid.',
  },
];

const CSS = `
.abt{background:#fff;color:var(--v4-ink);}
.abt .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.abt .narrow{max-width:800px;margin:0 auto;}
.abt .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.abt h1,.abt h2,.abt h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.abt-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 30px;text-decoration:none;transition:transform .3s ease;}
.abt-btn:hover{transform:translateY(-1px);}

/* hero */
.abt-hero{position:relative;background:#050506;text-align:center;padding:clamp(140px,18vh,210px) 0 clamp(70px,9vw,110px);overflow:hidden;}
.abt-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(62% 52% at 50% 0%,rgba(14,165,233,.15),transparent 62%);pointer-events:none;}
.abt-hero .wrap{position:relative;}
.abt-hero .eyebrow{color:#c9cdd6;}
.abt-hero h1{margin-top:18px;font-size:clamp(40px,6.2vw,84px);line-height:1.01;max-width:17ch;margin-left:auto;margin-right:auto;color:#f5f5f7;}
.abt-hero p{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.5;color:#aeb4c0;max-width:52ch;}

/* the diagnosis — the only prose on the page. Give it air. */
.abt-prob{padding:clamp(90px,12vw,160px) 0;background:#fff;}
.abt-prob h2{font-size:clamp(32px,5vw,66px);line-height:1.02;max-width:15ch;}
.abt-prob .p{margin-top:28px;font-size:clamp(18px,2.05vw,23px);line-height:1.6;color:#42474f;max-width:60ch;}
.abt-prob .p b{font-weight:600;color:var(--v4-ink);}
.abt-prob .pull{margin-top:clamp(40px,5vw,58px);padding-left:clamp(20px,3vw,30px);border-left:3px solid #10b981;font-size:clamp(24px,3.2vw,40px);font-weight:600;letter-spacing:-.025em;line-height:1.16;color:var(--v4-ink);max-width:22ch;}

/* ===== THE ORG CHART ===== */
.abt-five{background:var(--v4-cream);padding:clamp(80px,11vw,140px) 0;}
.abt-five .hd{max-width:640px;}
.abt-five .hd h2{margin-top:14px;font-size:clamp(28px,4vw,52px);line-height:1.05;}
.abt-five .hd p{margin-top:16px;font-size:17px;line-height:1.6;color:#6b7280;}
.orgc{margin-top:clamp(34px,5vw,52px);}
.orgc-toggle{display:inline-flex;background:#fff;border:1px solid #e2e2df;border-radius:999px;padding:4px;gap:4px;}
.orgc-toggle button{font-family:inherit;font-size:14px;font-weight:600;border:0;border-radius:999px;padding:10px 18px;background:transparent;color:#6b7280;cursor:pointer;transition:background .25s,color .25s;}
.orgc-toggle button.on{background:var(--v4-ink);color:#fff;}
.orgc-stage{margin-top:22px;background:#fff;border:1px solid #e9e9e5;border-radius:26px;padding:clamp(22px,3vw,34px);box-shadow:0 34px 68px -48px rgba(6,12,20,.5);}
.orgc-head{text-align:center;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9298a1;padding-bottom:18px;border-bottom:1px solid #f1f1f4;}
.orgc-seats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:22px;}
@media(max-width:900px){.orgc-seats{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:460px){.orgc-seats{grid-template-columns:1fr;}}
.seat{border:1px solid #ececf0;border-radius:16px;padding:16px 12px 14px;text-align:center;transition:border-color .5s,background .5s,box-shadow .5s,transform .5s;}
.orgc.sb .seat{border-color:rgba(16,185,129,.42);background:rgba(16,185,129,.05);box-shadow:0 16px 32px -22px rgba(16,185,129,.55);transform:translateY(-3px);}
.seat .av{position:relative;width:44px;height:44px;margin:0 auto;transform-style:preserve-3d;transition:transform .65s cubic-bezier(.16,1,.3,1);}
.orgc.sb .seat .av{transform:rotateY(180deg);}
.seat .face{position:absolute;inset:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:700;backface-visibility:hidden;-webkit-backface-visibility:hidden;}
.seat .face.you{background:rgba(245,158,11,.16);color:#b45309;}
.seat .face.sbm{background:#10b981;color:#fff;transform:rotateY(180deg);}
.seat .rl{margin-top:12px;font-size:15px;font-weight:600;color:var(--v4-ink);}
.seat .dd{margin-top:4px;font-size:12.5px;line-height:1.4;color:#9298a1;}
.seat .when{display:inline-block;margin-top:10px;font-size:10.5px;font-weight:600;color:#b45309;background:rgba(245,158,11,.13);border-radius:999px;padding:3px 9px;transition:opacity .4s;}
.orgc.sb .seat .when{opacity:0;}
.orgc-you{margin-top:20px;padding-top:20px;border-top:1px solid #f1f1f4;display:flex;align-items:center;justify-content:center;gap:14px;opacity:0;transform:translateY(8px);transition:opacity .5s .3s,transform .5s .3s;}
.orgc.sb .orgc-you{opacity:1;transform:none;}
.oy-av{width:44px;height:44px;border-radius:50%;background:var(--v4-ink);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:700;flex:0 0 auto;}
.oy-t b{display:block;font-size:16px;font-weight:600;color:var(--v4-ink);}
.oy-t span{display:block;margin-top:2px;font-size:13.5px;color:#6b7280;}
.orgc-cap{position:relative;margin-top:24px;min-height:4.4em;font-size:clamp(18px,2.1vw,23px);font-weight:600;letter-spacing:-.02em;line-height:1.35;color:var(--v4-ink);max-width:42ch;}
.orgc-cap span{position:absolute;left:0;top:0;transition:opacity .4s;}
.orgc-cap .c-sb{opacity:0;}
.orgc.sb .orgc-cap .c-today{opacity:0;}
.orgc.sb .orgc-cap .c-sb{opacity:1;}
.abt-five .kick{margin-top:clamp(30px,4vw,42px);font-size:clamp(19px,2.3vw,27px);font-weight:600;letter-spacing:-.02em;line-height:1.3;color:var(--v4-ink);max-width:34ch;}
.abt-five .kick .g{background:linear-gradient(100deg,#06b6d4,#10b981 55%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent;}
@media(prefers-reduced-motion:reduce){.orgc *{transition:none !important;}}

/* founders */
.abt-us{padding:clamp(90px,12vw,150px) 0;}
.abt-us .us-lead{max-width:660px;margin:0 0 clamp(44px,6vw,70px);}
.abt-us .us-lead h2{margin-top:14px;font-size:clamp(28px,4.2vw,54px);line-height:1.04;}
.abt-us .us-lead p{margin-top:14px;font-size:clamp(17px,1.9vw,20px);line-height:1.6;color:#6b7280;}
.f{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(32px,6vw,72px);align-items:start;padding:clamp(44px,6vw,76px) 0;border-top:1px solid #ececf0;}
.f:first-of-type{border-top:0;padding-top:0;}
.f .who img{width:100%;max-width:280px;aspect-ratio:1/1;object-fit:cover;border-radius:24px;display:block;box-shadow:0 34px 70px -40px rgba(6,12,20,.55);transition:transform .5s cubic-bezier(.16,1,.3,1);}
.f .who:hover img{transform:translateY(-4px) scale(1.01);}
.f .who .nm{margin-top:20px;font-size:24px;font-weight:600;letter-spacing:-.03em;color:var(--v4-ink);}
.f .who .ro{margin-top:5px;font-size:14px;font-weight:600;letter-spacing:.02em;color:#059669;}
.f .lens{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9298a1;}
.f blockquote{margin:12px 0 0;font-size:clamp(22px,2.7vw,33px);font-weight:600;letter-spacing:-.028em;line-height:1.26;color:var(--v4-ink);}
/* the CV is support, not the lead. Demote it. */
.f .bio{margin-top:28px;font-size:15px;line-height:1.7;color:#7a808a;}
.f .bio + .bio{margin-top:14px;}
@media(max-width:820px){.f{grid-template-columns:1fr;gap:26px;}.f .who img{max-width:200px;}}

/* beliefs — typography, not cards */
.abt-bel{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream);}
.abt-bel h2{font-size:clamp(30px,4.4vw,56px);line-height:1.04;max-width:14ch;}
.abt-bel ol{list-style:none;margin:clamp(40px,5vw,60px) 0 0;padding:0;max-width:760px;}
.abt-bel li{display:grid;grid-template-columns:38px minmax(0,1fr);gap:16px;padding:26px 0;border-top:1px solid #e2e2dc;}
.abt-bel li .n{font-size:13px;font-weight:700;letter-spacing:.1em;color:#c0c4c8;padding-top:6px;}
.abt-bel li h3{font-size:clamp(19px,2.2vw,26px);line-height:1.25;}
.abt-bel li p{margin-top:10px;font-size:16px;line-height:1.65;color:#6b7280;max-width:52ch;}

/* closer */
.abt-close{text-align:center;padding:clamp(100px,14vw,180px) 0;background:#fff;}
.abt-close h2{font-size:clamp(34px,5.4vw,72px);line-height:1.0;max-width:16ch;margin:0 auto;}
.abt-close p{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#52565e;max-width:46ch;}
.abt-close .spread{margin-top:14px;font-size:15px;color:#8a8f98;}
.abt-close .cta{margin-top:34px;}
`;

export default function AboutPage() {
  return (
    /* .v4 carries every design token (--v4-ink, --v4-cream, --v4-cyan...). Without
       it the nav wordmark's gradient resolves to nothing and, because the rule also
       sets color:transparent, the word "Bookt" simply disappears. */
    <main className="abt v4">
      <style>{CSS}</style>
      <Nav />

      <header className="abt-hero">
        <div className="wrap">
          <div className="eyebrow">About us</div>
          <h1>We built this for the person we kept meeting.</h1>
          <p>
            One of us saw the problem from the outside, standing next to owners across half a dozen
            industries. One of us saw it from the inside, running the operation at scale. It was the
            same problem every single time.
          </p>
        </div>
      </header>

      {/* 1. THE DIAGNOSIS — the only prose on the page, and the setup for the board */}
      <section className="abt-prob">
        <div className="wrap narrow">
          <div className="eyebrow">The problem worth solving</div>
          <h2 style={{ marginTop: 14 }}>Nobody is minding the front.</h2>
          <p className="p">
            An owner-operator is the best person in the business at the actual work, and the
            worst-placed person in the world to run the front of it. <b>You cannot answer the phone
            while you are doing the work.</b> That is the entire problem in one sentence, and it is
            the same sentence whether you run a plumbing van, a cleaning crew, a landscaping outfit,
            or a consulting practice.
          </p>
          <div className="pull">None of that is a failure of skill. It is a failure of coverage.</div>
        </div>
      </section>

      {/* 2. THREE TUESDAYS — one board, three worlds. The whole argument, once. */}
      <ThreeTuesdays />

      {/* 3. THE SENTENCE */}
      <Statement />

      {/* 4. WHO WE ARE — the actual about us, now that the argument is made */}
      <section className="abt-us">
        <div className="wrap">
          <div className="us-lead">
            <div className="eyebrow">Who we are</div>
            <h2>Between us, we have lived both Tuesdays.</h2>
            <p>
              That is the entire qualification. One of us ran the day where nothing gets dropped.
              One of us stood in the room where everything does.
            </p>
          </div>

          <div className="f">
            <div className="who">
              <img src="/photos/richard.jpg" alt="Richard Roos, co-founder of StayBookt" width={280} height={280} />
              <div className="nm">Richard Roos</div>
              <div className="ro">Operations, growth, and finance</div>
            </div>
            <div>
              <div className="lens">He ran the Tuesday where nothing gets dropped</div>
              <blockquote>
                &ldquo;In talking to entrepreneurs, one theme kept coming up: they didn&apos;t have
                enough time to grow their business and enjoy the rewards they&apos;d hoped for.
                StayBookt is our answer to &lsquo;not enough time.&rsquo; We get to build something
                great while helping others realize their own dream, and get back time for the things
                they love.&rdquo;
              </blockquote>
              <p className="bio">
                Two plus decades of executive-level leadership in high-growth service businesses at
                scale. Responsible for multiple start-up efforts and leading significant growth at
                Venterra from $15M to $500M+ in revenues. Deep understanding of the entire customer
                journey and all aspects of delivering world-class revenue performance. A CPA who has
                a passion for operations and leveraging technology to deliver tangible results.
              </p>
            </div>
          </div>

          <div className="f">
            <div className="who">
              <img src="/photos/jacob.jpg" alt="Jacob Charendoff, co-founder of StayBookt" width={280} height={280} />
              <div className="nm">Jacob Charendoff</div>
              <div className="ro">Brand, product, and growth</div>
            </div>
            <div>
              <div className="lens">He stood in the room where everything does</div>
              <blockquote>
                &ldquo;I kept meeting people who were brilliant at the work and losing money at
                everything around it. Not because they were careless. Because there was nobody there
                to catch it.&rdquo;
              </blockquote>
              <p className="bio">
                A decade spent standing next to service business owners across health, hospitality,
                software, retail, and the trades. Different industries, same conversation, every
                time. He runs the outside game: making a business impossible to miss and effortless
                to hire, then turning that first impression into a system the owner can finally hand
                off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE FIVE PEOPLE — the bridge, made concrete */}
      <section className="abt-five">
        <div className="wrap narrow">
          <div className="hd">
            <div className="eyebrow">The bridge, made concrete</div>
            <h2>The five people you cannot hire.</h2>
            <p>
              That is the whole difference between the Tuesdays. Five seats in a front office. You
              are already doing all five jobs, on your phone, between calls. Flip it and see.
            </p>
          </div>

          <OrgChart />

          <p className="kick">
            StayBookt is not a tool for doing those five jobs faster.{' '}
            <span className="g">It is the five people.</span>
          </p>
        </div>
      </section>

      {/* 6. WHAT YOU CAN HOLD US TO */}
      <section className="abt-bel">
        <div className="wrap">
          <div className="eyebrow">How we work</div>
          <h2 style={{ marginTop: 14 }}>What you can hold us to.</h2>
          <ol>
            {BELIEFS.map((b, i) => (
              <li key={b.h}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{b.h}</h3>
                  <p>{b.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. CLOSER */}
      <section className="abt-close">
        <div className="wrap">
          <h2>You do the work. We will run the rest.</h2>
          <p>
            Thirty minutes with one of us. Not a sales rep, not a pitch deck. We will tell you
            straight whether this is a fit.
          </p>
          <p className="spread">Executive results you can actually afford. Whether you run a crew or a practice.</p>
          <div className="cta">
            <a className="abt-btn" href={START_LINK}>
              Pick a time
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
