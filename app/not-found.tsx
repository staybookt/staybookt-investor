import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

export const metadata = { title: 'Page not found' };

/* THERE WAS NO 404. Every other surface on this site is designed; a mistyped URL got Next's
 * bare default — no nav, no wordmark, no way back. The ghost routes in next.config.ts cover
 * the legacy URLs we know about, so anything reaching here is a genuine typo or a link that
 * rotted. Give them the door, not a dead end. */
export default function NotFound() {
  return (
    <div className="v4" style={{ background: '#050506', minHeight: '100vh' }}>
      <style>{`
        .nf{min-height:100vh;display:flex;align-items:center;justify-content:center;
          text-align:center;padding:120px 24px 80px;position:relative;overflow:hidden;}
        .nf::before{content:'';position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(60% 60% at 50% 0%,rgba(6,182,212,.12),transparent 62%);}
        .nf-in{position:relative;z-index:1;max-width:560px;}
        .nf-k{font-size:12.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
        .nf h1{margin:16px 0 0;font-size:clamp(34px,5vw,60px);font-weight:600;letter-spacing:-.04em;
          line-height:1.05;color:#fff;}
        .nf h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
        .nf p{margin:18px auto 0;font-size:17px;line-height:1.6;color:#aeb6c4;max-width:46ch;}
        .nf-go{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:32px;}
        .nf-go a{display:inline-flex;align-items:center;border-radius:999px;padding:13px 22px;
          font-size:15px;font-weight:600;text-decoration:none;transition:transform .2s ease;}
        .nf-go a:hover{transform:translateY(-1px);}
        .nf-go .p{background:#fff;color:#06080d;}
        .nf-go .s{background:rgba(255,255,255,.08);color:#eef1f6;border:1px solid rgba(255,255,255,.18);}
      `}</style>
      <Nav />
      <main id="main" tabIndex={-1}>
      <section className="nf">
        <div className="nf-in">
          <div className="nf-k">404</div>
          <h1>That page <span className="g">is not here.</span></h1>
          <p>
            Either we moved it or the link was wrong. Nothing is broken on your end. Here are the
            two doors most people want.
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
