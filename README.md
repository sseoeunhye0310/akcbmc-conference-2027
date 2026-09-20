# 제6차 아시아한인 CBMC 대회 — Cloudflare Workers 배포본

기존 단일 HTML 홈페이지를 Cloudflare Workers + Static Assets 구조로 정리한 프로젝트입니다.

## 구조

```text
akcbmc-cloudflare-workers/
├─ public/
│  ├─ index.html
│  └─ assets/
│     ├─ styles.css
│     ├─ app.js
│     └─ akcbmc-logo.png
├─ src/
│  └─ index.js
├─ wrangler.jsonc
├─ package.json
├─ .gitignore
└─ README.md
```

## 현재 구성

- `public/`: Cloudflare Workers Static Assets로 배포되는 정적 파일
- `src/index.js`: Worker API
  - `GET /api/health`: 배포 상태 확인
  - `GET /api/config`: 클라이언트에 공개 가능한 사이트 설정 전달
- `REGISTRATION_FORM_URL`: `wrangler.jsonc`의 변수로 관리
- 현재 신청 데이터는 Google Form에 저장되므로 D1은 사용하지 않음

## 1. Node.js 설치 확인

터미널에서 아래 명령을 실행합니다.

```bash
node -v
npm -v
```

## 2. 의존성 설치

```bash
npm install
```

## 3. Google Form 주소 설정

`wrangler.jsonc`에서 다음 값을 실제 주소로 바꿉니다.

```jsonc
"vars": {
  "REGISTRATION_FORM_URL": "https://docs.google.com/forms/..."
}
```

이 값은 비밀번호 같은 비밀정보가 아니라 홈페이지 방문자가 실제로 이동하는 공개 링크입니다.

## 4. 로컬 실행

```bash
npm run dev
```

Wrangler가 알려주는 로컬 주소를 브라우저에서 엽니다.

API 확인:

```text
/api/health
/api/config
```

## 5. Cloudflare 로그인

```bash
npx wrangler login
```

브라우저에서 Cloudflare 권한을 승인합니다.

## 6. 배포

```bash
npm run deploy
```

배포 후 `*.workers.dev` 주소가 생성됩니다.

## 7. GitHub 자동 배포

Cloudflare 대시보드에서 Workers & Pages → 해당 Worker → Settings/Builds에서 GitHub 저장소를 연결하면 push 시 자동 배포하도록 구성할 수 있습니다.

일반적인 빌드 설정은 별도 프레임워크가 없으므로 단순합니다. 정적 파일은 `public/`, Worker 엔트리는 `src/index.js`이며 Wrangler 설정은 `wrangler.jsonc`가 기준입니다.

## D1을 나중에 붙이고 싶을 때

현재 프로젝트는 Google Form을 사용하므로 DB가 필요하지 않습니다. 향후 홈페이지 안에서 신청서를 직접 받고 관리자 화면을 만들 경우 D1을 추가하는 것이 적합합니다.

예시:

```bash
npx wrangler d1 create akcbmc-conference-db --binding DB --update-config
```

그 다음 migration 파일을 만든 뒤 적용합니다.

```bash
npx wrangler d1 migrations create akcbmc-conference-db init
npx wrangler d1 migrations apply akcbmc-conference-db --local
npx wrangler d1 migrations apply akcbmc-conference-db --remote
```

개인정보를 직접 저장하게 된다면 접근 제어, 관리자 인증, 개인정보 처리방침 및 보존/삭제 정책을 함께 설계하는 것을 권장합니다.
