'use client';

import { useEffect, useRef, useState } from 'react';

/* ============================================================
 * A TUESDAY
 * The signature experience of the About page.
 *
 * The homepage is a film. How it works is a map. This is a DAY.
 *
 * THREE Tuesdays, in order:
 *   1. YOURS      (TheDay)   scroll-pinned, selectable by trade. The pain.
 *   2. THEIRS     (BigDay)   the same day inside a 100-person company, where
 *                            every call is caught and nobody thinks it is
 *                            remarkable. This is the hinge: Richard RAN that
 *                            Tuesday, Jacob WATCHED the other one. The gap
 *                            between them was never talent, it was five salaries.
 *   3. YOURS,     (FixedDay) the third Tuesday, handed to a business with one
 *      FIXED                 truck or one desk.
 *
 * CRITICAL: our ICP is owner-operated SERVICE businesses under $5M, not just the
 * trades. So day 1 is SELECTABLE. The times, the leaks and the ledger are
 * identical across every business. Only the texture changes. That is the point.
 *
 * Driven by a direct, position-based scroll listener (same proven pattern as
 * JourneyMap) rather than a scroll-scrub library, which lagged on desktop.
 * ========================================================== */

/* The skeleton is shared. This is the point of the whole section. */
type Slot = { t: string; k: 'good' | 'leak' | 'lost' | 'end'; led?: string };

const SKELETON: Slot[] = [
  { t: '6:10 AM', k: 'good' },
  { t: '8:30 AM', k: 'leak', led: 'Missed call' },
  { t: '11:15 AM', k: 'leak', led: 'Quote owed' },
  { t: '1:40 PM', k: 'leak', led: 'Review never asked' },
  { t: '3:20 PM', k: 'leak', led: '2 more missed calls' },
  { t: '6:47 PM', k: 'lost', led: 'A job, gone' },
  { t: '9:00 PM', k: 'leak', led: '2 hours of admin' },
  { t: '11:10 PM', k: 'end' },
];

type Line = { h: string; s: string };

