import { ImageResponse } from 'next/og';

/* StayBookt favicon. Dynamic, generated server-side as PNG.
 * Gradient background matches the wordmark-gradient used across the site
 * (cyan to emerald to indigo). White "S" centered. */
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
          background: 'linear-gradient(135deg, #06B6D4 0%, #10B981 50%, #4F46E5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 44,
          fontWeight: 800,
          color: 'white',
          fontFamily: 'Helvetica, Arial, sans-serif',
          letterSpacing: '-0.04em',
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
