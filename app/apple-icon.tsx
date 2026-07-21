import { ImageResponse } from 'next/og';

/* Apple touch icon, 180x180 PNG. Same dark circle as the favicon, but at
 * home screen size there is room for the full wordmark: "Stay" in white,
 * "Bookt" in the wordmark gradient, the period in the brand violet.
 *
 * Satori cannot resolve CSS custom properties, so the wordmark gradient is
 * written as a literal. The literal below is exactly what --sb-grad resolves
 * to and MUST be kept in sync with it (and with app/icon.tsx). */
const SB_GRAD = 'linear-gradient(100deg, #06B6D4 0%, #10B981 52%, #4F46E5 100%)';

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
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: '#050811',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 29,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              fontFamily: 'Helvetica, Arial, sans-serif',
            }}
          >
            <span style={{ color: '#FFFFFF' }}>Stay</span>
            <span
              style={{
                backgroundImage: SB_GRAD,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Bookt
            </span>
            <span style={{ color: '#7C3AED' }}>.</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
