'use client';

import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

// Concept diagram, not a metric. Two lines climb the same curve, locked
// together: StayBookt only rises when the owner's business rises. Stripped to
// the essentials, no axes or gridlines.
const YOU = 'M40,318 C 200,300 360,150 604,88';
const US = 'M40,352 C 214,338 372,196 604,124';
const AREA = 'M40,352 C 214,338 372,196 604,124 L604,384 L40,384 Z';

const vp = { once: true, amount: 0.5 } as const;

export default function AlignedGrowth() {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 640 400"
        className="h-auto w-full"
        role="img"
        aria-label="Two lines, your business and StayBookt, climbing the same curve together."
      >
        <defs>
          <linearGradient id="ag-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#06B6D4" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="ag-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10B981" stopOpacity="0.16" />
            <stop offset="1" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
          <filter id="ag-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={AREA}
          fill="url(#ag-area)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
        />

        <motion.path
          d={US}
          fill="none"
          stroke="url(#ag-line)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.7}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={vp}
          transition={{ duration: 1.7, delay: 0.25, ease: EASE }}
        />

        <motion.path
          d={YOU}
          fill="none"
          stroke="url(#ag-line)"
          strokeWidth="4.5"
          strokeLinecap="round"
          filter="url(#ag-glow)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={vp}
          transition={{ duration: 1.7, ease: EASE }}
        />

        <motion.circle
          cx="604" cy="88" r="5.5" fill="#67E8F9"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.4, delay: 1.6, ease: EASE }}
          style={{ transformOrigin: '604px 88px' }}
        />
        <motion.circle
          cx="604" cy="124" r="4" fill="#6EE7B7"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.4, delay: 1.75, ease: EASE }}
          style={{ transformOrigin: '604px 124px' }}
        />

        <motion.text
          x="596" y="74" textAnchor="end" fill="#E6EDF6" fontSize="16" fontWeight="700"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
          transition={{ duration: 0.5, delay: 1.7 }}
        >
          Your business
        </motion.text>
        <motion.text
          x="596" y="145" textAnchor="end" fill="#8CA0B8" fontSize="14" fontWeight="600"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
          transition={{ duration: 0.5, delay: 1.85 }}
        >
          StayBookt
        </motion.text>
      </svg>

      <p className="mt-5 text-center text-sm text-mute sm:text-left">Same line. We only climb when you climb.</p>
    </div>
  );
}
