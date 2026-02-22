import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import TopProgressBar from "@/components/ui/TopProgressBar";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://getmax.kr"),
  title: "MAX AI Aagent",
  description: "성장하는 브랜드를 위한 회전일수 기반 인공지능 재고 운영 솔루션",
  alternates: {
    canonical: "https://getmax.kr",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "MAX AI",
    description: "성장하는 브랜드를 위한 회전일수 기반 인공지능 재고 운영 솔루션",
    url: "https://getmax.kr",
    siteName: "MAX",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "MAX AI 재고 운영 솔루션 공유 썸네일",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAX AI",
    description: "성장하는 브랜드를 위한 회전일수 기반 인공지능 재고 운영 솔루션",
    images: ["/meta.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        ) : null}
        <Suspense fallback={null}>
          <TopProgressBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
