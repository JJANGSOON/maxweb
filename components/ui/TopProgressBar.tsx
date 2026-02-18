"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const START_EVENT = "max:top-progress-start";
const DONE_EVENT = "max:top-progress-done";

export function startTopProgress() {
  window.dispatchEvent(new Event(START_EVENT));
}

export function doneTopProgress() {
  window.dispatchEvent(new Event(DONE_EVENT));
}

export default function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }

      setVisible(true);
      setProgress(12);

      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 86) return prev;
          return Math.min(86, prev + Math.max(2, (90 - prev) * 0.08));
        });
      }, 120);
    };

    const done = () => {
      if (!visible) return;
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setProgress(100);
      window.setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 180);
    };

    window.addEventListener(START_EVENT, start);
    window.addEventListener(DONE_EVENT, done);
    return () => {
      window.removeEventListener(START_EVENT, start);
      window.removeEventListener(DONE_EVENT, done);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [visible]);

  useEffect(() => {
    doneTopProgress();
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] overflow-hidden">
      <div className="h-full w-full bg-[#1f1f22]" />
      <div
        className="absolute inset-y-0 left-0 bg-[#dcff95] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
