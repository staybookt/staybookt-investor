import { ImageResponse } from 'next/og';

/* StayBookt favicon. Dynamic PNG. Clean wordmark mark: the "S" drawn in the
 * cyan-to-emerald-to-violet wordmark gradient on the ink background. */
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#050811',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            fontFamily: 'Helvetica, Arial, sans-serif',
            backgroundImage: 'linear-gradient(135deg, #06B6D4 0%, #10B981 55%, #7C3AED 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
