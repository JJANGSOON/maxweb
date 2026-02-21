"use client";

import { useEffect, useState } from "react";

type ScrollToTopButtonProps = {
  className?: string;
};

export default function ScrollToTopButton({ className = "" }: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) {
        setVisible(false);
        return;
      }

      const progress = window.scrollY / scrollable;
      setVisible(progress >= 0.2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2f2f2f] bg-[rgba(17,17,19,0.88)] text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)] backdrop-blur transition hover:bg-[rgba(34,34,38,0.96)] md:h-12 md:w-12 ${className}`}
      style={{
        top: "auto",
        left: "auto",
        right: "max(20px, env(safe-area-inset-right))",
        bottom: "max(20px, env(safe-area-inset-bottom))",
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-5 w-5 md:h-5 md:w-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 14L12 9L17 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
