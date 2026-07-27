import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import HeroCta from '@/components/v4/HeroCta';
import { Promises } from '@/components/v4/Promises';
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

/* NEW LIGHT ANIMATED HEADER (Jul 24 2026), matching home + how-it-works, carrying Richard's
   mission statement. Cream hero, gradient-border eyebrow pill, the mission line fading in, the
   StayBookt / Enjoy Life lockup, then a rolling list of the outcomes. Nav is solidTop. */
.abt .pg-hero{background:var(--v4-cream);color:var(--v4-ink);min-height:auto;padding:clamp(84px,10vh,116px) 0 clamp(58px,8vw,98px);text-align:center;}
.abt .pg-hero::before{display:none;}
.abt .pg-hero .wrap{max-width:1120px;}
.abt .pg-hero .wrap .eyebrow{display:inline-block;font-size:12.5px;font-weight:700;letter-spacing:.15em;color:#42474f;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad) border-box;border-radius:999px;padding:9px 18px;box-shadow:0 6px 18px -10px rgba(6,12,20,.25);}
.abt .pg-hero .wrap h1.mission{margin:22px auto 0;max-width:20ch;font-size:clamp(26px,4vw,48px);line-height:1.14;letter-spacing:-.025em;font-weight:600;color:var(--v4-ink);}
.abt .brandlock{margin:clamp(30px,4.5vw,52px) auto 0;line-height:1.02;}
.abt .brandlock .bl-name,.abt .brandlock .bl-tag{display:block;font-size:clamp(42px,7vw,86px);font-weight:700;letter-spacing:-.04em;}
.abt .brandlock .bl-name{color:var(--v4-ink);}
.abt .brandlock .bl-name .pd{color:var(--v4-violet);}
.abt .brandlock .bl-tag{margin-top:4px;}
.abt .brandlock .bl-tag .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.abt .brandlock .bl-tag .pd{color:var(--v4-violet);-webkit-text-fill-color:var(--v4-violet);}
/* rolling outcomes: a single line that cycles through what "Enjoy Life" means */
.abt .roll{margin:clamp(24px,3.4vw,38px) auto 0;font-size:clamp(18px,2.2vw,26px);font-weight:700;}
.abt .roll .roll-words{position:relative;display:inline-block;height:1.4em;overflow:hidden;vertical-align:bottom;}
.abt .roll .roll-list{display:flex;flex-direction:column;}
.abt .roll .roll-list span{display:block;height:1.4em;line-height:1.4em;white-space:nowrap;background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}

@media(prefers-reduced-motion:no-preference){
  .abt .pg-hero .wrap h1.mission{opacity:0;filter:blur(8px);transform:translateY(14px);animation:abtIn .9s cubic-bezier(.16,1,.3,1) .15s forwards;}
  .abt .brandlock .bl-name{opacity:0;filter:blur(10px);transform:translateY(16px);animation:abtIn .9s cubic-bezier(.16,1,.3,1) .7s forwards;}
  .abt .brandlock .bl-tag{opacity:0;filter:blur(16px);transform:translateY(16px) scale(1.12);transform-origin:center;animation:abtIn 1.2s cubic-bezier(.19,1,.22,1) 1.05s forwards;}
  .abt .roll{opacity:0;animation:abtFade .8s ease 1.6s forwards;}
  .abt .roll .roll-list{animation:rollWords 13s cubic-bezier(.16,1,.3,1) 2.1s infinite;}
}
@keyframes abtIn{to{opacity:1;filter:blur(0);transform:none;}}
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
          <h1 className="mission">
            We&rsquo;re on a mission to improve the lives of small and mid-sized business owners and
            their families.
          </h1>
          <div className="brandlock" aria-label="StayBookt. Enjoy Life.">
            <span className="bl-name">StayBookt<span className="pd">.</span></span>
            <span className="bl-tag"><span className="g">Enjoy Life</span><span className="pd">.</span></span>
          </div>
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

      {/* REVERTED to the two founder quotes (Richard, July 2026). This briefly ran a
          scroll-scrubbed rangefinder film that converged two lenses into the wordmark.
          Richard did not like it and asked for the original back. The quotes were always
          the substance here: two real people saying the two halves of the same problem.
          The eyebrow colour is the only thing NOT restored verbatim: it was #8a8f98,
          which is 3.00:1 on cream and fails WCAG. It is #69707d now, 4.60:1. */}
      {/* BOTH VOICES OPEN THE PAGE (Jacob, live review, July 2026). The section under
          this one says "One of us saw this from the outside. One of us saw it from the
          inside," and then the page never showed you those two people saying those two
          things. Now it does, and it does it first.

          Richard's is the full version of the line the homepage abbreviates to "there
          was never enough time." Jacob's is the other half of the same problem: the
          thing you bought to fix it made it worse. They are stronger together than
          apart, which is why they are not split across two founder cards any more.

          The lens labels live HERE, with the voices, not on the cards. Saying "the
          inside lens" twice on one page is the exact redundancy this page was full of. */}
      <section className="abt-quote">
        <div className="wrap">
          <div className="eyebrow">Why we built this</div>
          <div className="q2">
            <figure className="qq">
              <div className="lens">The inside lens</div>
              <blockquote>
                &ldquo;In talking to entrepreneurs, one theme kept coming up: they didn&apos;t have
                enough time to grow their business and enjoy the rewards they&apos;d hoped for.
                StayBookt is our answer to &lsquo;not enough time.&rsquo; We get to build something
                great while helping others realize their dreams and Enjoy Life more.&rdquo;
              </blockquote>
              <figcaption>
                <span className="cn">Richard Roos</span>
                <span className="cr">Co-founder</span>
              </figcaption>
            </figure>

            <figure className="qq">
              <div className="lens">The outside lens</div>
              <blockquote>
                &ldquo;Every owner I worked with tried to buy their way out of it. Another tool,
                another login, another thing that promised to fix it. None of them ever did the
                work. They just handed you one more job.&rdquo;
              </blockquote>
              <figcaption>
                <span className="cn">Jacob Charendoff</span>
                <span className="cr">Co-founder</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 3 — WHO WE ARE */}
      {/* THE FACES COME FIRST NOW (Jacob, July 14 2026). This page's whole job is
          trust, and it used to make you read a 300-word essay before it showed you a
          human being. It also argued the same point three separate times: an essay,
          a second essay, and then both founder quotes. One idea, three passes, six
          screens. The two essays are now one, and it sits AFTER the faces.

          There is no stock photo here on purpose. Every image search for "two people
          talking" returns men in suits in boardrooms, which is the exact visual
          language of the agency we tell people we are not. The image on this page is
          the two of us. */}
      <section className="abt-us">
        <div className="wrap">
          <div className="us-lead">
            <div className="eyebrow">Who we are</div>
            <h2>Two people. No layers.</h2>
            <p>
              That is the whole company, and it is the entire qualification. We are not a fund, a
              franchise, or an agency with a hundred logos on the wall. One of us saw this from the
              outside, the other from the inside.
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
                Two decades running operations inside fast-growing service businesses,
                including leading the growth of Venterra from $15M to $500M+ in revenue.{/* CONFIRMED by Jacob, July 2026. Audits keep flagging this as the largest unsourced number on the site, which is a fair flag: it is a specific revenue claim about a third party on the page that hosts Promise 05. It has been checked with Richard and it stands. Do not soften it, and do not re-flag it. */} A CPA who
                spent his career building the machine that answers every call and misses nothing.
                He has run the front office most owner-operators will never be able to hire.
              </p>
            </article>

            <article className="fcard">
              <div className="fimg"><img className="hi" src="/photos/jacob.jpg" alt="Jacob Charendoff, co-founder of StayBookt" width={280} height={280} /></div>
              <div className="nm">Jacob Charendoff</div>
              <div className="ro">Brand, product, and growth</div>
              <p className="bio">
                A decade spent standing next to service business owners across health, hospitality,
                software, retail, and the trades. Different industries, the same conversation, every
                single time. He works on the outside of the business: getting it found and making
                it easy to hire, then turning that into something the owner can finally hand off.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* THE PROSE WALL IS GONE (Jacob, live review, July 2026). Two more essays sat
          here: "The software was never the problem" and the five-jobs kick. Five
          paragraphs of argument on a page whose only job is trust. The homepage and
          how-it-works are the standard for this site and neither of them makes you read
          an essay. The faces and the promises do this work. Do not put an essay back. */}

      {/* 5 — THE PROMISES. The object. */}
      <section className="abt-prm">
        <div className="wrap">
          <div className="eyebrow">Our promises</div>
          <h2>What you can hold us to.</h2>
          <p className="lead">
            Anybody can publish values. The only thing that makes a promise worth anything is what it
            costs to keep it, so each one opens to show you <b>exactly what it costs us.</b>
          </p>

          <Promises />
        </div>
      </section>

      {/* Same CTA banner every other page lands on. */}
      {/* fromBlack: .abt-prm directly above is #050506. Same seam as /long-term. */}
      <HeroCta fromBlack img="/close-founders.jpg" />

      </main>

      <SiteFooter />
    </div>
  );
}
