import { describe, expect, it } from "vitest";
import { INQUIRY_TYPES, inquiryMailto, isContact, validateInquiry, type Inquiry } from "./inquiry";

const ok: Inquiry = { name: "홍길동", contact: "010-1234-5678", type: INQUIRY_TYPES[0], message: "회사 소개 홈페이지를 만들고 싶습니다." };

describe("validateInquiry", () => {
  it("올바른 입력은 오류가 없다", () => expect(validateInquiry(ok)).toEqual({}));

  it("빈 필수 항목마다 오류를 낸다", () => {
    const e = validateInquiry({ name: " ", contact: "", type: "", message: "" });
    expect(Object.keys(e).sort()).toEqual(["contact", "message", "name", "type"]);
  });

  it("목록에 없는 문의 유형과 너무 긴 내용을 막는다", () => {
    expect(validateInquiry({ ...ok, type: "<script>" }).type).toBeTruthy();
    expect(validateInquiry({ ...ok, message: "가".repeat(1501) }).message).toBeTruthy();
  });
});

describe("isContact", () => {
  it.each(["010-1234-5678", "01012345678", "02 123 4567", "+82 10-1234-5678", "name@company.com"])("%s 는 연락처다", (v) => expect(isContact(v)).toBe(true));
  it.each(["1234", "abc", "name@", "010-1234-5678-9999-1", "전화주세요"])("%s 는 연락처가 아니다", (v) => expect(isContact(v)).toBe(false));
});

describe("inquiryMailto", () => {
  it("받는 사람과 제목·본문을 인코딩해 담는다", () => {
    const url = new URL(inquiryMailto("01059182043k@gmail.com", { ...ok, message: "A&B=1?\n둘째 줄" }));
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe("01059182043k@gmail.com");
    expect(url.searchParams.get("subject")).toBe(`[프로젝트 문의] ${INQUIRY_TYPES[0]} - 홍길동`);
    const body = url.searchParams.get("body")!;
    expect(body).toContain("연락처: 010-1234-5678");
    expect(body).toContain("A&B=1?\n둘째 줄");
  });
});
