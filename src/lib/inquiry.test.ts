import { describe, expect, it } from "vitest";
import { inquiryFields, inquiryPayload, isContact, validateInquiry, type Answers } from "./inquiry";

const ok: Answers = { company: "(주)파트너스", name: "홍길동", contact: "010-1234-5678", channel: "전화", purpose: "신규 제작" };

describe("validateInquiry", () => {
  it("필수 항목만 채워도 통과한다", () => expect(validateInquiry(ok)).toEqual({}));

  it("빈 필수 항목마다 오류를 낸다", () => {
    expect(Object.keys(validateInquiry({ company: " " })).sort()).toEqual(["channel", "company", "contact", "name", "purpose"]);
  });

  it("목록에 없는 선택지와 너무 긴 답을 막는다", () => {
    expect(validateInquiry({ ...ok, channel: "<script>" }).channel).toBeTruthy();
    expect(validateInquiry({ ...ok, goal: ["문의 증가", "해킹"] }).goal).toBeTruthy();
    expect(validateInquiry({ ...ok, references: "가".repeat(1501) }).references).toBeTruthy();
    expect(validateInquiry({ ...ok, goal_note: "가".repeat(201) }).goal).toBeTruthy();
  });

  it("연락처 형식을 검사한다", () => expect(validateInquiry({ ...ok, contact: "abc" }).contact).toBeTruthy());
});

describe("isContact", () => {
  it.each(["010-1234-5678", "01012345678", "02 123 4567", "+82 10-1234-5678", "name@company.com"])("%s 는 연락처다", (v) => expect(isContact(v)).toBe(true));
  it.each(["1234", "abc", "name@", "010-1234-5678-9999-1", "전화주세요"])("%s 는 연락처가 아니다", (v) => expect(isContact(v)).toBe(false));
});

describe("메일 내용", () => {
  it("질문 순서대로 번호를 붙이고, 여러 개 고르기는 기타와 함께 잇는다", () => {
    const f = inquiryFields({ ...ok, goal: ["문의 증가", "예약"], goal_note: "브랜드 인지도" });
    const keys = Object.keys(f);
    expect(keys[0]).toBe("1-1. 기업명");
    expect(keys.at(-1)).toBe("7-2. 생각하신 예산 범위가 있으신가요?");
    expect(f["2-2. 핵심 목표"]).toBe("문의 증가, 예약, 기타: 브랜드 인지도");
    expect(f["1-2. 사업장 주소"]).toBe("-");
  });

  it("연락처가 이메일일 때만 답장 주소를 넣는다", () => {
    expect(inquiryPayload("k", ok)).not.toHaveProperty("replyto");
    expect(inquiryPayload("k", { ...ok, contact: "a@b.co" }).replyto).toBe("a@b.co");
    expect(inquiryPayload("k", ok).subject).toBe("[프로젝트 문의] (주)파트너스 홍길동 — 신규 제작");
  });
});
