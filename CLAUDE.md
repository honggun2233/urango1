# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

URANGO는 아웃도어 액티비티(Cycle, Run, Mountain, Golf) 소셜 플랫폼의 **기획·제안 단계 산출물 저장소**다. 실제 앱은 아직 개발 전이며, 현재 저장소는 다음 세 가지로 구성된다.

1. **인터랙티브 HTML 프로토타입** (`prototype/urango_prototype.html`) — 주요 작업 대상
2. **문서 생성 스크립트** (`create_*.js`) — Node.js로 DOCX/PPTX 산출물 생성
3. **산출물** (`docs/`) — 생성된 RFP, 제안서, 발표자료

---

## 명령어

```bash
# 문서 산출물 재생성
npm install          # 최초 1회 (pptxgenjs, docx 설치)
node create_rfp.js          # → docs/URANGO_RFP.docx
node create_proposal.js     # → docs/URANGO_Proposal.docx
node create_pptx.js         # → docs/URANGO_Presentation.pptx

# 프로토타입 열기 (빌드 없음 — 브라우저 직접 실행)
start prototype/urango_prototype.html   # Windows
open prototype/urango_prototype.html    # macOS
```

빌드 도구, 테스트 프레임워크, 린터 없음. 프로토타입은 외부 의존성 없는 순수 HTML/CSS/JS 단일 파일이다.

---

## 프로토타입 아키텍처 (`urango_prototype.html`)

단일 HTML 파일 (~2,300줄)로 모든 화면, 스타일, 데이터, 로직을 포함한다.

### 화면 구조

모든 화면은 `.phone-frame` 내부의 `<div class="screen" id="screen-{name}">` 으로 선언되며, `active` 클래스 유무로 표시/숨김을 제어한다.

| screen ID | 설명 |
|---|---|
| `home` | 카테고리 카드 + 활동 피드 |
| `search` | 키워드 + 카테고리/옵션 필터 |
| `create` | 활동 생성 폼 (Strava 코스 연동 포함) |
| `detail` | 활동 상세 (동적 렌더링) |
| `profile` / `messages` / `chat` / `notify` | 소셜 기능 |
| `golf` → `golf-detail` → `golf-booking` → `golf-confirm` | 골프 예약 4단계 플로우 |
| `strava` → `strava-detail` | Strava 코스 선택 2단계 플로우 |

### 네비게이션

```javascript
goScreen('name')   // 화면 전환 + screenHistory 스택에 push
goBack()           // screenHistory 스택에서 pop → 이전 화면
```

카테고리 카드 onclick은 `goCategory(catName)` 을 호출한다. 이 함수는 파일 하단에서 오버라이드되어 있다:
- `Golf` → `screen-golf` + OpenStreetMap API 조회
- `Cycle` / `Run` → `screen-strava` (탭 자동 전환)
- `Mountain` → `screen-search` (기존 동작)

### 데이터 구조

| 변수 | 위치 | 역할 |
|---|---|---|
| `ACTIVITIES` | JS 상단 | 홈·검색 활동 카드 데이터 (동적 추가 가능) |
| `GOLF_FALLBACK` | JS 중단 | 골프장 로컬 폴백 데이터 |
| `STRAVA_ROUTES` | JS 하단 | Cycle 8개 + Run 7개 코스 mock 데이터 |

### 주요 패턴

**동적 렌더링**: `openDetail()`, `openGolfDetail()`, `openStravaDetail()` 은 전역 상태 변수(`selectedGolfCourse`, `selectedStravaRoute`)에 선택된 객체를 저장하고, `.content` div의 innerHTML을 덮어씌운다.

**폼 자동입력 패턴**: Strava / Golf 상세에서 "활동/예약 만들기" → `selectStravaRoute()` / `openGolfBooking()` 호출 → `create`/`golf-booking` 화면으로 이동하며 폼 값 자동 설정.

**외부 API**: 골프장 목록은 Overpass API(OpenStreetMap) 실시간 조회 후 실패 시 `GOLF_FALLBACK` 사용. Strava는 현재 mock 데이터이며 파일 내 OAuth2 주석에 실제 연동 구조 기술.

### 디자인 토큰 (프로토타입 실제 적용값)

프로토타입의 CSS 변수는 README의 기획 색상과 **다르다**. 실제 적용값:

```css
--accent:  #FF4D00   /* 주요 CTA, 강조 */
--dark:    #111111   /* 헤더 배경, 카드 */
--golf:    #166534   /* 골프 전용 */
/* Strava: #FC4C02 (CSS 변수 아님, 하드코딩) */
```

---

## 문서 생성 스크립트

`create_rfp.js`, `create_proposal.js`, `create_pptx.js` 는 각각 독립 실행형 Node.js 스크립트다. 내부 색상 상수(`PRIMARY`, `SECONDARY`, `ACCENT` 등)는 README 기획 색상(`#028090` 계열)을 사용하며 프로토타입과 별개다.
