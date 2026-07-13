import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import CalEmbed from '@/components/v4/CalEmbed';
import MysteryShop from '@/components/v4/MysteryShop';
import SiteFooter from '@/components/SiteFooter';

const SHARE_DESCRIPTION =
  'Before we meet, we try to hire you. We call, we text, we look you up, we try to book a job. Then we spend thirty minutes showing you exactly what happened. Free, no pitch, yours to keep.';

export const metadata = {
  title: 'We tried to hire you',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/start' },
  openGraph: {
    title: 'We tried to hire you · StayBookt',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com/start',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We tried to hire you · StayBookt',
    description: SHARE_DESCRIPTION,
  },
};

/* The thirty minutes, accounted for. This section exists because the honest
 * question is: how could you possibly deliver all that in half an hour?
 * Answer: the work happens before the call. The call is the readout. */
const CLOCK: { t: string; nm: string; p: string }[] = [
  {
    t: '0 – 8',
    nm: 'We play you the tape.',
    p: 'What happened when we called, texted, searched, and tried to book. Rings, replies, ranking, and the exact point where a real customer would have given up.',
  },
  {
    t: '8 – 18',
    nm: 'We put a number on it.',
    p: 'Your call volume, your average job, your close rate. We do the arithmetic live, in front of you. Most owners have never seen the gap costed out.',
  },
  {
    t: '18 – 26',
    nm: 'We show you it fixed.',
    p: 'The same four tests, with someone actually minding the front. What changes, what it takes, and what it costs.',
  },
  {
    t: '26 – 30',
    nm: 'We give you a straight answer.',
    p: 'Whether this is a fit. If the honest answer is that you do not need us, you will hear that, and you still keep everything above.',
  },
];

