# 배포 체크리스트 ✅

momwatching.com 배포를 위한 단계별 체크리스트

---

## ✅ 사전 준비 완료

- [x] Git repository 초기화
- [x] .gitignore 설정 (.env* 파일 제외 확인)
- [x] package.json 확인 (빌드 스크립트 포함)
- [x] next.config.ts 확인
- [x] Initial commit 완료
- [x] 배포 가이드 문서 작성

**현재 상태:**
- Repository: `/home/zeah/.openclaw/workspace/school-ranking-site`
- Git branch: `master` (또는 `main`으로 변경 예정)
- Commits: 2개
  - Initial commit: School ranking website
  - Add deployment guides

---

## 📝 다음 단계 (박사님이 수행)

### 1️⃣ GitHub Repository 생성 (5분)

- [ ] https://github.com 로그인
- [ ] New repository 생성
  - [ ] Repository name: `momwatching`
  - [ ] Visibility: **Public** ✓
  - [ ] README, .gitignore 체크 안 함
- [ ] Create repository 클릭
- [ ] GitHub 사용자명 확인: `__________`

### 2️⃣ GitHub에 코드 Push (3분)

터미널에서 실행:

```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site

# YOUR_USERNAME을 실제 GitHub 사용자명으로 변경
git remote add origin https://github.com/YOUR_USERNAME/momwatching.git

# main 브랜치로 변경 (GitHub 표준)
git branch -M main

# Push
git push -u origin main
```

**인증:**
- [ ] Username: GitHub 사용자명
- [ ] Password: Personal Access Token 사용
  - [ ] (필요시) GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - [ ] 권한: `repo` 전체 체크

**확인:**
- [ ] GitHub repository 페이지에서 모든 파일 확인
- [ ] deployment-guide.md 파일 존재 확인

### 3️⃣ Vercel 배포 (5분)

- [ ] https://vercel.com 방문
- [ ] "Continue with GitHub" 로그인
- [ ] Vercel이 GitHub 접근 권한 요청 → Authorize
- [ ] "New Project" 클릭
- [ ] `momwatching` repository 찾아서 "Import" 클릭
- [ ] 설정 확인:
  - [ ] Framework: Next.js 자동 감지
  - [ ] Root Directory: ./
  - [ ] Build Command: npm run build
  - [ ] Output Directory: .next
- [ ] "Deploy" 버튼 클릭
- [ ] 빌드 완료 대기 (1-3분)
- [ ] "Congratulations!" 화면 확인

**배포 URL 기록:**
- Vercel URL: `https://momwatching-_________.vercel.app`

**확인:**
- [ ] Vercel URL 접속 → 웹사이트 정상 작동
- [ ] 메인 페이지 로딩
- [ ] 학교 검색 기능 테스트
- [ ] 학교 상세 페이지 테스트

### 4️⃣ 도메인 연결 (10분 + 전파 대기)

**Vercel 설정:**
- [ ] Vercel → 프로젝트 클릭 → Settings
- [ ] 왼쪽 메뉴 → Domains
- [ ] `momwatching.com` 입력 → Add
- [ ] `www.momwatching.com` 입력 → Add
- [ ] DNS 설정 정보 확인 (화면에 표시됨):
  - A Record: `76.76.21.21`
  - CNAME: `cname.vercel-dns.com`

**Namecheap 설정:**
- [ ] https://www.namecheap.com 로그인
- [ ] Domain List → `momwatching.com` → MANAGE
- [ ] Advanced DNS 탭 클릭
- [ ] 기존 레코드 삭제 (Parking Page 등)
- [ ] A Record 추가:
  - Type: A Record
  - Host: `@`
  - Value: `76.76.21.21`
  - TTL: Automatic
- [ ] CNAME Record 추가:
  - Type: CNAME Record
  - Host: `www`
  - Value: `cname.vercel-dns.com`
  - TTL: Automatic
- [ ] "SAVE ALL CHANGES" 클릭

**DNS 전파 대기:**
- [ ] 10-30분 대기 (최대 48시간)
- [ ] https://dnschecker.org 에서 `momwatching.com` 확인
- [ ] Vercel → Settings → Domains에서 초록색 체크 표시 확인

### 5️⃣ 최종 확인 (5분)

**도메인 접속 테스트:**
- [ ] http://momwatching.com
- [ ] https://momwatching.com ← HTTPS 자동 적용 확인
- [ ] http://www.momwatching.com
- [ ] https://www.momwatching.com

**기능 테스트:**
- [ ] 메인 페이지 검색 기능
- [ ] Top 20 순위표 표시
- [ ] 전체 순위 페이지 (/rankings)
- [ ] 학교 상세 페이지 (아무 학교나 클릭)
- [ ] 차트 표시 (라인 그래프, 도넛 차트)
- [ ] 모바일 반응형 확인 (브라우저 창 크기 조절)

**성능 확인:**
- [ ] 페이지 로딩 속도 (3초 이내)
- [ ] HTTPS 자물쇠 아이콘 표시
- [ ] 이미지/차트 정상 로딩

---

## 🔄 코드 업데이트 프로세스 (완료 후)

코드 수정이 필요한 경우:

```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site

# 1. 코드 수정 (예: data.json 업데이트)

# 2. Git 커밋
git add .
git commit -m "Update school data"

# 3. GitHub에 Push
git push

# 4. Vercel이 자동으로 감지하고 재배포 (1-3분)
```

- [ ] 테스트로 한 번 실행해보기 (README.md 파일 수정 등)

---

## 📞 문제 발생 시

**참고 문서:**
1. `deployment-guide.md` - 상세한 단계별 가이드
2. `deployment-guide.md` 섹션 4.3 - 일반적인 문제 해결
3. `QUICKSTART.md` - 빠른 참조

**일반적인 문제:**
- GitHub push 실패 → Personal Access Token 사용
- Vercel 빌드 오류 → 로컬에서 `npm run build` 테스트
- 도메인 연결 안 됨 → DNS 전파 대기 (최대 48시간)
- HTTPS 오류 → Vercel이 자동 발급 (몇 시간 대기)

---

## ✅ 완료!

모든 체크박스에 체크가 되면 배포 완료입니다!

**최종 결과:**
- 🌐 https://momwatching.com - 실시간 웹사이트
- 🔄 자동 배포 시스템 (git push → 자동 재배포)
- 🔒 무료 HTTPS 인증서
- 🚀 전 세계 CDN (빠른 속도)
- 📊 Vercel Analytics (방문자 통계)

**축하합니다! 🎉**

---

**작성일:** 2026-02-11  
**작성자:** OpenClaw Subagent
