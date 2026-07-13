'use client';

import { useEffect, useState } from 'react';

/* Shared shell for the legal pages. Dark hero, sticky index, light body.
 * Same skin as the rest of the site: legal pages that look like they belong to
 * the company are themselves a trust signal. Most companies bury these in a
 * grey template and it reads exactly like what it is. */

export type Section = { id: string; h: string; body: React.ReactNode };

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: Section[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        const vis = es
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-100px 0px -65% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <>
      <style>{CSS}</style>

      <header className="lg-hero">
        <div className="wrap">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p className="lg-intro">{intro}</p>
          <div className="lg-upd">Last updated {updated}</div>
        </div>
      </header>

      <section className="lg-body">
        <div className="wrap lg-grid">
          <nav className="lg-idx" aria-label="Contents">
            <div className="lg-idx-k">Contents</div>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={active === s.id ? 'on' : ''}>
                    <span className="n">{String(i + 1).padStart(2, '0')}</span>
                    {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="lg-main">
            {sections.map((s, i) => (
              <section className="lg-s" id={s.id} key={s.id}>
                <div className="lg-s-n">{String(i + 1).padStart(2, '0')}</div>
                <h2>{s.h}</h2>
                <div className="lg-s-b">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const CSS = `
.lg-hero{position:relative;background:#050506;padding:clamp(140px,17vh,190px) 0 clamp(60px,7vw,90px);overflow:hidden;}
.lg-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(58% 46% at 22% 0%,rgba(16,185,129,.1),transparent 62%);pointer-events:none;}
.lg-hero .wrap{position:relative;z-index:1;}
.lg-hero .eyebrow{color:#c9cdd6;}
.lg-hero h1{margin-top:16px;font-size:clamp(38px,5.6vw,72px);font-weight:600;letter-spacing:-.04em;line-height:1.02;color:#fff;max-width:16ch;}
.lg-intro{margin-top:24px;font-size:clamp(17px,1.95vw,21px);line-height:1.6;color:#aeb4c0;max-width:58ch;}
.lg-upd{margin-top:28px;font-size:13px;font-weight:600;letter-spacing:.02em;color:#5c6470;}

.lg-body{background:#fff;padding:clamp(70px,9vw,110px) 0 clamp(90px,12vw,150px);}
.lg-grid{display:grid;grid-template-columns:240px minmax(0,1fr);gap:clamp(40px,6vw,90px);align-items:start;}
@media(max-width:900px){.lg-grid{grid-template-columns:1fr;gap:36px;}}

.lg-idx{position:sticky;top:clamp(96px,12vh,124px);}
@media(max-width:900px){.lg-idx{position:static;}}
.lg-idx-k{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#9298a1;}
.lg-idx ol{list-style:none;margin:16px 0 0;padding:0;display:flex;flex-direction:column;}
.lg-idx a{display:grid;grid-template-columns:28px minmax(0,1fr);gap:8px;padding:8px 0;font-size:14px;line-height:1.4;
  color:#8a8f98;text-decoration:none;transition:color .25s ease;}
.lg-idx a .n{font-size:11px;font-weight:700;color:#c9cdd0;padding-top:2px;transition:color .25s ease;}
.lg-idx a:hover{color:var(--v4-ink);}
.lg-idx a.on{color:var(--v4-ink);font-weight:600;}
.lg-idx a.on .n{color:#10b981;}

.lg-s{scroll-margin-top:110px;padding-bottom:clamp(44px,5vw,64px);}
.lg-s + .lg-s{padding-top:clamp(44px,5vw,64px);border-top:1px solid #ececf0;}
.lg-s-n{font-size:12px;font-weight:700;letter-spacing:.14em;color:#c0c4c8;}
.lg-s h2{margin-top:10px;font-size:clamp(23px,2.8vw,34px);font-weight:600;letter-spacing:-.03em;line-height:1.18;color:var(--v4-ink);max-width:22ch;}
.lg-s-b{margin-top:20px;}
.lg-s-b p{margin:0 0 16px;font-size:16.5px;line-height:1.7;color:#42474f;max-width:66ch;}
.lg-s-b p:last-child{margin-bottom:0;}
.lg-s-b b{font-weight:600;color:var(--v4-ink);}
.lg-s-b a{color:#0284c7;text-decoration:none;font-weight:600;}
.lg-s-b a:hover{text-decoration:underline;}
.lg-s-b ul{list-style:none;margin:0 0 16px;padding:0;}
.lg-s-b li{display:grid;grid-template-columns:16px minmax(0,1fr);gap:12px;padding:7px 0;font-size:16.5px;line-height:1.6;color:#42474f;max-width:66ch;}
.lg-s-b li::before{content:'';width:6px;height:6px;border-radius:50%;background:#10b981;margin-top:10px;}
.lg-s-b .note{margin-top:18px;border-left:3px solid #10b981;padding:2px 0 2px 18px;font-size:16px;line-height:1.6;color:var(--v4-ink);font-weight:500;max-width:60ch;}
`;
