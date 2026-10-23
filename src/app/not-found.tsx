import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "페이지를 찾을 수 없습니다", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="w-full pt-20">
      <section className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-28 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">[ 404 / NOT FOUND ]</span>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">요청하신 페이지를 찾을 수 없습니다.</h1>
        <p className="text-sm text-neutral-600">주소가 바뀌었거나 삭제된 페이지입니다.</p>
        <Link href="/" className="flex min-h-11 items-center rounded-sm bg-neutral-900 px-6 text-xs font-semibold text-white hover:bg-neutral-800">
          홈으로 가기
        </Link>
      </section>
    </main>
  );
}
