'use client';

import { useEffect, useState } from 'react';

interface WordRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function WordRotator({
  words,
  interval = 2400,
  className = '',
}: WordRotatorProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || words.length <= 1) return;

    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 320);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), '');

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      style={{ minWidth: `${longest.length * 0.55}em` }}
    >
      {/* U+200B zero-width space: sets line height without adding extractable text */}
      <span aria-hidden className="invisible whitespace-nowrap">{'​'}</span>
      <span
        className="absolute left-0 top-0 whitespace-nowrap text-brand-gradient"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 320ms cubic-bezier(0.16, 1, 0.3, 1), transform 320ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {words[index]}
      </span>
    </span>
  );
}
