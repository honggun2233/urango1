const pptxgen = require("pptxgenjs");

const PRIMARY = "028090";
const SECONDARY = "00A896";
const ACCENT = "02C39A";
const DARK = "212121";
const LIGHT = "F5F5F5";
const WHITE = "FFFFFF";
const GRAY = "64748B";

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "URANGO 아웃도어 소셜 플랫폼";
pres.author = "URANGO 프로젝트팀";

// ─── SLIDE 1: 타이틀 ─────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: PRIMARY };

  // Left accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: ACCENT } });

  // Brand name
  s.addText("URANGO", {
    x: 0.5, y: 0.7, w: 9, h: 1.2,
    fontSize: 72, bold: true, color: WHITE,
    fontFace: "Arial Black", charSpacing: 8, margin: 0
  });

  // 유랑고
  s.addText("유랑고 — 우리랑 Go", {
    x: 0.5, y: 1.9, w: 9, h: 0.5,
    fontSize: 20, color: ACCENT, fontFace: "Calibri", italic: true, margin: 0
  });

  // Tagline
  s.addText("아웃도어 액티비티 소셜 플랫폼", {
    x: 0.5, y: 2.5, w: 6, h: 0.6,
    fontSize: 26, color: WHITE, fontFace: "Calibri Light", margin: 0
  });

  // 4 categories
  const cats = [
    { icon: "🚴", label: "Cycle" },
    { icon: "🏍️", label: "Bike" },
    { icon: "🏃", label: "Run" },
    { icon: "⛰️", label: "Mountain" }
  ];
  cats.forEach((c, i) => {
    const x = 0.5 + i * 2.3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.5, w: 2.1, h: 0.9, fill: { color: SECONDARY }, rectRadius: 0.1 });
    s.addText(c.icon + "  " + c.label, { x, y: 3.5, w: 2.1, h: 0.9, fontSize: 16, bold: true, color: WHITE, align: "center", valign: "middle" });
  });

  // Meta info
  s.addText("개발기간: 8.5개월 (2026.03 – 11)   |   예산: 4.3억원   |   팀: 12명", {
    x: 0.5, y: 4.9, w: 9, h: 0.4,
    fontSize: 12, color: ACCENT, fontFace: "Calibri", margin: 0
  });
}

// ─── SLIDE 2: 프로젝트 개요 ─────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: LIGHT };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: PRIMARY } });
  s.addText("프로젝트 개요", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 26, bold: true, color: WHITE, valign: "middle", margin: 0 });

  const items = [
    { label: "프로젝트명", value: "URANGO (유랑고) — 아웃도어 액티비티 소셜 플랫폼" },
    { label: "플랫폼", value: "iOS & Android 모바일 앱 (React Native)" },
    { label: "개발 기간", value: "2026년 3월 ~ 11월 (8.5개월)" },
    { label: "예산", value: "431,300,000원 (VAT 별도)" },
    { label: "팀 규모", value: "12명 (PM, 기획, 디자인, 백엔드, 프론트, QA)" },
    { label: "핵심 가치", value: "안전성 · 접근성 · 확장성 · 수익성" }
  ];

  items.forEach((item, i) => {
    const y = 1.0 + i * 0.7;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 2.5, h: 0.5, fill: { color: PRIMARY } });
    s.addText(item.label, { x: 0.4, y, w: 2.5, h: 0.5, fontSize: 13, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addShape(pres.shapes.RECTANGLE, { x: 3.0, y, w: 6.6, h: 0.5, fill: { color: WHITE } });
    s.addText(item.value, { x: 3.1, y, w: 6.4, h: 0.5, fontSize: 13, color: DARK, valign: "middle" });
  });
}

