"use client";

import { useRef, useState, type FormEvent } from "react";
import Icon from "./Icon";
import { site } from "@/data/site";
import { INQUIRY_TYPES, LIMITS, inquiryBody, inquiryMailto, validateInquiry, type Inquiry, type InquiryErrors } from "@/lib/inquiry";

const empty: Inquiry = { name: "", contact: "", type: INQUIRY_TYPES[0], message: "" };
const fieldClass =
  "w-full rounded-sm border bg-white px-3.5 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:outline-none sm:text-xs";

export default function InquiryForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [sent, setSent] = useState<Inquiry | null>(null);
  const [copied, setCopied] = useState<"idle" | "done" | "fail">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof Inquiry) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateInquiry(values);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Inquiry)[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSent(values);
    setCopied("idle");
    window.location.href = inquiryMailto(site.email, values);
  }

  async function copy() {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(`받는 사람: ${site.email}\r\n\r\n${inquiryBody(sent)}`);
      setCopied("done");
    } catch {
      setCopied("fail");
    }
  }

  const field = (k: keyof Inquiry) => ({
    id: `inquiry-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `inquiry-${k}-error` : undefined,
    className: `${fieldClass} ${errors[k] ? "border-neutral-900" : "border-neutral-300"}`,
  });

  const error = (k: keyof Inquiry) =>
    errors[k] && (
      <p id={`inquiry-${k}-error`} className="mt-1.5 text-xs font-medium text-neutral-900">
        <span aria-hidden="true">! </span>
        {errors[k]}
      </p>
    );

  const label = (k: keyof Inquiry, text: string) => (
    <label htmlFor={`inquiry-${k}`} className="mb-1.5 block text-xs font-medium text-neutral-700">
      {text} <span className="text-neutral-500">(필수)</span>
    </label>
  );

  return (
    <div className="rounded-sm border border-neutral-200 bg-neutral-50 p-6 sm:p-8 lg:col-span-6">
      <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3">
        <span className="font-mono text-xs font-semibold uppercase text-neutral-900">Quick Inquiry</span>
        <span className="font-mono text-[11px] text-neutral-500">VIA EMAIL</span>
      </div>
      <p className="mb-6 rounded-sm border border-neutral-200 bg-white px-3.5 py-2.5 text-xs leading-relaxed text-neutral-600">
        온라인 자동 접수는 준비 중입니다. 아래 내용을 작성하고 버튼을 누르면 메일 앱에 내용이 채워지고, 그대로 보내시면 웹메이트에 전달됩니다.
      </p>
      <form ref={formRef} className="space-y-4" noValidate onSubmit={onSubmit}>
        <div>
          {label("name", "성함 또는 기업명")}
          <input type="text" autoComplete="name" maxLength={LIMITS.name} placeholder="예: 홍길동 / (주)파트너스" {...field("name")} />
          {error("name")}
        </div>
        <div>
          {label("contact", "연락처 또는 이메일")}
          <input type="text" autoComplete="email" maxLength={LIMITS.contact} placeholder="010-0000-0000 / 이메일 주소" {...field("contact")} />
          {error("contact")}
        </div>
        <div>
          {label("type", "문의 유형")}
          <select {...field("type")}>
            {INQUIRY_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {error("type")}
        </div>
        <div>
          {label("message", "프로젝트 개요 및 요청 사항")}
          <textarea rows={4} maxLength={LIMITS.message} placeholder="구상 중이신 사이트 목적이나 참고할 레퍼런스 사이트 링크를 편하게 적어주세요." {...field("message")} />
          {error("message")}
        </div>
        <button type="submit" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-neutral-900 py-3 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-neutral-800">
          <span>메일로 문의 내용 보내기</span>
          <Icon name="send" className="size-4" />
        </button>
        <div aria-live="polite">
          {sent && (
            <div className="space-y-2 rounded-sm border border-neutral-300 bg-white p-4 text-xs leading-relaxed text-neutral-700">
              <p className="font-semibold text-neutral-900">메일 앱에서 내용을 확인한 뒤 [보내기]를 눌러 주세요.</p>
              <p>
                메일 앱이 열리지 않으면 내용을 복사해{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-neutral-900 underline underline-offset-2">
                  {site.email}
                </a>
                로 보내 주시거나,{" "}
                <a href={site.tel} className="font-medium text-neutral-900 underline underline-offset-2 tabular-nums">
                  {site.phone}
                </a>
                로 연락 주세요.
              </p>
              <button type="button" onClick={copy} className="inline-flex min-h-11 items-center rounded-sm border border-neutral-300 px-4 font-medium text-neutral-900 hover:bg-neutral-50">
                {copied === "done" ? "복사했습니다" : "문의 내용 복사"}
              </button>
              {copied === "fail" && <p>복사하지 못했습니다. 위 이메일 주소로 직접 보내 주세요.</p>}
            </div>
          )}
        </div>
        <p className="text-center text-[11px] leading-relaxed text-neutral-500">
          * 입력하신 내용은 사이트에 저장되지 않으며, 보내 주신 메일은 프로젝트 견적과 상담 목적으로만 사용합니다.
        </p>
      </form>
    </div>
  );
}
