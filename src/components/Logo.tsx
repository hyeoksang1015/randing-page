import Image from "next/image";

// 시안 로고(W 마크)를 흑백으로 저장한 것 + 워드마크 + STUDIO 배지.
export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* 어두운 푸터에서는 검은 마크가 배경에 묻혀, 시안처럼 글자만 쓴다. */}
      {!dark && <Image src="/logo-mark.png" alt="" width={28} height={28} className="size-7" priority />}
      <span className={`text-lg font-semibold tracking-tight ${dark ? "text-white" : "text-neutral-900"}`}>Webmate</span>
      <span className={`rounded-sm border px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${dark ? "border-neutral-700 text-neutral-400" : "border-neutral-300 text-neutral-500"}`}>Studio</span>
    </span>
  );
}
