import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

const SHARE =
  'An owner-operator is the best person in their business at the work, and the worst-placed person to run the front of it. That gap is the reason StayBookt exists.';

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

/* The five people a big company hires to cover the front of the business, and
 * that an owner-operator cannot hire even one of. */
const FIVE = [
  { r: 'A receptionist', d: 'So the phone never rings out.' },
  { r: 'A dispatcher', d: 'So the job lands on the calendar and the customer knows you are coming.' },
  { r: 'Someone to chase the quotes', d: 'So a maybe turns into a yes or a no, not into silence.' },
  { r: 'Someone to build the reputation', d: 'So the reviews and referrals actually get asked for.' },
  { r: 'Someone to tell you what is working', d: 'So you are not guessing where the work comes from.' },
];

const BELIEFS = [
  {
    h: 'We are operators, not a software company.',
    p: 'We do not hand you a dashboard and wish you luck. We do the work. If you ever feel like you are operating software, we have built the wrong thing.',
  },
  {
    h: 'The owner stays in charge.',
    p: 'We take the busywork, not the business. Your prices, your standards, your name, your customers. We run the front so you can run the thing you actually own.',
  },
  {
    h: 'We would rather lose the sale.',
    p: 'If the honest answer is that you do not need us, we will say so on the call. Selling an owner-operator something they do not need is not a business, it is a favour we take back later.',
  },
  {
    h: 'We only get properly paid if you get free.',
    p: 'The monthly keeps the lights on. The real money comes from the value we create in your business, and only when you cash it in. If the number does not move, we do not get paid.',
  },
];