// ─── SLIDE 3: 지원 카테고리 ─────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: DARK };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: SECONDARY } });
  s.addText("4대 지원 카테고리", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 26, bold: true, color: WHITE, valign: "middle", margin: 0 });

  const categories = [
    { emoji: "🚴", name: "Cycle", sub: "자전거 라이딩", partners: "자전거 용품점 · 로라방 · 버스 운송" },
    { emoji: "🏍️", name: "Bike", sub: "오토바이 투어링", partners: "오토바이 용품점" },
    { emoji: "🏃", name: "Run", sub: "마라톤 & 러닝", partners: "마라톤 용품점" },
    { emoji: "⛰️", name: "Mountain", sub: "등산 & 트레킹", partners: "버스 운송 · 산악용품점 · 산악협회" }
  ];

  categories.forEach((c, i) => {
    const x = 0.4 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 2.15, h: 4.0,
      fill: { color: i % 2 === 0 ? PRIMARY : SECONDARY },
      shadow: { type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.3 }
    });
    s.addText(c.emoji, { x, y: 1.2, w: 2.15, h: 0.7, fontSize: 36, align: "center" });
    s.addText(c.name, { x, y: 2.0, w: 2.15, h: 0.5, fontSize: 18, bold: true, color: WHITE, align: "center" });
    s.addText(c.sub, { x, y: 2.55, w: 2.15, h: 0.4, fontSize: 12, color: ACCENT, align: "center" });
    s.addText("제휴:\n" + c.partners, { x, y: 3.1, w: 2.15, h: 1.6, fontSize: 11, color: WHITE, align: "center", valign: "top" });
  });
}

// ─── SLIDE 4: 주요 기능 ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: LIGHT };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: PRIMARY } });
  s.addText("주요 기능 명세", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 26, bold: true, color: WHITE, valign: "middle", margin: 0 });

  // Leader column
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 0.9, w: 4.3, h: 0.45, fill: { color: PRIMARY } });
  s.addText("👑  리더 (Leader) 기능", { x: 0.3, y: 0.9, w: 4.3, h: 0.45, fontSize: 14, bold: true, color: WHITE, valign: "middle" });
  const leaderFeatures = ["활동 생성 (일정/장소/난이도/인원 설정)", "참가 신청자 승인 및 거부", "실시간 GPS 위치 공유", "활동 중 참가자 관리"];
  leaderFeatures.forEach((f, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.45 + i * 0.62, w: 4.3, h: 0.52, fill: { color: WHITE } });
    s.addText("▸  " + f, { x: 0.45, y: 1.45 + i * 0.62, w: 4.1, h: 0.52, fontSize: 12, color: DARK, valign: "middle" });
  });

  // Follower column
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.9, w: 4.6, h: 0.45, fill: { color: SECONDARY } });
  s.addText("🙋  팔로워 (Follower) 기능", { x: 5.1, y: 0.9, w: 4.6, h: 0.45, fontSize: 14, bold: true, color: WHITE, valign: "middle" });
  const followerFeatures = ["날짜/장소/난이도/인원 필터 검색", "즉시참여 (Pop Join) 기능", "활동 참가 신청", "리더 팔로우"];
  followerFeatures.forEach((f, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.45 + i * 0.62, w: 4.6, h: 0.52, fill: { color: WHITE } });
    s.addText("▸  " + f, { x: 5.25, y: 1.45 + i * 0.62, w: 4.3, h: 0.52, fontSize: 12, color: DARK, valign: "middle" });
  });

  // Social features row
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.0, w: 9.4, h: 0.45, fill: { color: ACCENT } });
  s.addText("💬  소셜 기능: Follow/Follower · DM · 사진첩 · 평가/랭킹 · LBS · 게시판 · 광고/제휴", {
    x: 0.3, y: 4.0, w: 9.4, h: 0.45, fontSize: 13, bold: true, color: WHITE, valign: "middle"
  });
}

// ─── SLIDE 5: 기술 스택 ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: "0F1D2A" };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: SECONDARY } });
  s.addText("기술 스택 & 아키텍처", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 26, bold: true, color: WHITE, valign: "middle", margin: 0 });

  const stacks = [
    { layer: "Frontend", tech: "React Native", desc: "iOS/Android 동시 개발", color: "61DAFB" },
    { layer: "Backend", tech: "Node.js + Express", desc: "빠른 개발 · 실시간 처리", color: "68A063" },
    { layer: "Database", tech: "PostgreSQL + Redis", desc: "관계형 DB + 고성능 캐시", color: "336791" },
    { layer: "Cloud", tech: "AWS (EC2/RDS/S3)", desc: "안정적 클라우드 인프라", color: "FF9900" },
    { layer: "Real-time", tech: "Socket.io + FCM", desc: "실시간 통신 + 푸시 알림", color: ACCENT },
    { layer: "Maps", tech: "Google Maps API", desc: "위치기반 서비스 (LBS)", color: "4285F4" }
  ];

  stacks.forEach((st, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    const x = 0.3 + col * 4.9;
    const y = 0.95 + row * 1.5;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.3,
      fill: { color: "1A2E3D" },
      shadow: { type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.3 }
    });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.1, h: 1.3, fill: { color: st.color } });
    s.addText(st.layer, { x: x + 0.25, y: y + 0.1, w: 4.1, h: 0.35, fontSize: 11, color: st.color, bold: true, margin: 0 });
    s.addText(st.tech, { x: x + 0.25, y: y + 0.45, w: 4.1, h: 0.4, fontSize: 16, color: WHITE, bold: true, margin: 0 });
    s.addText(st.desc, { x: x + 0.25, y: y + 0.85, w: 4.1, h: 0.35, fontSize: 12, color: GRAY, margin: 0 });
  });
}

