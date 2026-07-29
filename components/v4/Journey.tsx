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

/* the mini road in the HUD: same winding language as the landing map, in miniature */
const ROAD_D = 'M5,17 C28,4 46,27 78,14 C106,3 128,25 155,11';

/* film grain for the dark acts (SVG noise, fades out as the world brightens).
   Inline style on purpose — keeps the data URI away from the CSS minifier. */
const GRAIN =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';

export default function Journey({ id }: { id: string }) {
  const d = JOURNEYS[id];
  const filmRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const roadProgRef = useRef<SVGPathElement>(null);
  const roadAvRef = useRef<SVGGElement>(null);
  const lastIdx = useRef(-1);
  const recRan = useRef(false);
  const recRaf = useRef<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const others = JOURNEY_ORDER.filter((k) => k !== id).map((k) => JOURNEYS[k]);

  /* chapters are data-driven: title card + 3 setup + wins + receipt + payoff.
     The TITLE CARD IS BEAT 0 (Jacob, July 27: "should this be the beginning of the
     film?") — the page is one continuous pinned film from the first pixel. */
  const N = 6 + d.wins.length;
  const starIdx = 4 + d.wins.findIndex((w) => w.stars);
  const CHAPTERS = ['The owner', 'Before', 'Before', 'The turn', ...d.wins.map(() => 'The wins'), 'The receipt', 'After'];

  useEffect(() => {
    const film = filmRef.current, root = rootRef.current;
    if (!film || !root) return;
    const stage = root.querySelector('.jy-stage') as HTMLElement;
    const bloom = root.querySelector('.jy-bloom') as HTMLElement;
    const hudCh = root.querySelector('.jy-hudch') as HTMLElement;
    const hudCt = root.querySelector('.jy-hudct') as HTMLElement;
    const beats = [...root.querySelectorAll('.jy-beat')] as HTMLElement[];
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
        if (i !== idx) {
          b.style.opacity = '0'; b.style.pointerEvents = 'none';
          /* reset staged reveals so re-entry replays them */
          b.querySelectorAll('.jy-word.on,.jy-wsub.on,.jy-stamp.on').forEach((x) => x.classList.remove('on'));
          return;
        }
        /* cinematic cut: enter rises, HOLD carries a slow camera push, exit lifts away.
           Beat 0 (the title card) has NO enter — it's on screen from page load; its
           reveal is the load-time animation, and scroll only carries it away. */
        let o: number, ty: number, sc: number;
        if (i === 0) {
          if (s < 0.7) { o = 1; ty = 0; sc = 1 + 0.012 * smooth(s / 0.7); }
          else { const k = smooth((s - 0.7) / 0.3); o = 1 - k; ty = -k * 40; sc = 1.012 + 0.008 * k; }
        }
        else if (s < 0.22) { const k = smooth(s / 0.22); o = k; ty = (1 - k) * 44; sc = 0.985 + 0.015 * k; }
        else if (s < 0.78) { o = 1; ty = 0; sc = 1 + 0.014 * smooth((s - 0.22) / 0.56); }
        else { const k = smooth((s - 0.78) / 0.22); o = 1 - k; ty = -k * 36; sc = 1.014 + 0.008 * k; }
        b.style.opacity = String(o);
        b.style.transform = `translateY(${ty}px) scale(${sc})`;
        b.style.setProperty('--bty', `${ty}px`);
        b.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
        /* staged reveals inside the beat: word focus-pulls, sub follows, stamp lands */
        const word = b.querySelector('.jy-word'); if (word) word.classList.toggle('on', s > 0.1);
        const wsub = b.querySelector('.jy-wsub'); if (wsub) wsub.classList.toggle('on', s > 0.2);
        const stamp = b.querySelector('.jy-stamp'); if (stamp) stamp.classList.toggle('on', s > 0.32);
      });

      if (idx === 1) leaks.forEach((l, i) => l.classList.toggle('on', s > 0.18 + i * 0.13));
      if (stars) stars.classList.toggle('on', idx === starIdx && s > 0.25);

      /* the title card's city fades as you push into the ledger; the scroll cue goes with it */
      const fbg = root.querySelector('.jy-fbg') as HTMLElement | null;
      if (fbg) fbg.style.opacity = idx === 0 ? (s < 0.5 ? '1' : String(1 - smooth((s - 0.5) / 0.5))) : '0';
      const cue = root.querySelector('.jy-cue');
      if (cue) cue.classList.toggle('off', !(idx === 0 && s < 0.55));

      /* THE RECEIPT: time-based count, triggered on arrival (scroll-scrubbed counting
         glitched when you flew past — Jacob. Now the numbers race to full in ~0.9s the
         moment the chapter is active, stay full, and reset only on leaving). */
      if (idx === N - 2) {
        if (!recRan.current) {
          recRan.current = true;
          const t0 = performance.now();
          const step = (tm: number) => {
            let k = Math.min(1, (tm - t0) / 900); k = 1 - Math.pow(1 - k, 3);
            cntMoney.textContent = '$' + Math.round(d.receipt.moneyTo * k).toLocaleString() + (k >= 1 ? '+' : '');
            cntTime.textContent = Math.round(d.receipt.timeTo * k) + d.receipt.timeSuffix;
            if (k < 1) recRaf.current = requestAnimationFrame(step);
          };
          recRaf.current = requestAnimationFrame(step);
          recFlips.forEach((f) => f.classList.add('on'));
        }
      } else if (recRan.current) {
        recRan.current = false;
        if (recRaf.current) cancelAnimationFrame(recRaf.current);
        cntMoney.textContent = '$0';
        cntTime.textContent = '0' + d.receipt.timeSuffix;
        recFlips.forEach((f) => f.classList.remove('on'));
      }

      /* the reward lands in the payoff chapter */
      const joyRow = root.querySelector('.jy-payjoy');
      if (joyRow) joyRow.classList.toggle('on', idx === N - 1 && s > 0.35);

      /* road HUD: progress line fills, the mini avatar drives it */
      const rp = roadProgRef.current, ra = roadAvRef.current;
      if (rp && ra) {
        rp.style.strokeDashoffset = String(1 - p);
        const L = rp.getTotalLength();
        const pt = rp.getPointAtLength(Math.min(0.999, Math.max(0, p)) * L);
        ra.setAttribute('transform', `translate(${pt.x},${pt.y})`);
      }
      const skip = root.querySelector('.jy-skip');
      if (skip) skip.classList.toggle('off', idx >= N - 2);

      /* the grade: ink through the before, cream once the wins land */
      const t = smooth(Math.min(1, Math.max(0, (p - 3.55 / N) / (0.9 / N))));
      stage.style.backgroundColor = `rgb(${lerp(6, 246, t)},${lerp(8, 246, t)},${lerp(13, 243, t)})`;
      stage.classList.toggle('dk', t < 0.5);
      stage.classList.toggle('lt', t >= 0.5);

      /* HOLLYWOOD GRADE: letterbox mattes frame the dark acts, then dissolve as the
         world brightens (the movie releases into daylight). Grain clears the same way. */
      const dark = 1 - t;
      const grain = root.querySelector('.jy-grain') as HTMLElement | null;
      if (grain) grain.style.opacity = (0.08 * dark).toFixed(3);
      const slide = Math.min(1, p * N * 0.9); // bars slide in across the first beat
      const barTop = root.querySelector('.jy-bar-top') as HTMLElement | null;
      const barBot = root.querySelector('.jy-bar-bot') as HTMLElement | null;
      if (barTop && barBot) {
        barTop.style.transform = `translateY(${-101 + 101 * slide}%)`;
        barBot.style.transform = `translateY(${101 - 101 * slide}%)`;
        barTop.style.opacity = barBot.style.opacity = dark.toFixed(2);
      }

      const isWin = idx >= 4 && idx <= N - 3;
      bloom.style.opacity = isWin ? (0.5 + 0.5 * Math.sin(Math.PI * s)).toFixed(2) : idx >= N - 2 ? '0.6' : '0';

      hudCh.textContent = CHAPTERS[idx];
      hudCt.textContent = idx + 1 + ' / ' + N;

      if (idx !== lastIdx.current) {
        lastIdx.current = idx;
        track('journey_chapter', { journey: d.id, chapter: idx + 1, name: CHAPTERS[idx] });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (recRaf.current) cancelAnimationFrame(recRaf.current);
    };
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

  const roadClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const frac = (e.clientX - r.left) / r.width;
    jump(Math.min(N - 1, Math.max(0, Math.floor(frac * N))));
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

      {/* THE FILM — pin length scales with chapter count. It opens on the TITLE CARD
          (beat 0): dark, their city faint behind them, the lead's credit hero-sized.
          The reveal plays on load; the first scroll pushes past the title into the
          leak ledger with no seam. The page then travels dark -> cream as the wins
          land: the design IS the arc of their year. */}
      <div className="jy-film" ref={filmRef} style={{ height: `${N * 127}vh` }}>
        <div className="jy-stage dk">
          <div className="jy-fbg"><img src={d.banner} alt="" /><span className="jy-oscrim" /></div>
          <div className="jy-bloom" />
          <div className="jy-grain" style={{ backgroundImage: GRAIN }} />
          <div className="jy-bar jy-bar-top" />
          <div className="jy-bar jy-bar-bot" />

          {/* CHAPTER 0 — the title card IS the film's first beat */}
          <div className="jy-beat dkb jy-title" data-b={0}>
            <div className="jy-bin">
              <div className="jy-pill">{d.tag}</div>
              <h1><span className="l1">{d.heroA}</span><span className="l2 g">{d.heroB}<span className="pd">.</span></span></h1>
              <p className="jy-sub">{d.heroSub}</p>
              <span className="jy-avchip jy-herochip">
                <span className="jy-av"><img src={d.img} alt={d.person} style={{ objectPosition: d.imgPos }} /></span>
                <span className="jy-who">{d.person}<small>{d.role}</small></span>
              </span>
            </div>
          </div>
          <div className="jy-cue">Scroll · follow {d.her ? 'her' : 'his'} journey</div>
          <div className="jy-hud">
            <span className="jy-avchip sm">
              <span className="jy-av"><img src={d.img} alt="" style={{ objectPosition: d.imgPos }} /></span>
              <span className="jy-who">{d.short}<small>{d.biz}</small></span>
            </span>
            <div className="jy-mid">
              <span className="jy-hudch">Before</span>
              {/* the road HUD: the map's winding road in miniature — the owner's mini
                  avatar drives it as you scroll. Click anywhere on it to jump. */}
              <svg className="jy-road" viewBox="0 0 160 28" onClick={roadClick} role="slider" aria-label="Film progress">
                <defs><clipPath id={`jyrcp-${d.id}`}><circle r="6.5" /></clipPath></defs>
                <path className="jy-road-under" d={ROAD_D} />
                <path ref={roadProgRef} className="jy-road-prog" d={ROAD_D} pathLength={1} style={{ stroke: d.hue }} />
                <g ref={roadAvRef} className="jy-road-av" transform="translate(5,17)">
                  <circle r="8" fill="#fff" stroke={d.hue} strokeWidth="1.5" />
                  <image href={d.img} x="-6.5" y="-6.5" width="13" height="13" clipPath={`url(#jyrcp-${d.id})`} preserveAspectRatio="xMidYMid slice" />
                </g>
              </svg>
              <span className="jy-hudct">1 / {N}</span>
              <button
                type="button"
                className="jy-skip"
                onClick={() => { track('journey_skip', { journey: d.id }); jump(N - 2); }}
              >
                Skip to the results &rarr;
              </button>
            </div>
          </div>

          <div className="jy-beat dkb" data-b={1}>
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

          <div className="jy-beat dkb" data-b={2}>
            <div className="jy-bin">
              <div className="jy-kick">{d.breakKick}</div>
              <div className="jy-huge" dangerouslySetInnerHTML={{ __html: d.breakBig }} />
              <div className="jy-cap">{d.breakCap}</div>
            </div>
          </div>

          <div className="jy-beat dkb" data-b={3}>
            <div className="jy-bin">
              <div className="jy-kick">The turn</div>
              <div className="jy-huge">Then StayBookt <span className="g">learned {d.her ? 'her' : 'his'} business</span>.</div>
              <div className="jy-cap">{d.turnCap}</div>
            </div>
          </div>

          {d.wins.map((w, i) => (
            <div key={w.word} className="jy-beat ltb jy-win" data-b={4 + i}>
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

          <div className="jy-beat ltb jy-rec" data-b={4 + d.wins.length}>
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

          <div className="jy-beat ltb jy-payoff" data-b={5 + d.wins.length}>
            <div className="jy-bin">
              <div className="jy-kick">{d.payoffKick}</div>
              <div className="jy-huge" dangerouslySetInnerHTML={{ __html: d.payoffBig }} />
              <div className="jy-cap">{d.payoffCap}</div>
              {/* the reward from the map, delivered: their enjoyment chip + the life it bought */}
              <div className="jy-payjoy" style={{ ['--jc' as string]: d.hue }}>
                <span className="jy-joychip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: d.joy.svg }} /></span>
                <span className="jy-joyline">{d.joy.line}</span>
              </div>
              <a className="jy-cta" href={START_LINK} data-cta="journey_payoff">Start your journey &rarr;</a>
              <div className="jy-note">Thirty minutes with a founder. It&rsquo;s free.</div>
            </div>
          </div>
        </div>
      </div>

      {/* THE FINALE — the movie's true last frame, IMMEDIATELY after the film (Jacob,
          July 27: "the CTA card at the end of the movie" — it was originally parked at
          the page bottom and never seen; do not move it back down). Full-screen gradient
          takeover, THE question this journey earns, one CTA. The quote/cards/FAQ that
          follow are the epilogue. HeroCta dock stays omitted on journey pages.
          Question form is deliberate and allowed: "What would you do with X" cannot be
          answered "no" (Richard's rule targets yes/no closes). */}
      <section className="jy-finale">
        <div className="jy-fin-in jy-rv">
          <div className="jy-fin-kick">Your journey</div>
          <h2 dangerouslySetInnerHTML={{ __html: d.finale }} />
          <a className="jy-fin-cta" href={START_LINK} data-cta="journey_finale">Start your journey &rarr;</a>
          <div className="jy-fin-note">Thirty minutes with a founder. It&rsquo;s free.</div>
        </div>
      </section>

      {/* QUOTE */}
      <figure className="jy-quote">
        <blockquote className="jy-rv" dangerouslySetInnerHTML={{ __html: d.quote }} />
        <div className="jy-rv" style={{ display: 'flex', justifyContent: 'center', marginTop: 26 }}>{chip}</div>
      </figure>

      {/* WALK ANOTHER JOURNEY — above the FAQ (Jacob, July 27) */}
      <section className="jy-others">
        <div className="jy-owrap">
          {/* Was "Different trade, same flip." — a stray typo (flip) plus the same
              trade/leak language Richard flagged on the landing page (Jul 28 video +
              Images doc). This footer copy lives here, separate from the landing tee-up,
              and got missed in that fix. Matched to the landing page's corrected line. */}
          <h2 className="jy-rv">Walk another journey<span className="pd">.</span></h2>
          <p className="jy-olede jy-rv">Different service, same missed opportunity.</p>
          <div className="jy-ogrid">
            {/* LinkedIn-profile anatomy, identical to the landing cards (Jacob, July 27):
                city banner + hue wash, big overlapping headshot, name/role, tag,
                punchline, teaser, plain-result CTA. One card system everywhere. */}
            {/* Service type now leads, above the image, same fix as the landing page cards
                (Richard, Jul 28: "highlight the type of service provided more prominently
                above the image and they will self associate quickly... let the headers do
                the work over text"). This grid is the same card system, so it gets the
                same swap for consistency. */}
            {others.map((o) => (
              <a key={o.id} className="jy-ocard jy-rv" href={o.path} data-cta="journey_next" style={{ ['--hc' as string]: o.hue }}>
                <span className="jy-osvc" style={{ color: o.hue }}>{o.tag.replace('Journeys · ', '')}</span>
                <span className="jy-obanner">
                  <img src={o.banner} alt="" />
                  <span className="jy-owash" style={{ background: `linear-gradient(135deg,${o.hue}b3,#4f46e580 58%,#7c3aed99)` }} />
                </span>
                <span className="jy-obody">
                  <span className="jy-opav"><img src={o.img} alt={o.person} /></span>
                  <span className="jy-oname">{o.person}</span>
                  <span className="jy-orole">{o.role}</span>
                  <div className="on2" dangerouslySetInnerHTML={{ __html: heroLine(o.short, o.heroB) }} />
                  <p className="od">{o.heroSub}</p>
                  <span className="go">{CARD_CTAS[o.short] ?? 'Follow the journey'} <span className="arw">&rarr;</span></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

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

/* CTA law: the button states the plain result (same labels as the landing cards) */
const CARD_CTAS: Record<string, string> = {
  Marcus: 'Every call answered',
  Sean: 'A full pipeline',
  Kim: 'Every lead in seconds',
};

const CSS = `
.jy{--jy-ink:#06080d;--jy-cream:#f6f6f3;--jy-sub:#52565e;--jy-cap:#69707d;background:var(--jy-cream);color:var(--jy-ink);}
.jy .g{background:var(--sb-grad-ink,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));-webkit-background-clip:text;background-clip:text;color:transparent;}
.jy .pd{color:#7c3aed;-webkit-text-fill-color:#7c3aed;}

.jy-avchip{display:inline-flex;align-items:center;gap:11px;}
.jy-av{width:46px;height:46px;border-radius:50%;padding:2.5px;background:var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));display:inline-block;}
.jy-av img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;background:#fff;}
.jy-who{text-align:left;font-size:13.5px;font-weight:600;line-height:1.25;}
.jy-who small{display:block;font-size:11.5px;font-weight:500;color:var(--jy-cap);}

/* THE TITLE CARD (beat 0) — the film's first frame, on screen from load. City faint in
   the dark, canonical reveal (hl1 .2s -> hl2 focus-pull 1s + glow -> sub 1.7s -> avatar
   2.15s); scroll then carries it away like any other beat. */
.jy-title{opacity:1;} /* no enter fade: visible at page load */
.jy-fbg{position:absolute;inset:0;z-index:0;will-change:opacity;}
.jy-fbg img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) brightness(.32) contrast(1.05);transform:scale(1.09);animation:jyKen 3.4s cubic-bezier(.16,1,.3,1) forwards;}
@keyframes jyKen{to{transform:scale(1);}}
.jy-oscrim{position:absolute;inset:0;background:radial-gradient(90% 70% at 50% 42%,rgba(6,8,13,.32),rgba(6,8,13,.94) 85%),linear-gradient(180deg,rgba(6,8,13,.55),transparent 30%,transparent 70%,var(--jy-ink) 100%);}
.jy-pill{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.3);background:rgba(6,8,13,.3);backdrop-filter:blur(6px);border-radius:999px;padding:9px 18px;margin-bottom:26px;opacity:0;animation:jyUp .8s cubic-bezier(.16,1,.3,1) .05s forwards;}
/* locked hero law holds on phones too: both lines nowrap, size scales down instead */
.jy-title h1{font-size:clamp(19px,6.4vw,82px);font-weight:600;letter-spacing:-.045em;line-height:1.02;color:#fff;}
.jy-title h1 .l1{display:block;white-space:nowrap;opacity:0;filter:blur(10px);transform:translateY(20px);animation:jyUp .9s cubic-bezier(.16,1,.3,1) .2s forwards;}
.jy-title h1 .l2{display:block;white-space:nowrap;position:relative;opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);transform-origin:center;animation:jyEnjoy 1.5s cubic-bezier(.19,1,.22,1) 1s forwards;}
.jy-title h1 .l2::before{content:'';position:absolute;inset:-34% -10%;z-index:-1;background:radial-gradient(56% 62% at 50% 54%,rgba(16,185,129,.35),rgba(79,70,229,.22) 46%,transparent 72%);filter:blur(36px);opacity:0;transform:scale(.7);animation:jyGlow 2s ease 1.05s forwards;}
.jy-title .pd{color:#a78bfa;-webkit-text-fill-color:#a78bfa;}
.jy-sub{margin-top:18px;font-size:clamp(16px,1.9vw,20px);color:rgba(255,255,255,.78);opacity:0;filter:blur(6px);transform:translateY(12px);animation:jyUp .9s cubic-bezier(.16,1,.3,1) 1.7s forwards;}
.jy-title .jy-avchip{margin-top:32px;opacity:0;transform:scale(1.35);animation:jyEstablish .9s cubic-bezier(.16,1,.3,1) 2.15s forwards;}
.jy-title .jy-who{color:#fff;} .jy-title .jy-who small{color:rgba(255,255,255,.6);}
/* the main character: stacked title-card credit, hero-sized */
.jy-herochip{flex-direction:column;gap:14px;}
.jy-herochip .jy-av{width:clamp(88px,9.5vw,116px);height:clamp(88px,9.5vw,116px);padding:3.5px;box-shadow:0 0 0 7px rgba(255,255,255,.06),0 0 44px -6px rgba(79,70,229,.45),0 20px 44px rgba(0,0,0,.5);}
.jy-herochip .jy-who{text-align:center;font-size:clamp(16px,1.8vw,19px);line-height:1.3;}
.jy-herochip .jy-who small{font-size:clamp(12.5px,1.4vw,14.5px);margin-top:2px;}
.jy-cue{position:absolute;bottom:32px;left:0;right:0;text-align:center;z-index:6;font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.55);opacity:0;animation:jyUp .8s ease 2.7s forwards,jyBob 2.4s ease-in-out 3.5s infinite;transition:opacity .4s ease;}
.jy-cue.off{animation:none;opacity:0;pointer-events:none;}
@keyframes jyUp{to{opacity:1;filter:blur(0);transform:none;}}
@keyframes jyEnjoy{0%{opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);}55%{opacity:1;}100%{opacity:1;filter:blur(0);transform:translateY(0) scale(1);}}
@keyframes jyGlow{0%{opacity:0;transform:scale(.7);}50%{opacity:.95;}100%{opacity:.62;transform:scale(1);}}
@keyframes jyEstablish{to{opacity:1;transform:scale(1);}}
@keyframes jyBob{0%,100%{transform:translateY(0);opacity:.6;}50%{transform:translateY(8px);opacity:1;}}

.jy-film{position:relative;} /* height set inline: N * 127vh */
.jy-stage{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;background:var(--jy-ink);will-change:background-color;}
.jy-bloom{position:absolute;inset:0;background:radial-gradient(58% 44% at 50% 46%,rgba(16,185,129,.16),transparent 70%);opacity:0;will-change:opacity;}
.jy-grain{position:absolute;inset:-20%;background-size:160px 160px;opacity:.08;mix-blend-mode:overlay;pointer-events:none;z-index:2;will-change:opacity;}
.jy-bar{position:absolute;left:0;right:0;height:4.5vh;background:#050506;z-index:5;pointer-events:none;will-change:transform,opacity;}
.jy-bar-top{top:0;transform:translateY(-101%);}
.jy-bar-bot{bottom:0;transform:translateY(101%);}

.jy-hud{position:absolute;top:0;left:0;right:0;z-index:6;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:18px clamp(16px,3vw,30px);}
.jy-hud .jy-avchip.sm .jy-av{width:36px;height:36px;padding:2px;}
.jy-hud .jy-who{font-size:12.5px;} .jy-hud .jy-who small{font-size:10.5px;}
.jy-mid{display:flex;align-items:center;gap:12px;}
.jy-hudch{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;min-width:82px;text-align:right;}
/* the road HUD */
.jy-road{width:clamp(110px,15vw,175px);height:28px;cursor:pointer;overflow:visible;flex:0 0 auto;}
.jy-road-under{fill:none;stroke-width:3;stroke-linecap:round;}
.jy-road-prog{fill:none;stroke-width:3;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;}
.jy-road-av circle{filter:drop-shadow(0 2px 4px rgba(6,12,20,.35));}
.jy-hudct{font-size:11px;font-weight:700;letter-spacing:.1em;min-width:44px;}
.jy-skip{background:none;border:0;font-family:inherit;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;padding:0;margin-left:4px;opacity:.85;transition:opacity .3s ease;}
.jy-skip:hover{text-decoration:underline;}
.jy-skip.off{opacity:0;pointer-events:none;}
.jy-stage.dk{color:#fff;}
.jy-stage.dk .jy-hudch,.jy-stage.dk .jy-hudct{color:rgba(255,255,255,.6);}
.jy-stage.dk .jy-road-under{stroke:rgba(255,255,255,.18);}
.jy-stage.dk .jy-skip{color:rgba(255,255,255,.65);}
.jy-stage.dk .jy-hud .jy-who{color:#fff;} .jy-stage.dk .jy-hud .jy-who small{color:rgba(255,255,255,.55);}
.jy-stage.lt{color:var(--jy-ink);}
.jy-stage.lt .jy-hudch,.jy-stage.lt .jy-hudct{color:var(--jy-cap);}
.jy-stage.lt .jy-road-under{stroke:rgba(6,12,20,.12);}
.jy-stage.lt .jy-skip{color:var(--jy-cap);}
.jy-stage.lt .jy-hud .jy-who{color:var(--jy-ink);} .jy-stage.lt .jy-hud .jy-who small{color:var(--jy-cap);}
@media(max-width:640px){.jy-hud .jy-who{display:none;}.jy-hudch,.jy-skip{display:none;}}

/* the reward, delivered in the payoff */
.jy-payjoy{margin-top:26px;display:flex;align-items:center;justify-content:center;gap:12px;opacity:0;transform:translateY(14px) scale(.85);transition:opacity .5s ease,transform .6s cubic-bezier(.34,1.56,.64,1);}
.jy-payjoy.on{opacity:1;transform:none;}
.jy-joychip{width:44px;height:44px;border-radius:50%;background:#fff;border:2px solid var(--jc,#4f46e5);color:var(--jc,#4f46e5);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 26px -8px rgba(6,12,20,.25);flex:0 0 44px;}
.jy-joychip svg{width:20px;height:20px;}
.jy-joyline{font-size:clamp(15px,1.8vw,19px);font-weight:600;color:var(--jy-ink);}

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

/* the win word: Apple-keynote focus pull — blur resolving to sharp as you arrive */
.jy-word{margin-top:14px;font-size:clamp(64px,13vw,190px);font-weight:700;letter-spacing:-.055em;line-height:.9;background:var(--sb-grad-ink,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));-webkit-background-clip:text;background-clip:text;color:transparent;opacity:.12;filter:blur(22px);transform:scale(1.18);transition:opacity .5s ease,filter .8s cubic-bezier(.19,1,.22,1),transform .9s cubic-bezier(.19,1,.22,1);}
.jy-word.on{opacity:1;filter:blur(0);transform:scale(1);}
.jy-wsub{margin-top:20px;font-size:clamp(16px,2vw,22px);color:#2b2f36;font-weight:500;opacity:0;transform:translateY(10px);transition:opacity .5s ease .05s,transform .55s cubic-bezier(.16,1,.3,1) .05s;}
.jy-wsub.on{opacity:1;transform:none;}
.jy-stamp{margin-top:26px;display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--jy-ink);border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed)) border-box;border-radius:999px;padding:10px 20px;opacity:0;transform:translateY(10px) scale(.85);transition:opacity .4s ease,transform .55s cubic-bezier(.34,1.56,.64,1);}
.jy-stamp.on{opacity:1;transform:none;}
/* micro-parallax: layers drift at different rates inside a beat (depth) */
.jy-beat .jy-kick{transform:translateY(calc(var(--bty,0px) * .5));}
.jy-beat .jy-cap{transform:translateY(calc(var(--bty,0px) * .3));}
.jy-stamp .dot{width:9px;height:9px;border-radius:50%;background:var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed));}
.jy-stars{margin-top:16px;display:flex;justify-content:center;gap:8px;font-size:clamp(26px,4vw,44px);color:#f5b942;}
.jy-stars span{opacity:0;transform:scale(.4);transition:opacity .4s ease,transform .5s cubic-bezier(.34,1.56,.64,1);}
.jy-stars.on span{opacity:1;transform:none;}

/* THE RECEIPT — clean and punchy (Jacob: it looked sloppy). Both totals side by side,
   always one row; flips centered tight beneath, landing in a stagger. */
.jy-rec .jy-rtots{margin-top:22px;display:flex;justify-content:center;align-items:flex-start;gap:clamp(22px,5vw,72px);flex-wrap:nowrap;}
.jy-rtot{text-align:center;min-width:0;}
.jy-rn{font-size:clamp(34px,7vw,104px);font-weight:600;letter-spacing:-.05em;background:var(--sb-grad-ink,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1;font-variant-numeric:tabular-nums;white-space:nowrap;}
.jy-rl{margin:10px auto 0;font-size:clamp(13px,1.5vw,15.5px);color:var(--jy-sub);max-width:22ch;line-height:1.4;}
.jy-flips{margin:clamp(24px,4vh,40px) auto 0;max-width:540px;text-align:left;}
.jy-fl{display:flex;align-items:baseline;justify-content:center;gap:12px;padding:12px 4px;border-top:1px solid rgba(6,12,20,.08);flex-wrap:wrap;opacity:0;transform:translateY(14px);transition:opacity .5s ease,transform .6s cubic-bezier(.16,1,.3,1);}
.jy-fl.on{opacity:1;transform:none;}
.jy-flips .jy-fl:nth-child(1).on{transition-delay:.45s;}
.jy-flips .jy-fl:nth-child(2).on{transition-delay:.62s;}
.jy-flips .jy-fl:nth-child(3).on{transition-delay:.79s;}
.jy-fl:first-of-type{border-top:0;}
.jy-fl .fll{flex:0 0 118px;font-size:13.5px;font-weight:600;color:var(--jy-cap);text-align:right;}
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
/* two cards sized IDENTICALLY to the landing's three-up cards (~345px each), not
   stretched to fill (Jacob, July 27: "they look stretched out here") */
.jy-owrap{max-width:764px;margin:0 auto;}
.jy-others h2{text-align:center;font-size:clamp(26px,4vw,46px);font-weight:600;letter-spacing:-.038em;}
.jy-olede{margin:12px auto 0;text-align:center;font-size:15px;color:var(--jy-sub);}
.jy-ogrid{margin-top:clamp(26px,4vh,40px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,2.4vw,24px);}
@media(max-width:720px){.jy-ogrid{grid-template-columns:1fr;}}
.jy-ocard{display:block;background:#fff;border:1px solid rgba(6,12,20,.08);border-radius:22px;padding:0;overflow:hidden;text-decoration:none;color:var(--jy-ink);box-shadow:0 1px 2px rgba(6,12,20,.04),0 26px 54px -34px rgba(6,12,20,.35);transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s cubic-bezier(.16,1,.3,1);}
.jy-ocard:hover{transform:translateY(-5px);box-shadow:0 1px 2px rgba(6,12,20,.05),0 40px 74px -36px rgba(6,12,20,.45);}
.jy-osvc{display:block;text-align:center;padding:14px 12px 12px;font-size:17px;font-weight:700;letter-spacing:-.015em;}
.jy-obanner{display:block;height:112px;position:relative;overflow:hidden;}
.jy-obanner img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.08);transition:transform .8s cubic-bezier(.16,1,.3,1);}
.jy-ocard:hover .jy-obanner img{transform:scale(1.05);}
.jy-owash{position:absolute;inset:0;mix-blend-mode:multiply;}
.jy-obanner::after{content:'';position:absolute;inset:0;background:radial-gradient(120% 95% at 76% 0%,rgba(255,255,255,.22),transparent 55%);}
.jy-obody{display:block;padding:0 clamp(20px,2.4vw,28px) clamp(22px,2.6vw,30px);}
.jy-opav{display:block;width:104px;height:104px;border-radius:50%;margin-top:-52px;border:4px solid #fff;overflow:hidden;background:#fff;box-shadow:0 12px 28px rgba(6,12,20,.22);position:relative;z-index:1;}
.jy-opav img{display:block;width:100%;height:100%;object-fit:cover;}
.jy-oname{display:block;margin-top:12px;font-size:20px;font-weight:700;letter-spacing:-.022em;}
.jy-orole{display:block;margin-top:2px;font-size:13px;font-weight:500;color:var(--jy-cap);}
.jy-ocard .on2{margin-top:8px;font-size:clamp(17px,1.62vw,22.5px);font-weight:600;letter-spacing:-.03em;line-height:1.12;white-space:nowrap;}
.jy-ocard .od{margin-top:10px;font-size:14.5px;line-height:1.55;color:var(--jy-sub);}
.jy-ocard .go{margin-top:18px;display:inline-flex;align-items:center;gap:9px;font-size:14.5px;font-weight:600;color:var(--jy-ink);border:1.5px solid rgba(6,12,20,.16);border-radius:999px;padding:11px 20px;transition:border-color .3s ease,gap .3s ease;}
.jy-ocard .go .arw{transition:transform .35s cubic-bezier(.16,1,.3,1);}
.jy-ocard:hover .go{border-color:var(--hc,#4f46e5);gap:13px;}
.jy-ocard:hover .go .arw{color:var(--hc,#4f46e5);}

/* THE FINALE — the gradient takeover */
.jy-finale{min-height:100vh;min-height:100svh;display:flex;align-items:center;justify-content:center;text-align:center;padding:clamp(80px,12vh,140px) 24px;position:relative;overflow:hidden;background:linear-gradient(135deg,#06b6d4,#10b981 38%,#4f46e5 72%,#7c3aed);color:#fff;}
.jy-finale::before{content:'';position:absolute;inset:0;background:radial-gradient(80% 60% at 50% 8%,rgba(255,255,255,.22),transparent 60%),radial-gradient(90% 50% at 50% 100%,rgba(6,8,13,.28),transparent 70%);}
.jy-fin-in{position:relative;z-index:1;}
.jy-fin-kick{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.8);}
.jy-finale h2{margin-top:18px;font-size:clamp(29px,7.2vw,100px);font-weight:600;letter-spacing:-.045em;line-height:1.05;text-shadow:0 2px 44px rgba(0,0,0,.3);}
.jy-fin-cta{margin-top:clamp(30px,4.5vh,44px);display:inline-flex;align-items:center;gap:10px;background:#fff;color:var(--jy-ink);font-size:16.5px;font-weight:600;border-radius:999px;padding:18px 40px;text-decoration:none;box-shadow:0 22px 54px -18px rgba(0,0,0,.5);transition:transform .3s ease,box-shadow .3s ease;}
.jy-fin-cta:hover{transform:translateY(-2px);box-shadow:0 30px 66px -18px rgba(0,0,0,.6);}
.jy-fin-note{margin-top:16px;font-size:13px;color:rgba(255,255,255,.78);}

@media(prefers-reduced-motion:reduce){
  .jy-rv,.jy-leak,.jy-fl,.jy-stars span,.jy .fbody,.jy .pfq-q,.jy .pfq-q .pl,.jy-word,.jy-wsub,.jy-stamp,.jy-payjoy{transition:none;}
  .jy-cue{animation:none;opacity:1;}
  .jy-pill,.jy-title h1 .l1,.jy-title h1 .l2,.jy-sub,.jy-title .jy-avchip{animation:none;opacity:1;transform:none;filter:none;}
  .jy-title h1 .l2::before{animation:none;opacity:.62;transform:none;}
  .jy-fbg img{animation:none;transform:none;}
  .jy-grain,.jy-bar{display:none;}
}
`;
