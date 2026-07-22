import Script from 'next/script';

/* Google Analytics 4, property "StayBookt" (Measurement ID G-ML7S3FSXX8; GA4
 * account StayBookt, web data stream www.staybookt.com). The measurement ID is
 * a public, client-side value that ships in the page source anyway, so it is
 * baked in as the default here to guarantee tracking fires in production.
 * NEXT_PUBLIC_GA_ID still overrides it if ever set in Vercel env (e.g. to point
 * a preview deploy at a separate test property). Created + wired live July 2026. */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID || 'G-ML7S3FSXX8';
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
