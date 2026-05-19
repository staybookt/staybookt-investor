import { ImageResponse } from 'next/og';

/* Apple touch icon, 180x180 PNG. Same identity as the favicon,
 * scaled up for iOS home-screen installs. */
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
          background: 'linear-gradient(135deg, #06B6D4 0%, #10B981 50%, #4F46E5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 130,
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
