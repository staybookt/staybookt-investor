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
          /* The favicon was the tenth gradient, and the worst one: 135deg, a 55% stop,
             and it ended in VIOLET (#7C3AED) while the wordmark two inches away ended
             in indigo (#4F46E5). The one mark a person sees in every browser tab did
             not match the brand. It matches --sb-grad now. This is a literal and not
             the token because it renders through ImageResponse, which cannot read CSS
             custom properties. If --sb-grad changes, change this by hand. */
            backgroundImage: 'linear-gradient(100deg, #06B6D4 0%, #10B981 52%, #4F46E5 100%)',
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
