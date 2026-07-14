import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import StartBanner from '@/components/v4/StartBanner';
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
.abt-hero h1 .g{background:linear-gradient(100deg,#06b6d4,#10b981 52%,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent;}
.abt-hero .sub{margin-top:28px;font-size:clamp(17px,2vw,22px);line-height:1.55;color:#aeb4c0;max-width:52ch;}


/* ===== 3. WHO WE ARE ===== */
.abt-us{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream);}
.abt-us .us-lead{max-width:680px;margin:0 0 clamp(44px,6vw,70px);}
.abt-us .us-lead h2{margin-top:14px;font-size:clamp(28px,4.2vw,54px);line-height:1.04;}
.abt-us .us-lead p{margin-top:16px;font-size:clamp(17px,1.9vw,20px);line-height:1.6;color:#6b7280;}
.f{display:grid;grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr);gap:clamp(32px,6vw,72px);align-items:start;padding:clamp(44px,6vw,72px) 0;border-top:1px solid #e2e2dc;}
.f:first-of-type{border-top:0;padding-top:0;}
.f .who img{width:100%;max-width:280px;aspect-ratio:1/1;object-fit:cover;object-position:center 18%;border-radius:24px;display:block;box-shadow:0 34px 70px -40px rgba(6,12,20,.55);transition:transform .5s cubic-bezier(.16,1,.3,1);}
/* The source portraits are 3:4. Cover-cropping them into a 1:1 card from the
   default centre lands the crop window on the chest and takes the top of the head
   off. Bias the window upward. Jacob's frame sits higher still, so he gets top. */
.f .who img.hi{object-position:center top;}
.f .who:hover img{transform:translateY(-4px) scale(1.01);}
.f .who .nm{margin-top:20px;font-size:24px;font-weight:600;letter-spacing:-.03em;color:var(--v4-ink);}
.f .who .ro{margin-top:5px;font-size:14px;font-weight:600;letter-spacing:.02em;color:#059669;}
.f .lens{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9298a1;}
/* THE QUOTES WERE SET AT HEADLINE SIZE. Richard's runs 35 words, and at 31px that
   is not a pull-quote, it is a paragraph wearing a costume: it dwarfed the bio
   underneath it, which is the genuinely impressive part (Venterra, $15M to $500M+,
   CPA). The words are untouched. The type came down to a size a human reads. */
.f blockquote{margin:12px 0 0;font-size:clamp(17px,1.9vw,21px);font-weight:500;letter-spacing:-.012em;line-height:1.5;color:#2b2f36;max-width:52ch;
  border-left:3px solid rgba(16,185,129,.5);padding-left:clamp(14px,1.6vw,20px);}
.f .bio{margin-top:22px;font-size:15.5px;line-height:1.7;color:#6b7280;max-width:56ch;}
@media(max-width:820px){.f{grid-template-columns:1fr;gap:26px;}.f .who img{max-width:200px;}}

/* ===== 4. WHY WE ARE DOING THIS ===== */
.abt-org{padding:clamp(90px,12vw,150px) 0;background:#fff;}
.abt-org .eyebrow{color:#8a8f98;}
.abt-org h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.03;max-width:16ch;}
.abt-org p{margin-top:26px;font-size:clamp(17px,2vw,21px);line-height:1.65;color:#42474f;max-width:60ch;}
.abt-org .kick{margin-top:clamp(38px,4.6vw,52px);font-size:clamp(22px,2.9vw,36px);font-weight:600;letter-spacing:-.028em;line-height:1.2;color:var(--v4-ink);max-width:26ch;}
.abt-org .kick .g{background:linear-gradient(100deg,#06b6d4,#10b981 55%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent;}

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

          <div className="f">
            <div className="who">
              <img src="/photos/richard.jpg" alt="Richard Roos, co-founder of StayBookt" width={280} height={280} />
              <div className="nm">Richard Roos</div>
              <div className="ro">Operations, growth, and finance</div>
            </div>
            <div>
              <div className="lens">The inside lens</div>
              <blockquote>
                &ldquo;In talking to entrepreneurs, one theme kept coming up: they didn&apos;t have
                enough time to grow their business and enjoy the rewards they&apos;d hoped for.
                StayBookt is our answer to &lsquo;not enough time.&rsquo; We get to build something
                great while helping others realize their dreams and Enjoy Life more.&rdquo;
              </blockquote>
              <p className="bio">
                Two decades of executive leadership inside high-growth service businesses at scale,
                including leading the growth of Venterra from $15M to $500M+ in revenue. A CPA who
                spent his career building the machine that answers every call and misses nothing.
                He has run the front office most owner-operators will never be able to hire.
              </p>
            </div>
          </div>

          <div className="f">
            <div className="who">
              <img className="hi" src="/photos/jacob.jpg" alt="Jacob Charendoff, co-founder of StayBookt" width={280} height={280} />
              <div className="nm">Jacob Charendoff</div>
              <div className="ro">Brand, product, and growth</div>
            </div>
            <div>
              <div className="lens">The outside lens</div>
              <blockquote>
                &ldquo;I kept meeting people who were brilliant at the work and losing money at
                everything around it. Not because they were careless. Because there was nobody there
                to catch it.&rdquo;
              </blockquote>
              <p className="bio">
                A decade spent standing next to service business owners across health, hospitality,
                software, retail, and the trades. Different industries, the same conversation, every
                single time. He builds the outside game: making a business impossible to miss and
                effortless to hire, then turning that first impression into something the owner can
                finally hand off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ONE ARGUMENT, ONCE. This merged "Why we exist" (three paragraphs) and "Why
          we are doing this" (two more) into a single piece. They were making the same
          case twice, in a row, in the same voice. Roughly 60% of the words are gone
          and nothing was lost. Do not split them back apart. */}
      <section className="abt-org">
        <div className="wrap narrow">
          <div className="eyebrow">Why we exist</div>
          <h2>The software was never the problem. Nobody had the time to run it.</h2>
          <p>
            Great tools have been available to small businesses for years. Just never{' '}
            <b>practically</b>. To get the value out of them you have to vet the vendors, pick the
            products, wire them together and keep the whole thing running, month after month. That is
            not a purchase. That is a job, and at a bigger company it is somebody&rsquo;s full-time
            one. You do not have that person, and you cannot be that person, because you are the one
            doing the work.
          </p>
          <p>
            So <b>the opportunity gets missed even though you can see it perfectly clearly</b>. That
            is the part that grinds. Not ignorance. Capacity. A hundred-person company does not beat
            you on talent and it does not beat you on tools. It beats you on <b>coverage</b>: people
            paid to answer, to book, to chase, to follow up. That team has always been for sale. It
            has just never been for sale to <b>you</b>.
          </p>
          <div className="kick">
            We are not selling a tool for the five jobs.{' '}
            <span className="g">We are the five people.</span>
          </div>
        </div>
      </section>

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
      <StartBanner />

      <SiteFooter />
    </main>
  );
}