const CSS = `
.abt{background:#fff;color:var(--v4-ink);}
.abt .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.abt .narrow{max-width:760px;margin:0 auto;}
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
.abt-hero p{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.5;color:#aeb4c0;max-width:50ch;}

/* the problem */
.abt-prob{padding:clamp(80px,11vw,150px) 0;background:#fff;}
.abt-prob h2{font-size:clamp(32px,5vw,66px);line-height:1.02;max-width:15ch;}
.abt-prob .p{margin-top:26px;font-size:clamp(18px,2vw,22px);line-height:1.6;color:#42474f;max-width:62ch;}
.abt-prob .p + .p{margin-top:22px;}
.abt-prob .p b{font-weight:600;color:var(--v4-ink);}
.abt-prob .pull{margin:clamp(38px,5vw,56px) 0;padding-left:clamp(20px,3vw,30px);border-left:3px solid #10b981;font-size:clamp(22px,2.8vw,34px);font-weight:600;letter-spacing:-.02em;line-height:1.2;color:var(--v4-ink);max-width:24ch;}

/* the five */
.abt-five{background:var(--v4-cream);padding:clamp(80px,11vw,140px) 0;}
.abt-five .hd{max-width:640px;}
.abt-five .hd h2{margin-top:14px;font-size:clamp(28px,4vw,52px);line-height:1.05;}
.abt-five .hd p{margin-top:16px;font-size:17px;line-height:1.6;color:#6b7280;}
.abt-five ol{list-style:none;margin:clamp(36px,5vw,54px) 0 0;padding:0;}
.abt-five li{display:grid;grid-template-columns:34px 1fr;gap:16px;align-items:baseline;padding:20px 0;border-top:1px solid #e6e6e1;}
.abt-five li .n{font-size:13px;font-weight:700;color:#c0c4c8;}
.abt-five li .r{font-size:clamp(19px,2.2vw,26px);font-weight:600;letter-spacing:-.02em;color:var(--v4-ink);}
.abt-five li .d{margin-top:5px;font-size:16px;line-height:1.55;color:#6b7280;}
.abt-five .kick{margin-top:clamp(34px,4vw,48px);font-size:clamp(19px,2.3vw,27px);font-weight:600;letter-spacing:-.02em;line-height:1.3;color:var(--v4-ink);max-width:34ch;}
.abt-five .kick .g{background:linear-gradient(100deg,#06b6d4,#10b981 55%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* founders */
.abt-us{padding:clamp(80px,11vw,140px) 0;}
.f{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(32px,6vw,72px);align-items:start;padding:clamp(40px,6vw,72px) 0;border-top:1px solid #ececf0;}
.f:first-of-type{border-top:0;padding-top:0;}
.f .who img{width:100%;max-width:280px;aspect-ratio:1/1;object-fit:cover;border-radius:24px;display:block;box-shadow:0 34px 70px -40px rgba(6,12,20,.55);}
.f .who .nm{margin-top:20px;font-size:24px;font-weight:600;letter-spacing:-.03em;color:var(--v4-ink);}
.f .who .ro{margin-top:5px;font-size:14px;font-weight:600;letter-spacing:.02em;color:#059669;}
.f .lens{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9298a1;}
.f blockquote{margin:12px 0 0;font-size:clamp(21px,2.5vw,30px);font-weight:600;letter-spacing:-.025em;line-height:1.3;color:var(--v4-ink);}
.f .bio{margin-top:26px;font-size:16.5px;line-height:1.65;color:#52565e;}
.f .bio + .bio{margin-top:16px;}
@media(max-width:820px){.f{grid-template-columns:1fr;gap:26px;}.f .who img{max-width:200px;}}

/* together */
.abt-tog{background:#050506;color:#f5f5f7;padding:clamp(90px,12vw,160px) 0;text-align:center;position:relative;overflow:hidden;}
.abt-tog::before{content:'';position:absolute;inset:0;background:radial-gradient(55% 60% at 20% 0%,rgba(6,182,212,.14),transparent 60%),radial-gradient(55% 60% at 85% 110%,rgba(16,185,129,.14),transparent 60%);pointer-events:none;}
.abt-tog .wrap{position:relative;}
.abt-tog .eyebrow{color:#86868b;}
.abt-tog h2{margin-top:16px;color:#f5f5f7;font-size:clamp(30px,4.6vw,60px);line-height:1.05;max-width:20ch;margin-left:auto;margin-right:auto;}
.abt-tog p{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.6;color:#aeb4c0;max-width:52ch;}
.abt-tog .spread{margin-top:30px;font-size:clamp(17px,2vw,21px);font-weight:600;color:#5eead4;}

/* beliefs */
.abt-bel{padding:clamp(80px,11vw,140px) 0;background:var(--v4-cream);}
.abt-bel .hd{text-align:center;max-width:600px;margin:0 auto clamp(40px,5vw,58px);}
.abt-bel .hd h2{margin-top:14px;font-size:clamp(30px,4.2vw,52px);line-height:1.05;}
.abt-bel .grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
.abt-bel .c{background:#fff;border:1px solid #e9e9e5;border-radius:22px;padding:clamp(26px,3.2vw,36px);box-shadow:0 26px 54px -44px rgba(6,12,20,.4);}
.abt-bel .c h3{font-size:20px;line-height:1.25;}
.abt-bel .c p{margin-top:12px;font-size:15.5px;line-height:1.6;color:#6b7280;}
@media(max-width:820px){.abt-bel .grid{grid-template-columns:1fr;}}

/* closer */
.abt-close{text-align:center;padding:clamp(100px,14vw,180px) 0;background:#fff;}
.abt-close h2{font-size:clamp(34px,5.4vw,72px);line-height:1.0;max-width:16ch;margin:0 auto;}
.abt-close p{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#52565e;max-width:44ch;}
.abt-close .cta{margin-top:34px;}
`;

