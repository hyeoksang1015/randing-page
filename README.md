# 웹메이트(Webmate) 랜딩페이지

기획부터 디자인, 개발까지 함께하는 웹 제작 파트너 웹메이트의 공식 사이트입니다.
디자인 기준은 `../stitch_webmate_studio_landing_page/`(code.html, DESIGN.md, screen.png) 시안입니다.

- 스택: Next.js 16 App Router(정적 내보내기 `output: "export"`), React 19, TypeScript, Tailwind CSS v4, Vitest
- 글꼴: Pretendard(OFL, `pretendard` 패키지에서 자체 호스팅). 고정폭 라벨은 기기 기본 고정폭 글꼴 → 한글은 Pretendard
- 서버·DB·분석 도구: 없음. 외부 요청 0건

## 실행·검증

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # 문의 폼 검사·메일 주소 생성 단위 테스트
npm run lint
npm run build   # out/ 생성 (postbuild: Windows 빌드 경로 버그 보정 scripts/fix-export.mjs)
npm run e2e     # 헤드리스 Edge 점검: 375/430/768/1440/1920 레이아웃, 링크, 모바일 메뉴, 폼, 상세 페이지, 404, SEO
```

- `SHOTS=폴더 npm run e2e` 로 화면 캡처를 저장할 수 있습니다.
- `npm run e2e -- --og` 는 첫 화면을 캡처해 `public/og-image.png`(공유 미리보기 이미지)를 다시 만듭니다. 그다음 다시 빌드합니다.

## 배포 (Cloudflare Pages)

GitHub `main` 에 푸시하면 Cloudflare Pages 가 자동으로 빌드·배포합니다.

- Build command: `npm run build`, Root directory: 비워 둠
- 출력 폴더는 `wrangler.toml` 의 `pages_build_output_dir = "./out"` 이 정합니다(이 파일을 지우면 첫 화면이 404 가 됩니다).
- Node 버전은 `.node-version`(22)을 따릅니다.
- 환경변수는 `.env.example` 참고. 도메인을 연결하면 `NEXT_PUBLIC_SITE_URL` 을 바꾸고 다시 배포합니다.

## 포트폴리오 추가·교체

`src/data/portfolio.ts` 의 `works` 배열이 홈 카드와 상세 페이지(`/portfolio/<slug>/`)를 함께 만듭니다.

1. 이미지를 `public/portfolio/<slug>/` 에 넣습니다.
   - `thumb.webp`: 카드 썸네일, **1184×512** (카드 이미지 칸 비율 37:16 그대로라 잘리지 않음)
   - `01.webp`, `02.webp` …: 상세 페이지 결과물(원래 비율)
2. `works` 에 항목을 추가합니다. `shots` 에는 각 이미지의 실제 `width`/`height` 와 화면에 보일 최대 폭 `displayWidth` 를 적습니다.
3. 실제 고객사 작업이면 `concept: false` 로 둡니다(CONCEPT 배지·콘셉트 안내가 사라짐).
4. 작업이 4개보다 적으면 남는 칸은 "COMING SOON" 카드로 자동으로 채워집니다(`PORTFOLIO_SLOTS`).

## 문의 기능 현황

- 지금은 **이메일·전화로만** 문의를 받습니다. 폼은 입력값을 검사한 뒤 방문자의 메일 앱 작성 화면(`mailto:`)을 열어 내용을 채워 줍니다.
  사이트는 입력값을 저장하거나 서버로 보내지 않습니다. 메일 앱이 없으면 내용 복사 버튼과 이메일·전화 안내가 나옵니다.
- 자동 접수(서버 전송)를 붙일 때 할 일
  1. 메일 발송 서비스 계정과 API 키 준비(예: Resend. 도메인이 없으면 가입한 본인 주소로만 보낼 수 있음)
  2. `functions/api/contact.ts`(Cloudflare Pages Function)에서 `src/lib/inquiry.ts` 의 `validateInquiry` 로 서버 쪽에서도 검사 → 메일 발송
  3. API 키는 Cloudflare 환경변수(Secret)로만 관리하고 코드·저장소에 넣지 않기
  4. 스팸 방지(Cloudflare Turnstile 또는 허니팟)와 **개인정보 수집·이용 동의** 체크박스, 개인정보 처리방침 추가
