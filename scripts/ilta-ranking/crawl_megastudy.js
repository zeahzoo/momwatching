#!/usr/bin/env node
/**
 * 메가스터디 수학 강사 크롤링
 * 출처: megastudy.net
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SUBJECTS = {
  math: '수학',
  english: '영어',
  korean: '국어',
  science: '과탐',
  social: '사탐'
};

// 데이터 저장 경로
const DATA_DIR = path.join(__dirname, '../../public/ilta-ranking/data/raw');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * 메가스터디 강사 정보 수집
 * 주의: 실제 크롤링 대신 공개 API/RSS가 있다면 사용
 */
async function crawlMegastudy(subject = 'math') {
  console.log(`[메가스터디] ${SUBJECTS[subject]} 강사 크롤링 시작...`);
  
  // 실제 구현 시: Puppeteer 또는 공식 API 사용
  // 여기서는 구조만 준비
  
  const mockData = [
    {
      name: '현우진',
      platform: '메가스터디',
      subject: subject,
      courses: ['뉴런 수학'],
      rating: 4.9,
      reviewCount: 15234,
      profileUrl: 'https://www.megastudy.net/teacher/home.asp?tea_idx=111',
      lastUpdated: new Date().toISOString()
    },
    {
      name: '정승제',
      platform: '메가스터디',
      subject: subject,
      courses: ['정승제 수학'],
      rating: 4.8,
      reviewCount: 12456,
      profileUrl: 'https://www.megastudy.net/teacher/home.asp?tea_idx=222',
      lastUpdated: new Date().toISOString()
    }
  ];
  
  // 저장
  const filename = `megastudy_${subject}_${Date.now()}.json`;
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(mockData, null, 2), 'utf8');
  
  console.log(`[메가스터디] 저장 완료: ${filename}`);
  return mockData;
}

/**
 * 메인 실행
 */
if (require.main === module) {
  const subject = process.argv[2] || 'math';
  crawlMegastudy(subject)
    .then(data => {
      console.log(`[메가스터디] 총 ${data.length}명 수집 완료`);
    })
    .catch(err => {
      console.error('[메가스터디] 에러:', err.message);
      process.exit(1);
    });
}

module.exports = { crawlMegastudy };
