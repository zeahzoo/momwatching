# Google Search Console 등록 가이드

## 📋 개요

이 문서는 momwatching.com을 Google Search Console에 등록하고 사이트맵을 제출하는 방법을 안내합니다.

---

## ✅ 준비 완료 사항

다음 파일들이 이미 생성되어 있습니다:

1. **sitemap.xml** - `/public/sitemap.xml`
   - 모든 주요 페이지 포함
   - 뉴스 페이지 3개 포함
   - 서울대/의대 진학 페이지 포함

2. **robots.txt** - `/public/robots.txt`
   - 사이트맵 위치 명시
   - 크롤링 허용 설정

3. **메타 태그** - `app/layout.tsx`
   - Open Graph 태그
   - Twitter Card 태그
   - Google 확인 메타 태그 (플레이스홀더)

---

## 🚀 Google Search Console 등록 절차

### 1단계: Google Search Console 접속

1. https://search.google.com/search-console 접속
2. Google 계정으로 로그인

### 2단계: 속성(사이트) 추가

1. 좌측 상단 "속성 추가" 클릭
2. "URL 접두어" 선택
3. `https://momwatching.com` 입력
4. "계속" 클릭

### 3단계: 소유권 확인 (HTML 태그 방법 권장)

#### 방법 A: HTML 태그 (권장)

1. Google Search Console에서 "HTML 태그" 확인 방법 선택
2. 다음과 같은 메타 태그를 복사:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
3. 확인 코드 복사 (예: `abcd1234efgh5678...`)
4. `app/layout.tsx` 파일 수정:
   ```typescript
   verification: {
     google: 'YOUR_VERIFICATION_CODE', // 여기에 복사한 코드 붙여넣기
   },
   ```
5. 변경사항 커밋 & 푸시:
   ```bash
   git add app/layout.tsx
   git commit -m "Add Google Search Console verification code"
   git push origin main
   ```
6. Vercel에 배포 완료 후 Google Search Console에서 "확인" 클릭

#### 방법 B: HTML 파일 업로드

1. Google Search Console에서 "HTML 파일" 확인 방법 선택
2. 제공된 HTML 파일 다운로드 (예: `google123abc456def.html`)
3. 파일을 `/public/` 폴더에 복사:
   ```bash
   cp ~/Downloads/google123abc456def.html public/
   ```
4. 커밋 & 푸시:
   ```bash
   git add public/google*.html
   git commit -m "Add Google verification file"
   git push origin main
   ```
5. Vercel에 배포 완료 후 Google Search Console에서 "확인" 클릭

---

### 4단계: 사이트맵 제출

소유권 확인이 완료되면:

1. Google Search Console 좌측 메뉴에서 "Sitemaps" 클릭
2. "새 사이트맵 추가" 입력란에 `sitemap.xml` 입력
3. "제출" 클릭

**예상 결과:**
- 제출 상태: "성공"
- 발견된 URL: 약 15~20개

---

## 📊 확인 및 모니터링

### 즉시 확인 가능:

1. **URL 검사 도구**
   - 좌측 메뉴 "URL 검사" 클릭
   - `https://momwatching.com/` 입력
   - 색인 생성 요청

2. **사이트맵 상태**
   - Sitemaps 메뉴에서 제출 상태 확인
   - 발견된 페이지 수 확인

### 1~3일 후 확인:

1. **실적 보고서**
   - 클릭수, 노출수, 평균 게재순위
   - 검색어 분석

2. **색인 생성 상태**
   - 색인 생성된 페이지 수
   - 오류 페이지 확인

---

## 🎯 주요 페이지별 최적화 키워드

| 페이지 | 타겟 키워드 |
|--------|-------------|
| 홈페이지 (/) | 고등학교 입시 순위, 서울대 진학 실적 |
| /seoul/2025 | 2025 서울대 진학 순위, 서울대 합격자 고등학교 |
| /medical | 의대 진학 고등학교, 의대 합격 순위 |
| /rankings | 전국 고등학교 순위, 고교 입시 순위 |
| /news | 입시 뉴스, 고등학교 입시 정보 |

---

## 🔧 문제 해결

### 소유권 확인 실패 시:

1. **배포 확인**
   - Vercel 대시보드에서 배포 완료 확인
   - `https://momwatching.com`에서 소스 보기로 메타 태그 확인

2. **캐시 문제**
   - 브라우저 캐시 지우기
   - 시크릿 모드로 확인

3. **태그 위치**
   - 메타 태그가 `<head>` 안에 있는지 확인
   - 오타나 공백 확인

### 사이트맵 오류 시:

1. **직접 접속 확인**
   - `https://momwatching.com/sitemap.xml` 브라우저에서 확인
   - XML 형식 오류 확인

2. **사이트맵 테스터**
   - https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - 구조 검증

---

## 📝 다음 단계

Google Search Console 등록 후:

1. **구조화된 데이터 추가**
   - JSON-LD 스키마 마크업
   - 빵부스러기(Breadcrumb) 추가

2. **페이지 속도 최적화**
   - Core Web Vitals 개선
   - 이미지 최적화

3. **정기 모니터링**
   - 주 1회 실적 리포트 확인
   - 검색 순위 추적
   - 크롤링 오류 확인

---

## 📞 참고 링크

- [Google Search Console 공식 가이드](https://support.google.com/webmasters/answer/9008080)
- [사이트맵 프로토콜](https://www.sitemaps.org/protocol.html)
- [Next.js SEO 가이드](https://nextjs.org/learn/seo/introduction-to-seo)

---

## ✨ 완료 체크리스트

- [ ] Google Search Console 속성 추가
- [ ] 소유권 확인 완료
- [ ] sitemap.xml 제출
- [ ] URL 검사 및 색인 생성 요청
- [ ] 주요 페이지 색인 확인 (3일 후)
- [ ] 실적 리포트 설정 (7일 후)

---

**작성일:** 2026-02-11  
**최종 수정:** 2026-02-11
