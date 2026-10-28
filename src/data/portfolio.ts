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
  /** 실제로 써 볼 수 있는 데모(이 사이트 public/ 안 경로). 있으면 카드에 LIVE 배지, 상세에 데모 버튼이 생긴다. */
  live?: { url: string; title: string; note: string; try: { path: string; label: string } };
  /** 백엔드 구성. 있으면 상세 페이지에 "백엔드 구성" 영역이 생긴다. */
  backend?: { title: string; text: string }[];
};

/** 홈 포트폴리오 그리드 칸 수. 작업이 이보다 적으면 남는 칸은 "준비 중"으로 채운다. */
export const PORTFOLIO_SLOTS = 6;

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
    title: "FLOWN — 업무 자동화 SaaS 웹서비스 (회원가입·로그인 구현)",
    kind: "FULL-STACK SAAS",
    year: "2026",
    host: "flown.preview",
    summary: "업무 자동화 SaaS를 가정해 랜딩페이지부터 회원가입·로그인·대시보드까지 만든 풀스택 작업. 실제로 가입하고 로그인해 볼 수 있습니다.",
    description:
      "흩어진 업무를 연결하고 반복 작업을 자동화하는 B2B SaaS를 가정한 콘셉트 웹서비스입니다. 와이드 영문 타이포그래피와 웜 그레이 톤의 랜딩페이지에 월간·연간 요금 전환 애니메이션을 넣었고, Firebase로 회원가입·로그인과 회원 데이터베이스를 연결했습니다. 가입하면 회원 정보가 데이터베이스에 저장되고, 로그인한 사용자만 자신의 체험 정보를 대시보드에서 볼 수 있습니다.",
    scope: ["UI 디자인", "Next.js 프론트엔드", "Firebase 인증 · DB · 보안 규칙"],
    tags: ["Full-Stack", "Firebase", "SaaS"],
    thumb: "/portfolio/flown/thumb.webp",
    thumbAlt: "FLOWN 랜딩페이지 첫 화면: 화면 가득한 FLOWN 로고 위에 기울어진 대시보드 창",
    concept: true,
    shots: [
      { src: "/portfolio/flown/01.webp", width: 1440, height: 5252, displayWidth: 1440, label: "랜딩페이지 — 1440px 데스크톱", alt: "FLOWN 랜딩페이지 데스크톱 전체 화면: 히어로, 핵심 기능 3가지, 워크플로 자동화, 자동 리포트, 지표, 고객 후기, 요금제, 무료 체험 신청" },
      { src: "/portfolio/flown/02.webp", width: 780, height: 15166, displayWidth: 390, label: "랜딩페이지 — 390px 모바일", alt: "FLOWN 랜딩페이지 모바일 전체 화면: 데스크톱과 같은 구성이 한 열로 쌓인 화면" },
      { src: "/portfolio/flown/03.webp", width: 1440, height: 900, displayWidth: 1440, label: "회원가입 — Firebase Authentication", alt: "FLOWN 회원가입 화면: 이름, 회사명, 회사 이메일, 비밀번호 입력 칸과 7일 무료 체험 시작 버튼" },
      { src: "/portfolio/flown/04.webp", width: 1440, height: 900, displayWidth: 1440, label: "로그인 후 대시보드 — Firestore 회원 데이터", alt: "FLOWN 대시보드 화면: 사용자 이름 환영 문구, 체험 7일 남음, 이메일·회사·가입일" },
    ],
    live: {
      url: "/demo/flown/",
      title: "실제로 회원가입·로그인해 볼 수 있습니다.",
      note: "아무 이메일로 가입해 보세요. 인증 메일은 보내지 않으며, 실제로 쓰는 비밀번호는 넣지 마세요.",
      try: { path: "signup/", label: "회원가입 해 보기" },
    },
    backend: [
      { title: "회원 인증 — Firebase Authentication", text: "이메일·비밀번호로 회원가입, 로그인, 로그아웃을 처리합니다. 로그인 상태가 유지되고, 로그인하지 않은 사용자는 대시보드에 들어갈 수 없습니다." },
      { title: "데이터베이스 — Cloud Firestore", text: "가입할 때 이름·회사·이메일·플랜·가입 시각을 사용자별 문서로 저장하고, 대시보드에서 불러와 체험 남은 일수를 계산합니다." },
      { title: "보안 규칙 — 서버에서 검사", text: "사용자는 자기 문서만 읽고, 가입할 때 한 번만 만들 수 있습니다. 정해진 필드만 저장되고 플랜은 trial, 가입 시각은 서버 시각만 받으며, 수정·삭제와 남의 문서 접근은 서버가 거부합니다." },
      { title: "검증", text: "가입·로그인·로그아웃·중복 가입·틀린 비밀번호를 브라우저 자동화로 확인했고, 권한 상승·삭제·남의 문서 조회·전체 목록 조회 같은 우회 요청이 거부되는지 데이터베이스에 직접 요청해 확인했습니다." },
    ],
  },
  {
    slug: "lowwave",
    title: "LOWWAVE COFFEE — 원두 쇼핑몰 (토스 결제 · 주문·배송 관리자)",
    kind: "FULL-STACK COMMERCE",
    year: "2026",
    host: "lowwave.preview",
    summary: "스페셜티 원두 로스터리를 가정한 쇼핑몰. 회원가입부터 토스페이먼츠 테스트 결제, 주문·배송 현황, 관리자 주문 관리와 환불까지 실제로 동작합니다.",
    description:
      "개인 고객에게는 원두를 팔고 카페에는 원두를 납품하는 로스터리를 가정한 콘셉트 사이트입니다. 브랜드 홈, 원두 목록, 원두 상세, B2B 납품 4개 화면 디자인을 Next.js로 옮기고, 원두 10종을 하나의 데이터로 묶어 모든 화면이 같은 가격과 정보를 쓰도록 했습니다. 산미·바디·배전도 필터와 정렬, 용량·분쇄도·정기구독 주기에 따라 바뀌는 가격, 새로고침해도 유지되는 장바구니와 무료배송 계산, 세 문항 취향 퀴즈, 커핑 예약, 입력 검사가 있는 납품 신청서까지 동작합니다. 여기에 회원가입·로그인, 토스페이먼츠 결제위젯(테스트 모드), 고객의 주문·배송 현황 화면, 관리자 대시보드(실시간 주문 목록, 상태 변경, 송장 등록, 결제 취소·환불, B2B 문의 관리)를 붙여 실제 쇼핑몰처럼 주문이 흘러가게 했습니다.",
    scope: ["디자인 시안 구현", "Next.js 프론트엔드", "토스 결제 · 서버 승인 함수", "주문·배송 관리자 대시보드"],
    tags: ["E-Commerce", "Toss Payments", "Firebase"],
    thumb: "/portfolio/lowwave/thumb.webp",
    thumbAlt: "LOWWAVE COFFEE 홈 첫 화면: 'Find Your Wave in Every Pour.' 제목과 과테말라 게이샤 원두 패키지 카드",
    concept: true,
    shots: [
      { src: "/portfolio/lowwave/01.webp", width: 1440, height: 3914, displayWidth: 1440, label: "브랜드 홈 — 1440px 데스크톱", alt: "LOWWAVE COFFEE 홈 전체 화면: 히어로, 로스팅 철학, 이달의 큐레이션, 패키징, 취향 퀴즈와 샘플러 신청, 고객 후기, 로스터리 랩 안내" },
      { src: "/portfolio/lowwave/02.webp", width: 780, height: 16018, displayWidth: 390, label: "브랜드 홈 — 390px 모바일", alt: "LOWWAVE COFFEE 홈 모바일 전체 화면: 데스크톱과 같은 구성이 한 열로 쌓인 화면" },
      { src: "/portfolio/lowwave/03.webp", width: 1440, height: 3919, displayWidth: 1440, label: "원두 목록 — 필터 · 정렬", alt: "LOWWAVE COFFEE 원두 목록 화면: 카테고리·배전도·산미·바디 필터와 원두 카드 목록" },
      { src: "/portfolio/lowwave/04.webp", width: 1440, height: 3290, displayWidth: 1440, label: "원두 상세 — 옵션별 가격 계산", alt: "LOWWAVE COFFEE 원두 상세 화면: 사진 갤러리, 용량·분쇄도·정기구독 선택, 향미 정보, 추출 가이드, 구매 후기" },
      { src: "/portfolio/lowwave/05.webp", width: 1440, height: 3041, displayWidth: 1440, label: "B2B 납품 — 샘플 신청서", alt: "LOWWAVE COFFEE B2B 납품 화면: 샘플러 키트 소개, 납품 신청서, 파트너 카페 후기, 자주 묻는 질문" },
      { src: "/portfolio/lowwave/06.webp", width: 1440, height: 1454, displayWidth: 1440, label: "주문 · 결제 — 토스페이먼츠 결제위젯", alt: "LOWWAVE COFFEE 주문서 화면: 배송 정보 입력, 토스 결제위젯의 결제 수단 선택, 주문 상품과 결제 금액 요약" },
      { src: "/portfolio/lowwave/07.webp", width: 1440, height: 1150, displayWidth: 1440, label: "관리자 대시보드 — 주문 · 배송 관리", alt: "LOWWAVE COFFEE 관리자 화면: 오늘 주문·누적 결제 금액·발송 대기·배송중 요약, 상태별 필터, 송장이 등록된 배송중 주문 상세" },
      { src: "/portfolio/lowwave/08.webp", width: 1440, height: 520, displayWidth: 1440, label: "내 주문 — 배송 현황", alt: "LOWWAVE COFFEE 고객 주문 내역: 결제 완료부터 배송 완료까지 진행 막대와 송장번호, 취소·환불된 주문" },
    ],
    live: {
      url: "/demo/lowwave/",
      title: "가입하고 원두를 담아 테스트 결제까지 해 볼 수 있습니다.",
      note: "토스페이먼츠 테스트 모드라 카드 정보를 넣어도 돈이 빠져나가지 않습니다. 실제로 쓰는 비밀번호는 넣지 마세요.",
      try: { path: "beans/", label: "원두 쇼핑 해 보기" },
    },
    backend: [
      { title: "결제 — 토스페이먼츠 결제위젯 + 서버 승인", text: "주문서에서 결제위젯으로 결제하면, Cloudflare Pages Functions 서버가 토스 결제 승인 API를 호출해 결제를 확정합니다. 시크릿 키는 서버 환경 변수에만 있고 브라우저에는 나가지 않습니다." },
      { title: "금액 위조 방지", text: "서버는 브라우저가 보낸 금액을 믿지 않고, 저장된 주문 상품을 원두 카탈로그로 다시 계산해 결제 금액과 맞을 때만 승인합니다. 승인 뒤 주문 저장에 실패하면 결제를 자동으로 취소합니다." },
      { title: "주문·배송 데이터 — Firebase Auth · Cloud Firestore", text: "고객은 결제 대기 주문만 만들 수 있고, 결제 완료는 서버 계정만, 준비중·배송중·배송 완료와 송장은 관리자만 바꿀 수 있도록 보안 규칙으로 막았습니다. 고객은 자기 주문만 봅니다." },
      { title: "관리자 대시보드", text: "주문이 들어오면 새로고침 없이 목록에 나타납니다. 상태별 필터와 검색, 오늘 주문·누적 결제 금액 요약, 송장 등록, 결제 취소·환불, B2B 납품 문의 처리를 한 화면에서 합니다." },
    ],
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
