'use client';

import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

// Concept diagram, not a metric. Two lines climb the same curve, locked
// together: StayBookt only rises when the owner's business rises. No axes,
// no numbers, so it never reads as a fabricated performance claim.
const YOU = 'M48,330 C 190,320 330,150 600,96';
const US = 'M48,360 C 210,352 360,196 600,128';
const AREA = 'M48,360 C 210,352 360,196 600,128 L600,372 L48,372 Z';

const vp = { once: true, amount: 0.5 } as const;

export default function AlignedGrowth() {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 640 420"
        className="h-auto w-full"
        role="img"
        aria-label="Two lines, your business and StayBookt, climbing the same curve together over time."
      >
        <defs>
          <linearGradient id="ag-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#06B6D4" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="ag-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10B981" stopOpacity="0.22" />
            <stop offset="1" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
          <filter id="ag-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint gridlines for chart texture */}
        {[132, 210, 288].map((y) => (
          <line key={y} x1="48" y1={y} x2="600" y2={y} stroke="rgba(148,163,184,0.10)" strokeWidth="1" strokeDasharray="2 6" />
        ))}
        <line x1="48" y1="372" x2="600" y2="372" stroke="rgba(148,163,184,0.22)" strokeWidth="1" />

        {/* glow area under the shared climb */}
        <motion.path
          d={AREA}
          fill="url(#ag-area)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
        />

        {/* StayBookt line — thinner, tucked just beneath */}
        <motion.path
          d={US}
          fill="none"
          stroke="url(#ag-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity={0.75}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={vp}
          transition={{ duration: 1.7, delay: 0.25, ease: EASE }}
        />

        {/* Your business line — bold, glowing, leading */}
        <motion.path
          d={YOU}
          fill="none"
          stroke="url(#ag-line)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#ag-glow)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={vp}
          transition={{ duration: 1.7, ease: EASE }}
        />

        {/* end markers */}
        <motion.circle
          cx="600" cy="96" r="5" fill="#67E8F9"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.4, delay: 1.6, ease: EASE }}
          style={{ transformOrigin: '600px 96px' }}
        />
        <motion.circle
          cx="600" cy="128" r="4" fill="#6EE7B7"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.4, delay: 1.75, ease: EASE }}
          style={{ transformOrigin: '600px 128px' }}
        />

        {/* labels */}
        <motion.text
          x="592" y="82" textAnchor="end" fill="#E6EDF6" fontSize="15" fontWeight="700"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
          transition={{ duration: 0.5, delay: 1.7 }}
        >
          Your business
        </motion.text>
        <motion.text
          x="592" y="150" textAnchor="end" fill="#8CA0B8" fontSize="13" fontWeight="600"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
          transition={{ duration: 0.5, delay: 1.85 }}
        >
          StayBookt
        </motion.text>

        <text x="600" y="400" textAnchor="end" fill="rgba(148,163,184,0.5)" fontSize="11" letterSpacing="2">
          OVER TIME
        </text>
      </svg>

      <p className="mt-4 text-center text-sm text-mute sm:text-left">Same line. We only climb when you climb.</p>
    </div>
  );
}
