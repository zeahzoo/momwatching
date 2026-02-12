# Cron Job 설정 가이드

## 자동 뉴스 포스팅 일정

매일 **9시**와 **18시**에 자동으로 뉴스를 생성하고 GitHub에 푸시합니다.

## OpenClaw Cron 명령어

OpenClaw에서 다음 명령어로 cron job을 설정하세요:

### 1. 매일 오전 9시 뉴스 포스팅

```bash
openclaw cron add --label "morning-news" --schedule "0 9 * * *" --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py" --description "Daily morning news posting (9 AM)"
```

### 2. 매일 오후 6시 뉴스 포스팅

```bash
openclaw cron add --label "evening-news" --schedule "0 18 * * *" --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py" --description "Daily evening news posting (6 PM)"
```

## 일정 형식 (Cron Expression)

```
* * * * *
│ │ │ │ │
│ │ │ │ └─── 요일 (0-6, 0 = 일요일)
│ │ │ └───── 월 (1-12)
│ │ └─────── 일 (1-31)
│ └───────── 시간 (0-23)
└─────────── 분 (0-59)
```

예시:
- `0 9 * * *` = 매일 오전 9시
- `0 18 * * *` = 매일 오후 6시
- `0 9,18 * * *` = 매일 오전 9시와 오후 6시
- `0 12 * * 1-5` = 월-금 낮 12시

## Cron Job 관리 명령어

### 목록 확인
```bash
openclaw cron list
```

### 특정 Job 삭제
```bash
openclaw cron remove --label "morning-news"
openclaw cron remove --label "evening-news"
```

### 모든 Job 삭제
```bash
openclaw cron clear
```

## 자동화 흐름

```
[Cron Trigger (9시/18시)]
    ↓
[auto-post-news.py 실행]
    ↓
[1. 뉴스 키워드 선택]
    ↓
[2. AI 기사 생성]
    ↓
[3. Pixabay 이미지 검색]
    ↓
[4. news.json 업데이트]
    ↓
[5. Git add + commit + push]
    ↓
[6. GitHub 업데이트]
    ↓
[7. Vercel 자동 배포]
    ↓
[✅ 완료!]
```

## 수동 테스트

전체 흐름을 테스트하려면:

```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
./test-auto-deploy.sh
```

개별 스크립트만 실행:

```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
python3 scripts/auto-post-news.py
```

## 로그 확인

Cron job 실행 로그는 OpenClaw가 자동으로 관리합니다.
문제가 발생하면 로그를 확인하세요.

## 환경 변수

스크립트에서 사용하는 API 키들:
- **Pixabay API**: 스크립트 내에 하드코딩됨
- **Git Credentials**: `~/.git-credentials`에 저장됨 (credential.helper store)

## 주의사항

1. **Git 인증**: 처음 한 번은 수동으로 push하여 토큰을 저장해야 합니다
2. **Vercel 연동**: GitHub 저장소와 Vercel이 연결되어 있어야 자동 배포됩니다
3. **네트워크**: Cron 실행 시 인터넷 연결이 필요합니다

## 트러블슈팅

### Git push 실패
```bash
# Git 인증 확인
cat ~/.git-credentials

# 수동으로 다시 인증
cd /home/zeah/.openclaw/workspace/school-ranking-site
git push origin main
```

### 스크립트 오류
```bash
# Python 구문 체크
python3 -m py_compile scripts/auto-post-news.py

# 직접 실행해서 에러 확인
python3 scripts/auto-post-news.py
```

### Vercel 배포 안 됨
1. Vercel 대시보드에서 GitHub 연동 확인
2. 배포 설정에서 `main` 브랜치 자동 배포 활성화
3. 배포 로그에서 에러 확인
