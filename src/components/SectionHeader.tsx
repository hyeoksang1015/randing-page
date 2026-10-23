import type { ReactNode } from "react";

// 시안의 섹션 머리: [ LABEL ] + h2 + 설명. split 이면 데스크톱에서 설명이 오른쪽으로 간다.
export default function SectionHeader({ label, title, children, split = false }: { label: string; title: ReactNode; children: ReactNode; split?: boolean }) {
  const head = (
    <div className="space-y-2">
      <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">[ {label} ]</span>
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">{title}</h2>
    </div>
  );
  if (split)
    return (
      <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 md:flex-row md:items-end">
        {head}
        <p className="max-w-md text-sm leading-relaxed text-neutral-600">{children}</p>
      </div>
    );
  return (
    <div className="space-y-2 border-b border-neutral-200 pb-8">
      {head}
      <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">{children}</p>
    </div>
  );
}
