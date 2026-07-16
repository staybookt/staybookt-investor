import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import HeroCta from '@/components/v4/HeroCta';
import { Promises } from '@/components/v4/Promises';

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
    title: 'About us · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/founders',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'About us · StayBookt', description: SHARE },
};

const CSS = `
.abt{background:#fff;color:var(--v4-ink);}
.abt .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.abt .narrow{max-width:820px;margin:0 auto;}
.abt .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.abt h1,.abt h2,.abt h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}

/* ===== 1. THE BELIEF. The reason the company exists, said first. ===== */
.abt-hero{position:relative;background:#050506;padding:clamp(150px,20vh,210px) 0 clamp(90px,11vw,130px);overflow:hidden;}
.abt-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(60% 50% at 22% 0%,rgba(16,185,129,.14),transparent 62%),radial-gradient(50% 46% at 88% 100%,rgba(79,70,229,.12),transparent 62%);pointer-events:none;}
.abt-hero .wrap{position:relative;z-index:1;}
.abt-hero .eyebrow{color:#c9cdd6;}
.abt-hero h1{margin-top:20px;font-size:clamp(38px,6vw,80px);line-height:1.02;max-width:19ch;color:#fff;}
.abt-hero h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.abt-hero .sub{margin-top:28px;font-size:clamp(17px,2vw,22px);line-height:1.55;color:#aeb4c0;max-width:52ch;}


/* ===== 3. WHO WE ARE ===== */
.abt-us{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream);}
.abt-us .us-lead{max-width:680px;margin:0 0 clamp(44px,6vw,70px);}
.abt-us .us-lead h2{margin-top:14px;font-size:clamp(28px,4.2vw,54px);line-height:1.04;}
.abt-us .us-lead p{margin-top:16px;font-size:clamp(17px,1.9vw,20px);line-height:1.6;color:#6b7280;}
/* BOTH VOICES, OPENING THE PAGE. Two columns, Richard left and Jacob right, mirroring
   the two founder cards below so the page reads as one company of two people rather
   than two profiles. Gradient rule on each so they are unmistakably ours and not a
   pair of generic testimonial slabs. */
.abt-quote{padding:clamp(80px,10vw,130px) 0;background:#fff;}
.abt-quote .eyebrow{color:#8a8f98;}
.abt-quote .q2{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4.5vw,64px);align-items:start;margin-top:clamp(28px,3.6vw,44px);}
@media(max-width:820px){.abt-quote .q2{grid-template-columns:1fr;gap:44px;}}
.abt-quote .qq{margin:0;}
.abt-quote .lens{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9298a1;}
.abt-quote blockquote{margin:14px 0 0;padding-left:clamp(16px,2vw,22px);border-left:3px solid transparent;
  border-image:var(--sb-grad-ink) 1;
  font-size:clamp(18px,2.1vw,26px);font-weight:500;letter-spacing:-.02em;line-height:1.42;color:var(--v4-ink);}
.abt-quote figcaption{display:flex;flex-direction:column;gap:2px;margin-top:clamp(18px,2.2vw,24px);
  padding-left:clamp(19px,2vw,25px);}
.abt-quote figcaption .cn{font-size:15.5px;font-weight:600;letter-spacing:-.01em;color:var(--v4-ink);}
.abt-quote figcaption .cr{font-size:13.5px;font-weight:600;color:#059669;}

/* THE TWO FOUNDERS, SIDE BY SIDE. Richard left, Jacob right. Identical elements in
   each card so the grid stays even. */
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(26px,4vw,56px);align-items:start;}
@media(max-width:820px){.fgrid{grid-template-columns:1fr;gap:48px;}}
.fcard img{width:100%;aspect-ratio:1/1;object-fit:cover;object-position:center 18%;border-radius:24px;display:block;
  box-shadow:0 34px 70px -40px rgba(6,12,20,.55);transition:transform .5s cubic-bezier(.16,1,.3,1);}
.fcard img.hi{object-position:center top;}
.fcard:hover img{transform:translateY(-4px) scale(1.01);}
.fcard .nm{margin-top:22px;font-size:clamp(20px,2.2vw,26px);font-weight:600;letter-spacing:-.03em;color:var(--v4-ink);}
.fcard .ro{margin-top:5px;font-size:14px;font-weight:600;letter-spacing:.02em;color:#059669;}
.fcard .bio{margin-top:18px;font-size:15.5px;line-height:1.7;color:#6b7280;}

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

`;

export default function AboutPage() {
  return (
    /* .v4 carries every design token. Without it the nav wordmark's gradient
       resolves to nothing and, because the rule also sets color:transparent,
       the word "Bookt" disappears entirely. */
    <main className="abt v4">
      <style>{CSS}</style>
      <Nav />

      {/* 1 — THE BELIEF */}
      <header className="abt-hero">
        <div className="wrap">
          <div className="eyebrow">About us</div>
          <h1>
            You should not have to choose between doing the work and{' '}
            <span className="g">having a life.</span>
          </h1>
          <p className="sub">
            That is the whole reason this company exists. Everything below is us explaining
            ourselves: who we are, why we are doing this, and exactly what you can hold us to.
          </p>
        </div>
      </header>

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
              outside. One of us saw it from the inside.
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
              <img src="/photos/richard.jpg" alt="Richard Roos, co-founder of StayBookt" width={280} height={280} />
              <div className="nm">Richard Roos</div>
              <div className="ro">Operations, growth, and finance</div>
              <p className="bio">
                Two decades of executive leadership inside high-growth service businesses at scale,
                including leading the growth of Venterra from $15M to $500M+ in revenue.{/* CONFIRMED by Jacob, July 2026. Audits keep flagging this as the largest unsourced number on the site, which is a fair flag: it is a specific revenue claim about a third party on the page that hosts Promise 05. It has been checked with Richard and it stands. Do not soften it, and do not re-flag it. */} A CPA who
                spent his career building the machine that answers every call and misses nothing.
                He has run the front office most owner-operators will never be able to hire.
              </p>
            </article>

            <article className="fcard">
              <img className="hi" src="/photos/jacob.jpg" alt="Jacob Charendoff, co-founder of StayBookt" width={280} height={280} />
              <div className="nm">Jacob Charendoff</div>
              <div className="ro">Brand, product, and growth</div>
              <p className="bio">
                A decade spent standing next to service business owners across health, hospitality,
                software, retail, and the trades. Different industries, the same conversation, every
                single time. He builds the outside game: making a business impossible to miss and
                effortless to hire, then turning that first impression into something the owner can
                finally hand off.
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
      <HeroCta />

      <SiteFooter />
    </main>
  );
}
