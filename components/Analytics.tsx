import Script from 'next/script';

/* Google Analytics 4. Inert until NEXT_PUBLIC_GA_ID is set in Vercel env
 * (Project Settings -> Environment Variables). Get the ID (G-XXXXXXX) from
 * the GA4 property's Data Stream. Renders nothing without it. */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
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
