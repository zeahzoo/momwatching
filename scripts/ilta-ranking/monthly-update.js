#!/usr/bin/env node
/**
 * 일타 강사 순위 월간 자동 업데이트 스크립트
 * 매월 1일 자동 실행
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DATA_DIR = path.join(__dirname, '../../public/ilta-ranking/data');
const LOG_FILE = path.join(__dirname, '../../logs/ilta-ranking-update.log');

// 로그 함수
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage.trim());
  
  // 로그 파일에 저장
  const logDir = path.dirname(LOG_FILE);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  fs.appendFileSync(LOG_FILE, logMessage);
}

// 데이터 수집 시뮬레이션 (실제로는 웹 스크래핑)
async function collectData(subject) {
  log(`[${subject}] 데이터 수집 시작...`);
  
  // TODO: 실제 크롤링 로직
  // - 메가스터디 API/스크래핑
  // - 이투스 API/스크래핑
  // - 대성마이맥 API/스크래핑
  // - 오르비 커뮤니티 분석
  
  // 임시: 기존 데이터 복사
  const sourceFile = path.join(DATA_DIR, `${subject}_ranking_2026-02.json`);
  if (fs.existsSync(sourceFile)) {
    const data = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
    
    // 날짜 업데이트
    const now = new Date();
    const period = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    data.lastUpdated = now.toISOString().split('T')[0];
    data.period = period;
    
    // 새 파일 저장
    const newFile = path.join(DATA_DIR, `${subject}_ranking_${period}.json`);
    fs.writeFileSync(newFile, JSON.stringify(data, null, 2));
    
    log(`[${subject}] 데이터 수집 완료: ${newFile}`);
    return newFile;
  } else {
    log(`[${subject}] 기존 데이터 없음. 스킵.`);
    return null;
  }
}

// Git 커밋 및 푸시
function gitCommitPush(message) {
  try {
    const repoDir = path.join(__dirname, '../..');
    
    log('[Git] 변경사항 추가 중...');
    execSync('git add .', { cwd: repoDir, stdio: 'inherit' });
    
    log('[Git] 커밋 중...');
    execSync(`git commit -m "${message}"`, { cwd: repoDir, stdio: 'inherit' });
    
    log('[Git] 푸시 중...');
    execSync('git push origin main', { cwd: repoDir, stdio: 'inherit' });
    
    log('[Git] 푸시 완료!');
    return true;
  } catch (error) {
    log(`[Git] 에러: ${error.message}`);
    return false;
  }
}

// 메인 실행
async function main() {
  log('=== 일타 강사 순위 월간 업데이트 시작 ===');
  
  const subjects = ['math', 'english', 'korean', 'science', 'social'];
  const updatedFiles = [];
  
  for (const subject of subjects) {
    try {
      const file = await collectData(subject);
      if (file) {
        updatedFiles.push(subject);
      }
      
      // Rate limiting (10초 대기)
      await new Promise(resolve => setTimeout(resolve, 10000));
    } catch (error) {
      log(`[${subject}] 에러: ${error.message}`);
    }
  }
  
  if (updatedFiles.length > 0) {
    const now = new Date();
    const period = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const message = `Update ilta-ranking: ${period} (${updatedFiles.join(', ')})`;
    
    log(`업데이트된 과목: ${updatedFiles.join(', ')}`);
    
    // Git 커밋 및 푸시
    const success = gitCommitPush(message);
    
    if (success) {
      log('=== 월간 업데이트 완료! ===');
      log(`총 ${updatedFiles.length}개 과목 업데이트됨`);
    } else {
      log('=== 월간 업데이트 실패 (Git 푸시 에러) ===');
    }
  } else {
    log('=== 업데이트할 데이터 없음 ===');
  }
}

// 실행
if (require.main === module) {
  main().catch(error => {
    log(`[FATAL] ${error.message}`);
    process.exit(1);
  });
}

module.exports = { main };
