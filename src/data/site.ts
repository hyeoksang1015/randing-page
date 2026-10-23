// 사이트 전체에서 쓰는 연락처와 주소. 도메인을 연결하면 빌드 환경변수 NEXT_PUBLIC_SITE_URL 만 바꾼다.
export const site = {
  name: "웹메이트(Webmate)",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://webmate.pages.dev").replace(/\/$/, ""),
  description:
    "기획부터 UI/UX 디자인, 웹 퍼블리싱, 프론트엔드·백엔드 개발까지. 브랜드 홈페이지와 반응형 랜딩페이지, 맞춤형 웹 서비스를 함께 만드는 웹 제작 파트너 웹메이트입니다.",
  phone: "010-5918-2043",
  tel: "tel:01059182043",
  email: "01059182043k@gmail.com",
  hours: "평일 11:00 ~ 22:00",
};

export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent("[프로젝트 문의] 웹사이트 제작 의뢰")}`;

// 모든 페이지에서 같은 주소를 쓴다. 홈에서는 같은 문서 안 이동, 상세 페이지에서는 홈의 해당 섹션으로 간다.
export const nav = [
  { href: "/#capabilities", label: "핵심 역량", en: "Capabilities" },
  { href: "/#services", label: "서비스", en: "Services" },
  { href: "/#portfolio", label: "포트폴리오", en: "Portfolio" },
  { href: "/#tech-stack", label: "기술 스택", en: "Tech Stack" },
  { href: "/#process", label: "제작 과정", en: "Process" },
];
