"use client";

import Image from "next/image";
import { type MouseEvent } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import { GOOGLE_FORM_URL, NAV_ITEMS } from "@/lib/constants";

export default function HeaderSection() {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const section = document.querySelector(href);
    if (!section) return;

    const y = section.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-6 z-40">
      <div className="relative flex h-16 items-center justify-center px-10">
        <button
          type="button"
          onClick={handleLogoClick}
          className="absolute left-10 inline-flex h-8 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="페이지 맨 위로 이동"
        >
          <Image
            src="/header-logo.svg"
            alt="MAX"
            width={88}
            height={20}
            className="h-5 w-auto"
            priority
          />
        </button>
        <nav className="hidden h-14 items-center gap-2 rounded-full border border-[#2f2f2f] bg-[rgba(17,17,19,0.7)] px-3 backdrop-blur md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavClick(item.href)}
              className="rounded-full px-4 py-1 text-sm text-[#858585] transition hover:bg-[rgba(255,255,255,0.06)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {item.label}
            </a>
          ))}
          <PrimaryButton href={GOOGLE_FORM_URL} label="맥스 데모 신청하기" className="!h-8 !px-4 text-xs" />
        </nav>
      </div>
    </header>
  );
}
