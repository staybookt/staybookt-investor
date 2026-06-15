'use client';
import React from 'react';

export function MacBookFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Screen content — sits behind the SVG frame overlay */}
      <div
        style={{
          position: 'absolute',
          left: '3%',
          top: '2.5%',
          width: '94%',
          bottom: '11.875%',
          overflow: 'hidden',
          background: '#0a0a0a',
        }}
      >
        {children}
      </div>
      {/* SVG frame overlay — evenodd path creates transparent screen hole */}
      <svg
        viewBox="0 0 1000 640"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block', width: '100%', position: 'relative', zIndex: 1, pointerEvents: 'none' }}
      >
        {/* Screen panel body with screen hole */}
        <path
          fillRule="evenodd"
          fill="#1d1d1f"
          d="M14,0 H986 Q1000,0 1000,14 V590 H0 V14 Q0,0 14,0 Z M38,16 H962 Q970,16 970,24 V564 H30 V24 Q30,16 38,16 Z"
        />
        {/* Webcam */}
        <circle cx="500" cy="9" r="3" fill="#2d2d2f" />
        {/* Keyboard base */}
        <path fill="#242426" d="M0,590 H1000 V628 Q1000,640 988,640 H12 Q0,640 0,628 Z" />
        {/* Hinge line */}
        <rect x="0" y="589" width="1000" height="2" fill="#111" opacity="0.6" />
        {/* Trackpad */}
        <rect x="375" y="600" width="250" height="27" rx="5" fill="none" stroke="#3a3a3c" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export function IPhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Screen content — sits behind the SVG frame overlay */}
      <div
        style={{
          position: 'absolute',
          left: '3%',
          top: '5.3%',
          width: '94%',
          bottom: '3.8%',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        {children}
      </div>
      {/* SVG frame overlay — evenodd path creates transparent screen hole */}
      <svg
        viewBox="0 0 430 900"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block', width: '100%', position: 'relative', zIndex: 1, pointerEvents: 'none' }}
      >
        {/* Chassis with screen hole */}
        <path
          fillRule="evenodd"
          fill="#1d1d1f"
          d="M55,0 H375 Q430,0 430,55 V845 Q430,900 375,900 H55 Q0,900 0,845 V55 Q0,0 55,0 Z M55,10 H375 Q417,10 417,52 V848 Q417,890 375,890 H55 Q13,890 13,848 V52 Q13,10 55,10 Z"
        />
        {/* Dynamic Island */}
        <rect x="155" y="18" width="120" height="30" rx="15" fill="#0d0d0d" />
        {/* Home indicator */}
        <rect x="160" y="866" width="110" height="4" rx="2" fill="#3a3a3c" />
        {/* Side buttons */}
        <rect x="424" y="222" width="6" height="78" rx="3" fill="#2c2c2e" />
        <rect x="0" y="192" width="6" height="38" rx="3" fill="#2c2c2e" />
        <rect x="0" y="250" width="6" height="60" rx="3" fill="#2c2c2e" />
        <rect x="0" y="156" width="6" height="26" rx="3" fill="#2c2c2e" />
      </svg>
    </div>
  );
}
