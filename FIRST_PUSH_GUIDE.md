# 🔐 Git 인증 설정 가이드 (한 번만 필요)

자동 배포를 위해서는 Git 인증 정보를 저장해야 합니다.
이 작업은 **한 번만** 하면 됩니다.

## 현재 상태

✅ Git credential helper가 `store`로 설정되어 있습니다.
⚠️  아직 토큰이 저장되지 않았습니다.

## 토큰 저장 방법

### Option 1: GitHub Personal Access Token 사용 (권장)

1. **GitHub 토큰 생성**
   - https://github.com/settings/tokens 접속
   - "Generate new token (classic)" 클릭
   - Token 이름: `school-ranking-auto-deploy`
   - 권한 선택:
     - ✅ `repo` (전체)
   - "Generate token" 클릭
   - **토큰을 복사하세요** (다시 볼 수 없습니다!)

2. **Git push로 토큰 저장**
   ```bash
   cd /home/zeah/.openclaw/workspace/school-ranking-site
   
   # 테스트 커밋 만들기
   echo "# Auto-deploy setup complete" >> .gitignore
   git add .gitignore
   git commit -m "Setup: Configure auto-deploy"
   
   # Push (이때 인증 정보 입력)
   git push origin main
   ```

3. **인증 정보 입력**
   - Username: `your-github-username`
   - Password: `복사한 토큰 붙여넣기`

4. **인증 정보 자동 저장됨**
   - `~/.git-credentials` 파일에 저장됩니다
   - 이후 모든 git push는 자동으로 인증됩니다

### Option 2: SSH 키 사용

SSH를 선호한다면:

```bash
# SSH 키 생성 (이미 있으면 건너뛰기)
ssh-keygen -t ed25519 -C "your-email@example.com"

# 공개 키를 GitHub에 등록
cat ~/.ssh/id_ed25519.pub
# → https://github.com/settings/keys 에 추가

# Git remote를 SSH로 변경
cd /home/zeah/.openclaw/workspace/school-ranking-site
git remote set-url origin git@github.com:your-username/school-ranking-site.git

# 테스트
git push origin main
```

## 인증 확인

저장된 인증 정보 확인:
```bash
cat ~/.git-credentials
```

출력 예시:
```
https://your-username:ghp_xxxxxxxxxxxxxxxxxxxx@github.com
```

## 다음 단계

인증이 설정되면:

1. **테스트 스크립트 실행**
   ```bash
   cd /home/zeah/.openclaw/workspace/school-ranking-site
   ./test-auto-deploy.sh
   ```

2. **Cron Job 설정** (CRON_SETUP.md 참고)
   ```bash
   # 매일 9시
   openclaw cron add --label "morning-news" --schedule "0 9 * * *" \
     --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py"
   
   # 매일 18시
   openclaw cron add --label "evening-news" --schedule "0 18 * * *" \
     --command "cd /home/zeah/.openclaw/workspace/school-ranking-site && python3 scripts/auto-post-news.py"
   ```

3. **완료! 🎉**
   - 이제 매일 자동으로 뉴스가 생성됩니다
   - Git push도 자동으로 됩니다
   - Vercel도 자동으로 배포됩니다

## 트러블슈팅

### "Authentication failed" 에러

토큰이 잘못되었거나 만료되었습니다:

```bash
# 저장된 인증 정보 삭제
rm ~/.git-credentials

# 다시 push하여 새 토큰 입력
git push origin main
```

### "Permission denied" 에러

토큰에 `repo` 권한이 없습니다. 새 토큰을 생성하고 `repo` 권한을 포함하세요.

### SSH 연결 실패

```bash
# SSH 키가 GitHub에 등록되었는지 확인
ssh -T git@github.com

# 성공 시 출력: "Hi username! You've successfully authenticated..."
```

## 보안 참고사항

- **토큰 보호**: Personal Access Token은 비밀번호와 같습니다. 공유하지 마세요.
- **권한 최소화**: `repo` 권한만 주고 불필요한 권한은 제거하세요.
- **만료 설정**: 토큰에 만료일을 설정하는 것이 좋습니다 (예: 1년).
- **정기 갱신**: 만료 전에 새 토큰을 생성하고 갱신하세요.
