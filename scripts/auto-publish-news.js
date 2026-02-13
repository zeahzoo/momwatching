#!/usr/bin/env node
/**
 * momwatching.com 뉴스 자동 발행 스크립트
 * 대기 중인 기사를 하나씩 발행합니다.
 */

const fs = require('fs');
const path = require('path');

// 설정
const NEWS_DIR = path.join(__dirname, '../public/data');
const NEWS_FILE = path.join(NEWS_DIR, 'news.json');
const QUEUE_FILE = path.join(NEWS_DIR, 'news-queue.json');

async function main() {
  try {
    // 1. 현재 발행된 뉴스 읽기
    let publishedNews = [];
    if (fs.existsSync(NEWS_FILE)) {
      const content = fs.readFileSync(NEWS_FILE, 'utf-8');
      publishedNews = JSON.parse(content);
    }

    // 2. 대기 중인 뉴스 읽기
    if (!fs.existsSync(QUEUE_FILE)) {
      console.log('❌ 대기 중인 뉴스가 없습니다.');
      return;
    }

    const queueContent = fs.readFileSync(QUEUE_FILE, 'utf-8');
    const queuedNews = JSON.parse(queueContent);

    if (queuedNews.length === 0) {
      console.log('✅ 모든 뉴스가 발행되었습니다!');
      return;
    }

    // 3. 첫 번째 기사 꺼내기
    const articleToPublish = queuedNews.shift();

    // 4. 발행된 뉴스에 추가
    publishedNews.unshift(articleToPublish);

    // 5. 파일 업데이트
    fs.writeFileSync(NEWS_FILE, JSON.stringify(publishedNews, null, 2), 'utf-8');
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(queuedNews, null, 2), 'utf-8');

    // 6. Git 커밋 및 푸시
    const { execSync } = require('child_process');
    const workDir = path.join(__dirname, '..');
    
    execSync('git add public/data/news.json public/data/news-queue.json', { cwd: workDir });
    execSync(`git commit -m "Auto-publish: ${articleToPublish.title}"`, { cwd: workDir });
    execSync('git push origin main', { cwd: workDir });

    console.log(`✅ 발행 완료: ${articleToPublish.title}`);
    console.log(`📰 남은 기사: ${queuedNews.length}개`);

  } catch (error) {
    console.error('❌ 발행 실패:', error.message);
    process.exit(1);
  }
}

main();
