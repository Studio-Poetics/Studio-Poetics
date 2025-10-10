"use client"

import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-2MM4RTGKMG"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2MM4RTGKMG');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
