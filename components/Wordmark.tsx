'use client';
import { motion } from 'framer-motion';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onDark?: boolean;
  animate?: boolean;
}

const sizes = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
  xl: 'text-7xl',
};

export default function Wordmark({ size = 'md', onDark = true, animate = false }: Props) {
  const sweep = ['#F59E0B', '#7AB420', '#10B981', '#138FAD', '#2563EB'];
  const stayColor = onDark ? 'text-white' : 'text-ink';

  return (
    <span className={`font-display ${sizes[size]} tracking-tight inline-flex items-baseline`}>
      <span className={stayColor}>Stay</span>
      {'Bookt'.split('').map((letter, i) => (
        animate ? (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: sweep[i] }}
          >
            {letter}
          </motion.span>
        ) : (
          <span key={i} style={{ color: sweep[i] }}>{letter}</span>
        )
      ))}
    </span>
  );
}
