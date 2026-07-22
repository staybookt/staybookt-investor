import Script from 'next/script';

/* Google Analytics 4, property "StayBookt" — Measurement ID G-ML7S3FSXX8 (GA4
 * account StayBookt, web data stream www.staybookt.com). This is the OFFICIAL
 * property (chosen July 2026).
 *
 * The ID is hardcoded, not read from env, on purpose: an old
 * NEXT_PUBLIC_GA_ID=G-PG3KZVYPV0 still lives in Vercel pointing at a
 * now-abandoned duplicate property, so reading env would keep sending data
 * there. A GA4 measurement ID is a public, client-side value that ships in the
 * page source anyway. The stale Vercel env var is ignored and can be deleted. */
const GA_ID = 'G-ML7S3FSXX8';

export default function Analytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
