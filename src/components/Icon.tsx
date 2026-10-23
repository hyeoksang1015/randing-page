// 시안의 Material Symbols 아이콘 폰트 대신, 쓰는 아이콘만 선으로 그린 인라인 SVG(폰트 내려받기 없음).
const paths = {
  arrowOutward: "M7 17 17 7M8 7h9v9",
  arrowDown: "M12 4v16M6 14l6 6 6-6",
  tree: "M3 3h6v6H3zM15 3h6v6h-6zM15 15h6v6h-6zM9 6h6M6 9v9h9",
  palette: "M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-.9-.7-1.3-.7-2.1 0-.9.7-1.6 1.6-1.6H17a4 4 0 0 0 4-4c0-4.9-4-8.7-9-8.7ZM7.5 11.5h.01M9.5 7.5h.01M14.5 7.5h.01M17 11.5h.01",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5",
  dns: "M4 4h16v7H4zM4 13h16v7H4zM8 7.5h.01M8 16.5h.01",
  mail: "M3.5 5.5h17v13h-17zM3.5 7l8.5 6 8.5-6",
  call: "M5 4h3.2l1.6 4.4-2.1 1.3a11 11 0 0 0 6.6 6.6l1.3-2.1L20 15.8V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z",
  send: "M4 4.5 20.5 12 4 19.5l2.6-7.5L4 4.5ZM6.6 12H12",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, className = "size-4" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}
