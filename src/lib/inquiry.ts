// 문의 폼: 입력값 검사와 메일 앱 작성 화면(mailto:) 주소 만들기.
// 사이트는 입력값을 저장하거나 서버로 보내지 않는다. 메일은 방문자가 자기 메일 앱에서 직접 보낸다.
export const INQUIRY_TYPES = [
  "브랜드 공식 홈페이지 제작",
  "반응형 원페이지 랜딩페이지",
  "웹 퍼블리싱 및 UI/UX 개선",
  "풀스택 맞춤형 웹 서비스 개발",
  "기타 웹 프로젝트 상담",
] as const;

export type Inquiry = { name: string; contact: string; type: string; message: string };
export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export const LIMITS = { name: 50, contact: 100, message: 1500 };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// 010-1234-5678, 02 123 4567, +82 10-1234-5678 처럼 숫자 9~12자리(구분자 허용)
const PHONE = /^\+?[\d\s-]{9,16}$/;

export function isContact(value: string) {
  const v = value.trim();
  if (EMAIL.test(v)) return true;
  const digits = v.replace(/\D/g, "");
  return PHONE.test(v) && digits.length >= 9 && digits.length <= 12;
}

export function validateInquiry(i: Inquiry): InquiryErrors {
  const e: InquiryErrors = {};
  const name = i.name.trim();
  const message = i.message.trim();
  if (!name) e.name = "성함 또는 기업명을 입력해 주세요.";
  else if (name.length > LIMITS.name) e.name = `${LIMITS.name}자 이내로 입력해 주세요.`;
  if (!i.contact.trim()) e.contact = "회신받을 연락처 또는 이메일을 입력해 주세요.";
  else if (i.contact.length > LIMITS.contact || !isContact(i.contact)) e.contact = "전화번호(예: 010-0000-0000) 또는 이메일 형식으로 입력해 주세요.";
  if (!(INQUIRY_TYPES as readonly string[]).includes(i.type)) e.type = "문의 유형을 선택해 주세요.";
  if (message.length < 5) e.message = "프로젝트 개요나 요청 사항을 5자 이상 적어 주세요.";
  else if (message.length > LIMITS.message) e.message = `${LIMITS.message}자 이내로 적어 주세요.`;
  return e;
}

export function inquirySubject(i: Inquiry) {
  return `[프로젝트 문의] ${i.type} - ${i.name.trim()}`;
}

export function inquiryBody(i: Inquiry) {
  return [`성함/기업명: ${i.name.trim()}`, `연락처: ${i.contact.trim()}`, `문의 유형: ${i.type}`, "", "프로젝트 개요 및 요청 사항:", i.message.trim()].join("\r\n");
}

export function inquiryMailto(to: string, i: Inquiry) {
  return `mailto:${to}?subject=${encodeURIComponent(inquirySubject(i))}&body=${encodeURIComponent(inquiryBody(i))}`;
}
