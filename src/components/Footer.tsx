import Link from "next/link";
import Logo from "./Logo";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 py-16 text-neutral-300">
      <div className="mx-auto max-w-7xl space-y-12 px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-neutral-800 pb-10 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <Logo dark />
            <p className="max-w-sm text-xs leading-relaxed text-neutral-400">웹메이트 Webmate — 기획과 디자인, 개발을 연결하는 미니멀 웹 제작 파트너.</p>
          </div>
          <div className="space-y-2 text-xs md:col-span-4">
            <span className="mb-3 block font-mono text-[11px] uppercase tracking-wider text-neutral-400">Contact</span>
            <p className="text-neutral-400">
              <strong className="font-semibold text-neutral-200">전화번호:</strong>{" "}
              <a href={site.tel} className="tabular-nums transition-colors hover:text-white">{site.phone}</a>
            </p>
            <p className="text-neutral-400">
              <strong className="font-semibold text-neutral-200">이메일:</strong>{" "}
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">{site.email}</a>
            </p>
            <p className="text-neutral-400">
              <strong className="font-semibold text-neutral-200">상담 가능 시간:</strong> <span className="tabular-nums">{site.hours}</span>
            </p>
          </div>
          <nav aria-label="푸터 메뉴" className="space-y-2 text-xs md:col-span-3">
            <span className="mb-3 block font-mono text-[11px] uppercase tracking-wider text-neutral-400">Navigation</span>
            <div className="flex flex-col space-y-1.5 text-neutral-400">
              {[...nav, { href: "/inquiry/", label: "프로젝트 문의서", en: "Inquiry" }].map((n) => (
                <Link key={n.href} href={n.href} className="py-0.5 transition-colors hover:text-white">
                  {n.label} ({n.en})
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 font-mono text-xs text-neutral-400 sm:flex-row">
          <p>© 2026 Webmate Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>REPUBLIC OF KOREA</span>
            <span>{"// STATUS: READY"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
