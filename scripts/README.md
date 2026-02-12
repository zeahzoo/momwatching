# 자동 뉴스 포스팅 스크립트

## 개요
momwatching.com 입시 뉴스를 자동으로 생성하고 발행하는 시스템입니다.

## 파일 구조
```
scripts/
├── auto-post-news.py      # Python 자동 포스팅 스크립트 (메인)
├── auto-post-news.js       # Node.js 버전 (대안)
├── setup-cron.sh           # Cron job 설정 스크립트
└── README.md               # 이 파일
```

## 기능
- 입시/진학 관련 키워드로 뉴스 주제 선정
- AI로 SEO 최적화된 기사 생성 (600-800자)
- Pixabay에서 관련 이미지 자동 다운로드
- news.json 데이터베이스 업데이트
- Git commit & push (Vercel 자동 배포 트리거)

## 설치 및 설정

### 1. Python 의존성 설치
```bash
pip3 install requests
```

### 2. 수동 실행 (테스트)
```bash
cd /home/zeah/.openclaw/workspace/school-ranking-site
python3 scripts/auto-post-news.py
```

### 3. Cron Job 설정 (자동 실행)
```bash
bash scripts/setup-cron.sh
```

이렇게 하면 매일 2회 자동 실행됩니다:
- **오전 9시 (09:00 KST)**: 1개 뉴스 발행
- **오후 6시 (18:00 KST)**: 1개 뉴스 발행

## Cron Job 관리

### 확인
```bash
crontab -l
```

### 로그 확인
```bash
tail -f logs/news-cron.log
```

### 수정/삭제
```bash
crontab -e
```

## 작동 원리

1. **주제 선정**: 입시, 수시, 정시, 서울대 등 키워드 중 랜덤 선택
2. **컨텐츠 생성**: AI 템플릿으로 기사 작성 (향후 GPT/Claude API 연동)
3. **이미지 검색**: Pixabay API로 교육 관련 이미지 검색
4. **데이터 저장**: data/news.json에 추가 (최대 100개 유지)
5. **Git 배포**: commit & push → Vercel 자동 배포

## API 키 (이미 설정됨)
- Pixabay: `46430210-e974faa2be384e27927d08033`

## 향후 개선 사항
- [ ] OpenAI/Claude API 연동하여 실제 AI 기사 생성
- [ ] 베리타스알파/연합뉴스 RSS 크롤링
- [ ] 웹 검색 API 연동 (Brave Search)
- [ ] 이미지 로컬 저장 (현재는 외부 URL)
- [ ] 중복 주제 방지 로직
- [ ] 관련 학교 페이지 자동 링크

## 문제 해결

### 스크립트 실행 안 됨
```bash
chmod +x scripts/auto-post-news.py
python3 scripts/auto-post-news.py
```

### Git push 실패
```bash
# SSH 키 확인
ssh -T git@github.com

# 또는 HTTPS로 변경
git remote set-url origin https://github.com/username/repo.git
```

### Cron 실행 안 됨
```bash
# Cron 서비스 상태 확인
systemctl status cron

# 로그 확인
grep CRON /var/log/syslog
```

## 지원
문제가 있으면 로그를 확인하거나 스크립트를 수동으로 실행해보세요.
