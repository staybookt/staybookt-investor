import { ImageResponse } from 'next/og';

/* Apple touch icon, 180x180 PNG. Same identity as the favicon:
 * the "S" in the wordmark gradient on the ink background. */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function AppleIcon() {
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
            fontSize: 132,
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
