import Script from "next/script";
import {
  GOOGLE_ADS_CONTACT_CONVERSION_SEND_TO,
  GOOGLE_ADS_ID,
} from "@/lib/google-ads";

/**
 * Injeta a etiqueta Google (gtag.js) e a função gtag_report_conversion
 * recomendada pelo Google Ads para conversões por clique.
 *
 * @returns Scripts assíncronos do Google Tag Manager / gtag.
 */
export function GoogleAdsTag() {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
      <Script id="google-ads-conversion-snippet" strategy="afterInteractive">
        {`
          window.gtag_report_conversion = function gtag_report_conversion(url, openInNewTab) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                if (openInNewTab) {
                  window.open(url, '_blank', 'noopener,noreferrer');
                } else {
                  window.location = url;
                }
              }
            };
            gtag('event', 'conversion', {
              'send_to': '${GOOGLE_ADS_CONTACT_CONVERSION_SEND_TO}',
              'event_callback': callback
            });
            return false;
          };
        `}
      </Script>
    </>
  );
}
