'use client';
import { motion } from 'framer-motion';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onDark?: boolean;
  animate?: boolean;
  mono?: boolean;
}

const sizes = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-5xl',
  xl: 'text-7xl',
};

export default function Wordmark({ size = 'md', onDark = true, animate = false, mono = false }: Props) {
  const sweep = ['#06B6D4', '#10B981', '#10B981', '#14B8A6', '#2563EB'];
  const baseColor = onDark ? 'text-white' : 'text-ink';

  return (
    <span className={`font-display ${sizes[size]} tracking-tight inline-flex items-baseline`}>
      <span className={baseColor}>Stay</span>
      {'Bookt'.split('').map((letter, i) => {
        const color = mono ? undefined : sweep[i];
        const className = mono ? baseColor : '';
        return animate ? (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={className}
            style={color ? { color } : undefined}
          >
            {letter}
          </motion.span>
        ) : (
          <span key={i} className={className} style={color ? { color } : undefined}>{letter}</span>
        );
      })}
    </span>
  );
}
