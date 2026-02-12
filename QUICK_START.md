# 🚀 Quick Start - 3단계로 완성!

## ⏱️ 총 소요 시간: ~15분

---

## 📋 Step 1: GitHub 토큰 저장 (5분)

### A. 토큰 생성
1. 🔗 https://github.com/settings/tokens 접속
2. "Generate new token (classic)" 클릭
3. 설정:
   - Name: `school-ranking-auto-deploy`
   - Expiration: `1 year`
   - Scopes: ✅ **repo** (전체)
4. "Generate token" 클릭
5. 토큰 복사 (예: `ghp_xxxxxxxxxxxxxxxxxxxx`)

### B. 토큰 저장
```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site

# 테스트 커밋
echo "# Auto-deploy configured" >> .gitignore
git add .gitignore
git commit -m "Setup: Auto-deploy"

# Push (토큰 입력)
git push origin main
```

**프롬프트에서**:
- Username: `당신의_GitHub_아이디`
- Password: `ghp_복사한_토큰_붙여넣기`

✅ 완료! 이제 토큰이 영구 저장됩니다.

---

## 📋 Step 2: Cron Job 설정 (2분)

```bash
# 오전 9시 자동 발행
openclaw cron add --label "morning-news" --schedule "0 9 * * *" \
  --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py" \
  --description "Daily morning news (9 AM)"

# 오후 6시 자동 발행
openclaw cron add --label "evening-news" --schedule "0 18 * * *" \
  --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py" \
  --description "Daily evening news (6 PM)"
```

**확인:**
```bash
openclaw cron list
```

✅ 완료! 이제 매일 자동으로 실행됩니다.

---

## 📋 Step 3: 테스트 (5분)

```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
./test-auto-deploy.sh
```

**성공 시 출력**:
```
✅ ALL TESTS PASSED!
🎉 Automated deployment is working!
```

✅ 완료! 모든 설정이 작동합니다.

---

## 🎉 완료!

이제부터:
- ✅ 매일 9시, 18시 자동 뉴스 발행
- ✅ 자동으로 GitHub push
- ✅ 자동으로 Vercel 배포
- ✅ **아무것도 안 해도 됩니다!**

---

## 📖 더 자세한 정보

- **전체 가이드**: `AUTO_DEPLOY_README.md`
- **Git 인증 문제**: `FIRST_PUSH_GUIDE.md`
- **Cron 상세 설정**: `CRON_SETUP.md`
- **완료 요약**: `SETUP_COMPLETE.md`

---

## 🔍 모니터링

### 뉴스 확인
```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
python3 -c "
import json
articles = json.load(open('data/news.json'))
print(f'총 {len(articles)}개 기사')
print(f'최신: {articles[0][\"title\"]}')"
```

### Cron 상태
```bash
openclaw cron list
```

### Git 로그
```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
git log --oneline -5
```

---

## ⚡ 빠른 명령어

### 수동 뉴스 발행
```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
python3 scripts/auto-post-news.py
```

### Cron 일시 중지
```bash
openclaw cron remove --label "morning-news"
openclaw cron remove --label "evening-news"
```

### Cron 다시 시작
```bash
# (위의 Step 2 명령어 다시 실행)
```

---

## 🚨 문제 해결

### "Authentication failed"
```bash
# 토큰 다시 저장
rm ~/.git-credentials
cd /home/zeah/.openclaw/workspace/school-ranking-site
git push origin main
```

### Cron이 실행 안 됨
```bash
openclaw gateway status
openclaw gateway restart
```

### Vercel 배포 확인
🔗 https://vercel.com/dashboard

---

**완전 자동화 완성! 🎊**
