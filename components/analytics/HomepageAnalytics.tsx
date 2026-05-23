"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const SECTION_VIEW_THRESHOLD = 0.35;
const DWELL_SECONDS = 10;
const SCROLL_DEPTHS = [25, 50, 75, 90] as const;

type ViewSectionKey = "hero" | "features-focus" | "features-workflow" | "heymax" | "cta";

const SECTION_VIEW_EVENTS: Record<ViewSectionKey, string> = {
  hero: "hero_view",
  "features-focus": "feature_view",
  "features-workflow": "workflow_view",
  heymax: "heymax_view",
  cta: "pricing_view",
};

export default function HomepageAnalytics() {
  useEffect(() => {
    const sentSectionViews = new Set<string>();
    const activeDwellStart = new Map<string, number>();
    const sentDwellEvents = new Set<string>();
    const dwellTimers = new Map<string, number>();

    const clearDwellTimer = (sectionKey: string) => {
      const timerId = dwellTimers.get(sectionKey);
      if (timerId) {
        window.clearTimeout(timerId);
        dwellTimers.delete(sectionKey);
      }
    };

    const sectionElements = Array.from(document.querySelectorAll<HTMLElement>("[data-ga-section]"));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionKey = entry.target.getAttribute("data-ga-section");
          if (!sectionKey) continue;

          const sectionEvent = SECTION_VIEW_EVENTS[sectionKey as ViewSectionKey];
          if (entry.isIntersecting && entry.intersectionRatio >= SECTION_VIEW_THRESHOLD) {
            if (sectionEvent && !sentSectionViews.has(sectionKey)) {
              sentSectionViews.add(sectionKey);
              trackEvent(sectionEvent, {
                section_name: sectionKey,
                page_path: window.location.pathname,
              });
            }

            if (sectionKey === "cta" && !sentDwellEvents.has(sectionKey) && !activeDwellStart.has(sectionKey)) {
              activeDwellStart.set(sectionKey, window.performance.now());
              const timerId = window.setTimeout(() => {
                sentDwellEvents.add(sectionKey);
                trackEvent("pricing_dwell_10s", {
                  section_name: "cta",
                  dwell_seconds: DWELL_SECONDS,
                  page_path: window.location.pathname,
                });
              }, DWELL_SECONDS * 1000);
              dwellTimers.set(sectionKey, timerId);
            }
            continue;
          }

          activeDwellStart.delete(sectionKey);
          clearDwellTimer(sectionKey);
        }
      },
      {
        threshold: [0.2, SECTION_VIEW_THRESHOLD, 0.6],
      },
    );

    for (const element of sectionElements) {
      sectionObserver.observe(element);
    }

    const sentScrollDepths = new Set<number>();
    const trackScrollDepth = () => {
      const root = document.documentElement;
      const scrollableHeight = root.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollableHeight) * 100);

      for (const depth of SCROLL_DEPTHS) {
        if (scrollPercent < depth || sentScrollDepths.has(depth)) continue;

        sentScrollDepths.add(depth);
        trackEvent(`scroll_${depth}`, {
          scroll_percent: depth,
          page_path: window.location.pathname,
        });
      }
    };

    const onScroll = () => {
      window.requestAnimationFrame(trackScrollDepth);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    trackScrollDepth();

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const cta = target.closest<HTMLElement>("[data-ga-cta]");
      if (!cta) return;

      const ctaLocation = cta.getAttribute("data-ga-cta-location") ?? "unknown";
      const ctaLabel = cta.getAttribute("data-ga-cta-label") ?? cta.textContent?.trim() ?? "unknown";

      trackEvent("cta_click", {
        cta_location: ctaLocation,
        cta_label: ctaLabel,
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick, true);

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);

      for (const timerId of dwellTimers.values()) {
        window.clearTimeout(timerId);
      }
    };
  }, []);

  return null;
}