const TRADES: { id: string; label: string; lines: Line[] }[] = [
  {
    id: 'electrical',
    label: 'Electrician',
    lines: [
      { h: 'Van loaded. First coffee.', s: 'This is the part you actually love. Nobody is calling yet.' },
      { h: 'Hands inside a panel. The phone rings.', s: 'You cannot answer it. It goes to voicemail. She does not leave one.' },
      { h: '&ldquo;Can you quote me for the rewire?&rdquo;', s: 'You tell her you will send it tonight. You mean it, too.' },
      { h: 'Job done. She is thrilled with it.', s: 'She would have left you five stars today. Nobody asked her to.' },
      { h: 'Two more calls while you are up a ladder.', s: 'Both go to voicemail. One of them was the big one. You will never know which.' },
      { h: 'The last call of the day.', s: 'It rings out. Twenty seconds later she calls the next electrician on the list. He picks up.' },
      { h: 'Laptop on the couch.', s: 'The quote you promised. Two invoices. The follow-ups you never got to. This is the second shift.' },
      { h: 'Bed.', s: 'Tomorrow is the same day. So is the one after that.' },
    ],
  },
  {
    id: 'plumbing',
    label: 'Plumber',
    lines: [
      { h: 'Van loaded. First coffee.', s: 'This is the part you actually love. Nobody is calling yet.' },
      { h: 'Under a sink. The phone rings.', s: 'Both hands are wet and full. It goes to voicemail. She does not leave one.' },
      { h: '&ldquo;What would it cost to redo the bathroom?&rdquo;', s: 'You tell her you will price it up tonight. You mean it, too.' },
      { h: 'Leak fixed. Kitchen dry. She is delighted.', s: 'She would have left you five stars today. Nobody asked her to.' },
      { h: 'Two more calls while you are cutting pipe.', s: 'Both go to voicemail. One of them was a full repipe. You will never know which.' },
      { h: 'The last call of the day.', s: 'It rings out. Twenty seconds later she calls the next plumber on the list. He picks up.' },
      { h: 'Laptop on the couch.', s: 'The quote you promised. Two invoices. The follow-ups you never got to. This is the second shift.' },
      { h: 'Bed.', s: 'Tomorrow is the same day. So is the one after that.' },
    ],
  },
  {
    id: 'hvac',
    label: 'HVAC',
    lines: [
      { h: 'Van loaded. First coffee.', s: 'This is the part you actually love. Nobody is calling yet.' },
      { h: 'Halfway inside a furnace. The phone rings.', s: 'You cannot answer it. It goes to voicemail. She does not leave one.' },
      { h: '&ldquo;How much for a whole new system?&rdquo;', s: 'You tell her you will get her a number tonight. You mean it, too.' },
      { h: 'Heat is back on. She is hugely relieved.', s: 'She would have left you five stars today. Nobody asked her to.' },
      { h: 'Two more calls while you are on a roof.', s: 'Both go to voicemail. One of them was a full system replacement. You will never know.' },
      { h: 'The last call of the day.', s: 'It rings out. Twenty seconds later she calls the next HVAC company on the list. He picks up.' },
      { h: 'Laptop on the couch.', s: 'The quote you promised. Two invoices. The follow-ups you never got to. This is the second shift.' },
      { h: 'Bed.', s: 'Tomorrow is the same day. So is the one after that.' },
    ],
  },
  {
    id: 'landscaping',
    label: 'Landscaper',
    lines: [
      { h: 'Trailer hitched. First coffee.', s: 'This is the part you actually love. Nobody is calling yet.' },
      { h: 'Mower running. The phone rings.', s: 'You cannot even hear it. It goes to voicemail. She does not leave one.' },
      { h: '&ldquo;Can you price a full backyard redo?&rdquo;', s: 'You tell her you will work it out tonight. You mean it, too.' },
      { h: 'The property looks incredible. She says so.', s: 'She would have left you five stars today. Nobody asked her to.' },
      { h: 'Two more calls while you are hauling stone.', s: 'Both go to voicemail. One of them was a full install. You will never know which.' },
      { h: 'The last call of the day.', s: 'It rings out. Twenty seconds later she calls the next landscaper on the list. He picks up.' },
      { h: 'Laptop at the kitchen table.', s: 'The quote you promised. Two invoices. The follow-ups you never got to. This is the second shift.' },
      { h: 'Bed.', s: 'Tomorrow is the same day. So is the one after that.' },
    ],
  },
  {
    id: 'cleaning',
    label: 'Cleaning',
    lines: [
      { h: 'Van stocked. First coffee.', s: 'This is the part you actually love. Nobody is calling yet.' },
      { h: 'Mid-job, gloves on. The phone rings.', s: 'You cannot stop and answer it. It goes to voicemail. She does not leave one.' },
      { h: '&ldquo;What would weekly cost for a house this size?&rdquo;', s: 'You tell her you will send a price tonight. You mean it, too.' },
      { h: 'The house is spotless. She is thrilled.', s: 'She would have left you five stars today. Nobody asked her to.' },
      { h: 'Two more calls during a deep clean.', s: 'Both go to voicemail. One of them was a weekly contract. You will never know which.' },
      { h: 'The last call of the day.', s: 'It rings out. Twenty seconds later she calls the next cleaner on the list. He picks up.' },
      { h: 'Laptop at the kitchen table.', s: 'The quote you promised. Two invoices. The follow-ups you never got to. This is the second shift.' },
      { h: 'Bed.', s: 'Tomorrow is the same day. So is the one after that.' },
    ],
  },
  {
    id: 'consulting',
    label: 'Consultant',
    lines: [
      { h: 'Coffee. Inbox. First client at eight.', s: 'This is the part you actually love. The work is good and you are good at it.' },
      { h: 'On a client call. The other line rings.', s: 'You cannot break away. It goes to voicemail. She does not leave one.' },
      { h: '&ldquo;Can you send me a proposal?&rdquo;', s: 'You tell her you will get it over tonight. You mean it, too.' },
      { h: 'You just saved that client an expensive mistake.', s: 'She would have written you a glowing review today. Nobody asked her to.' },
      { h: 'Two more calls, back to back sessions.', s: 'Both go to voicemail. One of them was a retainer. You will never know which.' },
      { h: 'The last call of the day.', s: 'It rings out. Twenty seconds later she emails the next consultant on her list. He replies in ten minutes.' },
      { h: 'Laptop open again at nine.', s: 'The proposal you promised. Two invoices. The follow-ups you never got to. This is the second shift.' },
      { h: 'Bed.', s: 'Tomorrow is the same day. So is the one after that.' },
    ],
  },
];

