# Google Search Console 설정 가이드 - momwatching.com

## 1단계: Google Search Console에 속성 추가

1. https://search.google.com/search-console 방문
2. "속성 추가" 클릭
3. **URL 접두어** 방식 선택
4. `https://momwatching.com` 입력

## 2단계: 소유권 확인

### 방법 1: HTML 태그 (추천)

Google에서 제공하는 메타 태그를 받으면:
```html
<meta name="google-site-verification" content="YOUR_CODE_HERE" />
```

**설정 위치:**
- 파일: `app/layout.tsx`
- 위치: `metadata` 객체의 `verification` 섹션

**현재 코드:**
```typescript
verification: {
  google: 'YOUR_VERIFICATION_CODE',  // ← 여기에 Google 코드 입력
},
```

**수정 방법:**
1. Google Search Console에서 메타 태그 복사
2. `content="..."` 안의 코드만 추출
3. `app/layout.tsx`에서 `YOUR_VERIFICATION_CODE`를 교체
4. Git commit & push

예시:
```typescript
verification: {
  google: 'abcd1234efgh5678ijkl',
},
```

### 방법 2: HTML 파일 업로드

Google에서 제공하는 `googleXXXXXXXX.html` 파일을 다운로드하여:

```bash
# public 폴더에 복사
cp ~/Downloads/googleXXXXXXXX.html public/

# Git에 추가
git add public/googleXXXXXXXX.html
git commit -m "Add Google Search Console verification file"
git push origin main
```

## 3단계: Sitemap 제출

1. Google Search Console에서 **Sitemaps** 메뉴 클릭
2. 다음 사이트맵 URL 입력:
   ```
   https://momwatching.com/sitemap.xml
   ```
3. "제출" 클릭

## 4단계: 색인 생성 요청 (선택사항)

중요한 페이지들을 즉시 색인하려면:

1. Google Search Console에서 **URL 검사** 도구 사용
2. 다음 URL들을 하나씩 입력하고 "색인 생성 요청":
   - https://momwatching.com/
   - https://momwatching.com/rankings
   - https://momwatching.com/foreign-language-high
   - https://momwatching.com/autonomous-high
   - https://momwatching.com/news

## 현재 상태

✅ **완료된 작업:**
- robots.txt 설정 완료 (sitemap 경로 포함)
- sitemap.xml 존재 확인 필요

⏳ **대기 중:**
- Google Search Console 속성 추가
- 소유권 확인 코드 입력
- Sitemap 제출

## 참고사항

### robots.txt 내용
```
User-agent: *
Allow: /
Sitemap: https://momwatching.com/sitemap.xml

# 순위 페이지 명시적 허용
Allow: /rankings
Allow: /foreign-language-high
Allow: /autonomous-high
Allow: /news
```

### 주요 페이지 URL 목록
- 홈: https://momwatching.com/
- MW 종합순위: https://momwatching.com/rankings
- 외고 순위: https://momwatching.com/foreign-language-high
- 자사고 순위: https://momwatching.com/autonomous-high
- 뉴스: https://momwatching.com/news
- 서울대 2026: https://momwatching.com/seoul/2026
- 서울대 2025: https://momwatching.com/seoul/2025

## 추가 최적화

### 구조화된 데이터 (Schema.org)
순위 페이지에 구조화된 데이터를 추가하면 검색 결과에 더 잘 표시됩니다.

### 메타 설명 최적화
각 페이지의 `description`이 검색 결과에 표시되므로:
- 명확하고 간결하게 (150-160자)
- 키워드 포함
- 사용자의 검색 의도와 일치

### 제목 태그 최적화
- H1: 페이지당 1개만
- H2, H3: 계층 구조 유지
- 키워드 포함하되 자연스럽게

## 문제 해결

### 색인이 안 될 때
1. robots.txt 확인: https://momwatching.com/robots.txt
2. sitemap.xml 확인: https://momwatching.com/sitemap.xml
3. Google Search Console "URL 검사" 도구 사용
4. "색인 생성 요청" 클릭

### 순위가 낮을 때
1. 메타 설명 개선
2. 콘텐츠 품질 향상
3. 내부 링크 추가
4. 페이지 로딩 속도 개선
5. 모바일 최적화 확인

---

**작성일:** 2026-02-19
**사이트:** momwatching.com
**목적:** Google 검색 노출 최적화