export default function AboutPage() {
  return (
    <main className="abt">
      <style>{CSS}</style>
      <Nav />

      <header className="abt-hero">
        <div className="wrap">
          <div className="eyebrow">About us</div>
          <h1>We built this for the person we kept meeting.</h1>
          <p>
            One of us saw the problem from the outside, standing next to owners. One of us saw it
            from the inside, running the operation at scale. It was the same problem.
          </p>
        </div>
      </header>

      {/* THE PROBLEM WORTH SOLVING */}
      <section className="abt-prob">
        <div className="wrap narrow">
          <div className="eyebrow">The problem worth solving</div>
          <h2 style={{ marginTop: 14 }}>Nobody is minding the front.</h2>

          <p className="p">
            An owner-operator is the best person in the business at the actual work, and the
            worst-placed person in the world to run the front of it. <b>You cannot answer the phone
            from under a sink.</b> You cannot chase a quote from the top of a ladder.
          </p>
          <p className="p">
            So the call rings out at 6:47 on a Tuesday, and the person on the other end simply calls
            the next name on the list. The quote you sent on Thursday goes quiet, and you never find
            out why. The customer you did a beautiful job for forgets your name in eighteen months.
            Every one of those is money that was already yours, walking out the door.
          </p>

          <div className="pull">None of that is a failure of skill. It is a failure of coverage.</div>

          <p className="p">
            A company with a hundred people does not have this problem, because it hired its way out
            of it. It has a person answering the phone, a person putting jobs on the calendar, a
            person chasing the quotes, a person building the reputation, and a person reading the
            numbers back to the boss.
          </p>
          <p className="p">
            An owner-operator cannot afford one of those hires, let alone five. So they do all five
            jobs themselves, badly, at nine o&apos;clock at night, after a full day of the work they
            are actually good at. And then they wonder why the business feels the same every year.
          </p>
        </div>
      </section>

      {/* THE FIVE */}
      <section className="abt-five">
        <div className="wrap narrow">
          <div className="hd">
            <div className="eyebrow">What it would take</div>
            <h2>The five people you cannot hire.</h2>
            <p>
              This is the front office of a real company. It is also the exact list of jobs an
              owner-operator is doing on their phone, in the truck, between calls.
            </p>
          </div>
          <ol>
            {FIVE.map((f, i) => (
              <li key={f.r}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="r">{f.r}</span>
                  <span className="d" style={{ display: 'block' }}>
                    {f.d}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <p className="kick">
            StayBookt is not a tool for doing those five jobs faster.{' '}
            <span className="g">It is the five people.</span>
          </p>
        </div>
      </section>

      {/* THE TWO OF US */}
      <section className="abt-us">
        <div className="wrap">
          {/* RICHARD */}
          <div className="f">
            <div className="who">
              <img src="/photos/richard.jpg" alt="Richard Roos, co-founder of StayBookt" width={280} height={280} />
              <div className="nm">Richard Roos</div>
              <div className="ro">Operations, growth, and finance</div>
            </div>
            <div>
              <div className="lens">The view from the inside</div>
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
              <p className="bio">
                Richard has spent his career doing, at scale, the exact thing an owner-operator never
                gets to do: measure every customer touchpoint, find every leak, and turn every job
                into the next one. That discipline is what a big company takes for granted. It is
                what StayBookt hands to a business with one truck.
              </p>
            </div>
          </div>

          {/* JACOB */}
          <div className="f">
            <div className="who">
              <img src="/photos/jacob.jpg" alt="Jacob Charendoff, co-founder of StayBookt" width={280} height={280} />
              <div className="nm">Jacob Charendoff</div>
              <div className="ro">Brand, product, and growth</div>
            </div>
            <div>
              <div className="lens">The view from the outside</div>
              <blockquote>
                &ldquo;I kept meeting people who were brilliant at the work and losing money at
                everything around it. Not because they were careless. Because there was nobody there
                to catch it.&rdquo;
              </blockquote>
              <p className="bio">
                A decade spent standing next to service business owners across health, hospitality,
                software, retail, and the trades. Different industries, same conversation, every
                time. The owner is excellent. The work is excellent. And the business quietly leaks
                customers between the phone call and the booked job.
              </p>
              <p className="bio">
                Jacob runs the outside game: making a business impossible to miss and effortless to
                hire, then turning that first impression into a system the owner can finally hand
                off. If the front of your business feels like it belongs to someone twice your size,
                that is the point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOGETHER */}
      <section className="abt-tog">
        <div className="wrap">
          <div className="eyebrow">Why the two of us</div>
          <h2>One builds the demand. One builds the operation.</h2>
          <p>
            We kept describing the same broken thing from opposite ends of the room. Owners running
            smart businesses, leaving real money on the table, with no path to the kind of operating
            discipline a corporation takes for granted. So we stopped talking about it and built it.
          </p>
          <p className="spread">Executive results you can actually afford. Two trucks or two laptops.</p>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="abt-bel">
        <div className="wrap">
          <div className="hd">
            <div className="eyebrow">How we work</div>
            <h2>What you can hold us to.</h2>
          </div>
          <div className="grid">
            {BELIEFS.map((b) => (
              <div className="c" key={b.h}>
                <h3>{b.h}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSER */}
      <section className="abt-close">
        <div className="wrap">
          <h2>You do the work. We will run the rest.</h2>
          <p>
            Thirty minutes with one of us. Not a sales rep, not a pitch deck. We will tell you
            straight whether this is a fit.
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
