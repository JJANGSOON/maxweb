"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import PrimaryButton from "../ui/PrimaryButton";
import { startTopProgress } from "../ui/TopProgressBar";
import { GOOGLE_FORM_URL, NAV_ITEMS } from "@/lib/constants";

export default function HeaderSection() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = () => {
    window.location.assign("/");
  };

  const handlePageNavigate = (href: string) => {
    const current = pathname ?? "/";
    if (href === current) return;

    startTopProgress();
    router.push(href);

    // Keep warm-up in background without blocking navigation.
    void router.prefetch(href);
  };

  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) {
      event.preventDefault();
      void handlePageNavigate(href);
      return;
    }

    event.preventDefault();
    const section = document.querySelector(href);
    if (!section) {
      void handlePageNavigate(`/${href}`);
      return;
    }

    const y = section.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-3 z-40 md:top-6">
      <div className="mx-auto w-full px-4 md:hidden">
        <div className="h-14 rounded-full border border-[#2f2f2f] bg-[rgba(17,17,19,0.7)] px-4 py-3 backdrop-blur-[13px]">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleLogoClick}
              className="inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="홈으로 이동"
            >
              <Image
                src="/header-logo.svg"
                alt="MAX"
                width={62}
                height={12}
                className="h-3 w-auto"
                priority
              />
            </button>
            <div className="flex items-center gap-1">
              <Link
                href="/blog"
                onClick={handleNavClick("/blog")}
                className="rounded-full px-4 py-1 text-sm text-[#858585] transition hover:bg-[rgba(255,255,255,0.06)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                블로그
              </Link>
              <PrimaryButton
                href={GOOGLE_FORM_URL}
                label="데모 신청하기"
                className="!h-8 !px-3 !gap-1 text-[12px] !font-normal whitespace-nowrap"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden h-16 items-center justify-center px-10 md:flex">
        <button
          type="button"
          onClick={handleLogoClick}
          className="absolute left-10 inline-flex h-8 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="홈으로 이동"
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
        <nav className="h-14 items-center gap-2 rounded-full border border-[#2f2f2f] bg-[rgba(17,17,19,0.7)] px-3 backdrop-blur md:flex">
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
          <PrimaryButton href={GOOGLE_FORM_URL} label="데모 신청하기" className="!h-8 !px-4 text-xs" />
        </nav>
      </div>
    </header>
  );
}
