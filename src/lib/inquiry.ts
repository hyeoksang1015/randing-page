// 프로젝트 문의서: 질문 목록, 입력값 검사, 메일로 보낼 내용 만들기.
// 사이트는 입력값을 저장하지 않는다. 보내기를 누르면 Web3Forms 가 웹메이트 메일로 전달한다.
export type Question = {
  id: string;
  label: string;
  hint?: string;
  /** text: 한 줄, long: 여러 줄, one: 하나 고르기, many: 여러 개 고르기(+ 기타 칸) */
  kind: "text" | "long" | "one" | "many";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
};

export type Section = { no: string; title: string; questions: Question[] };

export const SECTIONS: Section[] = [
  {
    no: "01",
    title: "기본 정보",
    questions: [
      { id: "company", label: "기업명", kind: "text", required: true, placeholder: "개인이시면 '개인'이라고 적어 주세요", autoComplete: "organization" },
      { id: "address", label: "사업장 주소", kind: "text", placeholder: "예: 서울시 강남구", autoComplete: "street-address" },
      { id: "name", label: "이름", kind: "text", required: true, autoComplete: "name" },
      { id: "position", label: "직책", kind: "text", placeholder: "예: 대표, 마케팅 팀장", autoComplete: "organization-title" },
      { id: "contact", label: "연락처", kind: "text", required: true, placeholder: "010-0000-0000 또는 이메일 주소", autoComplete: "tel" },
      { id: "channel", label: "선호 소통 채널", kind: "one", required: true, options: ["전화", "문자", "이메일", "카카오톡"] },
    ],
  },
  {
    no: "02",
    title: "홈페이지 목적",
    questions: [
      { id: "purpose", label: "제작 목적", hint: "신규 제작 / 리뉴얼 / 기능 추가 중 어떤 것인가요?", kind: "one", required: true, options: ["신규 제작", "리뉴얼", "기능 추가"] },
      { id: "goal", label: "핵심 목표", hint: "홈페이지로 달성하고 싶은 것은 무엇인가요?", kind: "many", options: ["문의 증가", "신뢰도 향상", "판매", "예약"] },
      { id: "target", label: "타겟 고객 연령층", hint: "주요 고객의 연령층을 골라 주세요.", kind: "many", options: ["10대", "20대", "30대", "40대", "50대 이상", "전 연령"] },
    ],
  },
  {
    no: "03",
    title: "필요한 페이지와 기능",
    questions: [
      { id: "pages", label: "필요 페이지", kind: "many", options: ["메인 페이지", "회사소개", "서비스", "포트폴리오", "문의"] },
      { id: "features", label: "필수 기능", kind: "many", options: ["문의폼", "로그인", "결제", "예약", "게시판", "관리자 페이지"] },
    ],
  },
  {
    no: "04",
    title: "디자인 방향",
    questions: [
      { id: "references", label: "레퍼런스 사이트", hint: "원하는 방향의 사이트 URL 2~3개와 이유를 적어 주세요. 없으셔도 괜찮습니다. 상담하면서 함께 찾아가면 됩니다!", kind: "long", placeholder: "https://... — 깔끔한 메인 화면 구성이 좋아서" },
      { id: "mood", label: "분위기 키워드", kind: "many", options: ["미니멀", "따뜻한", "활기찬", "고급스러움"] },
    ],
  },
  {
    no: "05",
    title: "브랜드 자료와 콘텐츠",
    questions: [
      { id: "logo", label: "브랜드 로고가 있으신가요?", kind: "one", options: ["있음", "없음"] },
      { id: "vector", label: "확대해도 깨지지 않는 AI, SVG 같은 벡터 파일을 보유 중이신가요?", kind: "one", options: ["있음", "없음", "잘 모르겠음"] },
      { id: "copy", label: "원하는 카피가 있으신가요?", hint: "카피 작성을 원하시면 추가 금액이 발생합니다.", kind: "one", options: ["준비된 카피 있음", "카피 작성 요청"] },
      { id: "media", label: "이미지 및 영상이 있으신가요?", kind: "one", options: ["있음", "일부 있음", "없음"] },
    ],
  },
  {
    no: "06",
    title: "도메인 및 호스팅",
    questions: [
      { id: "hosting", label: "도메인, 호스팅, 기존 사이트가 있으신가요?", kind: "many", options: ["도메인 있음", "호스팅 있음", "기존 사이트 있음", "모두 없음"] },
    ],
  },
  {
    no: "07",
    title: "일정 및 예산",
    questions: [
      { id: "deadline", label: "원하시는 마감일이 있으신가요?", kind: "text", placeholder: "예: 12월 말, 2027년 1월 중순" },
      { id: "budget", label: "생각하신 예산 범위가 있으신가요?", kind: "text", placeholder: "예: 300만 원 내외" },
    ],
  },
];

