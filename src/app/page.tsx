import Link from "next/link";
import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import InquiryForm from "@/components/InquiryForm";
import SectionHeader from "@/components/SectionHeader";
import { PORTFOLIO_SLOTS, works } from "@/data/portfolio";
import { mailtoHref, site } from "@/data/site";

const tags = ["STRATEGY", "UI/UX DESIGN", "PUBLISHING", "FULL-STACK"];

// 확인할 수 있는 사실만 적는다(성과·속도 수치는 쓰지 않는다).
const facts = [
  { value: "6", label: "제공 서비스 분야" },
  { value: "4단계", label: "체계적인 제작 과정" },
  { value: "1:1", label: "전담 다이렉트 소통" },
];

const capabilities: { no: string; en: string; icon: IconName; title: string; desc: string; items: string[] }[] = [
  { no: "01", en: "ARCHITECTURE", icon: "tree", title: "기획 및 구조 설계", desc: "비즈니스 목적을 분석하고 방문자가 길을 잃지 않는 명확한 정보 구조를 수립합니다.", items: ["서비스 목적 및 타겟 고객 분석", "정보 구조(IA) 및 페이지 계층화", "전환 중심 사용자 동선 설계"] },
  { no: "02", en: "UI/UX DESIGN", icon: "palette", title: "UI/UX 디자인", desc: "과도한 장식 대신 브랜드의 신뢰도를 높여주는 정교한 타이포그래피와 현대적 그리드를 설계합니다.", items: ["사용자 중심 직관적 인터페이스", "토큰 기반 체계적 디자인 시스템", "시각적 위계와 브랜드 가치 극대화"] },
  { no: "03", en: "FRONTEND", icon: "code", title: "웹 퍼블리싱 & 프론트", desc: "어떤 디바이스에서도 깨지지 않는 반응형 웹과 최신 웹 표준의 시맨틱 코드를 작성합니다.", items: ["모바일·태블릿·PC 반응형", "Next.js & Tailwind CSS 개발", "정교한 인터랙션과 마이크로 모션"] },
  { no: "04", en: "FULL-STACK", icon: "dns", title: "백엔드 및 풀스택 개발", desc: "단순 페이지를 넘어 데이터베이스 연동, 문의 자동화, 관리자 콘솔 등 실제 기능을 완성합니다.", items: ["FastAPI 및 RESTful API 구축", "데이터베이스 및 폼 접수 자동화", "맞춤형 관리자 제어 패널 제작"] },
];

const services = [
  { no: "01", tag: "BRANDING", title: "브랜드 공식 홈페이지 제작", desc: "기업, 스타트업, 크리에이티브 스튜디오의 신뢰도를 전달하는 공식 웹사이트입니다. 브랜드 고유의 아이덴티티와 최적화된 정보 구조를 결합합니다.", rec: "기업 공식 사이트, 에이전시, 전문직 쇼케이스" },
  { no: "02", tag: "CONVERSION", title: "반응형 원페이지 랜딩페이지", desc: "신규 서비스 런칭, 프로모션, 사전 예약 및 잠재 고객 리드 수집에 최적화된 고효율 랜딩페이지를 신속하고 정교하게 완성합니다.", rec: "사전 예약, 마케팅 캠페인, SaaS 홍보" },
  { no: "03", tag: "DEVELOPMENT", title: "웹 퍼블리싱 및 UI/UX 리뉴얼", desc: "Figma 등 기존 디자인 시안을 오차 없이 웹 표준 코드로 구현하거나 노후된 웹사이트의 반응형 레이아웃과 가독성을 고도화합니다.", rec: "시안 보유 고객, 노후 웹 개편" },
  { no: "04", tag: "FULL-STACK", title: "풀스택 맞춤형 웹 서비스 개발", desc: "정적 페이지를 넘어 사용자 인증, 데이터베이스 조회, 관리자 콘솔, 외부 API 연동 등 실제 비즈니스를 구동시키는 웹 시스템을 개발합니다.", rec: "사내 업무 도구, 데이터 뷰어, MVP 프로토타입" },
];