export default function StartPage() {
  return (
    <main className="v4">
      <style>{`
.v4 .startfacts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:34px;max-width:820px;}
.v4 .startfacts .sf{border-left:2px solid rgba(255,255,255,.18);padding:4px 0 4px 16px;}
.v4 .startfacts .sf-k{font-size:15px;font-weight:600;color:#fff;letter-spacing:-.01em;}
.v4 .startfacts .sf-v{margin-top:5px;font-size:14px;line-height:1.45;color:#98a0ae;}
@media(max-width:760px){.v4 .startfacts{grid-template-columns:1fr;gap:12px;}}

/* the thirty minutes */
.v4 .clock{margin-top:clamp(44px,6vw,68px);max-width:880px;}
.v4 .clk{display:grid;grid-template-columns:96px minmax(0,1fr);gap:clamp(16px,3vw,34px);padding:26px 0;border-top:1px solid rgba(255,255,255,.1);}
.v4 .clk:first-child{border-top:0;padding-top:0;}
.v4 .clk-t{font-size:14px;font-weight:600;color:#10b981;font-variant-numeric:tabular-nums;letter-spacing:.02em;padding-top:5px;}
.v4 .clk-nm{font-size:clamp(20px,2.3vw,27px);font-weight:600;letter-spacing:-.028em;color:#fff;line-height:1.22;}
.v4 .clk-p{margin-top:9px;font-size:16.5px;line-height:1.6;color:#9ba2ae;max-width:54ch;}
@media(max-width:640px){.v4 .clk{grid-template-columns:1fr;gap:8px;}.v4 .clk-t{padding-top:0;}}
.v4 .clk-note{margin-top:clamp(34px,4.4vw,48px);padding-left:22px;border-left:3px solid #10b981;font-size:clamp(18px,2.1vw,24px);font-weight:600;letter-spacing:-.02em;line-height:1.35;color:#fff;max-width:40ch;}
.v4 .clk-note span{color:#9ba2ae;font-weight:400;display:block;margin-top:8px;font-size:16px;letter-spacing:0;line-height:1.55;}

/* who you're talking to */
.v4 .whos{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,52px);margin-top:clamp(40px,5vw,60px);}
@media(max-width:760px){.v4 .whos{grid-template-columns:1fr;}}
.v4 .wh{display:flex;gap:18px;align-items:flex-start;}
.v4 .wh img{width:84px;height:84px;flex:0 0 auto;border-radius:18px;object-fit:cover;box-shadow:0 24px 44px -28px rgba(6,12,20,.5);}
.v4 .wh-nm{font-size:19px;font-weight:600;letter-spacing:-.025em;color:var(--v4-ink);}
.v4 .wh-ro{margin-top:3px;font-size:13.5px;font-weight:600;color:var(--v4-green-d);}
.v4 .wh-p{margin-top:9px;font-size:15px;line-height:1.55;color:var(--v4-muted);max-width:32ch;}
.v4 .whos-note{margin-top:clamp(32px,4vw,44px);font-size:clamp(18px,2.1vw,24px);font-weight:600;letter-spacing:-.02em;line-height:1.35;color:var(--v4-ink);max-width:34ch;}
      `}</style>
      <Nav />

      {/* HERO */}
      <section className="dark" style={{ paddingBottom: 'clamp(90px,12vw,150px)' }}>
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            <span style={{ color: '#8b93a5' }}>Free &middot; no pitch</span>
          </Reveal>
          <Reveal>
            <h1
              style={{
                marginTop: 18,
                fontSize: 'clamp(44px,7.4vw,104px)',
                color: '#fff',
                maxWidth: '13ch',
                letterSpacing: '-.045em',
                lineHeight: '.98',
                fontWeight: 700,
              }}
            >
              We tried to hire you.
            </h1>
          </Reveal>
          <Reveal>
            <p className="sub">
              Before we ever meet, we become a customer. We call your line. We text your listing. We
              search for you the way a stranger with a problem would. And we try to book a job. Then
              we sit down for thirty minutes and show you exactly what happened.
            </p>
          </Reveal>
          <Reveal>
            <div className="startfacts">
              <div className="sf">
                <div className="sf-k">30 minutes</div>
                <div className="sf-v">That is the whole ask.</div>
              </div>
              <div className="sf">
                <div className="sf-k">With a founder</div>
                <div className="sf-v">Richard or Jacob. Never a sales rep.</div>
              </div>
              <div className="sf">
                <div className="sf-k">Yours to keep</div>
                <div className="sf-v">Whether you hire us or not.</div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 34 }}>
              <a href="#book" className="pill pill-white" style={{ padding: '14px 28px', fontSize: 15 }}>
                Pick a time
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="seam seam-dark-to-light" aria-hidden="true" />

      {/* THE MYSTERY SHOP */}
      <section className="light">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            Before the call
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 16, maxWidth: '17ch' }}>
              Four attempts to give you money.
            </h2>
          </Reveal>
          <Reveal>
            <p
              style={{
                marginTop: 18,
                fontSize: 'clamp(17px,1.95vw,21px)',
                lineHeight: 1.6,
                color: 'var(--v4-muted)',
                maxWidth: '58ch',
              }}
            >
              This is not a report we generate from public data. We do the four things a customer
              does, on a normal working day, and we write down what happens. It takes us a few hours.
              It takes you nothing.
            </p>
          </Reveal>

          <Reveal>
            <MysteryShop />
          </Reveal>
        </div>
      </section>

      <div className="seam seam-light-to-dark" aria-hidden="true" />

      {/* THE THIRTY MINUTES */}
      <section className="dark">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            <span style={{ color: '#8b93a5' }}>The thirty minutes</span>
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 14, color: '#fff', maxWidth: '18ch' }}>
              The work is already done when you sit down.
            </h2>
          </Reveal>
          <Reveal>
            <p
              style={{
                marginTop: 18,
                fontSize: 'clamp(17px,1.95vw,21px)',
                lineHeight: 1.6,
                color: '#9ba2ae',
                maxWidth: '56ch',
              }}
            >
              Half an hour is not enough time to study a business. It is exactly enough time to hand
              one back to its owner. Here is where every minute goes.
            </p>
          </Reveal>

          <div className="clock">
            {CLOCK.map((c) => (
              <Reveal key={c.t} className="clk">
                <div className="clk-t">{c.t} min</div>
                <div>
                  <div className="clk-nm">{c.nm}</div>
                  <p className="clk-p">{c.p}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="clk-note">
              You are not booking a demo.
              <span>
                You are booking the readout of work we have already finished. Nothing to prepare,
                nothing to send us, no login to hand over.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="seam seam-dark-to-light" aria-hidden="true" />

      {/* WHO YOU'RE TALKING TO */}
      <section className="light">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            Who is on the call
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 16, maxWidth: '16ch' }}>
              There are two of us. You get one of us.
            </h2>
          </Reveal>
          <Reveal>
            <p
              style={{
                marginTop: 18,
                fontSize: 'clamp(17px,1.95vw,21px)',
                lineHeight: 1.6,
                color: 'var(--v4-muted)',
                maxWidth: '56ch',
              }}
            >
              StayBookt is two people. Whichever one you get, you are talking to a founder who did
              the mystery shop himself and can be held to every word of it.
            </p>
          </Reveal>

          <div className="whos">
            <Reveal className="wh">
              <img src="/photos/richard.jpg" alt="Richard Roos, co-founder of StayBookt" width={84} height={84} />
              <div>
                <div className="wh-nm">Richard Roos</div>
                <div className="wh-ro">Operations, growth, and finance</div>
                <p className="wh-p">
                  Two decades running the front of a service business at scale, and a CPA. He will
                  be the one costing out the gap.
                </p>
              </div>
            </Reveal>
            <Reveal className="wh">
              <img src="/photos/jacob.jpg" alt="Jacob Charendoff, co-founder of StayBookt" width={84} height={84} />
              <div>
                <div className="wh-nm">Jacob Charendoff</div>
                <div className="wh-ro">Brand, product, and growth</div>
                <p className="wh-p">
                  A decade standing next to owners across half a dozen industries. He will be the one
                  who tried to hire you.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="whos-note">
              No handoff to a rep. No &ldquo;let me get you with someone.&rdquo;{' '}
              <a href="/founders" style={{ color: 'var(--v4-green-d)', textDecoration: 'none' }}>
                More about us &rarr;
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <div className="seam seam-light-to-dark" aria-hidden="true" />

      {/* BOOK */}
      <section className="dark" id="book" style={{ paddingTop: 'clamp(96px,13vw,160px)' }}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow" style={{ color: '#8b93a5' }}>
              Pick a time
            </div>
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 12, fontSize: 'clamp(32px,4.4vw,60px)', color: '#fff' }}>
              Let us try to hire you.
            </h2>
          </Reveal>
          <Reveal>
            <p style={{ marginTop: 16, fontSize: 'clamp(17px,1.9vw,20px)', lineHeight: 1.5, color: '#aeb4c0', maxWidth: '48ch' }}>
              Book the half hour and we will go to work before it. Whatever we find is yours,
              whether you ever pay us a dollar.
            </p>
          </Reveal>
          <Reveal>
            <div
              style={{
                marginTop: 40,
                background: '#fff',
                borderRadius: 20,
                padding: 'clamp(10px,1.5vw,18px)',
                boxShadow: '0 60px 120px -40px rgba(0,0,0,.6)',
              }}
            >
              <CalEmbed />
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
