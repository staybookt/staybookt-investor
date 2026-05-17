'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Wordmark from './Wordmark';

/* === Reveal wrapper — fades + slides children up on scroll into view === */
export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* === Animated counter — counts up to target on view === */
export function Counter({ value, prefix = '', suffix = '', duration = 2 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
      else setN(value);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
}

/* === Section 1 — Hero (V2, story + photo led) === */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
      {/* Full-bleed Tim home photo */}
      <div className="absolute inset-0">
        <Image
          src="/photos/IMG_1140.jpg"
          alt="Top Choice Electrical work — Newmarket home at dusk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark gradient overlay — readable from left, photo bleeds right */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      {/* Subtle amber accent orb (smaller, less SaaS-y) */}
      <motion.div
        className="orb"
        style={{ width: 380, height: 380, background: 'var(--elec)', bottom: '-10%', right: '-5%', opacity: 0.18 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-8 sm:px-16 py-6 flex items-center justify-between">
        <Wordmark size="md" onDark animate />
        <span className="text-xs tracking-[0.2em] font-semibold text-platinum-soft">INVESTOR BRIEF · 2026</span>
      </nav>

      <div className="relative z-10 px-8 sm:px-16 max-w-7xl w-full">
        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-elec text-xs sm:text-sm tracking-[0.3em] font-semibold uppercase mb-6">
            The embedded ops team for trades
          </p>
        </motion.div>

        {/* Headline — story-led */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-white text-[56px] sm:text-[104px] leading-[0.95] tracking-[-0.04em] max-w-5xl">
            Tim used to answer
          </h1>
          <h1 className="font-display text-white text-[56px] sm:text-[104px] leading-[0.95] tracking-[-0.04em] max-w-5xl">
            his own phone.
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="mt-4 font-display text-elec text-[56px] sm:text-[104px] leading-[0.95] tracking-[-0.04em]">
            Now we do.
          </h2>
        </motion.div>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10 text-platinum text-base sm:text-xl leading-relaxed max-w-2xl"
        >
          StayBookt is the embedded ops team for small residential + light-commercial service businesses. Find. Capture. Quote. Deliver. Retain &mdash; same playbook, every client.
        </motion.p>

        {/* Proof bar — 3 small stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-3xl"
        >
          {[
            { label: 'Live', value: '1 client', sub: 'Tim, Newmarket ON' },
            { label: 'Lead lift', value: '5 → 40+/mo', sub: 'in 60 days' },
            { label: 'TAM', value: '$108M', sub: 'Canada · trades' },
          ].map((s, i) => (
            <div
              key={s.label}
              className="border-l-2 border-elec/60 pl-4 py-1"
            >
              <p className="text-[10px] tracking-[0.25em] uppercase text-elec font-semibold mb-1">{s.label}</p>
              <p className="font-display text-xl sm:text-2xl tracking-tight text-white">{s.value}</p>
              <p className="text-platinum-soft text-xs mt-0.5">{s.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="https://cal.com/jacobcharendoff/staybookt"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-elec hover:bg-elec-light text-ink font-bold px-7 py-3.5 rounded-xl text-sm sm:text-base transition-all hover:scale-[1.02] shadow-lg shadow-elec/30"
          >
            Book a 30-min walkthrough →
          </a>
          <a href="#why" className="text-platinum-soft hover:text-white text-sm font-medium underline-offset-4 hover:underline">
            Or scroll the brief ↓
          </a>
        </motion.div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-platinum-soft text-xs tracking-widest"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SCROLL
      </motion.div>
    </section>
  );
}

/* === Section 2 — The Why (with revenue plateau chart) === */
export function TheWhy() {
  return (
    <section id="why" className="relative min-h-screen flex items-center bg-cream text-ink py-32 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-elec uppercase mb-8">
                Why we exist
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[56px] sm:text-[88px] leading-[0.95] tracking-[-0.04em]">
                Trades stall
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <h2 className="font-display text-elec text-[56px] sm:text-[88px] leading-[0.95] tracking-[-0.04em]">
                at $1M.
              </h2>
            </Reveal>
            <Reveal delay={0.5} className="mt-10">
              <p className="text-mute text-base sm:text-lg leading-relaxed">
                An owner-operator electrician doing $1M in revenue should have a marketing lead, an ops manager, a bookkeeper, and a recruiter on payroll. They have themselves. The phone keeps ringing while they&apos;re on a panel upgrade. Quotes go cold.
              </p>
              <p className="text-ink text-lg sm:text-xl font-semibold mt-6 leading-relaxed">
                StayBookt is the team and the tooling they can&apos;t hire.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — animated plateau chart */}
          <div className="lg:col-span-6">
            <Reveal delay={0.3}>
              <PlateauChart />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Animated revenue plateau chart — shows trades stalling at $1M */
function PlateauChart() {
  const ref = useRef<SVGPathElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Chart geometry
  const W = 560;
  const H = 380;
  const padL = 60;
  const padR = 20;
  const padT = 30;
  const padB = 50;

  // Revenue trajectory: rises fast 0→$1M, then plateaus
  // Data points: (year, revenue $K)
  const data = [
    [0, 0], [1, 120], [2, 320], [3, 580], [4, 820], [5, 1000],
    [6, 1020], [7, 1040], [8, 1030], [9, 1050], [10, 1040],
  ];
  const xMax = 10;
  const yMax = 1500;
  const xScale = (x: number) => padL + (x / xMax) * (W - padL - padR);
  const yScale = (y: number) => H - padB - (y / yMax) * (H - padT - padB);

  // Build path
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d[0])} ${yScale(d[1])}`).join(' ');

  // Plateau line (the $1M ceiling)
  const ceilingY = yScale(1000);

  // Friction labels — placed along the rising curve
  const friction = [
    { x: 2, y: 320, label: 'Marketing lead — missing' },
    { x: 3, y: 580, label: 'Ops manager — missing' },
    { x: 4, y: 820, label: 'Bookkeeper — missing' },
    { x: 5, y: 1000, label: 'Recruiter — missing' },
  ];

  return (
    <div className="bg-paper border border-divider-lt rounded-2xl p-6 sm:p-8 shadow-sm">
      <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-2">
        Revenue trajectory · owner-operator trade
      </p>
      <p className="text-ink/70 text-sm mb-4">
        Why $1M is the wall — and what costs them to scale past it.
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Y-axis grid lines */}
        {[0, 500, 1000, 1500].map((v) => (
          <g key={v}>
            <line x1={padL} y1={yScale(v)} x2={W - padR} y2={yScale(v)} stroke="var(--divider-lt)" strokeWidth="1" strokeDasharray={v === 1000 ? '0' : '2 4'} />
            <text x={padL - 8} y={yScale(v) + 4} textAnchor="end" fontSize="10" fill="var(--mute)" fontFamily="ui-monospace, monospace">
              ${v === 1500 ? '1.5M' : v === 1000 ? '1M' : v === 500 ? '500K' : '0'}
            </text>
          </g>
        ))}

        {/* X-axis */}
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="var(--divider-lt)" strokeWidth="1" />
        {[0, 2, 4, 6, 8, 10].map((x) => (
          <text key={x} x={xScale(x)} y={H - padB + 16} textAnchor="middle" fontSize="10" fill="var(--mute)" fontFamily="ui-monospace, monospace">
            Yr {x}
          </text>
        ))}

        {/* The $1M ceiling glow */}
        <line x1={padL} y1={ceilingY} x2={W - padR} y2={ceilingY} stroke="var(--elec)" strokeWidth="2" strokeDasharray="6 4" opacity="0.9" />
        <text x={W - padR - 6} y={ceilingY - 8} textAnchor="end" fontSize="11" fontWeight="700" fill="var(--elec)" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
          THE CEILING — $1M
        </text>

        {/* Trajectory path — animated draw */}
        <motion.path
          ref={ref}
          d={path}
          fill="none"
          stroke="#0A0E1A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Data points */}
        {data.map((d, i) => (
          <motion.circle
            key={i}
            cx={xScale(d[0])}
            cy={yScale(d[1])}
            r="3"
            fill={d[1] >= 1000 ? 'var(--elec)' : '#0A0E1A'}
            initial={{ scale: 0 }}
            animate={{ scale: inView ? 1 : 0 }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.3 }}
          />
        ))}

        {/* Friction labels — small annotations on the rise */}
        {friction.map((f, i) => (
          <motion.g
            key={f.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 1.5 + i * 0.15, duration: 0.4 }}
          >
            <line
              x1={xScale(f.x)}
              y1={yScale(f.y)}
              x2={xScale(f.x) + 14}
              y2={yScale(f.y) - 16}
              stroke="var(--mute)"
              strokeWidth="1"
              opacity="0.5"
            />
            <circle cx={xScale(f.x)} cy={yScale(f.y)} r="5" fill="none" stroke="var(--elec)" strokeWidth="1.5" opacity="0.7" />
            <text
              x={xScale(f.x) + 16}
              y={yScale(f.y) - 18}
              fontSize="9"
              fill="var(--ink)"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              fontWeight="600"
            >
              {f.label}
            </text>
          </motion.g>
        ))}

        {/* The plateau zone shaded */}
        <motion.rect
          x={xScale(5)}
          y={padT}
          width={xScale(10) - xScale(5)}
          height={ceilingY - padT}
          fill="var(--elec)"
          opacity="0"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 0.04 : 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        />

        {/* "Bottleneck" label in plateau zone */}
        <motion.text
          x={xScale(7.5)}
          y={yScale(1280)}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="var(--mute)"
          fontFamily="'Helvetica Neue', Helvetica, sans-serif"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 2.2, duration: 0.4 }}
        >
          BOTTLENECK
        </motion.text>
      </svg>

      {/* Bottom stat row */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-divider-lt">
        <div>
          <p className="font-display text-2xl text-elec tracking-tight">~70%</p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-mute font-semibold mt-1">of trades plateau here</p>
        </div>
        <div>
          <p className="font-display text-2xl text-plumb tracking-tight">$250K+</p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-mute font-semibold mt-1">/ yr to hire 4 roles</p>
        </div>
        <div>
          <p className="font-display text-2xl text-hvac tracking-tight">$5K/mo</p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-mute font-semibold mt-1">to hire us instead</p>
        </div>
      </div>
    </div>
  );
}

/* === Section 3 — Photography (Tim's work, full-bleed parallax) === */
export function Photography() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/photos/IMG_1140.jpg"
          alt="Top Choice Electrical work — Newmarket home"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      {/* Dark gradient overlay for caption legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-16 pb-16">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-4">First embedded client</p>
          <h3 className="font-display text-white text-5xl sm:text-7xl tracking-tight">Top Choice Electrical</h3>
          <p className="mt-3 text-platinum-soft text-base sm:text-lg max-w-2xl">
            Tim Ciszkowski · Newmarket, Ontario · 22 years on the tools · ESA certified
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section 4 — Five problems (with animated leaky funnel) === */
export function Problems() {
  const items = [
    { n: '01', name: 'The phone', desc: 'Leads bleed to whoever picks up first.', stat: '38%', sub: 'after-hours calls to voicemail', color: 'var(--plumb)', loss: 38 },
    { n: '02', name: 'The quote', desc: 'Quotes sent. No follow-up. Pipeline rots.', stat: '$8K', sub: 'avg ticket lost per stale quote', color: 'var(--elec)', loss: 22 },
    { n: '03', name: 'The website', desc: "Visitor lands, can't tell what they do, leaves.", stat: '< 2%', sub: 'conversion on template sites', color: 'var(--hvac)', loss: 15 },
    { n: '04', name: 'The back office', desc: 'Invoicing slips. Books drift. Margins shrink.', stat: '15h', sub: '/wk owner spends on books', color: 'var(--mute)', loss: 12 },
    { n: '05', name: 'The ceiling', desc: "Owner is the bottleneck. Can't scale past themselves.", stat: '$2M', sub: 'where solo trades stall', color: 'white', loss: 8 },
  ];
  return (
    <section id="problems" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto w-full">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-8">Five problems</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-tight mb-16">
            Where their revenue leaks.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT — the 5 rows */}
          <div className="lg:col-span-7 space-y-px bg-divider">
            {items.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="bg-ink grid grid-cols-12 gap-3 sm:gap-5 py-6 sm:py-7 items-center hover:bg-ink-soft transition-colors">
                  <div className="col-span-2 sm:col-span-1 font-display text-xl sm:text-2xl" style={{ color: p.color }}>
                    {p.n}
                  </div>
                  <div className="col-span-10 sm:col-span-3 font-display text-base sm:text-xl tracking-tight">
                    {p.name}
                  </div>
                  <div className="col-span-12 sm:col-span-5 text-mute-dark text-sm sm:text-base">
                    {p.desc}
                  </div>
                  <div className="col-span-6 sm:col-span-2 font-display text-xl sm:text-2xl text-right" style={{ color: p.color }}>
                    {p.stat}
                  </div>
                  <div className="col-span-6 sm:col-span-1 text-mute text-[10px] sm:text-xs">
                    {p.sub}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* RIGHT — the leaky funnel visual */}
          <div className="lg:col-span-5">
            <Reveal delay={0.3}>
              <LeakyFunnel items={items} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Animated leaky-funnel visual — drops shrinking as leads leak out */
function LeakyFunnel({ items }: { items: { color: string; loss: number; name: string; stat: string }[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const W = 360;
  const H = 460;
  const top = 30;
  const stepH = 70;
  const startW = 280; // top width of funnel
  const endW = 60;   // bottom width

  // Cumulative width at each step (loss subtracted)
  const widthAt = (i: number) => {
    let pct = 1;
    for (let j = 0; j <= i - 1; j++) pct *= (1 - items[j].loss / 100);
    return startW * pct;
  };

  return (
    <div className="bg-ink-soft border border-divider rounded-2xl p-6">
      <p className="text-[10px] tracking-[0.25em] uppercase text-elec font-semibold mb-2">Lead leakage funnel</p>
      <p className="text-platinum-soft text-sm mb-6">100 inbound signals at the top &mdash; how few survive to a booking.</p>

      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Funnel segments */}
        {items.map((p, i) => {
          const wTop = widthAt(i);
          const wBot = widthAt(i + 1);
          const yTop = top + i * stepH;
          const yBot = yTop + stepH - 8;
          const xCenter = W / 2;
          const points = `
            ${xCenter - wTop / 2},${yTop}
            ${xCenter + wTop / 2},${yTop}
            ${xCenter + wBot / 2},${yBot}
            ${xCenter - wBot / 2},${yBot}
          `;
          return (
            <g key={p.name}>
              <motion.polygon
                points={points}
                fill={p.color}
                fillOpacity="0.15"
                stroke={p.color}
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.92 }}
                transition={{ delay: i * 0.18, duration: 0.5 }}
                style={{ transformOrigin: `${xCenter}px ${(yTop + yBot) / 2}px` }}
              />
              <motion.text
                x={xCenter}
                y={yTop + (stepH - 8) / 2 - 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="white"
                fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                letterSpacing="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: i * 0.18 + 0.2, duration: 0.3 }}
              >
                {p.name.replace('The ', '').toUpperCase()}
              </motion.text>
              <motion.text
                x={xCenter}
                y={yTop + (stepH - 8) / 2 + 12}
                textAnchor="middle"
                fontSize="10"
                fill={p.color}
                fontFamily="ui-monospace, monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: i * 0.18 + 0.3, duration: 0.3 }}
              >
                {`-${p.loss}%`}
              </motion.text>
              {/* Leaking drip on the right side */}
              <motion.circle
                cx={xCenter + wTop / 2 + 12}
                cy={yTop + stepH / 2}
                r="3"
                fill={p.color}
                initial={{ opacity: 0, x: 0 }}
                animate={{
                  opacity: inView ? [0, 1, 0] : 0,
                  y: inView ? [0, 20] : 0,
                }}
                transition={{
                  delay: i * 0.2 + 1,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Result */}
      <div className="mt-2 pt-5 border-t border-divider grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-mute font-semibold mb-1">Started with</p>
          <p className="font-display text-2xl text-white">100 signals</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-mute font-semibold mb-1">Survive to booking</p>
          <p className="font-display text-2xl text-elec">~28</p>
        </div>
      </div>
    </div>
  );
}

/* === Section 5 — The Flywheel (rotating SVG) === */
export function Flywheel() {
  const stages = [
    { name: 'FIND', desc: 'SEO · GBP · Ads', color: 'var(--elec)' },
    { name: 'CAPTURE', desc: 'Missed-call recovery · Callbacks', color: 'var(--elec)' },
    { name: 'QUOTE', desc: 'On-site quote · Follow-up automation', color: 'var(--plumb)' },
    { name: 'DELIVER', desc: 'Permits · Scheduling · Invoicing', color: 'var(--plumb)' },
    { name: 'RETAIN', desc: 'Reviews · Referrals · Repeat outreach', color: 'var(--hvac)' },
  ];
  return (
    <section id="flywheel" className="relative bg-cream text-ink py-32 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto w-full">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-hvac font-semibold uppercase mb-8">The journey</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-tight mb-6">
            Every trade leaks
          </h2>
          <h2 className="font-display text-5xl sm:text-7xl tracking-tight text-mute mb-20">
            at one of five stages.
          </h2>
        </Reveal>

        <div className="relative aspect-square max-w-3xl mx-auto">
          {/* Rotating outer ring */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <circle cx="200" cy="200" r="180" fill="none" stroke="var(--divider-lt)" strokeWidth="1" />
              {stages.map((s, i) => {
                const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
                const x = 200 + Math.cos(angle) * 180;
                const y = 200 + Math.sin(angle) * 180;
                return <circle key={i} cx={x} cy={y} r="10" fill={s.color} />;
              })}
            </svg>
          </motion.div>

          {/* Center StayBookt OS */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-ink flex flex-col items-center justify-center border-4 border-cream shadow-2xl">
              <Wordmark size="md" onDark />
              <span className="text-hvac text-[10px] sm:text-xs tracking-[0.3em] font-semibold mt-1">OPERATING LAYER</span>
            </div>
          </div>

          {/* Stage labels positioned around the circle */}
          {stages.map((s, i) => {
            const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
            const r = 0.65; // 65% from center
            const x = 50 + Math.cos(angle) * r * 50;
            const y = 50 + Math.sin(angle) * r * 50;
            return (
              <Reveal key={i} delay={0.3 + i * 0.1}>
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="font-display text-xs sm:text-base tracking-[0.2em] font-bold" style={{ color: s.color }}>
                    {s.name}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.8} className="mt-16 text-center">
          <p className="text-elec font-semibold text-base sm:text-lg italic">
            Most agencies own one stage. We own all five.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section 6 — TAM with animated counter === */
export function TAM() {
  return (
    <section id="tam" className="relative bg-ink text-white min-h-screen flex items-center py-32 overflow-hidden">
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--hvac)', top: '20%', left: '-10%', opacity: 0.3 }} />
      <div className="orb" style={{ width: 400, height: 400, background: 'var(--plumb)', bottom: '10%', right: '-5%', opacity: 0.25 }} />

      <div className="px-8 sm:px-16 max-w-7xl mx-auto w-full relative">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-hvac font-semibold uppercase mb-8">The market</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[120px] sm:text-[240px] leading-none text-center tracking-[-0.06em]">
            $<Counter value={135} duration={2.5} />M
          </h2>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="text-center text-2xl sm:text-3xl font-display text-platinum-soft mt-8">
            ARR opportunity in Canada.
          </p>
        </Reveal>
        <Reveal delay={0.7}>
          <p className="text-center text-mute-dark italic text-sm sm:text-base mt-12 max-w-3xl mx-auto">
            Electrical · HVAC · Plumbing. Sub-$5M revenue. Bottom-up from 115,000 Canadian trades, 5% Ontario penetration, $5K average monthly retainer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section 7 — The Ask / Closer === */
export function Ask() {
  return (
    <section id="ask" className="relative bg-ink text-white min-h-screen flex items-center justify-center py-32 overflow-hidden">
      {/* Closing gradient sweep */}
      <motion.div
        className="orb"
        style={{ width: 800, height: 800, background: 'var(--elec)', top: '-20%', right: '-20%', opacity: 0.3 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb"
        style={{ width: 600, height: 600, background: 'var(--plumb)', bottom: '0%', left: '-10%', opacity: 0.25 }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb"
        style={{ width: 500, height: 500, background: 'var(--hvac)', top: '40%', right: '20%', opacity: 0.2 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 text-center px-8">
        <Reveal>
          <h2 className="font-display text-[80px] sm:text-[180px] leading-none tracking-[-0.05em]">
            Talk to us.
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <a href="mailto:jacob@staybookt.com" className="block mt-16 text-2xl sm:text-3xl font-display text-platinum hover:text-white transition-colors">
            jacob@staybookt.com
          </a>
          <a href="tel:647-680-2324" className="block mt-3 text-lg sm:text-xl text-mute-dark hover:text-platinum-soft transition-colors">
            647.680.2324
          </a>
        </Reveal>
        <Reveal delay={0.6}>
          <div className="mt-24 inline-flex items-center gap-3 text-xs tracking-[0.3em] text-mute-dark">
            <span className="w-8 h-px bg-mute-dark" />
            <Wordmark size="sm" onDark />
            <span className="w-8 h-px bg-mute-dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
