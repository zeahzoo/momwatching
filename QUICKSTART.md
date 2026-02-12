# 🚀 빠른 배포 가이드 (5분)

> 상세한 설명은 `deployment-guide.md` 참조

## 준비물
- GitHub 계정
- Namecheap momwatching.com 도메인

## 1단계: GitHub에 Push (2분)

```bash
# GitHub에서 새 repository 생성 (이름: momwatching, Public)
# 그 후 터미널에서:

cd /home/zeah/.openclaw/workspace/school-ranking-site

# YOUR_USERNAME을 실제 GitHub 사용자명으로 변경
git remote add origin https://github.com/YOUR_USERNAME/momwatching.git
git branch -M main
git push -u origin main
```

## 2단계: Vercel 배포 (2분)

1. https://vercel.com 방문 → "Continue with GitHub"
2. "New Project" → `momwatching` repository Import
3. 설정 그대로 두고 "Deploy" 버튼만 클릭
4. 완료! (https://momwatching.vercel.app 생성됨)

## 3단계: 도메인 연결 (1분 + 전파 대기)

**Vercel:**
- Settings → Domains → `momwatching.com` 추가
- DNS 설정 정보 확인 (A: 76.76.21.21, CNAME: cname.vercel-dns.com)

**Namecheap:**
- Domain List → momwatching.com → MANAGE → Advanced DNS
- A Record: `@` → `76.76.21.21`
- CNAME: `www` → `cname.vercel-dns.com`
- SAVE ALL CHANGES

**대기:**
- 10-30분 후 https://momwatching.com 접속 확인

## 완료!

코드 수정 후:
```bash
git add .
git commit -m "Update"
git push
```
→ Vercel이 자동으로 재배포

---

문제 발생 시 `deployment-guide.md`의 "4.3 일반적인 문제 해결" 참조
