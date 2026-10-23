// 포트폴리오 목록. 항목 하나와 public/portfolio/<slug>/ 이미지를 넣으면 홈 카드와 상세 페이지가 함께 생긴다.
// 실제 고객사 작업이면 concept: false 로 둔다(CONCEPT 배지와 콘셉트 안내가 사라진다).
export type Shot = {
  src: string;
  width: number;
  height: number;
  /** 화면에 보여 줄 최대 폭(px). 모바일 시안은 좁게 보여 준다. */
  displayWidth: number;
  label: string;
  alt: string;
};

export type Work = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  host: string;
  summary: string;
  description: string;
  scope: string[];
  tags: string[];
  thumb: string;
  thumbAlt: string;
  concept: boolean;
  shots: Shot[];
};

/** 홈 포트폴리오 그리드 칸 수. 작업이 이보다 적으면 남는 칸은 "준비 중"으로 채운다. */
export const PORTFOLIO_SLOTS = 4;

// 상세 이미지 묶음 한 장. file 은 public 안 파일 번호, n/total 은 묶음 안에서의 순서다.
const detail = (slug: string, file: number, n: number, total: number, label: string, alt: string, width: number, height: number): Shot => ({
  src: `/portfolio/${slug}/0${file}.webp`,
  width,
  height,
  displayWidth: width,
  label: `DETAIL 0${n} / 0${total} — ${label}`,
  alt,
});

