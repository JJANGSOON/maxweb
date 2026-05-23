declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;
type CtaAnalyticsMeta = {
  label: string;
  location: string;
};

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", eventName, params);
}

export function getCtaAnalyticsAttributes({ label, location }: CtaAnalyticsMeta) {
  return {
    "data-ga-cta": "true",
    "data-ga-cta-label": label,
    "data-ga-cta-location": location,
  } as const;
}
