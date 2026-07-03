import React from 'react';

// The one media frame. Every product mockup, screenshot, and photo on the
// homepage sits in this exact treatment: a matted, mounted exhibit. Use it
// everywhere so the machine and the life read as one system.
export default function Frame({
  children,
  accent = false,
  className = '',
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[20px] border border-white/10 p-2 ${className}`}
      style={{
        background: '#0F172A',
        boxShadow:
          '0 1px 0 rgba(255,255,255,0.05) inset, 0 40px 80px -32px rgba(0,0,0,0.7)',
      }}
    >
      {accent && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, #06B6D4, #10B981)' }}
        />
      )}
      <div className="overflow-hidden rounded-[14px]">{children}</div>
    </div>
  );
}
