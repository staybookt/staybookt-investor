'use client';

/* SUCCESS STORIES — full-bleed, one owner per screen (the "Apple" layout Jacob picked
   over the LinkedIn card grid and the hybrid). Each owner owns a viewport: photo, one
   bold line, a supporting sentence, and a tap that drops into an immersive journey
   player (five frames: breaking point -> co-pilot -> front office runs -> compounds ->
   where they land).

   ILLUSTRATIVE ON PURPOSE. Marcus / Sean / Kim are composite example journeys, not real
   named clients, and the page says so. This is the guardrail that keeps us clear of what
   got /work pulled (fabricated proof on a page that implied it was real). The moment a
   real client goes on record (TCE / Tim), we swap one in and label THAT as real.

   Self-contained: its own <style> so it doesn't depend on globals. Photos are stock
   (Pexels), placed in /public. */

import { useEffect, useRef, useState } from 'react';
import { START_LINK } from '@/lib/site';
import { min } from '@/lib/css';

type Catch = { i: string; c: string; b: string; s: string };
type Frame = { k: string; big: string; cap: string; catch?: Catch | null; payoff?: boolean };
type Journey = {
  id: string; tag: string; person: string; biz: string; icon: string; color: string;
  img: string; pos: string; her: boolean; bigline: string; subline: string; frames: Frame[];
};

const JOURNEYS: Journey[] = [
  {
    id: 'trade', tag: 'The electrician', person: 'Marcus Bell', biz: 'Seamless Electric',
    icon: '⚡', color: '#06b6d4', img: '/story-marcus.jpg', pos: 'center', her: false,
    bigline: 'Marcus got his <span class="g">nights back</span>.',
    subline: 'A five-person shop that stopped missing the call that pays the bills.',
    frames: [
      { k: 'The breaking point', big: 'A $14,000 job just went to <span class="g">voicemail</span>.', cap: 'It’s 4:47 PM. Marcus is up a ladder, both hands on a breaker. The homeowner hires the shop that picked up.', catch: null },
      { k: 'The co-pilot arrives', big: 'Now every call gets answered <span class="g">in his voice</span>.', cap: 'StayBookt learns Seamless Electric: his prices, his service area, how he talks. Even when he can’t reach his phone.', catch: { i: '☎', c: '#06b6d4', b: 'Missed call', s: 'Answered, booked' } },
      { k: 'The front office runs', big: 'Nothing gets <span class="g">dropped</span> anymore.', cap: 'Calls answered, jobs booked, quotes chased to a yes or no, a review asked for on every finished job. One 30-second brief each morning.', catch: { i: '\u{1F4CB}', c: '#10b981', b: 'Quote sent', s: 'Chased, won' } },
      { k: 'It compounds', big: 'The calendar fills <span class="g">without him</span>.', cap: 'Reviews climb 7 to 60. He ranks higher, gets picked more. Missed calls, gone.', catch: { i: '⭐', c: '#7c3aed', b: 'Finished job', s: '5-star review' } },
      { k: 'Where he lands', big: 'He runs the business. <span class="g">We run the busywork.</span>', cap: 'A year in: back on the tools, ten days away with the family, pricing a fourth van.', payoff: true },
    ],
  },
  {
    id: 'consult', tag: 'The consultant', person: 'Sean Anderson', biz: 'Anderson Consulting',
    icon: '\u{1F4BC}', color: '#4f46e5', img: '/story-sean.jpg', pos: 'center', her: false,
    bigline: 'Sean stopped <span class="g">chasing</span>.',
    subline: 'A solo consultant whose best leads no longer slip away while he delivers.',
    frames: [
      { k: 'The breaking point', big: 'His best leads leaked out <span class="g">the bottom</span>.', cap: 'Two referrals, exactly his kind of client. Both gone: he took five days to reply while heads-down delivering.', catch: null },
      { k: 'The co-pilot arrives', big: 'Every inquiry answered <span class="g">the same day</span>.', cap: 'StayBookt learns his niche and his voice, and answers the moment a lead comes in, even mid-sprint.', catch: { i: '✉', c: '#4f46e5', b: 'New inquiry', s: 'Replied same day' } },
      { k: 'The front office runs', big: 'Warm leads stay <span class="g">warm</span>.', cap: 'Discovery calls booked to his calendar. A quiet nurture through his delivery weeks. The wins in his inbox packaged into proof.', catch: { i: '\u{1F4C5}', c: '#06b6d4', b: 'Discovery call', s: 'Booked' } },
      { k: 'It compounds', big: 'The pipeline stops <span class="g">swinging</span>.', cap: 'Always two or three engagements deep. The empty months are over.', catch: { i: '\u{1F4C8}', c: '#10b981', b: 'Pipeline', s: 'Always full' } },
      { k: 'Where he lands', big: 'He picks his clients. <span class="g">That’s the point.</span>', cap: 'A year in: he raises his rates, chooses the work, and stops trading delivery time for chasing.', payoff: true },
    ],
  },
  {
    id: 'realtor', tag: 'The agent', person: 'Kim Dempster', biz: 'Dempster Group',
    icon: '\u{1F3E0}', color: '#7c3aed', img: '/story-kim.jpg', pos: '50% 32%', her: true,
    bigline: 'Kim’s first to <span class="g">every door</span>.',
    subline: 'A top agent who answers every lead in seconds, even mid-showing.',
    frames: [
      { k: 'The breaking point', big: 'The lead toured a home with <span class="g">someone else</span>.', cap: 'A lead pings at 6:12 PM. Kim’s mid-showing across town. The agent who answered first already has them.', catch: null },
      { k: 'The co-pilot arrives', big: 'Every lead answered <span class="g">in seconds</span>.', cap: 'StayBookt learns Kim’s market and her voice, and responds while she’s at the open house, the closing, the school pickup.', catch: { i: '\u{1F4F1}', c: '#7c3aed', b: 'New lead', s: 'Answered in seconds' } },
      { k: 'The front office runs', big: 'The database stops <span class="g">going cold</span>.', cap: 'New leads booked to showings. Past clients nurtured all year, not just at the sale.', catch: { i: '\u{1F465}', c: '#06b6d4', b: 'Past client', s: 'Nurtured, referred' } },
      { k: 'It compounds', big: 'Repeat and referral <span class="g">compound</span>.', cap: 'She’s first to every door without living on her phone.', catch: { i: '\u{1F3C6}', c: '#10b981', b: 'Referral', s: 'New listing' } },
      { k: 'Where she lands', big: 'She sells the homes. <span class="g">We run the rest.</span>', cap: 'A year in: top producer in her office, more listings, and her evenings back.', payoff: true },
    ],
  },
];

