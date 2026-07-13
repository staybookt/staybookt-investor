import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { Promises } from '@/components/v4/Promises';
import { START_LINK } from '@/lib/site';

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
.abt-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:16px 34px;text-decoration:none;transition:transform .3s ease;}
.abt-btn:hover{transform:translateY(-1px);}
.abt-btn.w{background:#fff;color:#050506;}

/* ===== 1. THE BELIEF. The reason the company exists, said first. ===== */
.abt-hero{position:relative;background:#050506;padding:clamp(150px,20vh,210px) 0 clamp(90px,11vw,130px);overflow:hidden;}
.abt-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(60% 50% at 22% 0%,rgba(16,185,129,.14),transparent 62%),radial-gradient(50% 46% at 88% 100%,rgba(79,70,229,.12),transparent 62%);pointer-events:none;}
.abt-hero .wrap{position:relative;z-index:1;}
.abt-hero .eyebrow{color:#c9cdd6;}
.abt-hero h1{margin-top:20px;font-size:clamp(38px,6vw,80px);line-height:1.02;max-width:19ch;color:#fff;}
.abt-hero h1 .g{background:linear-gradient(100deg,#06b6d4,#10b981 52%,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent;}
.abt-hero .sub{margin-top:28px;font-size:clamp(17px,2vw,22px);line-height:1.55;color:#aeb4c0;max-width:52ch;}

/* ===== 2. WHY WE EXIST ===== */
.abt-why{padding:clamp(90px,12vw,150px) 0;background:#fff;}
.abt-why h2{font-size:clamp(30px,4.4vw,56px);line-height:1.03;max-width:16ch;}
.abt-why p{margin-top:26px;font-size:clamp(17px,2vw,22px);line-height:1.65;color:#42474f;max-width:62ch;}
.abt-why p b{font-weight:600;color:var(--v4-ink);}
.abt-why .pull{margin-top:clamp(40px,5vw,58px);padding-left:clamp(20px,3vw,30px);border-left:3px solid #10b981;font-size:clamp(23px,3vw,38px);font-weight:600;letter-spacing:-.025em;line-height:1.18;color:var(--v4-ink);max-width:24ch;}

/* ===== 3. WHO WE ARE ===== */
.abt-us{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream);}
.abt-us .us-lead{max-width:680px;margin:0 0 clamp(44px,6vw,70px);}
.abt-us .us-lead h2{margin-top:14px;font-size:clamp(28px,4.2vw,54px);line-height:1.04;}
.abt-us .us-lead p{margin-top:16px;font-size:clamp(17px,1.9vw,20px);line-height:1.6;color:#6b7280;}
.f{display:grid;grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr);gap:clamp(32px,6vw,72px);align-items:start;padding:clamp(44px,6vw,72px) 0;border-top:1px solid #e2e2dc;}
.f:first-of-type{border-top:0;padding-top:0;}
.f .who img{width:100%;max-width:280px;aspect-ratio:1/1;object-fit:cover;border-radius:24px;display:block;box-shadow:0 34px 70px -40px rgba(6,12,20,.55);transition:transform .5s cubic-bezier(.16,1,.3,1);}
.f .who:hover img{transform:translateY(-4px) scale(1.01);}
.f .who .nm{margin-top:20px;font-size:24px;font-weight:600;letter-spacing:-.03em;color:var(--v4-ink);}
.f .who .ro{margin-top:5px;font-size:14px;font-weight:600;letter-spacing:.02em;color:#059669;}
.f .lens{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9298a1;}
.f blockquote{margin:12px 0 0;font-size:clamp(21px,2.6vw,31px);font-weight:600;letter-spacing:-.028em;line-height:1.27;color:var(--v4-ink);}
.f .bio{margin-top:26px;font-size:15px;line-height:1.7;color:#7a808a;}
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

/* ===== 6. CLOSER ===== */
.abt-close{text-align:center;padding:clamp(100px,14vw,180px) 0;background:#fff;}
.abt-close h2{font-size:clamp(32px,5vw,66px);line-height:1.02;max-width:18ch;margin:0 auto;}
.abt-close p{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#52565e;max-width:48ch;}
.abt-close .cta{margin-top:36px;}
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

      {/* 2 — WHY WE EXIST */}
      <section className="abt-why">
        <div className="wrap narrow">
          <div className="eyebrow">Why we exist</div>
          <h2 style={{ marginTop: 14 }}>The best businesses we know are the worst-served customers in the world.</h2>
          <p>
            An owner-operator is brilliant at the work and stranded at the front of it. Not because
            they are disorganised. Because <b>you cannot answer the phone while you are under a
            sink</b>, and nobody has ever sold them a real way out. The industry has spent twenty
            years selling them software instead, and every tool they buy adds a job to the pile they
            are already drowning in.
          </p>
          <p>
            A hundred-person company does not beat them on talent. It beats them on coverage. It has
            people paid to answer, to book, to chase, to follow up. That coverage has always been for
            sale. It has just never been for sale to <b>them</b>.
          </p>
          <div className="pull">So we decided to sell it to them. Not as software. As the work, done.</div>
        </div>
      </section>

      {/* 3 — WHO WE ARE */}
      <section className="abt-us">
        <div className="wrap">
          <div className="us-lead">
            <div className="eyebrow">Who we are</div>
            <h2>Two people. One of us saw it from the outside, one from the inside.</h2>
            <p>
              That is the whole company, and it is the entire qualification. We are not a fund, a
              franchise, or an agency with a hundred logos on the wall.
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
                great while helping others realize their own dream, and get back time for the things
                they love.&rdquo;
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
              <img src="/photos/jacob.jpg" alt="Jacob Charendoff, co-founder of StayBookt" width={280} height={280} />
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

      {/* 4 — WHY WE ARE DOING THIS */}
      <section className="abt-org">
        <div className="wrap narrow">
          <div className="eyebrow">Why we are doing this</div>
          <h2>We kept having the same conversation in different rooms.</h2>
          <p>
            One of us was inside a company where nothing gets dropped, watching how much of that is
            simply five people being paid to catch things. One of us was outside, sitting across from
            owner after owner who was excellent at the work and quietly bleeding money at every point
            around it. Different vantage points, same conclusion, for years.
          </p>
          <p>
            Eventually the thing you keep noticing becomes the thing you are supposed to go and fix.
            We could have built another dashboard. There are hundreds of those, and every one of them
            hands the owner more work. So we built the other thing: we do the work ourselves.
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

      {/* 6 — CLOSER */}
      <section className="abt-close">
        <div className="wrap">
          <h2>You do the work. We will run the rest.</h2>
          <p>
            Thirty minutes with one of us. Not a sales rep, not a pitch deck. We will tell you
            straight whether this is a fit, and we will tell you if it is not.
          </p>
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
