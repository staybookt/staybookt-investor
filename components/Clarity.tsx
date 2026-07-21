import Script from 'next/script';

/* Microsoft Clarity. Session recording and heatmaps, free, no seat limit.
 *
 * Same shape as Analytics.tsx and for the same reason: inert until
 * NEXT_PUBLIC_CLARITY_ID is set in Vercel env (Project Settings ->
 * Environment Variables). Get the ID from clarity.microsoft.com after creating
 * the project: it is the short string in the install snippet, not a URL.
 * Renders nothing without it, so local dev and previews record nobody.
 *
 * WHY IT IS HERE. GA4 tells us how many people reached the calendar. It cannot
 * tell us why the ones who did not reach it stopped, and the Leak Check is a six
 * screen scroll driven journey where that is the only question worth asking.
 * Clarity plays back the scroll.
 *
 * Privacy note: Clarity masks text input by default and we collect no form
 * fields on this site. It is covered by the same paragraph of /privacy that
 * covers analytics. */
export default function Clarity() {
  const id = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (!id) return null;
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`}
    </Script>
  );
}