export default function SuccessStories() {
  const [open, setOpen] = useState(false);
  const [ji, setJi] = useState(0);
  const [fi, setFi] = useState(0);
  const [active, setActive] = useState(0);
  const actRefs = useRef<(HTMLElement | null)[]>([]);

  // fade-in each act as it enters, and track which owner the rail highlights
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('seen');
          const i = Number((e.target as HTMLElement).dataset.i);
          if (!Number.isNaN(i)) setActive(i);
        }
      }),
      { threshold: 0.55 },
    );
    actRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // keyboard nav + body scroll lock while the player is open
  useEffect(() => {
    if (!open) return;
    const cur = JOURNEYS[ji];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setFi((x) => Math.min(x + 1, cur.frames.length - 1));
      if (e.key === 'ArrowLeft') setFi((x) => Math.max(x - 1, 0));
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, ji]);

  const openJ = (i: number) => { setJi(i); setFi(0); setOpen(true); };
  const go = (d: number) => setFi((x) => Math.min(Math.max(0, x + d), JOURNEYS[ji].frames.length - 1));

  const cur = JOURNEYS[ji];
  const fr = cur.frames[fi];

  return (
    <section className="ss">
      <style>{min(CSS)}</style>

      <div className="ss-hero">
        <div className="eyebrow">Success stories</div>
        <h1>See it through <span className="g">someone like you</span><span className="pd">.</span></h1>
        <p>Three owners, three corners of the same world. The work was never the problem. The front of the business was. Step into whichever one sounds like your week.</p>
      </div>

      <div className="ss-acts">
        {JOURNEYS.map((jj, i) => (
          <section
            key={jj.id}
            className={'ss-act ss-' + jj.id}
            data-i={i}
            ref={(el) => { actRefs.current[i] = el; }}
            onClick={() => openJ(i)}
          >
            <div className="ss-bg" style={{ backgroundImage: `url(${jj.img})`, backgroundPosition: jj.pos }} />
            <div className="ss-scrim" />
            <div className="ss-in">
              <div className="tag">{jj.tag}</div>
              <h2 className="bigline" dangerouslySetInnerHTML={{ __html: jj.bigline }} />
              <p className="subline">{jj.subline}</p>
              <div className="who">{jj.person} &middot; {jj.biz}</div>
              <button
                className="enter"
                onClick={(e) => { e.stopPropagation(); openJ(i); }}
              >
                See {jj.her ? 'her' : 'his'} year <span className="arw">&rarr;</span>
              </button>
            </div>
          </section>
        ))}
      </div>

      <div className="ss-note">Illustrative example journeys, not real named clients. Photography is stock.</div>

      <div className="ss-rail" aria-hidden="true">
        {JOURNEYS.map((jj, i) => (
          <button
            key={jj.id}
            className={i === active ? 'on' : ''}
            onClick={() => actRefs.current[i]?.scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </div>

      {open && (
        <div className="ss-player" role="dialog" aria-modal="true">
          <div className="pbar">
            {cur.frames.map((_, i) => (
              <div key={i} className={'pseg' + (i < fi ? ' done' : '') + (i === fi ? ' active' : '')}><i /></div>
            ))}
          </div>
          <div className="ptop">
            <div className="who2">
              <span className="dot" style={{ background: `linear-gradient(135deg,${cur.color},#7c3aed)` }} dangerouslySetInnerHTML={{ __html: cur.icon }} />
              <span>{cur.person} &middot; {cur.biz}</span>
            </div>
            <button className="px" aria-label="Close" onClick={() => setOpen(false)}>&times;</button>
          </div>
          <div className="stage">
            <div className="thread"><i style={{ height: Math.round(((fi + 1) / cur.frames.length) * 100) + '%' }} /></div>
            <div className="tap l" onClick={() => go(-1)} />
            <div className="tap r" onClick={() => go(1)} />
            <div className="scene" key={fi}>
              <div className="chip"><span className="b" />{fr.k}</div>
              <div className="big" dangerouslySetInnerHTML={{ __html: fr.big }} />
              <div className="cap">{fr.cap}</div>
              {fr.catch && (
                <div className="catch">
                  <span className="ci" style={{ background: `linear-gradient(135deg,${fr.catch.c},#7c3aed)` }} dangerouslySetInnerHTML={{ __html: fr.catch.i }} />
                  <span className="ct"><b>{fr.catch.b}</b><span>&#10003; {fr.catch.s}</span></span>
                </div>
              )}
              {fr.payoff && (
                <div className="pay">
                  <a className="cta" href={START_LINK}>Start your journey &rarr;</a>
                  <button className="again" onClick={() => setOpen(false)}>See another journey</button>
                </div>
              )}
            </div>
          </div>
          <div className="nav2">
            <button style={{ visibility: fi === 0 ? 'hidden' : 'visible' }} onClick={() => go(-1)}>Back</button>
            <button style={{ visibility: fi === cur.frames.length - 1 ? 'hidden' : 'visible' }} onClick={() => go(1)}>Next &rarr;</button>
          </div>
        </div>
      )}
    </section>
  );
}

const CSS = `
.ss{position:relative;background:#f6f6f3;color:#06080d;--grad:linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed);}
.ss .g{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}

.ss-hero{max-width:1100px;margin:0 auto;padding:clamp(120px,18vh,210px) clamp(22px,5vw,56px) clamp(40px,6vh,72px);text-align:center;}
.ss-hero .eyebrow{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#42474f;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--grad) border-box;border-radius:999px;padding:9px 18px;margin-bottom:24px;}
.ss-hero h1{font-size:clamp(38px,6.4vw,80px);font-weight:600;letter-spacing:-.045em;line-height:1.0;}
.ss-hero h1 .pd{color:#7c3aed;}
.ss-hero p{margin:22px auto 0;font-size:clamp(16px,1.9vw,20px);line-height:1.6;color:#52565e;max-width:58ch;}

.ss-act{position:relative;height:100vh;height:100svh;display:flex;align-items:flex-end;justify-content:flex-end;overflow:hidden;cursor:pointer;color:#fff;}
.ss-bg{position:absolute;inset:0;z-index:0;background-size:cover;background-position:center;transition:transform 1.2s cubic-bezier(.16,1,.3,1);}
.ss-act:hover .ss-bg{transform:scale(1.03);}
.ss-scrim{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(6,8,13,.2) 0%,rgba(6,8,13,0) 30%,rgba(6,8,13,.5) 74%,rgba(6,8,13,.92) 100%),linear-gradient(90deg,rgba(6,8,13,0) 42%,rgba(6,8,13,.55) 100%);}
.ss-in{position:relative;z-index:2;max-width:min(58%,640px);width:100%;padding:0 clamp(24px,5vw,72px) clamp(60px,9vh,104px);}
.ss-in>*{opacity:0;transform:translateY(22px);}
.ss-act.seen .tag{animation:ssUp .8s cubic-bezier(.16,1,.3,1) .05s forwards;}
.ss-act.seen .bigline{animation:ssUp .9s cubic-bezier(.16,1,.3,1) .15s forwards;}
.ss-act.seen .subline{animation:ssUp .9s cubic-bezier(.16,1,.3,1) .3s forwards;}
.ss-act.seen .who{animation:ssUp .9s cubic-bezier(.16,1,.3,1) .42s forwards;}
.ss-act.seen .enter{animation:ssUp .9s cubic-bezier(.16,1,.3,1) .54s forwards;}
@keyframes ssUp{to{opacity:1;transform:none;}}
.ss-in .tag{font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.72);}
.ss-in .bigline{margin-top:16px;font-size:clamp(34px,6vw,72px);font-weight:600;letter-spacing:-.04em;line-height:1.02;max-width:16ch;}
.ss-in .subline{margin-top:20px;font-size:clamp(16px,2vw,22px);line-height:1.5;color:rgba(255,255,255,.85);max-width:40ch;font-weight:400;}
.ss-in .who{margin-top:24px;font-size:14px;font-weight:600;color:rgba(255,255,255,.72);}
.ss-in .enter{margin-top:22px;display:inline-flex;align-items:center;gap:11px;background:none;border:0;color:#fff;font:inherit;font-size:16px;font-weight:600;cursor:pointer;}
.ss-in .enter .arw{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.28);display:flex;align-items:center;justify-content:center;font-size:15px;transition:transform .35s cubic-bezier(.16,1,.3,1),background .3s ease;}
.ss-act:hover .enter .arw{transform:translateX(5px);background:rgba(255,255,255,.26);}

@media(max-width:860px){
  .ss-act{justify-content:flex-start;}
  .ss-in{max-width:none;}
  .ss-scrim{background:linear-gradient(180deg,rgba(6,8,13,.28) 0%,rgba(6,8,13,0) 30%,rgba(6,8,13,.5) 66%,rgba(6,8,13,.95) 100%);}
  .ss-trade .ss-bg{background-position:34% 46%!important;}
  .ss-consult .ss-bg{background-position:38% 40%!important;}
  .ss-realtor .ss-bg{background-position:50% 26%!important;}
}

.ss-note{background:#06080d;color:rgba(255,255,255,.66);text-align:center;font-size:12.5px;letter-spacing:.01em;padding:16px 22px;}

.ss-rail{position:fixed;right:26px;top:50%;transform:translateY(-50%);z-index:40;display:flex;flex-direction:column;gap:12px;}
.ss-rail button{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.5);border:0;cursor:pointer;padding:0;box-shadow:0 1px 4px rgba(0,0,0,.35);transition:transform .3s ease,background .3s ease;}
.ss-rail button.on{background:#fff;transform:scale(1.35);}
@media(max-width:640px){.ss-rail{display:none;}}

/* ---- immersive journey player ---- */
.ss-player{position:fixed;inset:0;z-index:1000;background:#06080d;color:#fff;display:flex;flex-direction:column;animation:ssPin .5s cubic-bezier(.16,1,.3,1);}
@keyframes ssPin{from{opacity:0;transform:scale(1.04);}to{opacity:1;transform:none;}}
.ss-player .pbar{display:flex;gap:6px;padding:18px 22px 0;}
.ss-player .pseg{flex:1;height:2.5px;border-radius:2px;background:rgba(255,255,255,.16);overflow:hidden;}
.ss-player .pseg i{display:block;height:100%;width:0;background:var(--grad);}
.ss-player .pseg.done i{width:100%;}
.ss-player .pseg.active i{width:100%;transition:width 5s linear;}
.ss-player .ptop{display:flex;align-items:center;justify-content:space-between;padding:14px 22px;}
.ss-player .who2{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;color:rgba(255,255,255,.7);}
.ss-player .who2 .dot{width:26px;height:26px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;}
.ss-player .px{background:none;border:0;color:rgba(255,255,255,.6);font-size:26px;cursor:pointer;line-height:1;}
.ss-player .px:hover{color:#fff;}
.ss-player .stage{flex:1;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.ss-player .thread{position:absolute;left:50%;top:0;bottom:0;width:2px;transform:translateX(-50%);background:linear-gradient(180deg,transparent,rgba(255,255,255,.05));}
.ss-player .thread i{position:absolute;left:50%;top:0;width:4px;transform:translateX(-50%);background:var(--grad);box-shadow:0 0 24px 4px rgba(16,185,129,.5);border-radius:2px;transition:height 1.1s cubic-bezier(.16,1,.3,1);}
.ss-player .scene{position:relative;z-index:1;max-width:720px;padding:0 28px;text-align:center;animation:ssScene .65s cubic-bezier(.16,1,.3,1);}
@keyframes ssScene{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:none;}}
.ss-player .chip{display:inline-flex;align-items:center;gap:9px;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.9);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:8px 16px;}
.ss-player .chip .b{width:7px;height:7px;border-radius:50%;background:var(--grad);}
.ss-player .big{margin-top:28px;font-size:clamp(28px,4.8vw,56px);font-weight:600;letter-spacing:-.038em;line-height:1.06;}
.ss-player .big .g{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.ss-player .cap{margin:22px auto 0;font-size:clamp(15px,1.7vw,18px);line-height:1.62;color:rgba(255,255,255,.66);max-width:50ch;font-weight:400;}
.ss-player .catch{margin:30px auto 0;display:inline-flex;align-items:center;gap:12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:14px 18px;}
.ss-player .ci{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;}
.ss-player .ct{text-align:left;}
.ss-player .ct b{display:block;font-size:15px;font-weight:600;}
.ss-player .ct span{display:block;font-size:12.5px;font-weight:700;color:#34d399;margin-top:2px;}
.ss-player .pay{margin-top:30px;}
.ss-player .cta{display:inline-flex;align-items:center;gap:9px;background:#fff;color:#06080d;font-size:15.5px;font-weight:600;border-radius:999px;padding:16px 34px;text-decoration:none;transition:transform .3s ease;}
.ss-player .cta:hover{transform:translateY(-2px);}
.ss-player .again{margin-top:16px;display:block;width:100%;background:none;border:0;color:rgba(255,255,255,.6);font:inherit;font-size:14px;font-weight:600;cursor:pointer;}
.ss-player .nav2{display:flex;align-items:center;justify-content:space-between;padding:20px 22px 30px;}
.ss-player .nav2 button{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:#fff;font:inherit;font-size:14px;font-weight:600;border-radius:999px;padding:12px 22px;cursor:pointer;}
.ss-player .tap{position:absolute;top:0;bottom:0;width:32%;z-index:2;cursor:pointer;}
.ss-player .tap.l{left:0;}
.ss-player .tap.r{right:0;}
@media(prefers-reduced-motion:reduce){.ss-bg,.ss-in>*,.ss-player,.ss-player .scene{animation:none!important;transition:none!important;opacity:1!important;transform:none!important;}}
`;