export const works: Work[] = [
  {
    slug: "greenform",
    title: "GREENFORM — 친환경 패키징 B2B 웹사이트",
    kind: "BRAND SITE",
    year: "2026",
    host: "greenform.preview",
    summary: "지속가능한 패키징 기업을 가정한 B2B 브랜드 사이트. 소재와 공정, 견적 문의까지의 흐름을 차분한 그리드로 정리했습니다.",
    description:
      "친환경 종이 패키징을 만드는 B2B 기업을 가정해 설계한 콘셉트 사이트입니다. 메인 페이지는 600px 세로형 한 페이지 안에 설계 원칙, 솔루션, 개발 프로세스, 견적 문의(RFQ)를 담았고, 회사 소개 페이지는 1440px 데스크톱 화면에서 브랜드의 관점과 협업 방식을 보여 줍니다.",
    scope: ["정보 구조 설계", "UI 디자인", "메인·회사 소개 2페이지"],
    tags: ["Brand Site", "B2B", "Editorial Grid"],
    thumb: "/portfolio/greenform/thumb.webp",
    thumbAlt: "GREENFORM 회사 소개 페이지 상단: '본질을 보호하고, 지속가능한 내일을 설계합니다.' 제목과 종이 패키징 작업대 사진",
    concept: true,
    shots: [
      { src: "/portfolio/greenform/01.webp", width: 1200, height: 6000, displayWidth: 600, label: "메인 페이지 — 600px 세로형", alt: "GREENFORM 메인 페이지 전체 화면: 히어로, 설계 원칙, 솔루션, 개발 프로세스, 콘셉트 사례, 견적 문의 폼" },
      { src: "/portfolio/greenform/02.webp", width: 1440, height: 5507, displayWidth: 1440, label: "회사 소개 페이지 — 1440px 데스크톱", alt: "GREENFORM 회사 소개 페이지 전체 화면: 회사 소개, 설계 태도, 소재 선정 프로세스, 협업 방식, 문의 영역" },
    ],
  },
  {
    slug: "form-space",
    title: "FORM / SPACE — 공간 디자인 스튜디오 홈페이지",
    kind: "DETAIL PAGE",
    year: "2026",
    host: "form-space.preview",
    summary: "건축·공간 디자인 스튜디오를 가정한 프리미엄 홈페이지 콘셉트와, 제작 과정을 소개하는 상세 이미지 5장입니다.",
    description:
      "절제된 톤과 에디토리얼 그리드로 건축·공간 스튜디오의 정체성을 표현한 콘셉트 작업입니다. 서비스 소개, 제작 유형, 디자인 시스템, 진행 프로세스, 실사례로 이어지는 5장의 상세 이미지로 구성했습니다.",
    scope: ["콘셉트 기획", "UI 디자인", "상세 이미지 5장"],
    tags: ["Brand Site", "Editorial", "Detail Page"],
    thumb: "/portfolio/form-space/thumb.webp",
    thumbAlt: "FORM / SPACE 웹사이트 디자인 실사례: 카페, 주거 공간, 쇼룸 콘셉트 사진 3장",
    concept: true,
    shots: [
      detail("form-space", 1, 1, 5, "서비스 소개", "FORM / SPACE 상세 이미지 1: 브랜드의 고유한 가치를 담는 프리미엄 홈페이지 소개", 1200, 1800),
      detail("form-space", 2, 2, 5, "제작 유형", "FORM / SPACE 상세 이미지 2: 목적에 맞춘 웹사이트 제작 유형", 1200, 1800),
      detail("form-space", 3, 3, 5, "디자인 시스템", "FORM / SPACE 상세 이미지 3: 색상, 글꼴, 그리드 디자인 시스템", 1200, 1800),
      detail("form-space", 4, 4, 5, "진행 프로세스", "FORM / SPACE 상세 이미지 4: 5단계 프로젝트 진행 과정", 1200, 1800),
      detail("form-space", 5, 5, 5, "실사례", "FORM / SPACE 상세 이미지 5: 카페, 주거 공간, 쇼룸 웹사이트 디자인 사례", 1200, 1800),
    ],
  },
  {
    slug: "pulse",
    title: "PULSE ATHLETIC CLUB — 피트니스 클럽 모바일 웹",
    kind: "MOBILE WEB",
    year: "2026",
    host: "pulse.preview",
    summary: "프리미엄 피트니스 클럽을 가정한 모바일 우선 웹사이트. 프로그램, 공간, 멤버십, 체험 신청을 한 흐름으로 구성했습니다.",
    description:
      "강한 대비의 흑백 사진과 굵은 타이포그래피로 스포츠 브랜드의 인상을 만든 모바일 웹사이트 콘셉트입니다. 첫 화면부터 체험 수업 신청까지 스크롤 한 번에 이어지도록 설계했고, 주요 화면을 소개하는 상세 이미지 5장을 함께 만들었습니다.",
    scope: ["모바일 UI 디자인", "랜딩 흐름 설계", "상세 이미지 5장"],
    tags: ["Mobile First", "Landing", "Fitness"],
    thumb: "/portfolio/pulse/thumb.webp",
    thumbAlt: "PULSE ATHLETIC CLUB 노트북·휴대폰 목업: '더 강한 나를 만드는 시간' 첫 화면",
    concept: true,
    shots: [
      { src: "/portfolio/pulse/01.webp", width: 780, height: 13810, displayWidth: 390, label: "모바일 웹사이트 — 390px 전체 화면", alt: "PULSE ATHLETIC CLUB 모바일 웹사이트 전체 화면: 히어로, 트레이닝 프로그램, 공간 소개, 멤버십, FAQ, 체험 신청 폼" },
      detail("pulse", 2, 1, 5, "브랜드 & 히어로", "PULSE 상세 이미지 1: 브랜드와 첫 화면 디자인을 노트북·휴대폰 목업으로 보여 주는 이미지", 848, 1264),
      detail("pulse", 3, 2, 5, "트레이닝 프로그램", "PULSE 상세 이미지 2: 개인·소그룹·컨디셔닝 프로그램 카드 레이아웃", 848, 1264),
      detail("pulse", 4, 3, 5, "공간 & 철학", "PULSE 상세 이미지 3: 공간 사진과 트레이닝 철학(분석·설계·체화) 섹션", 848, 1264),
      detail("pulse", 5, 4, 5, "멤버십 & 상담 흐름", "PULSE 상세 이미지 4: 회원권 비교, FAQ, 상담 신청으로 이어지는 화면 흐름", 848, 1264),
      detail("pulse", 6, 5, 5, "반응형 시스템", "PULSE 상세 이미지 5: 데스크톱·모바일 화면과 색상·글꼴 시스템 요약", 848, 1264),
    ],
  },
  {
    slug: "flown",
    title: "FLOWN — 업무 자동화 SaaS 랜딩페이지",
    kind: "SAAS LANDING",
    year: "2026",
    host: "flown.preview",
    summary: "소규모 기업용 업무 자동화 서비스를 가정한 SaaS 랜딩페이지. 기능 소개부터 요금제 비교, 무료 체험 신청까지 한 페이지로 구성했습니다.",
    description:
      "흩어진 업무를 연결하고 반복 작업을 자동화하는 B2B SaaS를 가정해 디자인부터 개발까지 진행한 콘셉트 랜딩페이지입니다. 와이드 영문 타이포그래피와 웜 그레이 톤으로 제품의 인상을 만들고, 자동화 플로·주간 리포트 화면을 카드로 보여 줍니다. 월간·연간 요금 전환(숫자 전환 애니메이션 포함)과 체험 신청 화면 흐름을 Next.js로 구현했습니다.",
    scope: ["UI 디자인", "Next.js 개발", "반응형 · 인터랙션"],
    tags: ["SaaS", "Landing", "Interaction"],
    thumb: "/portfolio/flown/thumb.webp",
    thumbAlt: "FLOWN 랜딩페이지 첫 화면: 화면 가득한 FLOWN 로고 위에 기울어진 대시보드 창",
    concept: true,
    shots: [
      { src: "/portfolio/flown/01.webp", width: 1440, height: 5252, displayWidth: 1440, label: "랜딩페이지 — 1440px 데스크톱", alt: "FLOWN 랜딩페이지 데스크톱 전체 화면: 히어로, 핵심 기능 3가지, 워크플로 자동화, 자동 리포트, 지표, 고객 후기, 요금제, 무료 체험 신청" },
      { src: "/portfolio/flown/02.webp", width: 780, height: 15166, displayWidth: 390, label: "랜딩페이지 — 390px 모바일", alt: "FLOWN 랜딩페이지 모바일 전체 화면: 데스크톱과 같은 구성이 한 열로 쌓인 화면" },
    ],
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
