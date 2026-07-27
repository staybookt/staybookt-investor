import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import HeroCta from '@/components/v4/HeroCta';
import { min } from '@/lib/css';

/* WHAT THIS PAGE IS FOR.
 *
 * It used to open with Three Tuesdays, the five-salaries statement and the org
 * chart. All of that is the customer's problem, argued a third time after
 * how-it-works and pricing have already argued it. It was the sales pitch in an
 * About costume, and the four things an About page actually owes — why we exist,
 * who we are, why we are doing this, what we promise — were crammed underneath.
 *
 * So it is inverted. Belief. People. Origin. Promises. Nothing else. */

const SHARE =
  'You should not have to choose between doing the work and having a life. That is the whole reason StayBookt exists.';

export const metadata = {
  title: 'About us',
  description: SHARE,
  alternates: { canonical: '/founders' },
  openGraph: {
    /* Defining openGraph WITHOUT images suppresses the inherited app/opengraph-image.tsx,
       so this page shared as a bare grey rectangle. Every page needs its own images line. */
    images: ['/opengraph-image'],
    title: 'About us · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/founders',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'About us · StayBookt', description: SHARE },
};

const CSS = `
.abt{background:#fff;color:var(--v4-ink);}
.abt .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.abt .narrow{max-width:820px;margin:0 auto;}
.abt .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.abt h1,.abt h2,.abt h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}

/* ===== 1. THE BELIEF. The reason the company exists, said first. ===== */
/* HERO. Everything else is .pg-hero in globals.css, including the centring the note
   here used to argue for. This page was the tallest header on the site at
   clamp(150px,20vh,210px) and is now the same height as the other seven. Emerald:
   the two people who run it, same rung as what's included. */
.pg-hero{--hero-hue:16,185,129;}

/* LIGHT ANIMATED HEADER (Jul 24 2026) on the LOCKED hero system (home + how-it-works): eyebrow
   pill, two-line reveal-gradient headline (punchline alone on line 2), one-line subhead, then a
   supporting animation. Here the animation is Richard's rolling list of outcomes. Nav is solidTop.
   Richard's mission moved into the subhead; "improve lives" is the gradient payoff. */
.abt .pg-hero{background:var(--v4-cream);color:var(--v4-ink);min-height:auto;padding:clamp(84px,10vh,116px) 0 clamp(58px,8vw,98px);text-align:center;}
.abt .pg-hero::before{display:none;}
.abt .pg-hero .wrap{max-width:1120px;}
.abt .pg-hero .wrap .eyebrow{display:inline-block;font-size:12.5px;font-weight:700;letter-spacing:.15em;color:#42474f;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad) border-box;border-radius:999px;padding:9px 18px;box-shadow:0 6px 18px -10px rgba(6,12,20,.25);}
.abt .pg-hero .wrap h1{margin:20px auto 0;max-width:none;font-size:clamp(20px,6.4vw,88px);line-height:1.02;letter-spacing:-.03em;font-weight:600;text-align:center;color:var(--v4-ink);}
.abt .pg-hero .hero-h1 .hl1,.abt .pg-hero .hero-h1 .hl2{display:block;white-space:nowrap;}
.abt .pg-hero .wrap h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.abt .pg-hero .wrap h1 .pd{color:var(--v4-violet);-webkit-text-fill-color:var(--v4-violet);}
.abt .pg-hero .wrap p.sub{margin:22px auto 0;max-width:none;white-space:nowrap;font-size:clamp(13px,3.1vw,21px);line-height:1.4;color:#52565e;text-align:center;}
/* supporting animation: a single line cycling through the outcomes */
.abt .roll{margin:clamp(26px,3.6vw,42px) auto 0;font-size:clamp(19px,2.5vw,30px);font-weight:700;}
.abt .roll .roll-words{position:relative;display:inline-block;height:1.4em;overflow:hidden;vertical-align:bottom;}
.abt .roll .roll-list{display:flex;flex-direction:column;}
.abt .roll .roll-list span{display:block;height:1.4em;line-height:1.4em;white-space:nowrap;background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}

@media(prefers-reduced-motion:no-preference){
  .abt .pg-hero .hero-h1 .hl1,.abt .pg-hero .hero-h1 .hl2{opacity:0;filter:blur(10px);transform:translateY(18px);}
  .abt .pg-hero .hero-h1 .hl1{animation:abtIn .9s cubic-bezier(.16,1,.3,1) .15s forwards;}
  .abt .pg-hero .hero-h1 .hl2{animation:abtEnjoy 1.2s cubic-bezier(.19,1,.22,1) .85s forwards;}
  .abt .pg-hero .wrap p.sub{opacity:0;filter:blur(6px);transform:translateY(12px);animation:abtIn .85s cubic-bezier(.16,1,.3,1) 1.4s forwards;}
  .abt .roll{opacity:0;animation:abtFade .8s ease 1.7s forwards;}
  .abt .roll .roll-list{animation:rollWords 13s cubic-bezier(.16,1,.3,1) 2.2s infinite;}
}
@keyframes abtIn{to{opacity:1;filter:blur(0);transform:none;}}
@keyframes abtEnjoy{0%{opacity:0;filter:blur(16px);transform:translateY(16px) scale(1.14);}55%{opacity:1;}100%{opacity:1;filter:blur(0);transform:translateY(0) scale(1);}}
@keyframes abtFade{to{opacity:1;}}
@keyframes rollWords{
  0%,14%{transform:translateY(0);}
  18%,32%{transform:translateY(-1.4em);}
  36%,50%{transform:translateY(-2.8em);}
  54%,68%{transform:translateY(-4.2em);}
  72%,86%{transform:translateY(-5.6em);}
  90%,100%{transform:translateY(-7em);}
}


/* ===== 3. WHO WE ARE ===== */
.abt-us{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream);}
.abt-us .us-lead{max-width:680px;margin:0 0 clamp(44px,6vw,70px);}
.abt-us .us-lead h2{margin-top:14px;font-size:clamp(28px,4.2vw,54px);line-height:1.04;}
.abt-us .us-lead p{margin-top:16px;font-size:clamp(17px,1.9vw,20px);line-height:1.6;color:#69707d;}

/* THE TWO FOUNDERS, SIDE BY SIDE. Richard left, Jacob right. Identical elements in
   each card so the grid stays even. */
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(26px,4vw,56px);align-items:start;}
@media(max-width:820px){.fgrid{grid-template-columns:1fr;gap:48px;}}
/* GRADIENT PHOTO BORDER (Emma, p15 ①, her primary shown suggestion): the brand gradient as a
   decorative ring around each founder photo. The wrapper carries the gradient and a 3px pad; the
   image sits inside at a slightly smaller radius so the ring shows evenly. Shadow + hover-lift
   move to the wrapper so the whole framed photo lifts as one. */
.fcard .fimg{display:block;border-radius:24px;padding:3px;background:var(--sb-grad);
  box-shadow:0 34px 70px -40px rgba(6,12,20,.55);transition:transform .5s cubic-bezier(.16,1,.3,1);}
.fcard .fimg img{width:100%;aspect-ratio:1/1;object-fit:cover;object-position:center 18%;border-radius:21px;display:block;}
.fcard .fimg img.hi{object-position:center top;}
.fcard:hover .fimg{transform:translateY(-4px) scale(1.01);}
.fcard .nm{margin-top:22px;font-size:clamp(20px,2.2vw,26px);font-weight:600;letter-spacing:-.03em;color:var(--v4-ink);}
/* Roles BLACK, not green (Emma, p15 ②). She flagged the green as a contrast risk and asked for
   black; the gradient decorative role is carried by the photo border above, not the text. */
.fcard .ro{margin-top:12px;font-size:14px;font-weight:600;letter-spacing:.02em;color:var(--v4-ink);}
.fcard .bio{margin-top:18px;font-size:15.5px;line-height:1.7;color:#69707d;}
/* each founder's quote, beneath their bio (Richard, Jul 24 2026). Brand-gradient left rule so it
   reads as ours, not a generic testimonial. */
.fcard .fq{margin:20px 0 0;padding-left:clamp(16px,1.4vw,20px);border-left:3px solid transparent;border-image:var(--sb-grad-ink) 1;font-size:16px;line-height:1.6;font-weight:500;letter-spacing:-.01em;color:var(--v4-ink);}

/* The source portraits are 3:4. Cover-cropping them into a 1:1 card from the
   default centre lands the crop window on the chest and takes the top of the head
   off. .fcard img biases the window upward; Jacob's frame sits higher still, so he
   gets .hi (center top). */

/* ===== 5. THE PROMISES. The one object on the page. ===== */
.abt-prm{background:#050506;padding:clamp(90px,12vw,150px) 0;}
.abt-prm .eyebrow{color:#86868b;}
.abt-prm h2{margin-top:14px;font-size:clamp(32px,4.8vw,62px);line-height:1.02;color:#fff;max-width:15ch;}
.abt-prm .lead{margin-top:24px;font-size:clamp(17px,1.95vw,21px);line-height:1.6;color:#9ba2ae;max-width:58ch;}
.abt-prm .lead b{color:#fff;font-weight:600;}

/* BOTH VOICES, OPENING THE PAGE. Two columns, Richard left and Jacob right, mirroring
   the two founder cards below so the page reads as one company of two people rather
   than two profiles. Gradient rule on each so they are unmistakably ours and not a
   pair of generic testimonial slabs. */
.abt-quote{padding:clamp(80px,10vw,130px) 0;background:#fff;}
.abt-quote .eyebrow{color:#69707d;}
.abt-quote .q2{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4.5vw,64px);align-items:start;margin-top:clamp(28px,3.6vw,44px);}
@media(max-width:820px){.abt-quote .q2{grid-template-columns:1fr;gap:44px;}}
.abt-quote .qq{margin:0;}
.abt-quote .lens{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#69707d;}
.abt-quote blockquote{margin:14px 0 0;padding-left:clamp(16px,2vw,22px);border-left:3px solid transparent;
  border-image:var(--sb-grad-ink) 1;
  font-size:clamp(18px,2.1vw,26px);font-weight:500;letter-spacing:-.02em;line-height:1.42;color:var(--v4-ink);}
.abt-quote figcaption{display:flex;flex-direction:column;gap:2px;margin-top:clamp(18px,2.2vw,24px);
  padding-left:clamp(19px,2vw,25px);}
.abt-quote figcaption .cn{font-size:15.5px;font-weight:600;letter-spacing:-.01em;color:var(--v4-ink);}
.abt-quote figcaption .cr{font-size:13.5px;font-weight:600;color:#69707d;}
`;