// ─── SLIDE 6: 개발 일정 ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: LIGHT };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: PRIMARY } });
  s.addText("개발 일정 (8.5개월)", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 26, bold: true, color: WHITE, valign: "middle", margin: 0 });

  const phases = [
    { phase: "Phase 1", name: "기획 & 분석", months: "3–4월", weeks: "6주", color: "028090", x: 0.3, w: 1.8 },
    { phase: "Phase 2", name: "디자인", months: "5–6월", weeks: "8주", color: "00A896", x: 2.2, w: 2.0 },
    { phase: "Phase 3", name: "백엔드 개발", months: "7–8월", weeks: "8주", color: "02C39A", x: 4.3, w: 2.0 },
    { phase: "Phase 4", name: "프론트엔드", months: "9–10월", weeks: "6주", color: "05BFB2", x: 6.4, w: 1.6 },
    { phase: "Phase 5", name: "테스트", months: "10월", weeks: "2주", color: "0891B2", x: 8.1, w: 0.75 },
    { phase: "Phase 6", name: "배포", months: "11월", weeks: "4주", color: "0E7490", x: 8.95, w: 0.95 }
  ];

  phases.forEach((p) => {
    s.addShape(pres.shapes.RECTANGLE, { x: p.x, y: 1.1, w: p.w, h: 1.6, fill: { color: p.color } });
    s.addText(p.phase, { x: p.x, y: 1.15, w: p.w, h: 0.4, fontSize: 10, color: WHITE, align: "center", bold: true });
    s.addText(p.name, { x: p.x, y: 1.55, w: p.w, h: 0.5, fontSize: 11, color: WHITE, align: "center", bold: true });
    s.addText(p.months, { x: p.x, y: 2.05, w: p.w, h: 0.35, fontSize: 10, color: "CCFFEE", align: "center" });
    s.addText(p.weeks, { x: p.x, y: 2.4, w: p.w, h: 0.25, fontSize: 9, color: "AADDCC", align: "center" });
  });

  // Detail table
  const details = [
    ["Phase", "기간", "주요 작업"],
    ["1. 기획/분석", "3–4월 (6주)", "요구사항 분석, 기획서, 와이어프레임, DB 설계"],
    ["2. 디자인", "5–6월 (8주)", "UI/UX 디자인, 디자인 시스템, 프로토타입"],
    ["3. 백엔드", "7–8월 (8주)", "API 개발, DB 구축, 인증/알림 시스템"],
    ["4. 프론트엔드", "9–10월 (6주)", "앱 화면 개발, 기능 구현, API 연동"],
    ["5. 테스트", "10월 (2주)", "통합 테스트, QA, 버그 수정"],
    ["6. 배포", "11월 (4주)", "앱스토어 배포, 런칭, 모니터링 설정"]
  ];

  s.addTable(details.map((row, ri) => row.map(cell => ({
    text: cell,
    options: { fontSize: 11, color: ri === 0 ? WHITE : DARK, bold: ri === 0, fill: { color: ri === 0 ? PRIMARY : (ri % 2 === 0 ? "E8F5F5" : WHITE) }, valign: "middle" }
  }))), { x: 0.3, y: 2.9, w: 9.4, h: 2.4, rowH: 0.34, border: { pt: 0.5, color: "CCCCCC" } });
}

