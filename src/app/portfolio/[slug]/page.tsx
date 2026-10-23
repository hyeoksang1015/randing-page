import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getWork, works } from "@/data/portfolio";

export const dynamicParams = false;
export const generateStaticParams = () => works.map((w) => ({ slug: w.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const w = getWork((await params).slug);
  if (!w) return {};
  const url = `/portfolio/${w.slug}/`;
  return {
    title: w.title,
    description: w.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: w.title, description: w.summary, images: [{ url: w.thumb, width: 1184, height: 512, alt: w.thumbAlt }] },
    twitter: { card: "summary_large_image", title: w.title, description: w.summary, images: [w.thumb] },
  };
}

const container = "mx-auto max-w-7xl px-6 sm:px-8";

export default async function WorkPage({ params }: Props) {
  const w = getWork((await params).slug);
  if (!w) notFound();
  const index = works.indexOf(w);
  const prev = works[index - 1];
  const next = works[index + 1];
  const meta = [
    ["유형", w.kind],
    ["연도", w.year],
    ["작업 범위", w.scope.join(" · ")],
  ];

  return (
    <main className="w-full pt-20">
      <section className="border-b border-neutral-200 bg-white py-14 lg:py-20">
        <div className={`${container} space-y-8`}>
          <Link href="/#portfolio" className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900">
            <span aria-hidden="true">←</span> 포트폴리오 목록
          </Link>
          <div className="space-y-3 border-b border-neutral-200 pb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              [ {w.concept ? "CONCEPT" : "PROJECT"} 0{index + 1} / {w.kind} ]
            </span>
            <h1 className="text-2xl font-bold leading-snug tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">{w.title}</h1>
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-base">{w.description}</p>
          </div>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {meta.map(([k, v]) => (
              <div key={k} className="rounded-sm border border-neutral-200 bg-neutral-50 px-4 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">{k}</dt>
                <dd className="mt-1 text-sm font-medium tabular-nums text-neutral-900">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-3">
            {w.concept && (
              <>
                <span className="rounded-sm bg-neutral-200 px-2 py-0.5 font-mono text-[10px] font-semibold text-neutral-700">CONCEPT</span>
                <p className="text-xs text-neutral-600">실제 고객사 작업이 아닌 웹메이트 자체 콘셉트 작업입니다. 화면 속 회사명·인물·수치는 가상입니다.</p>
              </>
            )}
            <ul className="flex flex-wrap gap-1.5" aria-label="작업 성격">
              {w.tags.map((t) => (
                <li key={t} className="bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-neutral-600">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {w.live && (
            <div className="flex flex-col gap-5 rounded-sm bg-neutral-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">[ LIVE DEMO ]</p>
                <p className="text-sm font-semibold sm:text-base">{w.live.title}</p>
                <p className="text-xs leading-relaxed text-neutral-400">{w.live.note}</p>
              </div>
              {/* 데모는 이 앱 바깥의 정적 파일이라 Link 대신 a 로 새 탭에 연다. */}
              <div className="flex shrink-0 flex-wrap gap-3">
                <a href={`${w.live.url}signup/`} target="_blank" rel="noopener" className="flex min-h-11 items-center gap-1 rounded-sm bg-white px-5 text-xs font-semibold text-neutral-900 hover:bg-neutral-200">
                  회원가입 해 보기 <span aria-hidden="true">↗</span>
                </a>
                <a href={w.live.url} target="_blank" rel="noopener" className="flex min-h-11 items-center gap-1 rounded-sm border border-neutral-600 px-5 text-xs font-semibold text-white hover:border-white">
                  라이브 사이트 열기 <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {w.backend && (
        <section aria-labelledby="backend-title" className="border-b border-neutral-200 bg-white py-14 lg:py-20">
          <div className={`${container} space-y-8`}>
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">[ BACKEND ]</span>
              <h2 id="backend-title" className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                백엔드 구성
              </h2>
            </div>
            <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {w.backend.map((b, i) => (
                <li key={b.title} className="space-y-2 rounded-sm border border-neutral-200 bg-neutral-50 p-5">
                  <p className="font-mono text-[11px] text-neutral-500">0{i + 1}</p>
                  <h3 className="text-sm font-semibold text-neutral-900">{b.title}</h3>
                  <p className="text-xs leading-relaxed text-neutral-600 sm:text-sm">{b.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section aria-label="작업 결과물" className="border-b border-neutral-200 bg-neutral-50/60 py-14 lg:py-20">
        <div className={`${container} space-y-12`}>
          {w.shots.map((s, i) => (
            <figure key={s.src} className="mx-auto w-full overflow-hidden rounded border border-neutral-200 bg-white" style={{ maxWidth: s.displayWidth + 2 }}>
              <div className="flex h-9 items-center gap-1.5 border-b border-neutral-200 bg-neutral-100 px-4" aria-hidden="true">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="size-2 rounded-full bg-neutral-300" />
                ))}
                <span className="ml-2 truncate font-mono text-[11px] text-neutral-500">{w.host}</span>
              </div>
              <Image
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                sizes={`(min-width: ${s.displayWidth + 64}px) ${s.displayWidth}px, calc(100vw - 48px)`}
                priority={i === 0}
                className="block h-auto w-full"
              />
              <figcaption className="border-t border-neutral-200 px-4 py-3 font-mono text-[11px] text-neutral-600">{s.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className={`${container} space-y-8`}>
          <nav aria-label="다른 작업" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prev ? (
              <Link href={`/portfolio/${prev.slug}/`} className="flex min-h-11 flex-col rounded-sm border border-neutral-200 px-4 py-3 transition-colors hover:border-neutral-400">
                <span className="font-mono text-[11px] text-neutral-500">← 이전 작업</span>
                <span className="mt-1 text-sm font-semibold text-neutral-900">{prev.title}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link href={`/portfolio/${next.slug}/`} className="flex min-h-11 flex-col rounded-sm border border-neutral-200 px-4 py-3 text-right transition-colors hover:border-neutral-400">
                <span className="font-mono text-[11px] text-neutral-500">다음 작업 →</span>
                <span className="mt-1 text-sm font-semibold text-neutral-900">{next.title}</span>
              </Link>
            )}
          </nav>
          <div className="flex flex-col items-start justify-between gap-4 rounded-sm border border-neutral-200 bg-neutral-50 p-6 sm:flex-row sm:items-center">
            <p className="text-sm font-semibold text-neutral-900">비슷한 프로젝트를 구상하고 계신가요?</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#portfolio" className="flex min-h-11 items-center rounded-sm border border-neutral-300 bg-white px-5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50">
                포트폴리오 목록
              </Link>
              <Link href="/#contact" className="flex min-h-11 items-center gap-1 rounded-sm bg-neutral-900 px-5 text-xs font-semibold text-white hover:bg-neutral-800">
                프로젝트 문의하기 <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
