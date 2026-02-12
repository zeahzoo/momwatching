# 고등학교 입시 순위 웹사이트

전국 주요 고등학교의 서울대 진학 실적을 분석하는 웹사이트입니다.

## 🚀 기능

- **홈페이지** (`/`)
  - 검색 바로 학교 검색
  - Top 20 순위표 (2025년 기준)
  - 서비스 소개 및 데이터 유의사항

- **전체 순위** (`/rankings`)
  - 전체 학교 리스트
  - 연도별 필터 (2021-2025)
  - 지역별 필터
  - 학교 유형별 필터

- **학교 상세** (`/school/[id]`)
  - 5년 추이 라인 그래프
  - 수시/정시 비율 도넛 차트
  - 연도별 상세 데이터 테이블
  - 학교 기본 정보

## 🛠 기술 스택

- **Frontend Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Charts:** Chart.js + react-chartjs-2
- **Language:** TypeScript

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

## 🌐 접속

개발 서버: http://localhost:3000

## 📊 데이터

- **출처:** 베리타스알파, 공공데이터
- **학교 수:** 70개
- **기간:** 2021-2025 (5개년)
- **데이터 파일:** `/public/data.json`

## 📁 프로젝트 구조

```
school-ranking-site/
├── app/
│   ├── page.tsx              # 홈페이지
│   ├── layout.tsx            # 레이아웃
│   ├── globals.css           # 글로벌 스타일
│   ├── rankings/
│   │   └── page.tsx          # 전체 순위
│   └── school/
│       └── [id]/
│           └── page.tsx      # 학교 상세
├── components/
│   ├── SearchBar.tsx         # 검색 바 컴포넌트
│   └── SchoolCard.tsx        # 학교 카드 컴포넌트
├── lib/
│   ├── types.ts              # 타입 정의
│   └── utils.ts              # 유틸리티 함수
└── public/
    └── data.json             # 학교 데이터
```

## ✨ 주요 특징

- ✅ 반응형 디자인 (모바일 최적화)
- ✅ SEO 최적화 (메타 태그)
- ✅ 접근성 (a11y) 고려
- ✅ 데이터 시각화 (Chart.js)
- ✅ 깔끔한 UI/UX (파란색 계열)
- ✅ 실시간 검색 자동완성

## ⚠️ 유의사항

본 웹사이트의 데이터는 참고 자료로만 활용해 주시기 바랍니다. 
학교의 진학 실적이 교육의 전반적인 품질을 대표하지 않습니다.

## 📝 License

MIT License