// ─── SLIDE 7: 팀 구성 & 예산 ────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: LIGHT };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: PRIMARY } });
  s.addText("팀 구성 & 예산", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 26, bold: true, color: WHITE, valign: "middle", margin: 0 });

  // Team
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 0.9, w: 5.1, h: 0.4, fill: { color: SECONDARY } });
  s.addText("👥  팀 구성 (총 12명)", { x: 0.3, y: 0.9, w: 5.1, h: 0.4, fontSize: 14, bold: true, color: WHITE, valign: "middle" });

  const team = [
    ["역할", "인원", "경력"],
    ["프로젝트 매니저", "1명", "10년+"],
    ["기획자 (PO)", "1명", "7년+"],
    ["UI/UX 디자이너", "2명", "5년+"],
    ["백엔드 개발자", "3명", "5년+"],
    ["프론트엔드 개발자", "3명", "4년+"],
    ["QA 엔지니어", "2명", "3년+"]
  ];
  s.addTable(team.map((row, ri) => row.map(cell => ({
    text: cell,
    options: { fontSize: 11, color: ri === 0 ? WHITE : DARK, bold: ri === 0, fill: { color: ri === 0 ? PRIMARY : (ri % 2 === 0 ? "E8F5F5" : WHITE) }, valign: "middle" }
  }))), { x: 0.3, y: 1.35, w: 5.1, h: 2.6, colW: [2.8, 1.0, 1.3], border: { pt: 0.5, color: "CCCCCC" } });

  // Budget
  s.addShape(pres.shapes.RECTANGLE, { x: 5.6, y: 0.9, w: 4.1, h: 0.4, fill: { color: SECONDARY } });
  s.addText("💰  예산 상세", { x: 5.6, y: 0.9, w: 4.1, h: 0.4, fontSize: 14, bold: true, color: WHITE, valign: "middle" });

  const budget = [
    ["항목", "금액"],
    ["프로젝트 관리", "59,500,000원"],
    ["기획 및 분석", "51,000,000원"],
    ["UI/UX 디자인", "44,000,000원"],
    ["백엔드 개발", "90,000,000원"],
    ["프론트엔드 개발", "100,800,000원"],
    ["QA & 테스트", "27,000,000원"],
    ["인프라/배포", "15,000,000원"],
    ["서버 인프라 (연)", "18,000,000원"],
    ["API 라이선스 (연)", "6,000,000원"],
    ["예비비 (5%)", "20,000,000원"]
  ];
  s.addTable(budget.map((row, ri) => row.map(cell => ({
    text: cell,
    options: { fontSize: 10, color: ri === 0 ? WHITE : DARK, bold: ri === 0, fill: { color: ri === 0 ? PRIMARY : (ri % 2 === 0 ? "E8F5F5" : WHITE) }, align: ri > 0 && row.indexOf(cell) === 1 ? "right" : "left", valign: "middle" }
  }))), { x: 5.6, y: 1.35, w: 4.1, h: 3.7, colW: [2.3, 1.8], border: { pt: 0.5, color: "CCCCCC" } });

  // Total
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.15, w: 9.4, h: 0.6, fill: { color: ACCENT } });
  s.addText("총 예산: 431,300,000원 (VAT 별도)   |   계약금 30% · 중도금 40% · 잔금 30%", {
    x: 0.3, y: 4.15, w: 9.4, h: 0.6, fontSize: 15, bold: true, color: WHITE, align: "center", valign: "middle"
  });
}

// ─── SLIDE 8: 성능 & 보안 ────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: "0F1D2A" };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: SECONDARY } });
  s.addText("성능 요구사항 & 보안", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 26, bold: true, color: WHITE, valign: "middle", margin: 0 });

  const cards = [
    { title: "⚡ 앱 로딩", value: "3초 이내", sub: "Cold Start 포함" },
    { title: "🔥 API 응답", value: "500ms 이하", sub: "평균 응답 시간" },
    { title: "👥 동시 사용자", value: "10,000명+", sub: "동시 접속 지원" },
    { title: "✅ 가동률", value: "99.9%", sub: "SLA 보장 Uptime" }
  ];

  cards.forEach((c, i) => {
    const x = 0.3 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 2.15, h: 2.0, fill: { color: "1A2E3D" } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 2.15, h: 0.08, fill: { color: ACCENT } });
    s.addText(c.title, { x, y: 1.15, w: 2.15, h: 0.5, fontSize: 12, color: ACCENT, bold: true, align: "center" });
    s.addText(c.value, { x, y: 1.7, w: 2.15, h: 0.6, fontSize: 20, color: WHITE, bold: true, align: "center" });
    s.addText(c.sub, { x, y: 2.35, w: 2.15, h: 0.4, fontSize: 11, color: GRAY, align: "center" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 3.2, w: 9.4, h: 0.4, fill: { color: PRIMARY } });
  s.addText("🔒  보안 요구사항", { x: 0.3, y: 3.2, w: 9.4, h: 0.4, fontSize: 14, bold: true, color: WHITE, valign: "middle" });

  const secItems = [
    "SSL/TLS 암호화 통신 (HTTPS 강제)",
    "OAuth 2.0 + JWT 인증 체계",
    "bcrypt 비밀번호 해싱",
    "SQL Injection · XSS 방지",
    "개인정보보호법 · GDPR 준수",
    "정기 보안 취약점 점검"
  ];
  secItems.forEach((item, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    s.addText("✓  " + item, { x: 0.4 + col * 4.9, y: 3.75 + row * 0.45, w: 4.6, h: 0.4, fontSize: 12, color: WHITE });
  });
}

