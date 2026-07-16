import { ImageResponse } from 'next/og';

/* Twitter share card. Same design as opengraph-image.tsx. Duplicated
 * because Next.js route segment configs cannot be proxied through another module. */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'StayBookt. Enjoy Life.';
export const dynamic = 'force-static';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#06080d',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          fontFamily: 'Helvetica, Arial, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(6,182,212,0.40) 0%, rgba(6,182,212,0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -250,
            left: -150,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(16,185,129,0.30) 0%, rgba(16,185,129,0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#94a3b8',
            position: 'relative',
          }}
        >
          The front office for owner-operated service businesses
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div
            style={{
              fontSize: 116,
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 1.0,
              display: 'flex',
            }}
          >
            <span style={{ color: 'white' }}>Stay</span>
            <span
              style={{
                /* MUST stay a literal: Satori/ImageResponse cannot resolve CSS custom properties, so
                   var(--sb-grad) renders as nothing here. But a literal is only allowed if it MATCHES
                   the token. This was 90deg/50%; the token is 100deg/52%. The share card was a
                   slightly different logo from the site. Copy of app/icon.tsx, which was already right. */
                background: 'linear-gradient(100deg, #06B6D4 0%, #10B981 52%, #4F46E5 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Bookt
            </span>
            <span style={{ color: '#7C3AED' }}>.</span>
          </div>
          <div
            style={{
              fontSize: 116,
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 1.0,
              color: '#10B981',
              display: 'flex',
            }}
          >
            Enjoy Life.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            fontSize: 22,
            color: '#64748b',
            letterSpacing: '0.25em',
            fontWeight: 700,
            textTransform: 'uppercase',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex' }}>staybookt.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
