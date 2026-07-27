'use client';

/* THE JOURNEY PAGE — one owner's year as a pinned scroll film, in the site's own
 * language. Ported from the approved prototype (success-stories-journey.html, Jacob:
 * "Love it!", July 27 2026) after five rejected directions; read the memory
 * (staybookt-success-stories-page / journeys) before redesigning any of this.
 *
 * THE SHAPE (locked):
 *   hero (cream, locked hero format, avatar chip — the avatar IS the imagery; no
 *   full-bleed stock photography, Jacob killed that on review)
 *   → 10-chapter film: leak ledger (ink) → breaking point → the turn → five WINS
 *     (stage melts ink→cream, each win lands as a giant gradient word + stamp pill)
 *     → THE RECEIPT (totals count up scroll-linked; the leak ledger's bookend,
 *     redeemed — this section previously lived after the film as static cards and
 *     Jacob: "this is where I start to lose interest"; folding it into the film as
 *     a chapter was the fix, do not un-fold it)
 *     → payoff + CTA
 *   → quote → FAQ (the site's .pfq pattern exactly; money questions stay on
 *   /pricing per the FAQ territory rule) → the other two journeys as cards.
 *   The page then closes with the sitewide HeroCta (added by the page, not here).
 *
 * All beat motion is scroll-linked and reversible (scrubbed, not fired), which is
 * what keeps it reviewable by keyboard arrows — Richard reviews by keyboard. */

import { useEffect, useRef, useState } from 'react';
import { START_LINK } from '@/lib/site';
import { min } from '@/lib/css';
import { track } from '@/lib/analytics';
import { JOURNEYS, JOURNEY_ORDER } from './journeyData';

const N = 10;