/* THE THIRD TUESDAY: the same day, inside a company with a hundred people.
 * This is the hinge of the whole About page. Richard lived this Tuesday for two
 * decades. Jacob watched the other one. StayBookt is the bridge. */
const BIGCO: { t: string; h: string; by: string }[] = [
  { t: '6:10 AM', h: 'The owner has a coffee and reads the numbers.', by: 'Nothing to catch' },
  { t: '8:30 AM', h: 'The call is answered on the second ring. Booked.', by: 'Reception' },
  { t: '11:15 AM', h: 'The quote goes out that afternoon. Then it gets chased.', by: 'Sales' },
  { t: '1:40 PM', h: 'The review is asked for while she is still delighted.', by: 'Customer care' },
  { t: '3:20 PM', h: 'Both calls answered. Both booked. Nobody notices.', by: 'Reception' },
  { t: '6:47 PM', h: 'After hours. Answered anyway. Booked for Thursday.', by: 'The service' },
  { t: '9:00 PM', h: 'Nobody is working. The office closed at five.', by: 'Nobody' },
  { t: '11:10 PM', h: 'The owner is asleep. The business is fine without him.', by: 'The system' },
];

/* The same Tuesday, run again. Deliberately industry-neutral: this is what
 * WE do, and it is identical whichever business you picked. */
const FIXED: { t: string; h: string }[] = [
  { t: '8:30 AM', h: 'We answered. Booked her in for Thursday.' },
  { t: '11:15 AM', h: 'The quote went out before you had finished the job.' },
  { t: '1:40 PM', h: 'Review asked for while she was still smiling. Five stars.' },
  { t: '3:20 PM', h: 'Both calls answered. Both booked.' },
  { t: '6:47 PM', h: 'Answered on the second ring. Booked. You never even knew it happened.' },
  { t: '9:00 PM', h: 'You are not working. There is nothing left to do.' },
  { t: '5:30 PM', h: 'Because your day ended at half five.' },
];

