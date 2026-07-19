import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';
import { min } from '@/lib/css';

export const metadata = { title: 'Page not found' };

/* THERE WAS NO 404. Every other surface on this site is designed; a mistyped URL got Next's
 * bare default — no nav, no wordmark, no way back. The ghost routes in next.config.ts cover
 * the legacy URLs we know about, so anything reaching here is a genuine typo or a link that
 * rotted. Give them the door, not a dead end. */
export default function NotFound() {
  return (
    <div className="v4" style={{ background: '#050506', minHeight: '100vh' }}>
      <style>{min(`
        /* HEADER. Everything else is .pg-hero in globals.css. A mistyped URL gets the
           same header as a real page, which is the point of having one.
           Cyan: this is a wayfinding page, the Get Found rung. */
        .pg-hero{--hero-hue:6,182,212;}
        .nf-go{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:32px;}
        .nf-go a{display:inline-flex;align-items:center;border-radius:999px;padding:13px 22px;
          font-size:15px;font-weight:600;text-decoration:none;transition:transform .2s ease;}
        .nf-go a:hover{transform:translateY(-1px);}
        .nf-go .p{background:#fff;color:#06080d;}
        .nf-go .s{background:rgba(255,255,255,.08);color:#eef1f6;border:1px solid rgba(255,255,255,.18);}
      `)}</style>
      <Nav />
      <main id="main" tabIndex={-1}>
      <section className="pg-hero">
        <div className="wrap">
          <div className="eyebrow">404</div>
          <h1>That page <span className="g">is not here.</span></h1>
          <p>
            Either we moved it or the link was wrong. Nothing is broken on your end. Most people
            who land here want one of these two.
          </p>
          <div className="nf-go">
            <a className="p" href={START_LINK}>Get Started</a>
            <a className="s" href="/how-it-works">See how it works</a>
          </div>
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  );
}
