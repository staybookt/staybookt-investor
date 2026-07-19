import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import Matrix from '@/components/v4/Matrix';
import IncludedFaq from '@/components/v4/IncludedFaq';
import HeroCta from '@/components/v4/HeroCta';
import { min } from '@/lib/css';

/* THE PEXELS PHOTO HERO IS GONE. This page and /how-it-works were the only two
 * running a full-bleed still behind the headline, and they were the reason the set
 * read as two different websites: every other page was a 190px dark header. The
 * header is the shared .pg-hero in globals.css now, and the only thing this page
 * says about it is its hue. The photo bought atmosphere and cost the page a 2000px
 * third-party image above the fold. */

const SHARE =
  'The whole list. Everything $199 a month actually buys, what you still do, and the things we do not do.';

export const metadata = {
  title: "What's included",
  description: SHARE,
  alternates: { canonical: '/whats-included' },
  openGraph: {
    /* Defining openGraph WITHOUT images suppresses the inherited app/opengraph-image.tsx,
       so this page shared as a bare grey rectangle. Every page needs its own images line. */
    images: ['/opengraph-image'],
    title: "What's included · StayBookt",
    description: SHARE,
    url: 'https://www.staybookt.com/whats-included',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: "What's included · StayBookt", description: SHARE },
};





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
.inc .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.inc h1,.inc h2,.inc h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.inc-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 30px;text-decoration:none;transition:transform .3s ease;}
.inc-btn:hover{transform:translateY(-1px);}

/* HERO. Everything else is .pg-hero in globals.css. Emerald: this is the page that
   lists what we actually run for you, which is the StayBookt half of the ladder. */
.pg-hero{--hero-hue:16,185,129;}





`;



export default function WhatsIncludedPage() {
  return (
    <div className="inc">
      <style>{min(CSS)}</style>
      <Nav />
      <main id="main" tabIndex={-1}>

      <header className="pg-hero">
        <div className="wrap">
          <div className="eyebrow">What&apos;s included</div>
          <h1>What you get for <span className="g">$199</span>.</h1>
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
      {/* THE "UNDER THE HOOD" SECTION IS GONE (Richard, review, July 2026: "I don't think
          the customer record section works. I would be inclined to just go with the top
          chart and keep it simple. Don't think you gain enough from the extra
          complexity.").

          He is right, and it got cheaper to agree with him: the two things worth keeping
          out of that section, the assistant and the one customer record, are now rows in
          the chart itself. So the section was three mockups restating what the table above
          them already said.

          It takes the illustration disclaimer with it, and that is the correct way to lose
          a disclaimer: by removing the illustrations, not by deciding the disclaimer is
          clutter. Promise 5 still stands, and the homepage still carries its own. */}

      {/* THE THREE PROSE SECTIONS ARE GONE (Jacob, July 14 2026): "Is it AI or a real
          person" (three fat cards), "What you still do / What you own forever" (two
          columns) and "What we do not do" (six cards). About twelve blocks of prose.

          None of them were sections. They were ANSWERS TO QUESTIONS a buyer is already
          asking in his head, written out as paragraphs. So they are questions now, in
          the accordion pattern /how-it-works already uses. Nothing was cut: every one
          of those answers is in there, and the best line we own survived intact. */}
      <IncludedFaq />

      {/* The closer used to be a bare headline and a button on white. It is now the
          same CTA banner the homepage ends on, so every page lands the same way. */}
      <HeroCta />

      </main>

      <SiteFooter />
    </div>
  );
}
