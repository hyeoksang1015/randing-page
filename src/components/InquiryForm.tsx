"use client";

import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import { site } from "@/data/site";
import { LIMITS, QUESTIONS, SECTIONS, inquiryPayload, validateInquiry, type Answers, type Question } from "@/lib/inquiry";

const fieldClass =
  "w-full rounded-sm border bg-white px-3.5 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:outline-none sm:text-sm";
const chipClass =
  "inline-flex min-h-11 cursor-pointer items-center rounded-sm border border-neutral-300 bg-white px-4 text-sm text-neutral-700 transition-colors hover:border-neutral-900 peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-neutral-900";

function readAnswers(form: HTMLFormElement): Answers {
  const fd = new FormData(form);
  const a: Answers = {};
  for (const q of QUESTIONS) {
    a[q.id] = q.kind === "many" ? fd.getAll(q.id).map(String) : String(fd.get(q.id) ?? "");
    if (q.kind === "many") a[`${q.id}_note`] = String(fd.get(`${q.id}_note`) ?? "");
  }
  return a;
}

export default function InquiryForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const answers = readAnswers(form);
    const found = validateInquiry(answers);
    if (!form.consent.checked) found.consent = "개인정보 수집·이용에 동의해 주세요.";
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // 숨은 칸이 채워졌으면 자동 입력 봇이다. 보내지 않고 끝낸다.
    if (form.botcheck.checked) return setState("sent");
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(inquiryPayload(site.inquiryKey, answers)),
      });
      const json = await res.json().catch(() => ({}));
      const ok = res.ok && json.success;
      setState(ok ? "sent" : "failed");
      // 긴 폼이 짧은 완료 안내로 바뀌므로 안내가 보이게 맨 위로 올린다.
      if (ok) window.scrollTo({ top: 0 });
    } catch {
      setState("failed");
    }
  }

  const clear = (id: string) => () => errors[id] && setErrors((er) => ({ ...er, [id]: "" }));

  const error = (id: string) =>
    errors[id] && (
      <p id={`q-${id}-error`} className="mt-2 text-xs font-medium text-neutral-900">
        <span aria-hidden="true">! </span>
        {errors[id]}
      </p>
    );

  const tag = (q: Question) => q.required && <span className="font-normal text-neutral-500">(필수)</span>;
  const described = (id: string) => (errors[id] ? `q-${id}-error` : undefined);

  function question(q: Question) {
    const hint = q.hint && <p className="mt-1 text-xs leading-relaxed text-neutral-500">{q.hint}</p>;
    if (q.kind === "one" || q.kind === "many") {
      return (
        <fieldset key={q.id} aria-describedby={described(q.id)} aria-invalid={errors[q.id] ? true : undefined}>
          <legend className="text-sm font-semibold text-neutral-900">
            {q.label} {tag(q)}
          </legend>
          {hint}
          <div className="mt-3 flex flex-wrap gap-2">
            {q.options!.map((o) => (
              <label key={o}>
                <input type={q.kind === "one" ? "radio" : "checkbox"} name={q.id} value={o} onChange={clear(q.id)} className="peer sr-only" />
                <span className={chipClass}>{o}</span>
              </label>
            ))}
          </div>
          {q.kind === "many" && (
            <input
              type="text"
              name={`${q.id}_note`}
              aria-label={`${q.label} 기타`}
              maxLength={LIMITS.note}
              placeholder="기타 · 자세한 내용 (선택)"
              onChange={clear(q.id)}
              className={`${fieldClass} mt-2 border-neutral-300`}
            />
          )}
          {error(q.id)}
        </fieldset>
      );
    }
    const common = {
      id: `q-${q.id}`,
      name: q.id,
      placeholder: q.placeholder,
      autoComplete: q.autoComplete ?? "off",
      onChange: clear(q.id),
      "aria-invalid": errors[q.id] ? true : undefined,
      "aria-describedby": described(q.id),
      className: `${fieldClass} ${errors[q.id] ? "border-neutral-900" : "border-neutral-300"}`,
    };
    return (
      <div key={q.id}>
        <label htmlFor={`q-${q.id}`} className="block text-sm font-semibold text-neutral-900">
          {q.label} {tag(q)}
        </label>
        {hint}
        <div className="mt-2">{q.kind === "long" ? <textarea rows={4} maxLength={LIMITS.long} {...common} /> : <input type="text" maxLength={LIMITS.text} {...common} />}</div>
        {error(q.id)}
      </div>
    );
  }

  if (state === "sent") {
    return (
      <div role="status" className="space-y-4 rounded-sm border border-neutral-900 bg-neutral-50 p-8 text-center sm:p-12">
        <Icon name="check" className="mx-auto size-10 text-neutral-900" />
        <h2 className="text-xl font-bold text-neutral-900">문의서가 접수되었습니다.</h2>
        <p className="text-sm leading-relaxed text-neutral-600">
          보내 주신 내용을 확인한 뒤, 남겨 주신 연락처로 연락드리겠습니다.
          <br />
          급한 일정이면{" "}
          <a href={site.tel} className="font-medium text-neutral-900 underline underline-offset-2 tabular-nums">
            {site.phone}
          </a>
          로 전화 주세요.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-10">
      {SECTIONS.map((s) => (
        <section key={s.no} className="rounded-sm border border-neutral-200 bg-white p-6 sm:p-8">
          <h2 className="mb-6 flex items-baseline gap-3 border-b border-neutral-200 pb-3 text-base font-bold text-neutral-900">
            <span className="font-mono text-xs text-neutral-500">{s.no}</span>
            {s.title}
          </h2>
          <div className="space-y-7">{s.questions.map(question)}</div>
        </section>
      ))}

      {/* 사람에게는 보이지 않는 칸. 자동 입력 봇만 체크한다. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="space-y-4 rounded-sm border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
        <p className="text-xs leading-relaxed text-neutral-600">
          수집 항목: 기업명, 사업장 주소, 이름, 직책, 연락처 · 이용 목적: 프로젝트 상담과 견적 · 보관: 상담이 끝나면 파기합니다. 문의서는 메일 전송 서비스(Web3Forms)를 거쳐 웹메이트 메일로 전달되며, 이 사이트에는 저장되지 않습니다.
        </p>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-neutral-900">
          <input type="checkbox" name="consent" onChange={clear("consent")} aria-describedby={described("consent")} className="size-5 accent-neutral-900" />
          개인정보 수집·이용에 동의합니다. <span className="font-normal text-neutral-500">(필수)</span>
        </label>
        {error("consent")}
        <button
          type="submit"
          disabled={state === "sending"}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-neutral-900 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
        >
          <span>{state === "sending" ? "보내는 중…" : "문의서 보내기"}</span>
          <Icon name="send" className="size-4" />
        </button>
        <div aria-live="polite">
          {state === "failed" && (
            <p role="alert" className="text-sm leading-relaxed text-neutral-900">
              문의서를 보내지 못했습니다. 잠시 후 다시 시도하시거나{" "}
              <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-2">
                {site.email}
              </a>
              ,{" "}
              <a href={site.tel} className="font-medium underline underline-offset-2 tabular-nums">
                {site.phone}
              </a>
              로 연락 주세요. 작성하신 내용은 그대로 남아 있습니다.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
