import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAX | AI 재고 운영 솔루션",
  description: "성장하는 브랜드를 위한 회전일수 기반 인공지능 재고 운영 솔루션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
