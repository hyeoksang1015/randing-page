import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/data/site";

const title = "웹메이트(Webmate) | 기획부터 개발까지, 웹 제작 파트너";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | 웹메이트(Webmate)" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "웹메이트(Webmate) — 기획부터 개발까지, 당신의 웹을 완성합니다." }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og-image.png"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

// 분석 도구를 붙일 때는 이 레이아웃의 <body> 끝에 스크립트를 넣는다(지금은 넣지 않음).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-xs focus:text-white">
          본문으로 건너뛰기
        </a>
        <Header />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
