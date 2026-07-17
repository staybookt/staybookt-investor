import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK, EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';

/* No contact form. A form implies a queue, a ticket and a "we'll get back to
 * you", which is exactly the experience we say we exist to abolish. There are
 * two of us. You get an email address and a calendar, and a human answers. */

const SHARE = 'Two people, one inbox, one calendar. Email a founder or book thirty minutes.';

export const metadata = {
  title: 'Contact',
  description: SHARE,
  alternates: { canonical: '/contact' },
  openGraph: {
    /* Defining openGraph WITHOUT images suppresses the inherited app/opengraph-image.tsx,
       so this page shared as a bare grey rectangle. Every page needs its own images line. */
    images: ['/opengraph-image'],
    title: 'Contact · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/contact',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'Contact · StayBookt', description: SHARE },
};

const CSS = `
.ct{background:#fff;color:var(--v4-ink);}
.ct .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.ct .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.ct h1,.ct h2{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}

/* hero */
/* Centred to match the standard. Five interior heroes were centred and four were left-
   aligned, and hero alignment is the first thing anybody sees on a page. */
.ct-hero{position:relative;background:#050506;padding:clamp(140px,17vh,190px) 0 clamp(70px,9vw,100px);overflow:hidden;text-align:center;}
.ct-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(58% 46% at 24% 0%,rgba(16,185,129,.13),transparent 62%),radial-gradient(46% 42% at 86% 100%,rgba(79,70,229,.11),transparent 62%);pointer-events:none;}
.ct-hero .wrap{position:relative;z-index:1;}
.ct-hero .eyebrow{color:#c9cdd6;}
.ct-hero h1{margin:16px auto 0;font-size:clamp(38px,5.8vw,76px);line-height:1.02;color:#fff;max-width:15ch;}
.ct-hero h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.ct-hero p{margin:24px auto 0;font-size:clamp(17px,1.95vw,21px);line-height:1.6;color:#aeb4c0;max-width:50ch;}

/* the two ways */
.ct-ways{background:#fff;padding:clamp(70px,9vw,110px) 0;}
.ways{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(16px,2.4vw,24px);}
@media(max-width:820px){.ways{grid-template-columns:1fr;}}
.way{display:flex;flex-direction:column;border:1px solid #e6e6e2;border-radius:24px;padding:clamp(26px,3.4vw,40px);
  background:#fff;box-shadow:0 30px 70px -58px rgba(6,12,20,.5);
  transition:border-color .35s ease,transform .35s ease,box-shadow .35s ease;}
.way:hover{border-color:rgba(16,185,129,.45);transform:translateY(-3px);box-shadow:0 40px 80px -50px rgba(16,185,129,.55);}
.way.dark{background:#050506;border-color:transparent;}
.way .ic{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;
  background:rgba(16,185,129,.12);color:#059669;}
.way.dark .ic{background:rgba(255,255,255,.1);color:#5eead4;}
.way h2{margin-top:22px;font-size:clamp(24px,2.9vw,34px);line-height:1.1;}
.way.dark h2{color:#fff;}
.way p{margin-top:14px;font-size:16px;line-height:1.6;color:#6b7280;max-width:34ch;}
.way.dark p{color:#9ba2ae;}
.way .go{margin-top:auto;padding-top:28px;}
.way .btn{display:inline-flex;align-items:center;gap:9px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;
  border-radius:999px;padding:15px 30px;text-decoration:none;transition:gap .3s ease,transform .3s ease;}
.way .btn:hover{gap:14px;transform:translateY(-1px);}
.way.dark .btn{background:#fff;color:#050506;}
.way .sub{margin-top:14px;font-size:13.5px;color:#9298a1;}
.way.dark .sub{color:#6b7280;}
.way .mail{display:inline-block;font-size:clamp(18px,2.2vw,26px);font-weight:600;letter-spacing:-.02em;color:var(--v4-ink);text-decoration:none;
  border-bottom:2px solid rgba(16,185,129,.35);padding-bottom:3px;transition:border-color .3s ease;}
.way .mail:hover{border-color:#10b981;}
.way .mail.tel{margin-top:24px;}

/* the promise */
.ct-prom{background:var(--v4-cream);padding:clamp(80px,10vw,130px) 0;}
.ct-prom .two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;}
@media(max-width:820px){.ct-prom .two{grid-template-columns:1fr;gap:28px;}}
.ct-prom h2{font-size:clamp(28px,3.8vw,50px);line-height:1.04;max-width:14ch;}
.ct-prom p{font-size:clamp(16px,1.8vw,19px);line-height:1.65;color:#52565e;max-width:46ch;}
.ct-prom p b{font-weight:600;color:var(--v4-ink);}

/* where we are */
.ct-where{background:#050506;padding:clamp(70px,9vw,110px) 0;}
.ct-where .grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(18px,2.6vw,34px);}
@media(max-width:980px){.ct-where .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:30px;}}
@media(max-width:560px){.ct-where .grid{grid-template-columns:1fr;gap:26px;}}
.ct-where .k{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#5c6470;}
.ct-where .v{margin-top:10px;font-size:17px;line-height:1.55;color:#e6e9ee;font-weight:500;}
.ct-where .v a{color:#5eead4;text-decoration:none;}
.ct-where .v span{display:block;margin-top:5px;font-size:14px;font-weight:400;color:#8b93a5;}
`;

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path strokeLinecap="round" d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path strokeLinecap="round" d="M3 10h18M8 3v4M16 3v4" />
      <circle cx="12" cy="15" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="ct v4">
      <style>{CSS}</style>
      <Nav />
      <main id="main" tabIndex={-1}>

      <header className="ct-hero">
        <div className="wrap">
          <div className="eyebrow">Contact</div>
          <h1>
            There are two of us. <span className="g">You get one of us.</span>
          </h1>
          <p>
            No contact form, no ticket number, no &ldquo;a member of our team will be in touch.&rdquo;
            An email address and a calendar, and a founder on the other end of both.
          </p>
        </div>
      </header>

      {/* THE TWO WAYS */}
      <section className="ct-ways">
        <div className="wrap">
          <div className="ways">
            <div className="way dark">
              <span className="ic"><CalIcon /></span>
              <h2>Book thirty minutes.</h2>
              {/* Was the mystery-shop pitch. It is the call, described as the call, which is
                  what our own cal.com booking page has said all along. */}
              <p>
                The best way. Thirty minutes with a founder. We will show you where the work is
                slipping, and what it would take to get your life back.
              </p>
              <div className="go">
                <a className="btn" href={START_LINK}>
                  Pick a time <span aria-hidden>&rarr;</span>
                </a>
                <div className="sub">Free. No slides, and never a sales rep.</div>
              </div>
            </div>

            <div className="way">
              <span className="ic"><MailIcon /></span>
              <h2>Or reach us direct.</h2>
              <p>
                Ask anything. Whether we are a fit, what we would actually do for you, or something
                awkward you would rather ask before you book a call.
              </p>
              <div className="go">
                <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <div className="sub">Goes to both founders. One of us replies.</div>
                <a className="mail tel" href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                <div className="sub">Call it or text it. A founder picks up.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROMISE */}
      <section className="ct-prom">
        <div className="wrap">
          <div className="two">
            <h2>A founder answers. Usually the same day.</h2>
            <p>
              We built a company on the idea that <b>a business that does not answer is leaving money
              on the table</b>. It would be a strange look if we did not answer our own phone.
            </p>
          </div>
        </div>
      </section>

      {/* WHERE WE ARE */}
      <section className="ct-where">
        <div className="wrap">
          <div className="grid">
            <div>
              <div className="k">Email</div>
              <div className="v">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <span>For everything. There is no second inbox.</span>
              </div>
            </div>
            <div>
              <div className="k">Call or text</div>
              <div className="v">
                <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                <span>The same number for both. It rings a founder, not a queue.</span>
              </div>
            </div>
            <div>
              <div className="k">Where we are</div>
              <div className="v">
                Toronto, Ontario
                <span>We work with owner-operated service businesses. We are based in Toronto and we work across Canada.</span>
              </div>
            </div>
            <div>
              <div className="k">Who you get</div>
              <div className="v">
                Richard or Jacob
                <span>The two of us are the whole company. There is nobody else to be passed to.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      <SiteFooter />
    </div>
  );
}
