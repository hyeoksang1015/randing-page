// 브라우저 점검: 빌드된 out/ 을 로컬 서버로 띄우고 헤드리스 Edge(또는 Chrome)를 원격 조작해 확인한다.
// 사용법: npm run build && npm run e2e            (화면 캡처는 SHOTS=폴더 를 주면 그 폴더에 저장)
//         npm run e2e -- --og                    (public/og-image.png 를 첫 화면 캡처로 다시 만든다)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, statSync, writeFileSync } from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const OUT = path.resolve("out");
const PORT = 4174, CDP = 9334, BASE = `http://127.0.0.1:${PORT}`;
const SHOTS = process.env.SHOTS;
const WIDTHS = [375, 430, 768, 1440, 1920];
const WORKS = ["greenform", "form-space", "pulse", "flown"];
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".xml": "application/xml", ".txt": "text/plain", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".ico": "image/x-icon" };

if (!existsSync(OUT)) throw new Error("out/ 이 없습니다. 먼저 npm run build 를 실행하세요.");

const server = http.createServer((req, res) => {
  let file = path.join(OUT, decodeURIComponent(new URL(req.url, BASE).pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  const ok = existsSync(file);
  if (!ok) file = path.join(OUT, "404.html");
  res.writeHead(ok ? 200 : 404, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}).listen(PORT);

const browserPath = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
const browser = spawn(browserPath, ["--headless=new", "--hide-scrollbars", `--remote-debugging-port=${CDP}`, `--user-data-dir=${mkdtempSync(path.join(os.tmpdir(), "wm-e2e-"))}`, "about:blank"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const problems = [], external = [], results = [];
const check = (name, pass, detail = "") => { results.push(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  [" + detail + "]" : ""}`); if (process.env.VERBOSE) console.error(results.at(-1)); };

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id) { pending.get(msg.id)?.(msg); return pending.delete(msg.id); }
    if (msg.method === "Runtime.exceptionThrown") problems.push("exception: " + msg.params.exceptionDetails.text);
    if (msg.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(msg.params.type)) problems.push(`console.${msg.params.type}: ` + msg.params.args.map((a) => a.value ?? a.description).join(" "));
    if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") problems.push("log: " + msg.params.entry.text + " " + (msg.params.entry.url ?? ""));
    if (msg.method === "Network.requestWillBeSent") {
      const { url } = msg.params.request;
      if (!["http://127.0.0.1:4174", "about:", "data:", "blob:", "mailto:"].some((p) => url.startsWith(p))) external.push(url);
    }
  };
  // 응답이 없으면 무한정 기다리지 않고 어느 단계에서 멈췄는지 알린다.
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const myId = ++id;
    const timer = setTimeout(() => { pending.delete(myId); reject(new Error(`CDP 응답 없음: ${method}`)); }, 60000);
    pending.set(myId, (msg) => { clearTimeout(timer); resolve(msg); });
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
  return { send, close: () => ws.close() };
}

await sleep(1500);
const root = await connect((await (await fetch(`http://127.0.0.1:${CDP}/json/version`)).json()).webSocketDebuggerUrl);

async function openPage(width, height = 900) {
  const { result } = await root.send("Target.createTarget", { url: "about:blank" });
  const { send, close } = await connect(`ws://127.0.0.1:${CDP}/devtools/page/${result.targetId}`);
  await root.send("Target.activateTarget", { targetId: result.targetId });
  for (const d of ["Runtime", "Log", "Page", "Network"]) await send(d + ".enable");
  const mobile = width < 768;
  const resize = (w, h) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile });
  await resize(width, height);
  const js = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (r.result.exceptionDetails) throw new Error(expression.slice(0, 80) + " -> " + r.result.exceptionDetails.exception?.description);
    return r.result.result.value;
  };
  return {
    send, js, resize,
    close: async () => { close(); await root.send("Target.closeTarget", { targetId: result.targetId }); },
    go: async (url) => { await send("Page.navigate", { url: BASE + url }); await sleep(1000); },
    key: async (key) => { await send("Input.dispatchKeyEvent", { type: "keyDown", key, code: key }); await send("Input.dispatchKeyEvent", { type: "keyUp", key, code: key }); await sleep(150); },
    noOverflow: () => js("document.documentElement.scrollWidth <= window.innerWidth"),
    loadAllImages: () => js(`(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 5000); }))); scrollTo(0, 0); return [...document.images].filter(i => !i.naturalWidth).map(i => i.getAttribute('src')); })()`),
    shot: async (name) => {
      if (!SHOTS) return;
      const h = await js("document.documentElement.scrollHeight");
      const { result: r } = await send("Page.captureScreenshot", { format: "jpeg", quality: 70, clip: { x: 0, y: 0, width, height: h, scale: width > 800 ? 0.5 : 1 }, captureBeyondViewport: true });
      mkdirSync(SHOTS, { recursive: true });
      writeFileSync(path.join(SHOTS, name + ".jpg"), Buffer.from(r.data, "base64"));
    },
  };
}

try {
  // ── 홈: 화면 폭별 레이아웃
  for (const w of WIDTHS) {
    const p = await openPage(w);
    await p.go("/");
    const broken = await p.loadAllImages();
    check(`[${w}] 가로 스크롤 없음`, await p.noOverflow(), String(await p.js("document.documentElement.scrollWidth")));
    check(`[${w}] 이미지 모두 불러옴`, broken.length === 0, broken.join(", "));
    check(`[${w}] h1 하나`, (await p.js("document.querySelectorAll('h1').length")) === 1);
    const clipped = await p.js(`[...document.querySelectorAll('h1,h2,h3,p,a,button,dd,dt,li,span')].filter(e => e.offsetParent && e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflow !== 'visible' && !e.closest('[aria-hidden=true]') && !e.classList.contains('sr-only')).map(e => e.textContent.trim().slice(0, 30))`);
    check(`[${w}] 글자가 잘린 요소 없음`, clipped.length === 0, clipped.join(" | "));
    const navVisible = await p.js("getComputedStyle(document.querySelector('header nav')).display !== 'none'");
    check(`[${w}] 헤더 메뉴 ${w >= 768 ? "데스크톱 표시" : "모바일 버튼"}`, w >= 768 ? navVisible : !navVisible && (await p.js("!!document.querySelector('[aria-controls=mobile-menu]').offsetParent")));
    if (w < 768) {
      const small = await p.js(`[...document.querySelectorAll('header button, main a[class*=min-h], main button, #contact a')].filter(e => e.offsetParent && e.getBoundingClientRect().height < 44 && !e.closest('dd')).map(e => e.textContent.trim().slice(0, 20) + ':' + Math.round(e.getBoundingClientRect().height))`);
      check(`[${w}] 주요 버튼 터치 영역 44px 이상`, small.length === 0, small.join(", "));
    }
    await p.shot(`home-${w}`);
    await p.close();
  }

  // ── 홈: 링크와 기능 (모바일 375)
  const m = await openPage(375);
  await m.go("/");
  const anchors = await m.js(`[...document.querySelectorAll('a[href*="#"]')].map(a => a.getAttribute('href')).filter(h => h.startsWith('#') || h.startsWith('/#'))`);
  const missing = await m.js(`${JSON.stringify(anchors)}.filter(h => !document.getElementById(h.split('#')[1]))`);
  check("모든 #앵커의 대상이 있음", anchors.length > 10 && missing.length === 0, missing.join(", ") || `${anchors.length}개`);
  const tels = await m.js(`[...new Set([...document.querySelectorAll('a[href^="tel:"]')].map(a => a.getAttribute('href')))]`);
  check("전화 링크 tel:01059182043", tels.length === 1 && tels[0] === "tel:01059182043", tels.join(","));
  const mails = await m.js(`[...new Set([...document.querySelectorAll('a[href^="mailto:"]')].map(a => a.getAttribute('href').split('?')[0]))]`);
  check("메일 링크 01059182043k@gmail.com", mails.length === 1 && mails[0] === "mailto:01059182043k@gmail.com", mails.join(","));
  const subject = await m.js(`new URL([...document.querySelectorAll('#contact a[href^="mailto:"]')].find(a => a.href.includes('subject')).href).searchParams.get('subject')`);
  check("이메일 문의 버튼 제목", subject === "[프로젝트 문의] 웹사이트 제작 의뢰", subject);

  // 모바일 메뉴: 열기 → Esc 닫기 → 다시 열고 링크 누르면 닫히고 이동
  const menuBtn = "document.querySelector('[aria-controls=mobile-menu]')";
  await m.js(`${menuBtn}.click()`); await sleep(150);
  check("모바일 메뉴 열림", (await m.js(`${menuBtn}.getAttribute('aria-expanded')`)) === "true" && (await m.js("document.querySelectorAll('#mobile-menu a').length")) === 6);
  const menuInside = await m.js("(() => { const r = document.querySelector('#mobile-menu').getBoundingClientRect(); return r.right <= innerWidth && r.left >= 0 && r.bottom <= innerHeight; })()");
  check("모바일 메뉴가 화면 안에 있음", menuInside);
  await m.key("Escape");
  check("Esc 로 모바일 메뉴 닫힘", !(await m.js("!!document.querySelector('#mobile-menu')")) && (await m.js(`${menuBtn}.getAttribute('aria-expanded')`)) === "false");
  await m.js(`${menuBtn}.click()`); await sleep(150);
  await m.js("[...document.querySelectorAll('#mobile-menu a')].find(a => a.textContent.includes('제작 과정')).click()"); await sleep(2500);
  const procTop = await m.js("Math.round(document.getElementById('process').getBoundingClientRect().top)");
  check("메뉴 링크로 이동 + 메뉴 닫힘", !(await m.js("!!document.querySelector('#mobile-menu')")) && procTop >= 0 && procTop <= 100, `top=${procTop}`);

  // 히어로 버튼
  await m.go("/");
  await m.js("[...document.querySelectorAll('main a')].find(a => a.textContent.includes('포트폴리오 보기')).click()"); await sleep(1200);
  const pfTop = await m.js("Math.round(document.getElementById('portfolio').getBoundingClientRect().top)");
  check("포트폴리오 보기 → 포트폴리오 영역 (헤더에 가리지 않음)", pfTop >= 70 && pfTop <= 100, `top=${pfTop}`);

  // 포트폴리오 카드: 모두 상세 링크, 남는 칸은 준비 중(링크 없음)
  const cards = await m.js(`[...document.querySelectorAll('#portfolio article')].map(a => a.querySelector('a')?.getAttribute('href') ?? null)`);
  check(`포트폴리오 카드 ${WORKS.length}개 + 빈 자리 ${4 - WORKS.length}개`, JSON.stringify(cards) === JSON.stringify([...WORKS.map((s) => `/portfolio/${s}/`), ...Array(4 - WORKS.length).fill(null)]), JSON.stringify(cards));
  const covers = await m.js(`(() => { const c = document.querySelector('#portfolio article'); const a = c.querySelector('a'); const r = c.getBoundingClientRect(); const ar = getComputedStyle(a, '::after'); return ar.position === 'absolute' && ar.content !== 'none'; })()`);
  check("카드 전체가 눌림(늘린 링크)", covers);

  check("홈 문의 영역 → 문의서 페이지 버튼", await m.js("[...document.querySelectorAll('#contact a')].some(a => a.getAttribute('href') === '/inquiry/' && a.textContent.includes('문의서'))"));
  await m.close();

  // ── 문의서 페이지: 화면 폭별 레이아웃
  for (const w of [375, 1440]) {
    const p = await openPage(w);
    await p.go("/inquiry/");
    check(`[${w}] /inquiry/ 가로 스크롤 없음`, await p.noOverflow());
    check(`[${w}] /inquiry/ 질문 7묶음`, (await p.js("document.querySelectorAll('main form section').length")) === 7);
    const small = await p.js(`[...document.querySelectorAll('main form input.peer + span, main form button, main form input[type=text]')].filter(e => e.offsetParent && e.getBoundingClientRect().height < 44).map(e => (e.textContent || e.name).trim().slice(0, 20) + ':' + Math.round(e.getBoundingClientRect().height))`);
    if (w === 375) check("[375] /inquiry/ 선택지·버튼 터치 영역 44px 이상", small.length === 0, small.join(", "));
    await p.shot(`inquiry-${w}`);
    await p.close();
  }

  // ── 문의서: 빈 값 → 오류, 잘못된 연락처 → 오류, 올바른 값 → 전송 (fetch 는 가짜 응답)
  const q = await openPage(375);
  await q.go("/inquiry/");
  check("/inquiry/ 제목·canonical", (await q.js("document.title")).startsWith("프로젝트 문의서") && (await q.js("document.querySelector('link[rel=canonical]').href")).endsWith("/inquiry/"));
  const submit = "document.querySelector('main form button[type=submit]').click()";
  const invalid = "[...document.querySelectorAll('main form [aria-invalid=true]')].map(e => e.name || e.querySelector('input').name)";
  await q.js(submit); await sleep(200);
  const qerrs = await q.js(invalid);
  check("빈 문의서 → 필수 항목 오류", JSON.stringify(qerrs) === JSON.stringify(["company", "name", "contact", "channel", "purpose"]), qerrs.join(","));
  check("첫 오류 칸으로 포커스", (await q.js("document.activeElement?.name")) === "company");
  check("오류 메시지가 칸에 연결됨", await q.js("(() => { const i = document.querySelector('#q-company'); return !!document.getElementById(i.getAttribute('aria-describedby'))?.textContent; })()"));
  check("동의 안 하면 오류", await q.js("document.body.innerText.includes('개인정보 수집·이용에 동의해 주세요')"));
  const fill = (id, v) => q.js(`(() => { const e = document.querySelector('#q-${id}'); const proto = e.tagName === 'TEXTAREA' ? HTMLTextAreaElement : HTMLInputElement; Object.getOwnPropertyDescriptor(proto.prototype, 'value').set.call(e, ${JSON.stringify(v)}); e.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  const pick = (name, v) => q.js(`document.querySelector('input[name=${name}][value="${v}"]').click()`);
  await fill("company", "(주)테스트"); await fill("name", "홍길동"); await fill("contact", "abc");
  await pick("channel", "이메일"); await pick("purpose", "리뉴얼"); await pick("goal", "문의 증가"); await pick("goal", "예약");
  await q.js("document.querySelector('input[name=goal_note]').value = '브랜드 인지도'");
  await q.js("document.querySelector('input[name=consent]').click()");
  await q.js(submit); await sleep(200);
  check("잘못된 연락처 형식 → 오류", JSON.stringify(await q.js(invalid)) === '["contact"]');
  await fill("contact", "client@example.com");
  // 전송 실패 → 안내와 함께 입력값 유지
  await q.js(`window.fetch = async () => new Response(JSON.stringify({ success: false }), { status: 400 })`);
  await q.js(submit); await sleep(400);
  check("전송 실패 → 메일·전화 안내, 입력값 유지", (await q.js("!!document.querySelector('main [role=alert]')?.textContent.includes('보내지 못했습니다')")) && (await q.js("document.querySelector('#q-name').value")) === "홍길동");
  await q.js(`window.fetch = async (url, o) => { window.__sent = { url, body: JSON.parse(o.body) }; return new Response(JSON.stringify({ success: true }), { status: 200 }); }`);
  await q.js(submit); await sleep(400);
  const sent = await q.js("window.__sent");
  check("올바른 값 → Web3Forms 로 전송", sent?.url === "https://api.web3forms.com/submit" && sent.body.subject === "[프로젝트 문의] (주)테스트 홍길동 — 리뉴얼" && sent.body.replyto === "client@example.com" && sent.body["2-2. 핵심 목표"] === "문의 증가, 예약, 기타: 브랜드 인지도" && sent.body["1-2. 사업장 주소"] === "-", JSON.stringify(sent?.body ?? {}).slice(0, 200));
  check("전송 후 접수 완료 화면", await q.js("document.querySelector('main [role=status]')?.textContent.includes('접수되었습니다')"));
  await q.shot("inquiry-sent-375");
  await q.close();

  // ── 포트폴리오 상세
  for (const [i, slug] of WORKS.entries()) {
    for (const w of [375, 1440]) {
      const p = await openPage(w);
      await p.go(`/portfolio/${slug}/`);
      const broken = await p.loadAllImages();
      const n = await p.js("document.querySelectorAll('main figure img').length");
      check(`[${w}] /portfolio/${slug}/ 결과물 이미지 ${n}장 모두 불러옴`, n > 1 && broken.length === 0, broken.join(", "));
      check(`[${w}] /portfolio/${slug}/ 가로 스크롤 없음`, await p.noOverflow());
      if (w === 375) {
        check(`/portfolio/${slug}/ h1·CONCEPT 안내`, (await p.js("document.querySelectorAll('h1').length")) === 1 && (await p.js("document.body.innerText.includes('자체 콘셉트 작업')")));
        const nav = await p.js("[...document.querySelectorAll('nav[aria-label=\"다른 작업\"] a')].map(a => a.getAttribute('href'))");
        const expect = [WORKS[i - 1], WORKS[i + 1]].filter(Boolean).map((s) => `/portfolio/${s}/`);
        check(`/portfolio/${slug}/ 이전·다음 링크`, JSON.stringify(nav) === JSON.stringify(expect), nav.join(","));
        const title = await p.js("document.title");
        if (slug === "flown") check("/portfolio/flown/ 라이브 데모 버튼·백엔드 구성", JSON.stringify(await p.js("[...document.querySelectorAll('main a[target=_blank]')].map(a => a.getAttribute('href'))")) === '["/demo/flown/signup/","/demo/flown/"]' && (await p.js("document.querySelectorAll('#backend-title + * li, [aria-labelledby=backend-title] li').length")) === 4);
        check(`/portfolio/${slug}/ 제목·canonical`, title.endsWith("| 웹메이트(Webmate)") && (await p.js("document.querySelector('link[rel=canonical]').href")).endsWith(`/portfolio/${slug}/`), title);
      }
      await p.shot(`work-${slug}-${w}`);
      if (slug === "pulse" && w === 1440) {
        // 상세 페이지 헤더 메뉴 → 홈의 해당 섹션
        await p.js("[...document.querySelectorAll('header nav a')].find(a => a.textContent === '기술 스택').click()"); await sleep(1500);
        const top = await p.js("Math.round(document.getElementById('tech-stack')?.getBoundingClientRect().top ?? -999)");
        check("상세 → 헤더 '기술 스택' → 홈 #tech-stack", (await p.js("location.pathname + location.hash")) === "/#tech-stack" && top >= 0 && top <= 100, `top=${top}`);
        await p.go(`/portfolio/${slug}/`);
        await p.js("[...document.querySelectorAll('main a')].find(a => a.textContent.includes('포트폴리오 목록')).click()"); await sleep(1500);
        check("상세 → 포트폴리오 목록 → 홈 #portfolio", (await p.js("location.pathname + location.hash")) === "/#portfolio");
      }
      await p.close();
    }
  }

  // ── 직접 주소 접근·새로고침·404·SEO 파일
  const d = await openPage(1440);
  await d.go("/portfolio/form-space/");
  await d.send("Page.reload"); await sleep(1000);
  check("상세 페이지 새로고침", (await d.js("document.querySelector('h1').textContent")).includes("FORM / SPACE"));
  for (const [url, status] of [["/", 200], ["/portfolio/greenform/", 200], ["/portfolio/none/", 404], ["/nope/", 404], ["/inquiry/", 200], ["/sitemap.xml", 200], ["/robots.txt", 200], ["/icon.png", 200], ["/og-image.png", 200], ["/demo/flown/", 200], ["/demo/flown/signup/", 200], ["/demo/flown/dashboard/", 200]]) {
    check(`${url} → ${status}`, (await fetch(BASE + url)).status === status);
  }
  const sitemap = await (await fetch(BASE + "/sitemap.xml")).text();
  check(`sitemap: 홈 + 문의서 + 상세 ${WORKS.length}개`, (sitemap.match(/<loc>/g) ?? []).length === WORKS.length + 2 && sitemap.includes("/inquiry/</loc>") && WORKS.every((s) => sitemap.includes(`/portfolio/${s}/</loc>`)));
  const head = readFileSync(path.join(OUT, "index.html"), "utf8");
  for (const [name, re] of [["lang=ko", /<html lang="ko"/], ["title", /<title>웹메이트\(Webmate\) \| /], ["description", /<meta name="description"/], ["og:image", /property="og:image" content="https?:\/\/[^"]+\/og-image\.png"/], ["canonical", /rel="canonical"/], ["icon", /rel="icon"/], ["JSON-LD", /application\/ld\+json/]]) check(`head: ${name}`, re.test(head));

  if (process.argv.includes("--og")) {
    const o = await openPage(1200, 630);
    await o.go("/");
    await sleep(500);
    const { result: r } = await o.send("Page.captureScreenshot", { format: "png" });
    writeFileSync("public/og-image.png", Buffer.from(r.data, "base64"));
    results.push("INFO  public/og-image.png 를 새로 만들었습니다 (npm run build 후 반영)");
  }
} finally {
  check("콘솔 오류·경고 없음", problems.length === 0, [...new Set(problems)].slice(0, 5).join(" | "));
  check("외부 요청 없음(글꼴·이미지 모두 자체 호스팅)", external.length === 0, [...new Set(external)].slice(0, 5).join(", "));
  console.log(results.join("\n"));
  const failed = results.filter((r) => r.startsWith("FAIL")).length;
  console.log(`\n${results.filter((r) => r.startsWith("PASS")).length}/${results.filter((r) => !r.startsWith("INFO")).length} 통과`);
  browser.kill();
  server.close();
  process.exitCode = failed ? 1 : 0;
}