export default function AboutPage() {
  return (
    /* .v4 carries every design token. Without it the nav wordmark's gradient
       resolves to nothing and, because the rule also sets color:transparent,
       the word "Bookt" disappears entirely. */
    <div className="abt v4">
      <style>{min(CSS)}</style>
      {/* solidTop: the hero is light now (Jul 24 2026), so the nav stays a solid dark bar. */}
      <Nav solidTop />
      <main id="main" tabIndex={-1}>

      {/* 1 — THE MISSION (Richard's About-Us feedback, Jul 24 2026). New light animated header
          matching home + how-it-works: eyebrow pill, the mission line, the StayBookt / Enjoy Life
          lockup, then a rolling list of the outcomes "Enjoy Life" actually means. */}
      <header className="pg-hero abt-hero">
        <div className="wrap">
          <div className="eyebrow">About us</div>
          <h1 className="hero-h1">
            <span className="hl1">We&rsquo;re on a mission to</span>
            <span className="hl2"><span className="g">improve lives</span><span className="pd">.</span></span>
          </h1>
          <p className="sub">For small business owners, and the families behind them.</p>
          <div className="roll" aria-hidden="true">
            <span className="roll-words"><span className="roll-list">
              <span>Grow the business.</span>
              <span>Enjoy your personal life.</span>
              <span>Focus on meaningful work.</span>
              <span>Buy fun things.</span>
              <span>Pursue passion projects.</span>
              <span>Grow the business.</span>
            </span></span>
          </div>
        </div>
      </header>

      {/* 2 — TWO FOUNDERS, ONE MISSION (Richard, Jul 24 2026). One fold: photo, brief bio, and
          each founder's own quote beneath it. The inside/outside lens labels and the separate
          "why we built this" quote section are gone; the quotes live with the people who said
          them. Richard's and Jacob's quotes share the same vocabulary, so two people read as one
          company. */}
      <section className="abt-us">
        <div className="wrap">
          <div className="us-lead">
            <div className="eyebrow">The team</div>
            <h2>Two founders. One mission.</h2>
            <p>
              Helping entrepreneurs be more successful. That is the whole company: not a fund, not a
              franchise, not an agency with a hundred logos on the wall. Two people who will actually
              run your front office.
            </p>
          </div>

          {/* SIDE BY SIDE. Richard left, Jacob right (Jacob, live review, July 2026).
              These used to be two full-width rows stacked down the page, photo left and
              a quote right, which read as two separate profiles rather than one company
              of two people. Same elements in both cards, on purpose: the moment one card
              carries a quote and the other does not, the grid goes ragged.

              Both quotes moved to the top of the page, so the cards carry the credentials
              and nothing else. */}
          <div className="fgrid">
            <article className="fcard">
              <div className="fimg"><img src="/photos/richard.jpg" alt="Richard Roos, co-founder of StayBookt" width={280} height={280} /></div>
              <div className="nm">Richard Roos</div>
              <div className="ro">Operations, growth, and finance</div>
              <p className="bio">
                Two decades running operations inside fast-growing service businesses, including
                leading the growth of Venterra from $15M to $500M+ in revenue.{/* CONFIRMED by Jacob, July 2026. Checked with Richard; it stands. Do not soften or re-flag. */} A CPA who spent his
                career building the machine that answers every call and misses nothing.
              </p>
              <blockquote className="fq">
                &ldquo;I have always sought opportunities to make a difference in the lives of others.
                StayBookt lets me do that by helping entrepreneurs realize their version of success. Our
                role in your journey is to remove the barriers of not enough Time and not enough
                Customers. We define success as helping you get the most out of life on the way to
                building something great.&rdquo;
              </blockquote>
            </article>

            <article className="fcard">
              <div className="fimg"><img className="hi" src="/photos/jacob.jpg" alt="Jacob Charendoff, co-founder of StayBookt" width={280} height={280} /></div>
              <div className="nm">Jacob Charendoff</div>
              <div className="ro">Brand, product, and growth</div>
              <p className="bio">
                A decade spent as an entrepreneur and alongside service business owners across health,
                hospitality, software, retail, and the trades. He works on the outside of the business:
                getting it found, making it easy to hire, then turning it into something the owner can
                hand off.
              </p>
              <blockquote className="fq">
                &ldquo;I have spent my career as an entrepreneur and alongside other entrepreneurs, most
                of them brilliant at the work and buried by everything around it. StayBookt is how I get
                to make a difference for them: we remove the barriers of not enough Time and not enough
                Customers, so you get the most out of life while you build something great. Helping you
                reach your version of success is the part I care about most.&rdquo;
              </blockquote>
            </article>
          </div>
        </div>
      </section>

      {/* THE PROMISES BOARD WAS REMOVED (Richard, Jul 24 2026: "delete this section"). It was the
          section between the founders and the close. The Promises component still exists, just not
          rendered here. */}

      {/* Close, Richard's copy: "We are your operating partner. To help you build something great."
          Subtext dropped. NOT fromBlack any more: the section above is the light cream founders
          section now, not the dark promise board. Image unchanged for now; Richard wants a
          celebrating-success shot, which needs a real asset. */}
      <HeroCta
        img="/close-founders.jpg"
        heading={<>We are your operating partner. To help you build something great.</>}
        sub={null}
      />

      </main>

      <SiteFooter />
    </div>
  );
}