// ─── SLIDE 9: 성공 기준 ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: PRIMARY };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: DARK } });
  s.addText("성공 기준 & 향후 계획", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 26, bold: true, color: WHITE, valign: "middle", margin: 0 });

  const successes = [
    "모든 요구사항 구현 완료",
    "성능 목표 달성 (3초 로딩, 500ms API)",
    "보안 검증 통과",
    "테스트 커버리지 80% 이상",
    "정해진 일정 내 런칭",
    "앱스토어 승인 획득"
  ];
  successes.forEach((item, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3 + col * 5.0, y: 0.95 + row * 0.8, w: 4.6, h: 0.6,
      fill: { color: "025A68" } });
    s.addText("✅  " + item, { x: 0.45 + col * 5.0, y: 0.95 + row * 0.8, w: 4.4, h: 0.6, fontSize: 13, color: WHITE, valign: "middle" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 3.4, w: 9.4, h: 0.4, fill: { color: ACCENT } });
  s.addText("🚀  향후 확장 계획", { x: 0.3, y: 3.4, w: 9.4, h: 0.4, fontSize: 14, bold: true, color: WHITE, valign: "middle" });

  const futures = ["캠핑/낚시/서핑 등 카테고리 확장", "AI 기반 활동 추천 시스템", "웨어러블 기기 연동", "프리미엄 멤버십 도입", "국제화 (다국어 지원)", "이벤트/대회 주최 플랫폼"];
  futures.forEach((item, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    s.addText("▸  " + item, { x: 0.4 + col * 5.0, y: 3.95 + row * 0.45, w: 4.7, h: 0.4, fontSize: 12, color: ACCENT });
  });
}

// ─── SLIDE 10: 마무리 ───────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: DARK };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: ACCENT } });
  s.addShape(pres.shapes.RECTANGLE, { x: 9.88, y: 0, w: 0.12, h: 5.625, fill: { color: ACCENT } });

  s.addText("URANGO", { x: 1, y: 0.8, w: 8, h: 1.2, fontSize: 72, bold: true, color: WHITE, fontFace: "Arial Black", charSpacing: 8, align: "center", margin: 0 });
  s.addText("유랑고 — 우리랑 Go", { x: 1, y: 2.1, w: 8, h: 0.5, fontSize: 20, color: ACCENT, italic: true, align: "center" });
  s.addText("함께 달리고, 함께 오르고, 함께 성장하는 아웃도어 커뮤니티", {
    x: 1, y: 2.75, w: 8, h: 0.5, fontSize: 16, color: "AAAAAA", align: "center"
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 2.5, y: 3.6, w: 5, h: 0.6, fill: { color: PRIMARY } });
  s.addText("project@urango.com  |  02-1234-5678", {
    x: 2.5, y: 3.6, w: 5, h: 0.6, fontSize: 14, color: WHITE, align: "center", valign: "middle"
  });

  s.addText("2026.02.24  |  Version 1.0", { x: 1, y: 5.0, w: 8, h: 0.35, fontSize: 11, color: GRAY, align: "center" });
}

pres.writeFile({ fileName: "/home/claude/urango_project/docs/URANGO_Presentation.pptx" })
  .then(() => console.log("✅ PPTX created successfully"))
  .catch(e => console.error("❌ Error:", e));
