# URANGO (유랑고) — 아웃도어 액티비티 소셜 플랫폼

> **우리랑 Go** — 함께 달리고, 함께 오르고, 함께 성장하는 아웃도어 커뮤니티

---

## 📋 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | URANGO (유랑고) |
| **플랫폼** | iOS & Android 모바일 앱 |
| **개발 기간** | 2026년 3월 ~ 11월 (8.5개월) |
| **예산** | 431,300,000원 (VAT 별도) |
| **팀 규모** | 12명 |
| **문의** | project@urango.com |

---

## 🚴 지원 카테고리

| 카테고리 | 내용 | 제휴 파트너 |
|----------|------|------------|
| 🚴 **Cycle** | 자전거 라이딩 | 자전거 용품점, 로라방, 버스 운송 |
| 🏍️ **Bike** | 오토바이 투어링 | 오토바이 용품점 |
| 🏃 **Run** | 마라톤 & 러닝 | 마라톤 용품점 |
| ⛰️ **Mountain** | 등산 & 트레킹 | 버스 운송, 산악용품점, 산악협회 |

---

## 🛠️ 기술 스택

```
Frontend  : React Native (iOS & Android)
Backend   : Node.js + Express
Main DB   : PostgreSQL
Cache     : Redis
Cloud     : AWS (EC2, RDS, S3)
Maps      : Google Maps API
Real-time : Socket.io
Push      : Firebase Cloud Messaging
Auth      : OAuth 2.0 + JWT
```

### 시스템 아키텍처

```
┌─────────────────────────────────┐
│   Presentation Layer            │
│   React Native App (iOS/Android)│
└──────────────┬──────────────────┘
               │ REST API / WebSocket
┌──────────────▼──────────────────┐
│   Business Logic Layer          │
│   Node.js + Express REST API    │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│   Data Layer                    │
│   PostgreSQL + Redis (Cache)    │
└─────────────────────────────────┘
```

---

## 🎯 주요 기능

### 👑 리더 (Leader)
- 활동 생성: 일정 / 장소 / 난이도 / 인원 설정
- 참가 신청자 승인 및 거부
- 실시간 GPS 위치 공유

### 🙋 팔로워 (Follower)
- 날짜 / 장소 / 난이도 / 인원 필터 검색
- 즉시참여 (Pop Join)
- 활동 참가 신청

### 💬 소셜 기능
- Follow/Follower 시스템
- Direct Message (1:1 채팅)
- 사진첩 (IDC 연동)
- 평가 & 랭킹 시스템
- 위치기반서비스 (LBS)
- 게시판 & 광고/제휴

---

## 📅 개발 일정

```
Phase 1: 기획 & 분석    ████░░░░░░░░  3-4월  (6주)
Phase 2: 디자인          ░░██████░░░░  5-6월  (8주)
Phase 3: 백엔드 개발    ░░░░░░████░░  7-8월  (8주)
Phase 4: 프론트엔드     ░░░░░░░░████  9-10월 (6주)
Phase 5: 테스트          ░░░░░░░░░░██  10월   (2주)
Phase 6: 배포            ░░░░░░░░░░░█  11월   (4주)
```

---

## 👥 팀 구성 (12명)

| 역할 | 인원 | 경력 |
|------|------|------|
| 프로젝트 매니저 | 1명 | 10년+ |
| 기획자 (PO) | 1명 | 7년+ |
| UI/UX 디자이너 | 2명 | 5년+ |
| 백엔드 개발자 | 3명 | 5년+ |
| 프론트엔드 개발자 | 3명 | 4년+ |
| QA 엔지니어 | 2명 | 3년+ |

---

## 💰 예산 요약

| 항목 | 금액 |
|------|------|
| 인건비 합계 | 387,300,000원 |
| 서버 인프라 (연) | 18,000,000원 |
| API 라이선스 (연) | 6,000,000원 |
| 예비비 | 20,000,000원 |
| **총 합계** | **431,300,000원** (VAT 별도) |

**지급 조건**: 계약금 30% → 중도금 40% → 잔금 30%

---

## 🎨 디자인 시스템

```css
--primary:   #028090  /* Teal */
--secondary: #00A896  /* Seafoam */
--accent:    #02C39A  /* Mint */
--dark:      #212121
--light:     #F5F5F5
```

---

## 📁 산출물 목록

```
urango_project/
├── docs/
│   ├── URANGO_RFP.docx              # 제안 요청서
│   ├── URANGO_Proposal.docx         # 사업 제안서
│   └── URANGO_Presentation.pptx     # 발표 자료
├── prototype/
│   ├── urango_prototype.html         # 인터랙티브 프로토타입
│   └── urango_screens.jsx            # React Native 화면 컴포넌트
└── README.md                         # 본 문서
```

---

## ⚡ 성능 & 보안 요구사항

- 앱 로딩: **3초 이내**
- API 응답: **500ms 이하**
- 동시 사용자: **10,000명+**
- 가동률: **99.9%** SLA
- SSL/TLS, OAuth 2.0, JWT, GDPR, 개인정보보호법 준수

---

## 📞 연락처

**URANGO 프로젝트팀**
- Email: project@urango.com
- Tel: 02-1234-5678
- 운영: 평일 09:00–18:00

---

*Version 1.0 · 2026.02.24*