const clusters = [
  { no: "01", side: "CLIENT-SIDE", title: "FRONTEND", desc: "빠른 초기 로딩과 검색엔진 최적화(SEO), 컴포넌트 재사용성을 보장합니다.", items: [["React & Next.js", "SSR / SSG 하이브리드 지원", "CORE"], ["TypeScript", "정적 타입 시스템 안정성", "ROBUST"], ["HTML · CSS · JavaScript", "웹 표준 시맨틱 마크업", "STANDARD"]] },
  { no: "02", side: "SERVER & API", title: "BACKEND & API", desc: "가볍고 빠른 비동기 처리와 확장 가능한 API 설계로 데이터를 서빙합니다.", items: [["Python & FastAPI", "고성능 비동기 API 구축", "ASYNC"], ["Node.js", "실시간 이벤트 및 서버 로직", "EVENT"]] },
  { no: "03", side: "RAPID BUILD", title: "WEB APPLICATION", desc: "사내 관리 도구 및 빠른 시장 검증을 위한 MVP 프로토타입 파이프라인.", items: [["Streamlit", "대화형 데이터 앱 신속 배포", "RAPID"], ["배포 · 운영", "정적 호스팅 배포와 도메인 연결", "DEPLOY"]] },
];

const steps = [
  { title: "상담 및 기획", desc: "프로젝트 목적, 타겟 고객, 필수 기능, 예산 및 출시 일정을 면밀히 상담하고 방향성을 확정합니다.", out: "요구사항 정의서 도출" },
  { title: "구조 설계 및 디자인", desc: "페이지 구조(IA)와 동선을 정리하고 톤앤매너에 맞춘 UI 디자인 시안을 도출하여 검토합니다.", out: "와이어프레임 & 디자인 시안" },
  { title: "개발 및 구현", desc: "확정된 시안을 바탕으로 시맨틱 마크업, 반응형 웹 퍼블리싱, 백엔드 연동을 구현합니다.", out: "테스트 환경 배포 & 검증" },
  { title: "검수 및 전달", desc: "디바이스별 호환성 및 링크, 폼 동작을 철저히 검수한 후 도메인 연결과 소스코드를 인계합니다.", out: "런칭 & 인수인계 완료" },
];

const container = "mx-auto max-w-7xl px-6 sm:px-8";
const dot = <span className="size-1 shrink-0 rounded-full bg-neutral-900" />;
const btnPrimary = "flex min-h-11 items-center gap-2 rounded-sm bg-neutral-900 px-6 py-3.5 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-neutral-800";
const btnSecondary = "flex min-h-11 items-center gap-2 rounded-sm border border-neutral-300 bg-white px-6 py-3.5 text-xs font-semibold tracking-wide text-neutral-800 transition-colors hover:border-neutral-400 hover:bg-neutral-50";
const windowDots = (size: string) => (
  <span className="flex items-center gap-1.5" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <span key={i} className={`${size} rounded-full bg-neutral-300`} />
    ))}
  </span>
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: ["웹메이트", "Webmate"],
  url: `${site.url}/`,
  logo: `${site.url}/logo-mark.png`,
  email: site.email,
  telephone: "+82-10-5918-2043",
  description: site.description,
};