export default function Journey({ id }: { id: string }) {
  const d = JOURNEYS[id];
  const filmRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const lastIdx = useRef(-1);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const others = JOURNEY_ORDER.filter((k) => k !== id).map((k) => JOURNEYS[k]);
  const starIdx = 3 + d.wins.findIndex((w) => w.stars); // -1+3=2 (never matches a win) if none

  const CHAPTERS = ['Before', 'Before', 'The turn', 'The wins', 'The wins', 'The wins', 'The wins', 'The wins', 'The receipt', 'After'];

  useEffect(() => {
    const film = filmRef.current, root = rootRef.current;
    if (!film || !root) return;
    const stage = root.querySelector('.jy-stage') as HTMLElement;
    const bloom = root.querySelector('.jy-bloom') as HTMLElement;
    const hudCh = root.querySelector('.jy-hudch') as HTMLElement;
    const hudCt = root.querySelector('.jy-hudct') as HTMLElement;
    const beats = [...root.querySelectorAll('.jy-beat')] as HTMLElement[];
    const segs = [...root.querySelectorAll('.jy-seg')] as HTMLElement[];
    const leaks = [...root.querySelectorAll('.jy-leak')] as HTMLElement[];
    const stars = root.querySelector('.jy-stars') as HTMLElement | null;
    const cntMoney = root.querySelector('.jy-cnt-money') as HTMLElement;
    const cntTime = root.querySelector('.jy-cnt-time') as HTMLElement;
    const recFlips = [...root.querySelectorAll('.jy-fl')] as HTMLElement[];

    const smooth = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

    const onScroll = () => {
      const h = film.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, (window.scrollY - film.offsetTop) / h));
      const idx = Math.min(N - 1, Math.floor(p * N));
      const s = Math.min(1, Math.max(0, (p - idx / N) * N));

      beats.forEach((b) => {
        const i = +(b.dataset.b as string);
        if (i !== idx) { b.style.opacity = '0'; b.style.pointerEvents = 'none'; return; }
        let o: number, ty: number, sc = 1;
        if (s < 0.22) { const k = smooth(s / 0.22); o = k; ty = (1 - k) * 44; sc = 0.985 + 0.015 * k; }
        else if (s < 0.78) { o = 1; ty = 0; }
        else { const k = smooth((s - 0.78) / 0.22); o = 1 - k; ty = -k * 36; sc = 1 + 0.01 * k; }
        b.style.opacity = String(o);
        b.style.transform = `translateY(${ty}px) scale(${sc})`;
        b.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
      });

      if (idx === 0) leaks.forEach((l, i) => l.classList.toggle('on', s > 0.18 + i * 0.13));
      if (stars) stars.classList.toggle('on', idx === starIdx && s > 0.25);

      if (idx === 8) {
        const k = smooth(Math.min(1, Math.max(0, (s - 0.08) / 0.42)));
        cntMoney.textContent = '$' + Math.round(d.receipt.moneyTo * k).toLocaleString() + (k >= 1 ? '+' : '');
        cntTime.textContent = Math.round(d.receipt.timeTo * k) + d.receipt.timeSuffix;
        recFlips.forEach((f, i) => f.classList.toggle('on', s > 0.5 + i * 0.12));
      }

      /* the grade: ink through the before, cream once the wins land */
      const t = smooth(Math.min(1, Math.max(0, (p - 2.55 / N) / (0.9 / N))));
      stage.style.backgroundColor = `rgb(${lerp(6, 246, t)},${lerp(8, 246, t)},${lerp(13, 243, t)})`;
      stage.classList.toggle('dk', t < 0.5);
      stage.classList.toggle('lt', t >= 0.5);

      const isWin = idx >= 3 && idx <= 7;
      bloom.style.opacity = isWin ? (0.5 + 0.5 * Math.sin(Math.PI * s)).toFixed(2) : idx >= 8 ? '0.6' : '0';

      hudCh.textContent = CHAPTERS[idx];
      hudCt.textContent = idx + 1 + ' / ' + N;
      segs.forEach((sg, i) => { sg.classList.toggle('done', i < idx); sg.classList.toggle('cur', i === idx); });

      if (idx !== lastIdx.current) {
        lastIdx.current = idx;
        track('journey_chapter', { journey: d.id, chapter: idx + 1, name: CHAPTERS[idx] });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }),
      { threshold: 0.16 },
    );
    root.querySelectorAll('.jy-rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [id]);

  const jump = (i: number) => {
    const film = filmRef.current; if (!film) return;
    const h = film.offsetHeight - window.innerHeight;
    window.scrollTo({ top: film.offsetTop + h * ((i + 0.5) / N), behavior: 'smooth' });
  };

  const chip = (
    <span className="jy-avchip">
      <span className="jy-av"><img src={d.img} alt={d.person} style={{ objectPosition: d.imgPos }} /></span>
      <span className="jy-who">{d.person}<small>{d.role}</small></span>
    </span>
  );

  return (
    <div className="jy" ref={rootRef}>
      <style>{min(CSS)}</style>

      {/* OPENING — the site's light hero, avatar as the imagery */}
      <section className="jy-open">
        <div className="jy-pill">{d.tag}</div>
        <h1>{d.heroA}<span className="l2 g">{d.heroB}<span className="pd">.</span></span></h1>
        <p className="jy-sub">{d.heroSub}</p>
        {chip}
        <div className="jy-cue">Scroll · walk {d.her ? 'her' : 'his'} year</div>
      </section>

      {/* THE FILM */}
      <div className="jy-film" ref={filmRef}>
        <div className="jy-stage dk">
          <div className="jy-bloom" />
          <div className="jy-hud">
            <span className="jy-avchip sm">
              <span className="jy-av"><img src={d.img} alt="" style={{ objectPosition: d.imgPos }} /></span>
              <span className="jy-who">{d.short}<small>{d.biz}</small></span>
            </span>
            <div className="jy-mid">
              <span className="jy-hudch">Before</span>
              <div className="jy-segs">
                {Array.from({ length: N }, (_, i) => (
                  <button key={i} type="button" className="jy-seg" aria-label={`Chapter ${i + 1}`} onClick={() => jump(i)} />
                ))}
              </div>
              <span className="jy-hudct">1 / {N}</span>
            </div>
          </div>

          <div className="jy-beat dkb" data-b={0}>
            <div className="jy-bin">
              <div className="jy-kick">Before</div>
              <div className="jy-huge" dangerouslySetInnerHTML={{ __html: d.leaksTitle }} />
              <div className="jy-leaks">
                {d.leaks.map((l) => (
                  <div key={l} className="jy-leak"><span className="x">&times;</span><span>{l}</span></div>
                ))}
              </div>
            </div>
          </div>

          <div className="jy-beat dkb" data-b={1}>
            <div className="jy-bin">
              <div className="jy-kick">{d.breakKick}</div>
              <div className="jy-huge" dangerouslySetInnerHTML={{ __html: d.breakBig }} />
              <div className="jy-cap">{d.breakCap}</div>
            </div>
          </div>

          <div className="jy-beat dkb" data-b={2}>
            <div className="jy-bin">
              <div className="jy-kick">The turn</div>
              <div className="jy-huge">Then StayBookt <span className="g">learned {d.her ? 'her' : 'his'} business</span>.</div>
              <div className="jy-cap">{d.turnCap}</div>
            </div>
          </div>

          {d.wins.map((w, i) => (
            <div key={w.word} className="jy-beat ltb jy-win" data-b={3 + i}>
              <div className="jy-bin">
                <div className="jy-kick">{w.kick}</div>
                <div className="jy-word">{w.word}</div>
                {w.stars && (
                  <div className="jy-stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
                )}
                <div className="jy-wsub">{w.wsub}</div>
                <div><span className="jy-stamp"><span className="dot" />{w.stamp}</span></div>
              </div>
            </div>
          ))}

          <div className="jy-beat ltb jy-rec" data-b={8}>
            <div className="jy-bin">
              <div className="jy-kick">The receipt</div>
              <div className="jy-rtots">
                <div className="jy-rtot"><div className="jy-rn jy-cnt-money">$0</div><div className="jy-rl">{d.receipt.moneyLabel}</div></div>
                <div className="jy-rtot"><div className="jy-rn jy-cnt-time">0{d.receipt.timeSuffix}</div><div className="jy-rl">{d.receipt.timeLabel}</div></div>
              </div>
              <div className="jy-flips">
                {d.receipt.flips.map((f) => (
                  <div key={f.label} className="jy-fl">
                    <span className="fll">{f.label}</span><span className="flb">{f.before}</span><span className="fla-arr">&rarr;</span><span className="fla">{f.after}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="jy-beat ltb jy-payoff" data-b={9}>
            <div className="jy-bin">
              <div className="jy-kick">{d.payoffKick}</div>
              <div className="jy-huge" dangerouslySetInnerHTML={{ __html: d.payoffBig }} />
              <div className="jy-cap">{d.payoffCap}</div>
              <a className="jy-cta" href={START_LINK} data-cta="journey_payoff">Start your journey &rarr;</a>
              <div className="jy-note">Thirty minutes with a founder. It&rsquo;s free.</div>
            </div>
          </div>
        </div>
      </div>

      {/* QUOTE */}
      <figure className="jy-quote">
        <blockquote className="jy-rv" dangerouslySetInnerHTML={{ __html: d.quote }} />
        <div className="jy-rv" style={{ display: 'flex', justifyContent: 'center', marginTop: 26 }}>{chip}</div>
      </figure>

      {/* FAQ — the site's .pfq pattern */}
      <section className="pfq">
        <div className="jy-pwrap">
          <div className="jy-fgrid">
            <div className="jy-faside jy-rv">
              <div className="jy-eyebrow">FAQ</div>
              <h2>Questions, <span className="g">answered</span><span className="pd">.</span></h2>
              <p className="fa-p">{d.faqLede}</p>
              <a className="fa-cta" href={START_LINK} data-cta="journey_faq">Get Started <span aria-hidden>&rarr;</span></a>
              <div className="fa-links">
                <a href="/pricing">The money questions live on Pricing</a>
                <a href="/how-it-works">See how it actually runs</a>
              </div>
            </div>
            <div className="jy-list">
              {d.faq.map((x, i) => (
                <div key={x.q} className={`pfq-q${faqOpen === i ? ' open' : ''}`} style={{ ['--fc' as string]: x.c }}>
                  <button
                    type="button"
                    aria-expanded={faqOpen === i}
                    onClick={() => {
                      if (faqOpen !== i) track('faq_open', { question: x.q, faq: `journey-${d.id}` });
                      setFaqOpen(faqOpen === i ? null : i);
                    }}
                  >
                    <span><span className="fk">{x.k}</span><span className="fq">{x.q}</span></span>
                    <span className="pl" aria-hidden>+</span>
                  </button>
                  <div className="fbody"><p>{x.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WALK ANOTHER JOURNEY */}
      <section className="jy-others">
        <div className="jy-owrap">
          <h2 className="jy-rv">Walk another journey<span className="pd">.</span></h2>
          <p className="jy-olede jy-rv">Different trade, same flip.</p>
          <div className="jy-ogrid">
            {others.map((o) => (
              <a key={o.id} className="jy-ocard jy-rv" href={o.path} data-cta="journey_next">
                <span className="jy-avchip">
                  <span className="jy-av"><img src={o.img} alt={o.person} style={{ objectPosition: o.imgPos }} /></span>
                  <span className="jy-who">{o.person}<small>{o.role}</small></span>
                </span>
                <div className="ot">{o.tag.replace('Journeys · ', 'The ').toLowerCase().replace('the ', 'The ')}</div>
                <div className="on2" dangerouslySetInnerHTML={{ __html: heroLine(o.short, o.heroB) }} />
                <p className="od">{o.heroSub}</p>
                <span className="go">Walk {o.her ? 'her' : 'his'} year <span className="arw">&rarr;</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* short card line: "Sean stopped chasing." style — reuse each journey's own payoff word
   is too clever; the tested card copy is the hero punchline reframed. */
function heroLine(short: string, heroB: string) {
  const CARD_LINES: Record<string, string> = {
    Marcus: 'Marcus got his <span class="g">nights back</span>.',
    Sean: 'Sean stopped <span class="g">chasing</span>.',
    Kim: 'Kim&rsquo;s first to <span class="g">every door</span>.',
  };
  return CARD_LINES[short] ?? heroB;
}

const CSS = `
.jy{--jy-ink:#06080d;--jy-cream:#f6f6f3;--jy-sub:#52565e;--jy-cap:#69707d;background:var(--jy-cream);color:var(--jy-ink);}
.jy .g{background:var(--sb-grad-ink,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));-webkit-background-clip:text;background-clip:text;color:transparent;}
.jy .pd{color:#7c3aed;-webkit-text-fill-color:#7c3aed;}

.jy-avchip{display:inline-flex;align-items:center;gap:11px;}
.jy-av{width:46px;height:46px;border-radius:50%;padding:2.5px;background:var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));display:inline-block;}
.jy-av img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;background:#fff;}
.jy-who{text-align:left;font-size:13.5px;font-weight:600;line-height:1.25;}
.jy-who small{display:block;font-size:11.5px;font-weight:500;color:var(--jy-cap);}

.jy-open{min-height:100vh;min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 24px;position:relative;}
.jy-pill{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#42474f;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed)) border-box;border-radius:999px;padding:9px 18px;margin-bottom:26px;}
.jy-open h1{font-size:clamp(34px,6.2vw,82px);font-weight:600;letter-spacing:-.045em;line-height:1.0;}
.jy-open h1 .l2{display:block;}
.jy-sub{margin-top:18px;font-size:clamp(16px,1.9vw,20px);color:var(--jy-sub);}
.jy-open .jy-avchip{margin-top:28px;}
.jy-cue{position:absolute;bottom:32px;left:0;right:0;text-align:center;font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--jy-cap);animation:jyBob 2.4s ease-in-out infinite;}
@keyframes jyBob{0%,100%{transform:translateY(0);opacity:.6;}50%{transform:translateY(8px);opacity:1;}}

.jy-film{position:relative;height:1270vh;}
.jy-stage{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;background:var(--jy-ink);will-change:background-color;}
.jy-bloom{position:absolute;inset:0;background:radial-gradient(58% 44% at 50% 46%,rgba(16,185,129,.16),transparent 70%);opacity:0;will-change:opacity;}

.jy-hud{position:absolute;top:0;left:0;right:0;z-index:6;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:18px clamp(16px,3vw,30px);}
.jy-hud .jy-avchip.sm .jy-av{width:36px;height:36px;padding:2px;}
.jy-hud .jy-who{font-size:12.5px;} .jy-hud .jy-who small{font-size:10.5px;}
.jy-mid{display:flex;align-items:center;gap:12px;}
.jy-hudch{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;min-width:82px;text-align:right;}
.jy-segs{display:flex;gap:6px;}
.jy-seg{width:clamp(20px,3.2vw,40px);height:4px;border-radius:2px;border:0;cursor:pointer;padding:0;transition:background .3s ease;}
.jy-hudct{font-size:11px;font-weight:700;letter-spacing:.1em;min-width:44px;}
.jy-stage.dk{color:#fff;}
.jy-stage.dk .jy-hudch,.jy-stage.dk .jy-hudct{color:rgba(255,255,255,.6);}
.jy-stage.dk .jy-seg{background:rgba(255,255,255,.18);}
.jy-stage.dk .jy-seg.done{background:rgba(255,255,255,.55);}
.jy-stage.dk .jy-hud .jy-who{color:#fff;} .jy-stage.dk .jy-hud .jy-who small{color:rgba(255,255,255,.55);}
.jy-stage.lt{color:var(--jy-ink);}
.jy-stage.lt .jy-hudch,.jy-stage.lt .jy-hudct{color:var(--jy-cap);}
.jy-stage.lt .jy-seg{background:rgba(6,12,20,.12);}
.jy-stage.lt .jy-seg.done{background:rgba(6,12,20,.34);}
.jy-stage.lt .jy-hud .jy-who{color:var(--jy-ink);} .jy-stage.lt .jy-hud .jy-who small{color:var(--jy-cap);}
.jy-seg.cur{background:var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed))!important;}
@media(max-width:640px){.jy-hud .jy-who{display:none;}}

.jy-beat{position:absolute;inset:0;z-index:4;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 clamp(22px,5vw,60px);opacity:0;pointer-events:none;will-change:opacity,transform;}
.jy-bin{max-width:900px;}
.jy-kick{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;}
.jy-beat.dkb .jy-kick{color:rgba(255,255,255,.5);}
.jy-beat.ltb .jy-kick{color:var(--jy-cap);}
.jy-huge{margin-top:18px;font-size:clamp(34px,5.6vw,72px);font-weight:600;letter-spacing:-.042em;line-height:1.03;}
.jy-beat.dkb .jy-huge{color:#fff;} .jy-beat.ltb .jy-huge{color:var(--jy-ink);}
.jy-cap{margin:20px auto 0;font-size:clamp(15px,1.7vw,19px);line-height:1.6;max-width:46ch;}
.jy-beat.dkb .jy-cap{color:rgba(255,255,255,.66);} .jy-beat.ltb .jy-cap{color:var(--jy-sub);}

.jy-leaks{margin:30px auto 0;max-width:520px;text-align:left;}
.jy-leak{display:flex;align-items:center;gap:13px;padding:11px 14px;border-radius:13px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .6s cubic-bezier(.16,1,.3,1);}
.jy-leak+.jy-leak{margin-top:8px;}
.jy-leak.on{opacity:1;transform:none;}
.jy-leak .x{flex:0 0 22px;height:22px;border-radius:50%;background:rgba(251,106,111,.14);color:#fb6a6f;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;}
.jy-leak span:last-child{font-size:clamp(14px,1.6vw,16.5px);color:rgba(255,255,255,.85);font-weight:500;}

.jy-word{margin-top:14px;font-size:clamp(64px,13vw,190px);font-weight:700;letter-spacing:-.055em;line-height:.9;background:var(--sb-grad-ink,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));-webkit-background-clip:text;background-clip:text;color:transparent;}
.jy-wsub{margin-top:20px;font-size:clamp(16px,2vw,22px);color:#2b2f36;font-weight:500;}
.jy-stamp{margin-top:26px;display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--jy-ink);border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed)) border-box;border-radius:999px;padding:10px 20px;}
.jy-stamp .dot{width:9px;height:9px;border-radius:50%;background:var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed));}
.jy-stars{margin-top:16px;display:flex;justify-content:center;gap:8px;font-size:clamp(26px,4vw,44px);color:#f5b942;}
.jy-stars span{opacity:0;transform:scale(.4);transition:opacity .4s ease,transform .5s cubic-bezier(.34,1.56,.64,1);}
.jy-stars.on span{opacity:1;transform:none;}

.jy-rec .jy-rtots{margin-top:22px;display:flex;justify-content:center;gap:clamp(28px,6vw,84px);flex-wrap:wrap;}
.jy-rtot{text-align:center;}
.jy-rn{font-size:clamp(52px,9vw,124px);font-weight:600;letter-spacing:-.05em;background:var(--sb-grad-ink,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1;font-variant-numeric:tabular-nums;}
.jy-rl{margin-top:10px;font-size:clamp(13.5px,1.5vw,15.5px);color:var(--jy-sub);max-width:24ch;}
.jy-flips{margin:clamp(24px,4vh,40px) auto 0;max-width:620px;text-align:left;}
.jy-fl{display:flex;align-items:baseline;gap:12px;padding:13px 4px;border-top:1px solid rgba(6,12,20,.08);flex-wrap:wrap;opacity:0;transform:translateY(14px);transition:opacity .5s ease,transform .6s cubic-bezier(.16,1,.3,1);}
.jy-fl.on{opacity:1;transform:none;}
.jy-fl:first-of-type{border-top:0;}
.jy-fl .fll{flex:0 0 122px;font-size:13.5px;font-weight:600;color:var(--jy-cap);}
.jy-fl .flb{font-size:clamp(14.5px,1.7vw,17px);font-weight:500;color:#8a8f98;text-decoration:line-through;text-decoration-color:rgba(180,83,90,.55);}
.jy-fl .fla-arr{color:var(--jy-cap);}
.jy-fl .fla{font-size:clamp(14.5px,1.7vw,17px);font-weight:700;background:var(--sb-grad-ink,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));-webkit-background-clip:text;background-clip:text;color:transparent;}

.jy-payoff .jy-cta{margin-top:34px;display:inline-flex;background:var(--jy-ink);color:#fff;font-size:15.5px;font-weight:600;border-radius:999px;padding:16px 34px;text-decoration:none;box-shadow:0 22px 50px -20px rgba(6,12,20,.5);}
.jy-note{margin-top:14px;font-size:13px;color:var(--jy-cap);}

.jy-rv{opacity:0;transform:translateY(26px);transition:opacity .8s ease,transform .9s cubic-bezier(.16,1,.3,1);}
.jy-rv.on{opacity:1;transform:none;}

.jy-quote{padding:clamp(80px,13vh,140px) clamp(22px,5vw,44px);text-align:center;background:var(--jy-cream);margin:0;}
.jy-quote blockquote{font-size:clamp(26px,4vw,46px);font-weight:600;letter-spacing:-.035em;line-height:1.18;max-width:24ch;margin:0 auto;}

/* FAQ — mirrors PricingFaq's .pfq exactly; see that file for the a11y notes */
.jy .pfq{padding:0 0 clamp(80px,11vh,120px);background:var(--jy-cream);color:var(--jy-ink);}
.jy-pwrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.jy-eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.jy-fgrid{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(32px,6vw,84px);align-items:start;}
@media(max-width:900px){.jy-fgrid{grid-template-columns:1fr;gap:36px;}}
.jy-faside{position:sticky;top:clamp(96px,12vh,130px);}
@media(max-width:900px){.jy-faside{position:static;}}
.jy .pfq h2{font-size:clamp(34px,4.6vw,60px);font-weight:600;letter-spacing:-.035em;line-height:1.0;margin:14px 0 0;max-width:9ch;}
.jy .fa-p{margin-top:20px;font-size:16.5px;line-height:1.6;color:#69707d;max-width:32ch;}
.jy .fa-cta{display:inline-flex;align-items:center;gap:9px;margin-top:26px;background:var(--jy-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 28px;text-decoration:none;transition:gap .3s ease,transform .3s ease;}
.jy .fa-cta:hover{gap:14px;transform:translateY(-1px);}
.jy .fa-links{display:flex;flex-direction:column;gap:10px;margin-top:26px;}
.jy .fa-links a{font-size:14.5px;font-weight:600;color:#0369a1;text-decoration:none;width:fit-content;border-bottom:1px solid transparent;transition:border-color .25s ease;}
.jy .fa-links a:hover{border-color:#0369a1;}
.jy-list{display:flex;flex-direction:column;gap:8px;}
.jy .pfq-q{--fc:#4f46e5;position:relative;background:transparent;border:1px solid transparent;border-radius:18px;transition:background .35s ease,border-color .35s ease,box-shadow .35s ease,transform .35s ease;}
.jy .pfq-q::after{content:'';position:absolute;left:clamp(16px,2vw,22px);right:clamp(16px,2vw,22px);bottom:0;height:1px;background:#e2e2dc;transition:opacity .3s ease;}
.jy .pfq-q:last-child::after{opacity:0;}
.jy .pfq-q:hover{background:rgba(255,255,255,.6);}
.jy .pfq-q.open{background:#fff;border-color:#ececeb;box-shadow:0 26px 54px -34px rgba(6,12,20,.4);transform:translateY(-1px);}
.jy .pfq-q.open::after{opacity:0;}
.jy .pfq-q button{width:100%;display:grid;grid-template-columns:minmax(0,1fr) 34px;gap:16px;align-items:center;background:transparent;border:0;color:var(--jy-ink);font-family:inherit;text-align:left;padding:clamp(20px,2.4vw,26px) clamp(16px,2vw,22px);cursor:pointer;}
.jy .pfq-q .fk{display:block;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--fc);opacity:.85;}
.jy .pfq-q .fq{display:block;margin-top:7px;font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;line-height:1.28;}
.jy .pfq-q .pl{width:34px;height:34px;border-radius:50%;border:1px solid #dcdcd8;color:#8a8f98;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:300;line-height:1;transition:transform .4s cubic-bezier(.16,1,.3,1),background .35s ease,color .35s ease,border-color .35s ease;}
.jy .pfq-q:hover .pl{border-color:var(--fc);color:var(--fc);}
.jy .pfq-q.open .pl{transform:rotate(45deg);background:var(--fc);border-color:transparent;color:#fff;box-shadow:0 8px 20px -8px var(--fc);}
.jy .fbody{max-height:0;overflow:hidden;visibility:hidden;transition:max-height .55s cubic-bezier(.16,1,.3,1),visibility 0s linear .55s;}
.jy .pfq-q.open .fbody{max-height:520px;visibility:visible;transition:max-height .55s cubic-bezier(.16,1,.3,1),visibility 0s;}
.jy .fbody p{margin:0;padding:0 clamp(16px,2vw,22px) clamp(22px,2.6vw,28px);font-size:16px;line-height:1.65;color:#52565e;max-width:62ch;}

.jy-others{background:var(--jy-cream);padding:0 clamp(22px,5vw,44px) clamp(80px,12vh,120px);}
.jy-owrap{max-width:1060px;margin:0 auto;}
.jy-others h2{text-align:center;font-size:clamp(26px,4vw,46px);font-weight:600;letter-spacing:-.038em;}
.jy-olede{margin:12px auto 0;text-align:center;font-size:15px;color:var(--jy-sub);}
.jy-ogrid{margin-top:clamp(26px,4vh,40px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,2.4vw,24px);}
@media(max-width:720px){.jy-ogrid{grid-template-columns:1fr;}}
.jy-ocard{display:block;background:#fff;border:1px solid rgba(6,12,20,.08);border-radius:22px;padding:clamp(24px,3vw,34px);text-decoration:none;color:var(--jy-ink);box-shadow:0 1px 2px rgba(6,12,20,.04),0 26px 54px -34px rgba(6,12,20,.35);transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s cubic-bezier(.16,1,.3,1);}
.jy-ocard:hover{transform:translateY(-5px);box-shadow:0 1px 2px rgba(6,12,20,.05),0 40px 74px -36px rgba(6,12,20,.45);}
.jy-ocard .ot{margin-top:20px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--jy-cap);}
.jy-ocard .on2{margin-top:8px;font-size:clamp(22px,2.6vw,29px);font-weight:600;letter-spacing:-.03em;line-height:1.1;}
.jy-ocard .od{margin-top:10px;font-size:15px;line-height:1.55;color:var(--jy-sub);}
.jy-ocard .go{margin-top:18px;display:inline-flex;align-items:center;gap:10px;font-size:15px;font-weight:600;color:var(--jy-ink);}
.jy-ocard .go .arw{width:29px;height:29px;border-radius:50%;background:var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed));color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;transition:transform .35s cubic-bezier(.16,1,.3,1);}
.jy-ocard:hover .go .arw{transform:translateX(5px);}

@media(prefers-reduced-motion:reduce){
  .jy-rv,.jy-leak,.jy-fl,.jy-stars span,.jy .fbody,.jy .pfq-q,.jy .pfq-q .pl{transition:none;}
  .jy-cue{animation:none;}
}
`;
