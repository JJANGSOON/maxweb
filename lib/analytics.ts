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

export const GA_SECTION_IDS = {
  HERO: "hero",
  FEATURES_FOCUS: "features-focus",
  FEATURES_WORKFLOW: "features-workflow",
  HEYMAX: "heymax",
  CTA: "cta",
} as const;

export type GaSectionId = (typeof GA_SECTION_IDS)[keyof typeof GA_SECTION_IDS];

export const CTA_LOCATIONS = {
  HERO: "hero",
  HERO_MOBILE: "hero_mobile",
  HEADER_DESKTOP: "header_desktop",
  HEADER_MOBILE: "header_mobile",
  PRICING: "pricing",
  PRICING_MOBILE: "pricing_mobile",
} as const;

export const SECTION_VIEW_EVENTS: Record<GaSectionId, string> = {
  [GA_SECTION_IDS.HERO]: "hero_view",
  [GA_SECTION_IDS.FEATURES_FOCUS]: "feature_view",
  [GA_SECTION_IDS.FEATURES_WORKFLOW]: "workflow_view",
  [GA_SECTION_IDS.HEYMAX]: "heymax_view",
  [GA_SECTION_IDS.CTA]: "pricing_view",
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
