"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a GA4 event. Safe before gtag.js loads (calls queue in dataLayer) and when analytics is disabled. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.("event", name, params);
}

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) {
    return null;
  }

  return (
    <>
      {/* Defines the gtag queue while the HTML is parsed, so page views and events sent
          before the deferred gtag.js finishes loading are queued instead of dropped. */}
      <script
        id="google-analytics-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){dataLayer.push(arguments);};
            gtag('js', new Date());
            gtag('config', '${measurementId}', { send_page_view: false });
          `,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView />
      </Suspense>
    </>
  );
}

// Only the landing page view is sent here: GA4 Enhanced Measurement ("page changes based on
// browser history events") already records client-side navigations, so sending those too doubles them.
let landingPageViewSent = false;

function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (landingPageViewSent) return;
    landingPageViewSent = true;
    trackEvent("page_view", {
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
