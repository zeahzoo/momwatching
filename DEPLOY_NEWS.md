# 🚀 뉴스 기능 배포 가이드

## 📦 현재 상태

✅ **코드 완성**: 모든 뉴스 기능 구현 완료  
✅ **빌드 성공**: `npm run build` 테스트 통과  
✅ **Git 커밋**: 2개의 커밋 준비됨  
⏳ **배포 대기**: Git push만 하면 완료

## 🎯 배포 3단계

### 1단계: Git Push (1분) ⚡

```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
git push origin main
```

이렇게 하면:
- Vercel이 자동으로 빌드 시작
- 5-10분 후 배포 완료
- momwatching.com/news 접속 가능

### 2단계: 확인 (5분) 🔍

배포 후 확인:

```bash
# 1. Vercel 대시보드에서 배포 상태 확인
https://vercel.com/dashboard

# 2. 웹사이트 확인
https://momwatching.com/
https://momwatching.com/news
https://momwatching.com/news/서울대-update-20260211
```

**체크리스트:**
- [ ] 홈페이지에 "최신 입시 뉴스" 섹션 보임
- [ ] 네비게이션에 "입시 뉴스" 링크 추가
- [ ] /news 페이지에 첫 뉴스 표시
- [ ] 뉴스 상세 페이지 작동
- [ ] 이미지 로딩 정상
- [ ] 모바일 반응형 정상

### 3단계: 자동 포스팅 설정 (5분) ⏰

**서버 접속 필요** (Vercel Cron 또는 별도 서버)

#### 옵션 A: Vercel Cron (추천)

1. `vercel.json` 생성:
```json
{
  "crons": [
    {
      "path": "/api/post-news",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/post-news",
      "schedule": "0 9 * * *"
    }
  ]
}
```

2. API 라우트 생성 (`app/api/post-news/route.ts`):
```typescript
export async function GET() {
  // scripts/auto-post-news.py 로직을 TypeScript로 변환
  // 또는 serverless function으로 Python 실행
}
```

#### 옵션 B: 별도 서버 Cron

서버에서:
```bash
# 1. 프로젝트 클론
git clone <your-repo-url>
cd school-ranking-site

# 2. Cron 설정
bash scripts/setup-cron.sh

# 3. 확인
crontab -l
```

## 📊 배포 후 모니터링

### 로그 확인
```bash
# Cron 로그
tail -f logs/news-cron.log

# Git 로그
git log --oneline --graph -10
```

### 뉴스 개수 확인
```bash
# 현재 뉴스 개수
cat data/news.json | python3 -c "import sys, json; print(len(json.load(sys.stdin)))"

# 최신 뉴스 확인
cat data/news.json | python3 -m json.tool | head -30
```

### 다음 포스팅 시간
- **오전 9시 (09:00 KST)**: 1개 뉴스 발행
- **오후 6시 (18:00 KST)**: 1개 뉴스 발행

## 🔧 문제 해결

### Q: Git push가 안 됩니다
```bash
# SSH 키 확인
ssh -T git@github.com

# 또는 HTTPS 사용
git remote set-url origin https://github.com/username/repo.git
git push origin main
```

### Q: 빌드 에러가 납니다
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 빌드 재시도
npm run build
```

### Q: 이미지가 안 보입니다
- Pixabay 이미지는 외부 URL입니다
- `next.config.ts`에 이미지 도메인 추가:
```typescript
module.exports = {
  images: {
    domains: ['pixabay.com'],
  },
}
```

### Q: Cron이 실행 안 됩니다
```bash
# Cron 서비스 상태
systemctl status cron

# 수동 실행 테스트
python3 scripts/auto-post-news.py

# 로그 확인
tail -f logs/news-cron.log
```

## 📈 성과 측정

### 1주 후 체크
- [ ] 뉴스 14개 자동 발행 (하루 2개 × 7일)
- [ ] /news 페이지 트래픽 확인
- [ ] 검색 엔진 인덱싱 시작

### 1개월 후 체크
- [ ] 뉴스 60개 발행
- [ ] Google Search Console에서 뉴스 키워드 순위 확인
- [ ] 방문자 행동 분석 (뉴스 → 학교 순위 전환율)

## ✅ 최종 체크리스트

**배포 전:**
- [x] 코드 작성 완료
- [x] 빌드 테스트 성공
- [x] Git 커밋 완료
- [ ] Git push

**배포 후:**
- [ ] Vercel 빌드 성공 확인
- [ ] 웹사이트 기능 테스트
- [ ] Cron job 설정 (옵션)
- [ ] 첫 자동 포스팅 확인

**1주 후:**
- [ ] 뉴스 14개 발행 확인
- [ ] 에러 로그 확인
- [ ] SEO 상태 점검

## 🎉 배포 준비 완료!

지금 바로:
```bash
git push origin main
```

5분 후 momwatching.com/news에서 확인하세요! 🚀
