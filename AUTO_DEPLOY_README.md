# 🚀 완전 자동 배포 시스템

**momwatching.com** 뉴스 자동 발행 및 배포 시스템

## 📋 개요

이 시스템은 **완전히 hands-off** 자동화를 제공합니다:

```
매일 9시, 18시 (자동)
    ↓
뉴스 생성 (AI)
    ↓
Git commit & push (자동)
    ↓
Vercel 배포 (자동)
    ↓
✅ 사이트 업데이트!
```

**사용자가 할 일:** 없음! (초기 설정 후)

## 🎯 기능

- ✅ **자동 뉴스 생성**: AI가 입시 관련 뉴스 작성
- ✅ **자동 이미지**: Pixabay에서 관련 이미지 검색
- ✅ **자동 Git Push**: GitHub에 자동 커밋 및 푸시
- ✅ **자동 배포**: Vercel이 자동으로 배포 감지
- ✅ **일정 관리**: Cron으로 정확한 시간에 실행
- ✅ **에러 처리**: 충돌 방지 및 안전한 롤백

## 📁 프로젝트 구조

```
school-ranking-site/
├── scripts/
│   └── auto-post-news.py          # 메인 자동화 스크립트
├── data/
│   └── news.json                  # 뉴스 데이터베이스
├── test-auto-deploy.sh            # 전체 흐름 테스트 스크립트
├── FIRST_PUSH_GUIDE.md            # Git 인증 설정 가이드
├── CRON_SETUP.md                  # Cron 설정 가이드
└── AUTO_DEPLOY_README.md          # 이 문서
```

## 🔧 초기 설정 (한 번만)

### 1단계: Git Credential 설정

```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
git config credential.helper store
```

✅ 완료됨!

### 2단계: GitHub Token 저장

**방법 A: 직접 push로 토큰 저장**

1. GitHub에서 Personal Access Token 생성
   - https://github.com/settings/tokens
   - `repo` 권한 필요
   
2. 한 번 push:
   ```bash
   cd /home/zeah/.openclaw/workspace/school-ranking-site
   
   # 테스트 커밋
   echo "test" > .deploy-test
   git add .deploy-test
   git commit -m "Test: Auto-deploy setup"
   git push origin main
   
   # Username: your-github-username
   # Password: ghp_your_token_here
   ```

3. 인증 정보가 `~/.git-credentials`에 저장됨

**방법 B: 직접 credentials 파일 작성**

```bash
echo "https://your-username:ghp_your_token@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
```

📖 자세한 가이드: `FIRST_PUSH_GUIDE.md`

### 3단계: Cron Job 설정

```bash
# 오전 9시 자동 발행
openclaw cron add --label "morning-news" \
  --schedule "0 9 * * *" \
  --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py" \
  --description "Daily morning news (9 AM)"

# 오후 6시 자동 발행
openclaw cron add --label "evening-news" \
  --schedule "0 18 * * *" \
  --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py" \
  --description "Daily evening news (6 PM)"
```

📖 자세한 가이드: `CRON_SETUP.md`

### 4단계: 테스트

```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
./test-auto-deploy.sh
```

이 스크립트가 다음을 테스트합니다:
- ✅ Git 설정
- ✅ Credential 저장
- ✅ 뉴스 생성
- ✅ Git commit & push
- ✅ 변경사항 검증

## 📊 자동화 흐름 상세

### auto-post-news.py 동작

```python
1. search_news_topics()
   → 입시 키워드 선택 (입시, 고등학교, 대입, 수시, 정시...)

2. generate_article_with_ai(keyword)
   → AI로 600-800자 기사 작성
   → SEO 최적화된 제목/요약/본문

3. fetch_pixabay_image(keyword)
   → Pixabay에서 교육 관련 이미지 검색
   → 없으면 기본 이미지 사용

4. update_news_database(article)
   → data/news.json 업데이트
   → 최신 100개 기사만 유지

5. commit_and_push(article_title)
   → git pull --rebase (충돌 방지)
   → git add data/news.json
   → git commit -m "Auto: Daily news update - [제목]"
   → git push origin main
```

### Git Push 안전 장치

```python
# 변경사항 확인
if not status_result.stdout.strip():
    print("ℹ️  No changes to commit")
    return

# 최신 변경사항 pull (충돌 방지)
subprocess.run(["git", "pull", "--rebase", "origin", "main"])

# 안전한 push
subprocess.run(["git", "push", "origin", "main"])
```

### Vercel 자동 배포

GitHub에 push되면:
1. Vercel이 자동으로 push 감지
2. Next.js 빌드 시작
3. 배포 완료 (1-2분 소요)
4. https://momwatching.com 업데이트됨

