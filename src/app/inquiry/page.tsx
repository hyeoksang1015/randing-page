import Link from "next/link";
import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import { site } from "@/data/site";

const title = "프로젝트 문의서";
const description = "만들고 싶은 홈페이지의 목적, 필요한 페이지와 기능, 디자인 방향, 일정과 예산을 알려 주시면 웹메이트가 검토해 연락드립니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/inquiry/" },
  openGraph: { url: "/inquiry/", title, description },
};

export default function InquiryPage() {
  return (
    <main className="w-full bg-neutral-50 pt-20">
      <div className="mx-auto max-w-3xl space-y-10 px-6 py-14 sm:px-8 lg:py-20">
        <div className="space-y-4">
          <Link href="/#contact" className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900">
            <span aria-hidden="true">←</span> 홈으로
          </Link>
          <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500">[ PROJECT INQUIRY ]</span>
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-neutral-900 sm:text-3xl">{title}</h1>
          <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
            아는 만큼만 편하게 적어 주세요. (필수) 표시만 채우면 보낼 수 있고, 나머지는 상담하면서 함께 정리해도 됩니다.
            작성이 어려우시면{" "}
            <a href={site.tel} className="font-medium text-neutral-900 underline underline-offset-2 tabular-nums">
              {site.phone}
            </a>
            로 전화 주셔도 좋습니다.
          </p>
        </div>
        <InquiryForm />
      </div>
    </main>
  );
}