const CSS = `
/* ===== A TUESDAY ===== */
.day-track{position:relative;height:800vh;background:#050506;}
.day-stage{position:sticky;top:0;height:100vh;min-height:640px;overflow:hidden;display:flex;flex-direction:column;color:#f5f5f7;}
.day-stage::before{content:'';position:absolute;inset:0;background:radial-gradient(70% 55% at 50% 0%,rgba(14,165,233,.10),transparent 62%);pointer-events:none;transition:background 1.2s ease;}
.day-stage[data-mood="dusk"]::before{background:radial-gradient(70% 55% at 50% 0%,rgba(245,158,11,.12),transparent 62%);}
.day-stage[data-mood="night"]::before{background:radial-gradient(70% 60% at 50% 100%,rgba(239,68,68,.10),transparent 62%);}

/* the trade picker, pinned with the day */
.day-pick{position:relative;z-index:4;padding:clamp(76px,10vh,104px) clamp(20px,4vw,40px) 0;text-align:center;}
.day-pick .pl{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#6f7681;}
.day-pick .chips{margin-top:12px;display:flex;flex-wrap:wrap;gap:7px;justify-content:center;}
.day-pick button{font-family:inherit;font-size:13px;font-weight:600;color:#9aa0ab;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10);border-radius:999px;padding:8px 15px;cursor:pointer;transition:color .25s,background .25s,border-color .25s;}
.day-pick button:hover{color:#f5f5f7;border-color:rgba(255,255,255,.24);}
.day-pick button.on{background:#f5f5f7;color:#050506;border-color:#f5f5f7;}

.day-in{position:relative;z-index:2;flex:1;display:grid;grid-template-columns:88px minmax(0,1fr) minmax(0,290px);gap:clamp(20px,4vw,52px);align-items:center;width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
@media(max-width:900px){
  .day-in{grid-template-columns:52px minmax(0,1fr);gap:16px;}
  .day-led{display:none;}
}

/* the clock rail */
.day-rail{position:relative;height:54vh;min-height:320px;}
.day-rail .ln{position:absolute;left:11px;top:0;bottom:0;width:2px;background:rgba(255,255,255,.10);border-radius:2px;}
.day-rail .fill{position:absolute;left:11px;top:0;width:2px;border-radius:2px;background:linear-gradient(180deg,#38bdf8,#f59e0b 62%,#ef4444);height:calc(var(--dp,0) * 100%);}
.day-rail .dot{position:absolute;left:4px;top:calc(var(--dp,0) * 100%);width:16px;height:16px;border-radius:50%;background:#f5f5f7;transform:translateY(-50%);box-shadow:0 0 0 5px rgba(245,245,247,.12);transition:background .6s ease,box-shadow .6s ease;}
.day-stage[data-mood="night"] .day-rail .dot{background:#ef4444;box-shadow:0 0 0 5px rgba(239,68,68,.16);}
.day-rail .tk{position:absolute;left:34px;font-size:10.5px;font-weight:700;letter-spacing:.1em;color:#565c66;transform:translateY(-50%);white-space:nowrap;transition:color .4s ease;}
.day-rail .tk.on{color:#f5f5f7;}
@media(max-width:900px){.day-rail .tk{display:none;}}

/* the beat */
.day-beats{position:relative;min-height:290px;}
.day-b{position:absolute;left:0;right:0;top:50%;transform:translateY(calc(-50% + 14px));opacity:0;transition:opacity .5s ease,transform .5s ease;pointer-events:none;}
.day-b.on{opacity:1;transform:translateY(-50%);}
.day-b .tm{font-size:13px;font-weight:700;letter-spacing:.18em;color:#38bdf8;transition:color .5s;}
.day-b.leak .tm{color:#f59e0b;}
.day-b.lost .tm{color:#ef4444;}
.day-b.end .tm{color:#8f97a4;}
.day-b h3{margin-top:14px;font-size:clamp(26px,4.2vw,54px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#f5f5f7;max-width:19ch;}
.day-b p{margin-top:18px;font-size:clamp(16px,1.85vw,21px);line-height:1.5;color:#aeb4c0;max-width:42ch;}

/* the ledger */
.day-led{align-self:center;}
.day-led .lh{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#6f7681;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.09);}
.day-led ul{list-style:none;margin:0;padding:0;}
.day-led li{display:flex;align-items:center;gap:10px;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:14.5px;color:#c7ccd6;opacity:0;transform:translateX(10px);transition:opacity .5s ease,transform .5s ease;}
.day-led li.on{opacity:1;transform:none;}
.day-led li i{width:6px;height:6px;border-radius:50%;background:#f59e0b;flex:0 0 auto;}
.day-led li.lost i{background:#ef4444;}
.day-led li.lost{color:#fff;font-weight:600;}

/* the tally */
.day-tally{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;padding:0 24px;opacity:0;pointer-events:none;transition:opacity .7s ease;background:linear-gradient(180deg,rgba(5,5,6,.74),rgba(5,5,6,.95));}
.day-stage[data-tally="1"] .day-tally{opacity:1;}
.day-tally .box{max-width:620px;text-align:center;}
.day-tally .k{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8f97a4;}
.day-tally h3{margin-top:16px;font-size:clamp(28px,4.4vw,56px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#f5f5f7;}
.day-tally .rows{margin-top:28px;display:grid;gap:1px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.09);border-radius:18px;overflow:hidden;}
.day-tally .rw{background:#08090b;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;gap:14px;font-size:14.5px;color:#c7ccd6;text-align:left;}
.day-tally .rw b{font-weight:600;color:#fff;}
.day-tally .rw.bad b{color:#ef4444;}
.day-tally .end{margin-top:24px;font-size:clamp(17px,2vw,22px);font-weight:600;letter-spacing:-.02em;color:#f5f5f7;}
.day-tally .end .g{color:#f59e0b;}
.day-tally .same{margin-top:18px;font-size:14.5px;line-height:1.55;color:#8f97a4;}
.day-tally .same b{color:#5eead4;font-weight:600;}

/* scroll cue */
.day-cue{position:absolute;left:0;right:0;bottom:24px;z-index:2;text-align:center;font-size:11.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#4d535c;transition:opacity .5s;}
.day-stage[data-tally="1"] .day-cue{opacity:0;}

@media(prefers-reduced-motion:reduce){
  .day-track{height:auto;}
  .day-stage{position:static;height:auto;min-height:0;padding:0 0 80px;}
  .day-b{position:static;opacity:1;transform:none;margin-bottom:44px;}
  .day-led li{opacity:1;transform:none;}
  .day-tally{position:static;opacity:1;background:none;padding:40px 0 0;}
  .day-beats{min-height:0;}
}

/* ===== THE THIRD TUESDAY: inside a big company ===== */
.big{background:#050506;color:#f5f5f7;padding:clamp(80px,11vw,150px) 0;position:relative;overflow:hidden;}
.big::before{content:'';position:absolute;inset:0;background:radial-gradient(58% 55% at 78% 0%,rgba(56,189,248,.12),transparent 62%);pointer-events:none;}
.big .wrap{position:relative;}
.big .hd{max-width:700px;}
.big .hd .eyebrow{color:#86868b;}
.big .hd h2{margin-top:14px;font-size:clamp(30px,4.4vw,58px);line-height:1.04;letter-spacing:-.035em;font-weight:600;color:#f5f5f7;}
.big .hd p{margin-top:18px;font-size:clamp(16px,1.9vw,20px);line-height:1.6;color:#aeb4c0;max-width:52ch;}
.big ol{list-style:none;margin:clamp(38px,5vw,56px) 0 0;padding:0;}
.big li{display:grid;grid-template-columns:92px minmax(0,1fr) auto;gap:16px;align-items:center;padding:17px 0;border-top:1px solid rgba(255,255,255,.08);opacity:0;transform:translateY(10px);transition:opacity .6s ease,transform .6s ease;}
.big.on li{opacity:1;transform:none;}
.big li .tm{font-size:12.5px;font-weight:700;letter-spacing:.08em;color:#6f7681;}
.big li .h{font-size:clamp(15.5px,1.85vw,20px);font-weight:600;letter-spacing:-.015em;color:#f5f5f7;}
.big li .by{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#5eead4;background:rgba(94,234,212,.1);border-radius:999px;padding:5px 11px;white-space:nowrap;}
.big li .by[data-none="1"]{color:#6f7681;background:rgba(255,255,255,.05);}
.big .kick{margin-top:clamp(34px,4vw,50px);font-size:clamp(19px,2.4vw,30px);font-weight:600;letter-spacing:-.025em;line-height:1.3;color:#f5f5f7;max-width:30ch;}
.big .kick .g{color:#f59e0b;}
.big .bridge{margin-top:clamp(30px,4vw,44px);padding-top:clamp(28px,3.5vw,38px);border-top:1px solid rgba(255,255,255,.09);font-size:clamp(16px,1.9vw,20px);line-height:1.65;color:#aeb4c0;max-width:58ch;}
.big .bridge b{color:#f5f5f7;font-weight:600;}
.big .bridge .em{color:#5eead4;font-weight:600;}
@media(max-width:760px){
  .big li{grid-template-columns:74px minmax(0,1fr);gap:10px;}
  .big li .by{grid-column:1 / -1;justify-self:start;margin-top:6px;}
}
@media(prefers-reduced-motion:reduce){.big li{opacity:1;transform:none;}}

/* ===== THE SAME TUESDAY, FIXED ===== */
.fix{background:var(--v4-cream);padding:clamp(80px,11vw,140px) 0;}
.fix .hd{max-width:640px;}
.fix .hd h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.04;letter-spacing:-.035em;font-weight:600;color:var(--v4-ink);}
.fix .hd p{margin-top:16px;font-size:17px;line-height:1.6;color:#6b7280;}
.fix ol{list-style:none;margin:clamp(36px,5vw,52px) 0 0;padding:0;}
.fix li{display:grid;grid-template-columns:96px 24px minmax(0,1fr);gap:14px;align-items:center;padding:18px 0;border-top:1px solid #e6e6e1;opacity:0;transform:translateY(10px);transition:opacity .6s ease,transform .6s ease;}
.fix.on li{opacity:1;transform:none;}
.fix li .tm{font-size:13px;font-weight:700;letter-spacing:.08em;color:#9298a1;}
.fix li .ck{width:24px;height:24px;border-radius:50%;background:rgba(16,185,129,.14);display:flex;align-items:center;justify-content:center;}
.fix li .h{font-size:clamp(16px,1.9vw,20px);font-weight:600;letter-spacing:-.015em;color:var(--v4-ink);}
.fix li:last-child .tm{color:#059669;}
.fix li:last-child .h{color:#059669;}
.fix .out{margin-top:clamp(34px,4vw,48px);font-size:clamp(20px,2.6vw,32px);font-weight:600;letter-spacing:-.025em;line-height:1.25;color:var(--v4-ink);max-width:30ch;}
.fix .out .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
@media(max-width:640px){.fix li{grid-template-columns:74px 20px minmax(0,1fr);gap:10px;}}
@media(prefers-reduced-motion:reduce){.fix li{opacity:1;transform:none;}}
`;

