"use client";

import Link, { type LinkProps } from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { startTopProgress } from "@/components/ui/TopProgressBar";

type ProgressLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function ProgressLink({ children, onClick, ...props }: ProgressLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    startTopProgress();
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
