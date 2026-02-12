# momwatching.com 배포 가이드

> 학교 순위 웹사이트를 GitHub + Vercel + Namecheap 도메인으로 배포하는 단계별 가이드

---

## 📋 목차
1. [GitHub Repository 생성 및 코드 업로드](#1-github-repository-생성-및-코드-업로드)
2. [Vercel 배포](#2-vercel-배포)
3. [도메인 연결 (Namecheap → Vercel)](#3-도메인-연결-namecheap--vercel)
4. [배포 확인 및 문제 해결](#4-배포-확인-및-문제-해결)

---

## 1. GitHub Repository 생성 및 코드 업로드

### 1.1 GitHub 웹사이트에서 Repository 생성

1. **GitHub 로그인**
   - https://github.com 방문
   - 계정으로 로그인

2. **New Repository 생성**
   - 오른쪽 상단 `+` 버튼 클릭
   - `New repository` 선택
   
3. **Repository 설정**
   ```
   Repository name: momwatching
   Description: School ranking website - momwatching.com
   Visibility: Public ✓ (Vercel 무료 플랜은 Public repository 필요)
   
   ⚠️ 체크하지 마세요:
   □ Add a README file
   □ Add .gitignore
   □ Choose a license
   ```
   
4. **Create repository** 버튼 클릭

### 1.2 로컬 코드를 GitHub에 Push

터미널을 열고 다음 명령어를 실행하세요:

```bash
# 프로젝트 디렉토리로 이동
cd /home/zeah/.openclaw/workspace/school-ranking-site

# GitHub repository와 연결 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/momwatching.git

# main 브랜치로 이름 변경 (최신 GitHub 표준)
git branch -M main

# GitHub에 코드 업로드
git push -u origin main
```

**GitHub 인증이 필요한 경우:**
- Username: GitHub 사용자명
- Password: **Personal Access Token** 사용 (비밀번호 아님!)
  
**Personal Access Token 생성 방법:**
1. GitHub 로그인 → Settings → Developer settings
2. Personal access tokens → Tokens (classic) → Generate new token
3. 권한 선택: `repo` 전체 체크
4. Generate token 후 토큰을 복사해서 비밀번호 대신 사용

### 1.3 업로드 확인

- GitHub repository 페이지 새로고침
- 모든 파일이 올라갔는지 확인:
  - ✓ app/
  - ✓ components/
  - ✓ lib/
  - ✓ public/
  - ✓ package.json
  - ✓ next.config.ts
  - ✓ .gitignore
  - ❌ node_modules/ (제외됨 - 정상)
  - ❌ .env* (제외됨 - 정상)

---

## 2. Vercel 배포

### 2.1 Vercel 계정 생성 및 로그인

1. **Vercel 웹사이트 접속**
   - https://vercel.com 방문
   
2. **GitHub로 로그인**
   - `Continue with GitHub` 버튼 클릭
   - GitHub 계정으로 인증
   - Vercel이 GitHub repository 접근 권한 요청 → **Authorize** 클릭

### 2.2 프로젝트 Import

1. **New Project 생성**
   - Vercel 대시보드에서 `Add New...` → `Project` 클릭
   
2. **Repository Import**
   - GitHub repository 목록에서 `momwatching` 찾기
   - 보이지 않는 경우: `Adjust GitHub App Permissions` 클릭
   - `momwatching` 옆의 `Import` 버튼 클릭

3. **Configure Project 설정**
   ```
   Project Name: momwatching (또는 원하는 이름)
   Framework Preset: Next.js (자동 감지됨)
   Root Directory: ./ (그대로 둠)
   
   Build and Output Settings:
   - Build Command: npm run build (자동 설정됨)
   - Output Directory: .next (자동 설정됨)
   - Install Command: npm install (자동 설정됨)
   
   Environment Variables:
   - 필요 없음 (이 프로젝트는 환경 변수 사용 안 함)
   ```

4. **Deploy 버튼 클릭**
   - 빌드 진행 상황을 실시간으로 볼 수 있습니다
   - 약 1-3분 소요
   
5. **배포 완료**
   - "Congratulations!" 화면이 나타나면 성공
   - Vercel이 자동으로 생성한 URL 확인:
     ```
     https://momwatching.vercel.app
     또는
     https://momwatching-xxxx.vercel.app
     ```
   - `Visit` 버튼을 눌러 사이트 작동 확인

### 2.3 배포 확인

- Vercel URL에서 웹사이트가 정상 작동하는지 확인:
  - ✓ 메인 페이지 로딩
  - ✓ 학교 검색 기능
  - ✓ 학교 상세 페이지
  - ✓ 순위표 표시

---

## 3. 도메인 연결 (Namecheap → Vercel)

### 3.1 Vercel에서 커스텀 도메인 추가

1. **Vercel 프로젝트 설정**
   - Vercel 대시보드 → `momwatching` 프로젝트 클릭
   - 상단 메뉴에서 `Settings` 클릭
   
2. **Domains 섹션**
   - 왼쪽 메뉴에서 `Domains` 클릭
   - `Add` 버튼 또는 입력 필드 찾기
   
3. **도메인 입력**
   ```
   momwatching.com
   ```
   - `Add` 버튼 클릭
   
4. **www 서브도메인도 추가 (권장)**
   ```
   www.momwatching.com
   ```
   - `Add` 버튼 클릭

5. **DNS 설정 안내 확인**
   - Vercel이 DNS 설정 방법을 보여줍니다
   - 다음과 같은 정보가 표시됩니다:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
   - **이 화면을 열어둔 채로** 다음 단계로 진행

### 3.2 Namecheap에서 DNS 설정

1. **Namecheap 로그인**
   - https://www.namecheap.com 방문
   - 계정으로 로그인
   
2. **Domain List 이동**
   - 우측 상단 계정 메뉴 → `Domain List` 클릭
   
3. **momwatching.com 관리**
   - `momwatching.com` 도메인 찾기
   - 오른쪽 `MANAGE` 버튼 클릭
   
4. **Advanced DNS 설정**
   - 상단 탭에서 `Advanced DNS` 클릭
   
5. **기존 레코드 확인**
   - `HOST RECORDS` 섹션 찾기
   - 기존 레코드가 있다면 삭제 또는 수정 필요:
     - Namecheap 기본 Parking Page 레코드 삭제
   
6. **새 레코드 추가**

   **A Record 추가 (루트 도메인용):**
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic
   ```
   - `ADD NEW RECORD` 또는 `+` 버튼 클릭
   - 위 정보 입력 후 저장
   
   **CNAME Record 추가 (www 서브도메인용):**
   ```
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```
   - 다시 `ADD NEW RECORD` 클릭
   - 위 정보 입력 후 저장
   
7. **저장 완료**
   - 우측 하단 `SAVE ALL CHANGES` 버튼 클릭 (초록색 체크 아이콘)

### 3.3 DNS 전파 대기 및 확인

1. **DNS 전파 시간**
   - 일반적으로 5분 ~ 48시간 소요
   - 보통 10-30분 이내에 완료
   
2. **Vercel에서 확인**
   - Vercel → Settings → Domains로 돌아가기
   - `momwatching.com`과 `www.momwatching.com` 상태 확인
   - ✓ 초록색 체크 표시가 나타나면 성공
   - ⏳ "Invalid Configuration" → 아직 전파 중 (기다리기)
   
3. **DNS 전파 상태 확인 도구 (선택사항)**
   - https://dnschecker.org 방문
   - `momwatching.com` 입력
   - A 레코드가 `76.76.21.21`로 표시되는지 전 세계 위치별로 확인

4. **웹사이트 접속 테스트**
   ```
   http://momwatching.com
   https://momwatching.com
   http://www.momwatching.com
   https://www.momwatching.com
   ```
   - 모두 정상적으로 웹사이트를 표시해야 합니다
   - Vercel이 자동으로 HTTPS 인증서를 발급합니다 (무료)

---

## 4. 배포 확인 및 문제 해결

### 4.1 배포 성공 확인 체크리스트

- ✓ GitHub repository에 코드가 업로드됨
- ✓ Vercel 프로젝트가 생성되고 배포 완료
- ✓ `https://momwatching.vercel.app` 접속 가능
- ✓ Vercel Domains 섹션에 도메인 추가됨
- ✓ Namecheap DNS 설정 완료
- ✓ `https://momwatching.com` 접속 가능
- ✓ HTTPS 인증서가 자동으로 적용됨 (자물쇠 아이콘)

### 4.2 자동 재배포 확인

코드를 수정하고 GitHub에 push하면 Vercel이 자동으로 재배포합니다:

```bash
# 코드 수정 후
cd /home/zeah/.openclaw/workspace/school-ranking-site

# 변경사항 커밋
git add .
git commit -m "Update content"
git push

# Vercel이 자동으로 감지하고 재배포 시작 (1-3분 소요)
```

### 4.3 일반적인 문제 해결

#### 문제 1: GitHub push 실패 (인증 오류)

**증상:**
```
remote: Support for password authentication was removed
```

**해결:**
- Personal Access Token 사용 필요
- 위의 1.2 섹션 "Personal Access Token 생성 방법" 참조

#### 문제 2: Vercel 빌드 실패

**증상:**
- Vercel 배포 로그에 오류 메시지

**해결 방법:**
1. Vercel 대시보드 → 프로젝트 → Deployments 클릭
2. 실패한 배포 클릭 → "Building" 로그 확인
3. 일반적인 원인:
   - `package.json`의 dependency 오류
   - TypeScript 타입 오류
   - Next.js 설정 오류
   
**로컬에서 빌드 테스트:**
```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
npm run build
```
- 로컬에서 성공하면 Vercel에서도 성공해야 합니다

#### 문제 3: 도메인이 연결되지 않음

**증상:**
- `momwatching.com` 접속 시 "This site can't be reached" 오류

**확인 사항:**
1. DNS 설정이 올바른지 Namecheap에서 재확인
   - A Record: @ → 76.76.21.21
   - CNAME: www → cname.vercel-dns.com
   
2. DNS 전파 대기 (최대 48시간, 보통 30분)

3. Vercel Domains 섹션에서 도메인 상태 확인
   - Invalid Configuration → DNS 설정 오류
   - Pending Verification → DNS 전파 대기 중
   - Valid → 정상

4. DNS 캐시 삭제 (로컬 컴퓨터):
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac/Linux
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```

#### 문제 4: HTTPS 인증서 오류

**증상:**
- "Your connection is not private" 경고

**해결:**
- 일반적으로 Vercel이 자동으로 Let's Encrypt 인증서 발급
- 도메인 추가 후 몇 분 ~ 몇 시간 소요
- Vercel → Settings → Domains에서 SSL 상태 확인
- 대부분의 경우 자동으로 해결됨 (기다리기)

#### 문제 5: www와 non-www 리다이렉트

**확인:**
- Vercel은 자동으로 리다이렉트 처리
- `momwatching.com` → `www.momwatching.com` 또는 그 반대
- 둘 다 같은 사이트를 보여줘야 정상

---

## 5. 추가 설정 (선택사항)

### 5.1 환경 변수 추가 (필요시)

나중에 API 키 등이 필요한 경우:

1. Vercel → Settings → Environment Variables
2. `Add New` 버튼 클릭
3. Key/Value 입력
4. 저장 후 재배포

### 5.2 성능 최적화

Vercel은 자동으로 다음을 제공합니다:
- ✓ 전 세계 CDN (빠른 로딩)
- ✓ 자동 HTTPS
- ✓ 자동 이미지 최적화
- ✓ 서버리스 함수
- ✓ Analytics (무료 플랜에서도 기본 제공)

### 5.3 Analytics 활성화

1. Vercel → Analytics 탭
2. Enable Analytics 클릭
3. 방문자 수, 페이지 뷰 등 확인 가능

---

## 6. 유지보수

### 6.1 코드 업데이트 방법

```bash
# 1. 코드 수정

# 2. Git 커밋
cd /home/zeah/.openclaw/workspace/school-ranking-site
git add .
git commit -m "설명 메시지"
git push

# 3. Vercel이 자동으로 재배포 (1-3분)
```

### 6.2 배포 히스토리 확인

- Vercel → Deployments
- 모든 배포 기록 확인
- 특정 버전으로 롤백 가능

### 6.3 로그 확인

- Vercel → 프로젝트 → Functions 탭
- 실시간 서버 로그 확인
- 오류 디버깅에 유용

---

## 📞 도움이 필요한 경우

### Vercel 공식 문서
- https://vercel.com/docs
- https://vercel.com/docs/concepts/projects/domains

### Namecheap 도메인 설정 가이드
- https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain/

### Next.js 공식 문서
- https://nextjs.org/docs

---

## ✅ 완료!

축하합니다! 이제 다음이 완료되었습니다:

1. ✓ GitHub에 코드 저장소 생성
2. ✓ Vercel로 자동 배포
3. ✓ momwatching.com 커스텀 도메인 연결
4. ✓ HTTPS 자동 적용
5. ✓ 자동 재배포 시스템 구축

**최종 결과:**
- 🌐 https://momwatching.com → 실시간 웹사이트
- 🔄 코드 수정 후 `git push` → 자동 재배포
- 🔒 무료 HTTPS 인증서
- 🚀 전 세계 CDN으로 빠른 속도

---

**작성일:** 2026-02-11  
**버전:** 1.0  
**작성자:** OpenClaw Assistant