export const QUESTIONS = SECTIONS.flatMap((s) => s.questions);

/** 한 줄·여러 줄·하나 고르기는 문자열, 여러 개 고르기는 고른 항목 목록. 기타 칸은 `<id>_note` 에 담는다. */
export type Answers = Record<string, string | string[]>;

export const LIMITS = { text: 100, long: 1500, note: 200 };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// 010-1234-5678, 02 123 4567, +82 10-1234-5678 처럼 숫자 9~12자리(구분자 허용)
const PHONE = /^\+?[\d\s-]{9,16}$/;

export function isContact(value: string) {
  const v = value.trim();
  if (EMAIL.test(v)) return true;
  const digits = v.replace(/\D/g, "");
  return PHONE.test(v) && digits.length >= 9 && digits.length <= 12;
}

const str = (v: Answers[string] | undefined) => (typeof v === "string" ? v.trim() : "");
const list = (v: Answers[string] | undefined) => (Array.isArray(v) ? v : []);

export function validateInquiry(a: Answers): Record<string, string> {
  const e: Record<string, string> = {};
  for (const q of QUESTIONS) {
    const v = a[q.id];
    if (q.kind === "many") {
      if (list(v).some((o) => !q.options!.includes(o))) e[q.id] = "목록에 있는 항목만 골라 주세요.";
      else if (str(a[`${q.id}_note`]).length > LIMITS.note) e[q.id] = `기타 내용은 ${LIMITS.note}자 이내로 적어 주세요.`;
      continue;
    }
    const s = str(v);
    if (!s) {
      if (q.required) e[q.id] = q.kind === "one" ? `${q.label}을(를) 골라 주세요.` : `${q.label}을(를) 입력해 주세요.`;
    } else if (q.kind === "one" && !q.options!.includes(s)) e[q.id] = "목록에 있는 항목을 골라 주세요.";
    else if (s.length > LIMITS[q.kind === "long" ? "long" : "text"]) e[q.id] = `${LIMITS[q.kind === "long" ? "long" : "text"]}자 이내로 입력해 주세요.`;
  }
  if (!e.contact && !isContact(str(a.contact))) e.contact = "전화번호(예: 010-0000-0000) 또는 이메일 형식으로 입력해 주세요.";
  return e;
}

/** 메일에 들어갈 항목. "1-1. 기업명": "값" 처럼 질문 순서대로, 빈 답은 "-" 로 둔다. */
export function inquiryFields(a: Answers): Record<string, string> {
  const out: Record<string, string> = {};
  SECTIONS.forEach((s, si) =>
    s.questions.forEach((q, qi) => {
      const note = str(a[`${q.id}_note`]);
      const value = q.kind === "many" ? [...list(a[q.id]), ...(note ? [`기타: ${note}`] : [])].join(", ") : str(a[q.id]);
      out[`${si + 1}-${qi + 1}. ${q.label}`] = value || "-";
    }),
  );
  return out;
}

export function inquirySubject(a: Answers) {
  return `[프로젝트 문의] ${str(a.company)} ${str(a.name)} — ${str(a.purpose)}`;
}

/** Web3Forms 로 보낼 내용. 연락처가 이메일이면 메일 답장 주소로도 넣는다. */
export function inquiryPayload(accessKey: string, a: Answers) {
  const contact = str(a.contact);
  return {
    access_key: accessKey,
    subject: inquirySubject(a),
    from_name: "웹메이트 문의서",
    ...(EMAIL.test(contact) ? { replyto: contact } : {}),
    ...inquiryFields(a),
  };
}
