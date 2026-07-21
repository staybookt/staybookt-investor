import { ImageResponse } from 'next/og';

/* StayBookt favicon. Dynamic PNG. A dark circle carrying the reduced mark
 * "S." : the S in the wordmark gradient, the period in the brand violet.
 * A favicon renders at 16 to 32px, so the ten character wordmark is
 * illegible here and the mark is the reduction of it.
 *
 * Satori cannot resolve CSS custom properties, so the wordmark gradient is
 * written as a literal. This favicon was once the tenth drifting gradient in
 * the codebase. The literal below is exactly what --sb-grad resolves to and
 * MUST be kept in sync with it. */
const SB_GRAD = 'linear-gradient(100deg, #06B6D4 0%, #10B981 52%, #4F46E5 100%)';

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
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
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
              fontSize: 53,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-0.05em',
              fontFamily: 'Helvetica, Arial, sans-serif',
            }}
          >
            <span
              style={{
                backgroundImage: SB_GRAD,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              S
            </span>
            <span style={{ color: '#7C3AED' }}>.</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
