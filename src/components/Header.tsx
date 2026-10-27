"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import { nav } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link href="/" aria-label="웹메이트 홈" className="rounded-sm">
          <Logo />
        </Link>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/inquiry/" className="hidden items-center justify-center gap-1 rounded bg-neutral-900 px-4 py-2 text-xs font-medium tracking-wide text-white transition-colors hover:bg-neutral-800 sm:inline-flex">
            <span>프로젝트 문의</span>
            <Icon name="arrowOutward" className="size-3.5" />
          </Link>
          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded text-neutral-900 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="모바일 메뉴" className="border-t border-neutral-200 bg-white md:hidden">
          <ul className="mx-auto max-w-7xl px-6 py-3 sm:px-8">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-between border-b border-neutral-100 text-sm font-medium text-neutral-800">
                  {n.label}
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">{n.en}</span>
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link href="/inquiry/" onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center gap-1.5 rounded-sm bg-neutral-900 text-sm font-semibold text-white">
                프로젝트 문의하기
                <Icon name="arrowOutward" className="size-4" />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