## 🔍 모니터링

### Cron Job 상태 확인

```bash
# 등록된 cron 목록
openclaw cron list

# 출력 예시:
# morning-news | 0 9 * * * | Daily morning news (9 AM)
# evening-news | 0 18 * * * | Daily evening news (6 PM)
```

### Git 상태 확인

```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site

# 최근 커밋 확인
git log --oneline -5

# 원격 상태 확인
git status
```

### Vercel 배포 확인

- 대시보드: https://vercel.com/dashboard
- 각 배포마다 로그와 상태 확인 가능

## 🛠️ 관리 명령어

### 수동 뉴스 발행

```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
python3 scripts/auto-post-news.py
```

### Cron 일시 중지

```bash
# 특정 job 제거
openclaw cron remove --label "morning-news"
openclaw cron remove --label "evening-news"

# 나중에 다시 추가
openclaw cron add --label "morning-news" --schedule "0 9 * * *" \
  --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py"
```

### 뉴스 데이터 확인

```bash
# 총 기사 수
cd /home/zeah/.openclaw/workspace/school-ranking-site
python3 -c "import json; print(f'Total articles: {len(json.load(open(\"data/news.json\")))}')"

# 최근 기사 제목
python3 -c "
import json
articles = json.load(open('data/news.json'))
for i, a in enumerate(articles[:5], 1):
    print(f'{i}. {a[\"title\"]} ({a[\"date\"][:10]})')
"
```

## 🚨 트러블슈팅

### "Authentication failed" 에러

**원인**: Git 토큰이 없거나 만료됨

**해결**:
```bash
# 저장된 토큰 삭제
rm ~/.git-credentials

# 새 토큰으로 다시 push
cd /home/zeah/.openclaw/workspace/school-ranking-site
git push origin main
# → 새 토큰 입력
```

### "Merge conflict" 에러

**원인**: 여러 곳에서 동시 수정

**해결**:
```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site

# 로컬 변경사항 백업
cp data/news.json data/news.json.backup

# 원격 내용으로 리셋
git fetch origin
git reset --hard origin/main

# 필요시 수동 병합
```

### Cron이 실행 안 됨

**확인사항**:
```bash
# Cron 목록 확인
openclaw cron list

# OpenClaw Gateway 상태
openclaw gateway status

# Gateway 재시작
openclaw gateway restart
```

### Vercel 배포 실패

**확인사항**:
1. Vercel 대시보드에서 배포 로그 확인
2. GitHub 저장소 연동 상태 확인
3. `main` 브랜치 자동 배포 활성화 확인
4. 빌드 에러가 있는지 로그 확인

## 📝 커스터마이징

### 발행 시간 변경

```bash
# 현재: 9시, 18시
# 원하는 시간으로 변경 (예: 8시, 12시, 20시)

openclaw cron remove --label "morning-news"
openclaw cron remove --label "evening-news"

openclaw cron add --label "morning-news" --schedule "0 8 * * *" \
  --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py"

openclaw cron add --label "noon-news" --schedule "0 12 * * *" \
  --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py"

openclaw cron add --label "evening-news" --schedule "0 20 * * *" \
  --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py"
```

### 뉴스 키워드 변경

`scripts/auto-post-news.py` 파일에서:

```python
NEWS_KEYWORDS = ["입시", "고등학교", "대입", "수시", "정시", "서울대", "진학", "학생부"]

# 원하는 키워드로 변경:
NEWS_KEYWORDS = ["교육정책", "입시전략", "학종", "내신", "모의고사"]
```

### 이미지 소스 변경

Pixabay 대신 다른 소스 사용:

```python
def fetch_pixabay_image(keyword):
    # Unsplash, Pexels 등으로 변경 가능
    # 각 플랫폼의 API 문서 참고
```

## 🎉 완료!

초기 설정이 끝나면:

✅ **매일 자동으로**:
- 오전 9시: 새 뉴스 발행
- 오후 6시: 새 뉴스 발행

✅ **자동으로**:
- GitHub에 커밋 및 푸시
- Vercel 배포
- 사이트 업데이트

✅ **사용자는**:
- 아무것도 안 해도 됩니다!
- 가끔 결과만 확인하세요

---

**문의/버그 리포트**: 문제가 생기면 다음을 확인하세요:
1. `openclaw cron list` - Cron 등록 상태
2. `git status` - Git 상태
3. `cat ~/.git-credentials` - 인증 정보
4. Vercel 대시보드 - 배포 로그

Happy automating! 🚀
