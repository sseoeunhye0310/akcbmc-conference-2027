# 배포 전 체크리스트

- [ ] `wrangler.jsonc`의 `REGISTRATION_FORM_URL`에 실제 Google Form 주소 입력
- [ ] `npm install`
- [ ] `npm run dev`로 홈페이지 확인
- [ ] `/api/health`에서 `ok: true` 확인
- [ ] 신청 버튼이 올바른 Google Form을 여는지 확인
- [ ] `npx wrangler login`
- [ ] `npm run deploy`
- [ ] 필요하면 Cloudflare에서 Custom Domain 연결