export function TheDay() {
  const trackRef = useRef<HTMLElement | null>(null);
  const [i, setI] = useState(0);
  const [dp, setDp] = useState(0);
  const [tally, setTally] = useState(false);
  const [trade, setTrade] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setI(SKELETON.length - 1);
      setDp(1);
      setTally(true);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-r.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        const dayP = Math.min(p / 0.82, 1);
        setDp(dayP);
        setI(Math.min(SKELETON.length - 1, Math.floor(dayP * SKELETON.length)));
        setTally(p > 0.87);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const mood = i <= 1 ? 'day' : i <= 5 ? 'dusk' : 'night';
  const lines = TRADES[trade].lines;
  const leaks = SKELETON.map((s, n) => ({ ...s, n })).filter((s) => s.led);

  return (
    <>
      <style>{CSS}</style>
      <section ref={trackRef} className="day-track" aria-label="A Tuesday in the life of an owner-operator">
        <div className="day-stage" data-mood={mood} data-tally={tally ? '1' : '0'} style={{ ['--dp' as string]: dp }}>
          {/* pick your business. the day does not change. */}
          <div className="day-pick">
            <div className="pl">Whose Tuesday?</div>
            <div className="chips">
              {TRADES.map((t, n) => (
                <button
                  key={t.id}
                  type="button"
                  className={n === trade ? 'on' : ''}
                  onClick={() => setTrade(n)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="day-in">
            <div className="day-rail">
              <span className="ln" />
              <span className="fill" />
              <span className="dot" />
              {SKELETON.map((s, n) => (
                <span
                  key={s.t}
                  className={`tk${n === i ? ' on' : ''}`}
                  style={{ top: `${(n / (SKELETON.length - 1)) * 100}%` }}
                >
                  {s.t}
                </span>
              ))}
            </div>

            <div className="day-beats">
              {SKELETON.map((s, n) => (
                <div key={s.t} className={`day-b ${s.k}${n === i ? ' on' : ''}`}>
                  <div className="tm">{s.t}</div>
                  <h3 dangerouslySetInnerHTML={{ __html: lines[n].h }} />
                  <p>{lines[n].s}</p>
                </div>
              ))}
            </div>

            <div className="day-led">
              <div className="lh">What the day cost you</div>
              <ul>
                {leaks.map((s) => (
                  <li key={s.led} className={`${s.k === 'lost' ? 'lost' : ''}${i >= s.n ? ' on' : ''}`}>
                    <i />
                    <span>{s.led}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="day-tally">
            <div className="box">
              <div className="k">Tuesday, in full</div>
              <h3>You worked seventeen hours. Five of them were not the work.</h3>
              <div className="rows">
                <div className="rw">
                  <span>Calls that rang out</span>
                  <b>3</b>
                </div>
                <div className="rw">
                  <span>Quotes promised and never sent</span>
                  <b>1</b>
                </div>
                <div className="rw">
                  <span>Five-star reviews never asked for</span>
                  <b>1</b>
                </div>
                <div className="rw bad">
                  <span>Jobs that went to the next name on the list</span>
                  <b>1</b>
                </div>
              </div>
              <p className="end">
                And that was <span className="g">a good day.</span>
              </p>
              <p className="same">
                Go back and change the business at the top. <b>The day does not change.</b> That is
                the whole reason we exist.
              </p>
            </div>
          </div>

          <div className="day-cue">Scroll through the day</div>
        </div>
      </section>
    </>
  );
}

/* THE THIRD TUESDAY.
 * The same day, inside a company big enough to have hired its way out of it.
 * This is where the About page actually answers "who are you and why". */
export function BigDay() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) el.classList.add('on'); }),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="big" ref={ref}>
      <div className="wrap narrow">
        <div className="hd">
          <div className="eyebrow">There is a third Tuesday</div>
          <h2>The same day, inside a company with a hundred people.</h2>
          <p>
            Same calls. Same customers. Same 6:47 in the evening. Watch what happens to it when
            somebody is there to catch it.
          </p>
        </div>
        <ol>
          {BIGCO.map((b, n) => (
            <li key={b.t} style={{ transitionDelay: `${n * 80}ms` }}>
              <span className="tm">{b.t}</span>
              <span className="h">{b.h}</span>
              <span className="by" data-none={b.by === 'Nobody' || b.by === 'Nothing to catch' ? '1' : '0'}>
                {b.by}
              </span>
            </li>
          ))}
        </ol>

        <p className="kick">
          Nobody in that building thinks any of this is remarkable.{' '}
          <span className="g">It is just Tuesday.</span>
        </p>

        <p className="bridge">
          <b>Richard spent two decades inside that building</b>, running the operation that made that
          Tuesday ordinary. <b>Jacob spent a decade in the room where the other Tuesday was
          happening</b>, standing next to owners who were better at the work than anyone on that
          org chart, and watching the 6:47 call ring out anyway.
          <br />
          <br />
          The difference between those two Tuesdays was never talent. It was five salaries.{' '}
          <span className="em">StayBookt is the bridge.</span>
        </p>
      </div>
    </section>
  );
}

/* The same Tuesday, run again, with us in the front. */
export function FixedDay() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) el.classList.add('on'); }),
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="fix" ref={ref}>
      <div className="wrap narrow">
        <div className="hd">
          <div className="eyebrow">The same Tuesday</div>
          <h2>Now run it again, with us in the front.</h2>
          <p>
            Whichever business you picked. Same customers, same calls, same jobs. The only thing that
            changed is that somebody was there to catch them.
          </p>
        </div>
        <ol>
          {FIXED.map((f, n) => (
            <li key={f.t} style={{ transitionDelay: `${n * 90}ms` }}>
              <span className="tm">{f.t}</span>
              <span className="ck" aria-hidden>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
                </svg>
              </span>
              <span className="h">{f.h}</span>
            </li>
          ))}
        </ol>
        <p className="out">
          That is the third Tuesday. <span className="g">Now it is yours.</span>
        </p>
      </div>
    </section>
  );
}
