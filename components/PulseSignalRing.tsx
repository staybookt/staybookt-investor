'use client';

import React from 'react';

const SIGNALS = [
  { id: 'site', label: 'Site' },
  { id: 'gbp', label: 'Google' },
  { id: 'rivals', label: 'Rivals' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'funnel', label: 'Funnel' },
  { id: 'ai', label: 'AI Search' },
  { id: 'speed', label: 'Speed' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'schema', label: 'Schema' },
  { id: 'areas', label: 'Areas' },
  { id: 'phone', label: 'Phone' },
  { id: 'lead', label: 'Lead Form' },
  { id: 'quote', label: 'Quote' },
  { id: 'book', label: 'Booking' },
] as const;

export const PULSE_SIGNAL_COUNT = SIGNALS.length;

type RingState = 'idle' | 'submitting' | 'running' | 'done' | 'error';

interface PulseSignalRingProps {
  state: RingState;
  progressCount: number;
  children?: React.ReactNode;
  className?: string;
}

export default function PulseSignalRing({
  state,
  progressCount,
  children,
  className = '',
}: PulseSignalRingProps) {
  // Clamp progress to 14 nodes
  const filled = Math.min(Math.max(progressCount, 0), PULSE_SIGNAL_COUNT);
  const isActive = state === 'running' || state === 'submitting';
  const isDone = state === 'done';

  // SVG geometry
  const SIZE = 540;
  const CENTER = SIZE / 2;
  const RADIUS = 220;
  const NODE_R = 11;

  const circumference = 2 * Math.PI * RADIUS;
  const arcLen = (filled / PULSE_SIGNAL_COUNT) * circumference;

  return (
    <div
      className={`relative aspect-square w-full max-w-[540px] mx-auto ${className}`}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="sb-brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <radialGradient id="sb-node-glow">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sb-center-glow">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#10B981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0A0E1A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center ambient glow */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS - 20} fill="url(#sb-center-glow)" />

        {/* Outer dim ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />

        {/* Inner dim ring (faint guideline) */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS - 60}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />

        {/* Active arc */}
        {(isActive || isDone) && (
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="url(#sb-brand-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${arcLen} ${circumference}`}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        )}

        {/* 14 nodes */}
        {SIGNALS.map((sig, i) => {
          const angle = (-90 + (360 / PULSE_SIGNAL_COUNT) * i) * (Math.PI / 180);
          const x = CENTER + RADIUS * Math.cos(angle);
          const y = CENTER + RADIUS * Math.sin(angle);

          const nodeFilled = i < filled;
          const isCurrent = i === filled - 1 && isActive;

          // Label position outside the node
          const labelDist = NODE_R + 18;
          const lx = CENTER + (RADIUS + labelDist) * Math.cos(angle);
          const ly = CENTER + (RADIUS + labelDist) * Math.sin(angle);
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          let anchor: 'start' | 'middle' | 'end' = 'middle';
          if (cos > 0.3) anchor = 'start';
          else if (cos < -0.3) anchor = 'end';
          const baseline =
            sin > 0.4 ? 'hanging' : sin < -0.4 ? 'auto' : 'middle';

          return (
            <g key={sig.id}>
              {/* Glow ring around active nodes */}
              {nodeFilled && (
                <circle cx={x} cy={y} r={NODE_R + 12} fill="url(#sb-node-glow)" />
              )}
              <circle
                cx={x}
                cy={y}
                r={NODE_R}
                fill={nodeFilled ? 'url(#sb-brand-grad)' : 'transparent'}
                stroke={nodeFilled ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.18)'}
                strokeWidth="1.5"
                className={isCurrent ? 'node-active' : ''}
              />
              {/* Inner dot for filled */}
              {nodeFilled && (
                <circle
                  cx={x}
                  cy={y}
                  r={3}
                  fill="rgba(255,255,255,0.9)"
                />
              )}
              {/* Label */}
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                dominantBaseline={baseline}
                fill={nodeFilled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.45)'}
                fontSize="10"
                letterSpacing="0.18em"
                style={{
                  textTransform: 'uppercase',
                  fontFamily: "ui-monospace, 'SF Mono', 'Menlo', monospace",
                  fontWeight: 600,
                  transition: 'fill 0.4s ease',
                }}
                className="hidden sm:[display:block]"
              >
                {sig.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Center slot — form / state / result lives here */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[58%] h-[58%] flex flex-col items-center justify-center text-center px-2">
          {children}
        </div>
      </div>
    </div>
  );
}