export default function Home() {
  const placeholders = Math.max(0, PORTFOLIO_SLOTS - works.length);
  return (
    <main className="w-full pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative w-full border-b border-neutral-200 bg-white py-16 sm:py-20 lg:py-28">
        <div className={container}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col space-y-8 lg:col-span-7">
              <div className="inline-flex w-max max-w-full items-center gap-2 rounded border border-neutral-200 bg-neutral-100 px-3 py-1 font-mono text-xs text-neutral-700">
                <span className="size-1.5 shrink-0 rounded-full bg-neutral-900" />
                <span>Webmate — Digital Experience Partner</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold leading-[1.25] tracking-tight text-neutral-900 sm:text-4xl lg:text-[44px]">
                  기획부터 개발까지,
                  <br />
                  <span className="font-semibold text-neutral-800">당신의 웹</span>을 완성합니다.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
                  브랜드 홈페이지부터 반응형 랜딩페이지, 맞춤형 웹 서비스까지. 기획과 디자인, 개발을 하나의 유기적인 흐름으로 결합하여 완성도 높은 디지털 결과물을 제공합니다.
                </p>
              </div>
              <ul className="flex flex-wrap items-center gap-2" aria-label="작업 범위">
                {tags.map((t) => (
                  <li key={t} className="border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-xs text-neutral-700">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a className={btnPrimary} href="#portfolio">
                  <span>포트폴리오 보기</span>
                  <Icon name="arrowDown" />
                </a>
                <a className={btnSecondary} href="#contact">
                  <span>프로젝트 문의하기</span>
                  <Icon name="arrowOutward" />
                </a>
              </div>
              <dl className="grid grid-cols-3 gap-4 border-t border-neutral-200 pt-6 sm:gap-6">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col-reverse">
                    <dt className="mt-2 text-xs text-neutral-500">{f.label}</dt>
                    <dd className="text-2xl font-bold leading-none tabular-nums text-neutral-900">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* 오른쪽 목업: 장식용 그림이라 스크린리더에서는 건너뛴다. */}
            <div className="lg:col-span-5" aria-hidden="true">
              <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
                <div className="flex h-10 items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4">
                  {windowDots("size-2.5")}
                  <span className="font-mono text-xs text-neutral-500">webmate / preview</span>
                  <div className="w-4" />
                </div>
                <div className="space-y-5 bg-neutral-50/50 p-5 sm:p-6">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold uppercase text-neutral-900">WM_CORE</span>
                      <span className="font-mono text-[11px] text-neutral-500">v2.4.0</span>
                    </div>
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-500">
                      <span className="size-1.5 rounded-full bg-neutral-900" /> ACTIVE
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded border border-neutral-200 bg-white p-4">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">Responsive</span>
                      <div className="mt-1 whitespace-nowrap text-base font-bold tabular-nums text-neutral-900 sm:text-lg">
                        375–1920<span className="ml-0.5 text-xs font-semibold text-neutral-500">px</span>
                      </div>
                      <p className="mt-1 text-xs text-neutral-500">모바일부터 대형 화면까지</p>
                    </div>
                    <div className="rounded border border-neutral-200 bg-white p-4">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">Stack</span>
                      <div className="mt-1 text-lg font-bold text-neutral-900">Next.js</div>
                      <p className="mt-1 text-xs text-neutral-500">TypeScript 기반 개발</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 overflow-x-auto rounded bg-neutral-900 p-4 font-mono text-xs leading-relaxed text-neutral-200">
                    <div className="flex justify-between border-b border-neutral-800 pb-1 text-[11px] text-neutral-400">
                      <span>AppRouter.tsx</span>
                      <span>TypeScript</span>
                    </div>
                    <p className="whitespace-nowrap pt-1">
                      <span className="text-neutral-400">export default async function</span> Page() {"{"}
                    </p>
                    <p className="whitespace-nowrap pl-4 text-neutral-300">const site = await webmate.build();</p>
                    <p className="whitespace-nowrap pl-4 text-neutral-300">
                      return &lt;<span className="font-semibold text-white">MinimalWeb</span> ready={"{true}"} /&gt;;
                    </p>
                    <p>{"}"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="w-full border-b border-neutral-200 bg-neutral-50/60 py-20 lg:py-24">
        <div className={`${container} space-y-14`}>
          <SectionHeader split label="CAPABILITIES MATRIX" title="웹사이트 제작의 모든 과정을 하나로.">
            아이디어를 구체화하는 기획부터 사용자 경험을 설계하는 디자인, 실제 구현과 안정적인 배포까지 프로젝트의 전 과정을 빈틈없이 연결합니다.
          </SectionHeader>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <article key={c.no} className="flex flex-col justify-between rounded-sm border border-neutral-200 bg-white p-7 transition-colors hover:border-neutral-400">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <span className="font-mono text-xs font-semibold text-neutral-900">
                      {c.no} / {c.en}
                    </span>
                    <Icon name={c.icon} className="size-[18px] text-neutral-500" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{c.desc}</p>
                </div>
                <ul className="mt-6 space-y-2 border-t border-neutral-100 pt-6 text-xs text-neutral-600">
                  {c.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      {dot}
                      {i}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="w-full border-b border-neutral-200 bg-white py-20 lg:py-24">
        <div className={`${container} space-y-14`}>
          <SectionHeader label="TAILORED SERVICES" title="필요한 웹 프로젝트를, 목적에 맞게.">
            기업의 공식 얼굴이 될 브랜드 사이트부터 마케팅 성과를 내는 랜딩페이지, 맞춤형 웹 애플리케이션까지 꼭 맞는 형태로 제안합니다.
          </SectionHeader>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((s) => (
              <article key={s.no} className="flex flex-col justify-between rounded-sm border border-neutral-200 bg-neutral-50/50 p-6 sm:p-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">SERVICE {s.no}</span>
                    <span className="rounded-sm bg-neutral-200 px-2 py-0.5 font-mono text-[11px] text-neutral-700">{s.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{s.desc}</p>
                </div>
                <div className="mt-6 flex flex-col gap-3 border-t border-neutral-200/80 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-neutral-500">추천: {s.rec}</span>
                  <a className="inline-flex min-h-11 shrink-0 sm:min-h-6 items-center gap-1 font-medium text-neutral-900 hover:underline" href="#contact">
                    문의하기 <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="w-full border-b border-neutral-200 bg-neutral-50/60 py-20 lg:py-24">
        <div className={`${container} space-y-14`}>
          <SectionHeader split label="CONCEPT ARCHIVE" title={<>만드는 것보다 중요한 건,<br className="md:hidden" /> 어떻게 완성하느냐.</>}>
            다양한 비즈니스 목적과 요구사항에 맞춰 설계한 웹 프로젝트 쇼케이스입니다. (스튜디오 자체 디자인 프로토타입 콘셉트)
          </SectionHeader>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {works.map((w, i) => (
              <article key={w.slug} className="group relative flex flex-col overflow-hidden rounded border border-neutral-200 bg-white transition-colors hover:border-neutral-400 has-[a:focus-visible]:border-neutral-900">
                <div className="flex h-9 items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4">
                  <div className="flex min-w-0 items-center gap-1.5">
                    {windowDots("size-2")}
                    <span className="ml-2 truncate font-mono text-[11px] text-neutral-500">{w.host}</span>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    {w.live && <span className="rounded-sm bg-neutral-900 px-2 py-0.5 font-mono text-[10px] font-semibold text-white">LIVE</span>}
                    {w.concept && <span className="rounded-sm bg-neutral-200 px-2 py-0.5 font-mono text-[10px] font-semibold text-neutral-700">CONCEPT</span>}
                  </div>
                </div>
                <div className="relative aspect-[37/16] w-full overflow-hidden border-b border-neutral-200 bg-neutral-100">
                  <Image src={w.thumb} alt={w.thumbAlt} width={1184} height={512} sizes="(min-width: 1280px) 592px, (min-width: 768px) 50vw, 100vw" className="size-full object-cover grayscale-[30%] transition-all duration-300 group-hover:grayscale-0" />
                </div>
                <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                      <span>
                        0{i + 1} / {w.kind}
                      </span>
                      <span className="tabular-nums">{w.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">
                      {/* 제목 링크를 카드 전체로 늘려, 카드 어디를 눌러도 상세 페이지로 간다. */}
                      <Link href={`/portfolio/${w.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
                        {w.title}
                      </Link>
                    </h3>
                    <p className="text-xs leading-relaxed text-neutral-600">{w.summary}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-3">
                    <ul className="flex flex-wrap items-center gap-1.5" aria-label="작업 성격">
                      {w.tags.map((t) => (
                        <li key={t} className="bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-neutral-600">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <span className="shrink-0 text-xs font-medium text-neutral-900 group-hover:underline" aria-hidden="true">
                      자세히 보기 →
                    </span>
                  </div>
                </div>
              </article>
            ))}
            {Array.from({ length: placeholders }, (_, k) => (
              <article key={`soon-${k}`} className="flex flex-col overflow-hidden rounded border border-dashed border-neutral-300 bg-white/60">
                <div className="flex h-9 items-center justify-between border-b border-dashed border-neutral-300 px-4">
                  <div className="flex items-center gap-1.5">
                    {windowDots("size-2")}
                    <span className="ml-2 font-mono text-[11px] text-neutral-500">next-project.preview</span>
                  </div>
                  <span className="rounded-sm border border-neutral-300 px-2 py-0.5 font-mono text-[10px] font-semibold text-neutral-500">SOON</span>
                </div>
                <div className="flex aspect-[37/16] w-full items-center justify-center border-b border-dashed border-neutral-300 bg-neutral-50">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Coming Soon</span>
                </div>
                <div className="flex-1 space-y-2 p-6">
                  <div className="font-mono text-xs text-neutral-500">0{works.length + k + 1} / COMING SOON</div>
                  <h3 className="text-lg font-bold text-neutral-500">새 작업을 준비하고 있습니다</h3>
                  <p className="text-xs leading-relaxed text-neutral-500">완성되는 대로 이 자리에 추가됩니다.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="tech-stack" className="w-full border-b border-neutral-200 bg-white py-20 lg:py-24">
        <div className={`${container} space-y-14`}>
          <SectionHeader split label="ENGINE & TOOLING" title="프로젝트에 맞는 기술을 선택합니다.">
            고정된 틀에 맞추지 않고 프로젝트의 목적과 규모, 운영 효율성에 가장 적합한 현대적 기술 스택을 유연하게 조합합니다.
          </SectionHeader>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {clusters.map((c) => (
              <article key={c.no} className="space-y-6 rounded-sm border border-neutral-200 bg-neutral-50/50 p-6 sm:p-7">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <span className="font-mono text-xs font-semibold text-neutral-900">CLUSTER {c.no}</span>
                  <span className="font-mono text-[11px] text-neutral-500">{c.side}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{c.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">{c.desc}</p>
                </div>
                <ul className="space-y-2.5">
                  {c.items.map(([name, sub, badge]) => (
                    <li key={name} className="flex items-center justify-between gap-3 rounded-sm border border-neutral-200 bg-white p-3 text-xs">
                      <div>
                        <div className="font-semibold text-neutral-900">{name}</div>
                        <div className="text-[11px] text-neutral-500">{sub}</div>
                      </div>
                      <span className="font-mono text-[10px] text-neutral-500">{badge}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="w-full border-b border-neutral-200 bg-neutral-50/60 py-20 lg:py-24">
        <div className={`${container} space-y-14`}>
          <SectionHeader label="WORKFLOW TIMELINE" title="아이디어에서 실제 서비스까지.">
            불필요한 지연 없이 모든 단계가 투명하게 공유되는 4단계 체계적 프로세스로 결과물을 인도합니다.
          </SectionHeader>
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col justify-between rounded-sm border border-neutral-200 bg-white p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`flex size-7 items-center justify-center rounded-sm font-mono text-xs font-bold tabular-nums ${i === 0 ? "bg-neutral-900 text-white" : "border border-neutral-300 bg-neutral-100 text-neutral-900"}`}>0{i + 1}</span>
                    <span className="font-mono text-[11px] text-neutral-500">PHASE 0{i + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">{s.title}</h3>
                  <p className="text-xs leading-relaxed text-neutral-600">{s.desc}</p>
                </div>
                <div className={`mt-4 border-t border-neutral-100 pt-4 text-[11px] ${i === steps.length - 1 ? "font-semibold text-neutral-900" : "text-neutral-500"}`}>→ {s.out}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="w-full border-b border-neutral-200 bg-white py-20 lg:py-24">
        <div className={container}>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-6 lg:col-span-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">[ START A PROJECT ]</span>
              <h2 className="text-2xl font-bold leading-snug tracking-tight text-neutral-900 sm:text-3xl">
                당신의 아이디어,
                <br />
                웹메이트와 현실로 만들어보세요.
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-neutral-600">
                공식 홈페이지 제작부터 전환형 랜딩페이지, 풀스택 맞춤형 기능 개발까지. 만들고자 하는 사이트에 대해 편안하게 문의 남겨주시면 정성을 다해 함께 고민하겠습니다.
              </p>
              <dl className="space-y-3 pt-2">
                {[
                  ["TEL", <a key="t" className="tabular-nums hover:text-neutral-900 hover:underline" href={site.tel}>{site.phone}</a>],
                  ["EMAIL", <a key="e" className="break-all hover:text-neutral-900 hover:underline" href={`mailto:${site.email}`}>{site.email}</a>],
                  ["HOURS", <span key="h" className="font-sans tabular-nums">{site.hours}</span>],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex min-h-11 items-center gap-3 rounded-sm border border-neutral-200 bg-neutral-50 px-4 py-3 font-mono text-xs text-neutral-700">
                    <dt className="w-16 shrink-0 font-semibold text-neutral-900">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a className={btnPrimary} href={mailtoHref}>
                  <span>이메일로 문의하기</span>
                  <Icon name="mail" />
                </a>
                <a className={btnSecondary} href={site.tel}>
                  <span>전화 상담하기</span>
                  <Icon name="call" />
                </a>
              </div>
            </div>
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
