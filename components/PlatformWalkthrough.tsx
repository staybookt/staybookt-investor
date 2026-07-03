'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import Frame from '@/components/Frame';
import {
  ReceptionistScreen,
  BookingScreen,
  QuoteFollowupScreen,
  RepeatBusinessScreen,
} from '@/components/PlatformPreview';
import { CAL_LINK } from '@/lib/site';

type Step = {
  tab: string;
  kicker: string;
  headline: ReactNode;
  body: string;
  Screen: () => ReactNode;
};

// Each step answers all three questions in miniature: what it is (headline),
// why you care / what's in it for you (body), shown against a real product screen.
const STEPS: Step[] = [
  {
    tab: 'Answers',
    kicker: 'It picks up',
    headline: (
      <>
        It answers the calls <span className="text-brand-gradient">you can’t.</span>
      </>
    ),
    body:
      'A customer texts at 9pm. StayBookt replies in seconds, quotes the job, and books it, while you are at dinner. Every missed call is a job your competitor takes. You stop missing them.',
    Screen: ReceptionistScreen,
  },
  {
    tab: 'Books',
    kicker: 'It fills the week',
    headline: (
      <>
        It keeps the calendar <span className="text-brand-gradient">full.</span>
      </>
    ),
    body:
      'No phone tag. Customers pick a slot, StayBookt confirms it, and reminders go out so they actually show. Your week fills itself while you are on the tools.',
    Screen: BookingScreen,
  },
  {
    tab: 'Follows up',
    kicker: 'It closes the loop',
    headline: (
      <>
        It never lets a quote <span className="text-brand-gradient">go cold.</span>
      </>
    ),
    body:
      'Most jobs are won on the follow-up nobody has time for. StayBookt chases every open estimate on a schedule, so no money dies in a text thread and you always see what is in play.',
    Screen: QuoteFollowupScreen,
  },
  {
    tab: 'Grows',
    kicker: 'It compounds',
    headline: (
      <>
        It grows the customers <span className="text-brand-gradient">you already have.</span>
      </>
    ),
    body:
      'The cheapest revenue you will ever earn is a customer you already won. StayBookt spots who is due, who to upsell, and who to ask for a referral, then reaches out for you.',
    Screen: RepeatBusinessScreen,
  },
];

export default function PlatformWalkthrough() {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  // Drive the active step directly from scroll position (no rAF dependency),
  // so it stays reliable across browsers and background tabs.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolled / total : 0;
      const idx = Math.max(0, Math.min(STEPS.length - 1, Math.floor(p * STEPS.length - 1e-4)));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + ((i + 0.5) / STEPS.length) * scrollable;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <section id="m1" data-i={1} ref={ref} className="relative" style={{ height: `${STEPS.length * 100}vh` }}>
      <div
        className="sticky top-0 flex flex-col justify-center overflow-hidden"
        style={{ minHeight: '100svh' }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-12 lg:pl-28">
          <p className="mb-8 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-elec">
            01 / Watch it run
          </p>

          {/* Step rail */}
          <div className="mb-10 flex flex-wrap gap-2">
            {STEPS.map((s, i) => {
              const on = active === i;
              return (
                <button
                  key={s.tab}
                  onClick={() => goTo(i)}
                  className={`group flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-all ${
                    on
                      ? 'border-elec/50 bg-elec/10 text-white'
                      : 'border-divider/60 text-mute hover:text-platinum-soft'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${on ? 'text-elec' : 'text-mute'}`}>{`0${i + 1}`}</span>
                  {s.tab}
                </button>
              );
            })}
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: crossfading text */}
            <div className="relative min-h-[300px] sm:min-h-[280px]">
              {STEPS.map((s, i) => {
                const on = active === i;
                return (
                  <div
                    key={s.tab}
                    aria-hidden={!on}
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? 'translateY(0)' : 'translateY(16px)',
                      pointerEvents: on ? 'auto' : 'none',
                    }}
                  >
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-mute">{s.kicker}</p>
                    <h2
                      className="font-display leading-[1.02] tracking-[-0.03em] text-white"
                      style={{ fontSize: 'clamp(32px, 4.6vw, 58px)' }}
                    >
                      {s.headline}
                    </h2>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-platinum-soft">{s.body}</p>
                  </div>
                );
              })}
            </div>

            {/* Right: crossfading product screen */}
            <div className="relative flex min-h-[440px] items-center justify-center sm:min-h-[500px]">
              {STEPS.map((s, i) => {
                const on = active === i;
                const S = s.Screen;
                return (
                  <div
                    key={s.tab}
                    aria-hidden={!on}
                    className="absolute inset-x-0 transition-all duration-500 ease-out"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
                      pointerEvents: on ? 'auto' : 'none',
                    }}
                  >
                    <Frame accent>
                      <S />
                    </Frame>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-elec to-hvac px-6 py-3 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              See it run on your business
              <span aria-hidden className="transition-transform group-hover:translate-x-1">{'→'}</span>
            </a>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-elec transition-all hover:gap-3"
            >
              How it all works <span aria-hidden>{'→'}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
