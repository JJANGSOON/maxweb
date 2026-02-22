import Image from "next/image";
import type { MouseEvent } from "react";

type PrimaryButtonProps = {
  label: string;
  href: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function PrimaryButton({ label, href, className = "", onClick }: PrimaryButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-[#111113] transition hover:bg-[#e9e9e9] ${className}`}
    >
      <span>{label}</span>
      <Image src="/cta-icon-arrowright.svg" alt="" width={16} height={16} className="h-4 w-4 shrink-0" aria-hidden />
    </a>
  );
}
