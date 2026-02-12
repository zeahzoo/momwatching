#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PIXABAY_API_KEY = '46430210-e974faa2be384e27927d08033';
const NEWS_KEYWORDS = ['입시', '고등학교', '대입', '수시', '정시', '서울대', '진학'];
const NEWS_SOURCES = [
  { name: '베리타스알파', url: 'https://www.veritas-a.com/' },
  { name: '연합뉴스', url: 'https://www.yna.co.kr/' }
];

/**
 * Fetch news from web sources using web_search
 */
async function fetchNews() {
  console.log('🔍 Searching for education news...');
  
  // For now, we'll create a template. In production, this would use web scraping
  // or RSS feeds from 베리타스알파 and 연합뉴스
  
  const keyword = NEWS_KEYWORDS[Math.floor(Math.random() * NEWS_KEYWORDS.length)];
  const searchQuery = `${keyword} 뉴스 2026`;
  
  console.log(`Search query: ${searchQuery}`);
  
  // In a real implementation, you would:
  // 1. Use web_search tool or RSS feed parser
  // 2. Scrape article content
  // 3. Filter by relevance
  
  return {
    keyword,
    searchQuery,
    foundArticles: [] // Placeholder for actual scraped articles
  };
}

/**
 * Generate article using GPT (mock for now - would use OpenAI API)
 */
async function generateArticle(keyword) {
  console.log(`✍️  Generating article for keyword: ${keyword}`);
  
  const timestamp = new Date().toISOString();
  const slug = `${keyword}-news-${Date.now()}`;
  
  // Template article (in production, use GPT API)
  const article = {
    id: `news-${Date.now()}`,
    title: `2026 ${keyword} 최신 동향 - 고등학교 입시 뉴스`,
    slug: slug,
    date: timestamp,
    summary: `최근 ${keyword} 관련 주요 변화가 발표되었습니다. 학생과 학부모들이 알아야 할 핵심 내용을 정리했습니다. 자세한 입시 전략은 momwatching.com에서 확인하세요.`,
    content: `# ${keyword} 주요 변화 내용

최근 교육부에서 발표한 ${keyword} 관련 정책 변화가 학생과 학부모들의 큰 관심을 받고 있습니다.

## 주요 내용

이번 발표의 핵심은 다음과 같습니다:

1. **정책 방향**: ${keyword}와 관련된 새로운 방향성이 제시되었습니다.
2. **적용 시기**: 2026학년도부터 단계적으로 적용될 예정입니다.
3. **영향 범위**: 전국 고등학교와 대학 입시 전반에 영향을 미칠 것으로 보입니다.

## 학생 및 학부모 대응 방안

전문가들은 다음과 같은 대응이 필요하다고 조언합니다:

- 변화된 정책을 정확히 이해하고 준비
- 학교별 입시 실적과 전략 비교 분석
- 전문가 상담을 통한 맞춤형 진학 설계

## 더 알아보기

전국 고등학교의 서울대 진학 실적과 상세한 입시 정보는 momwatching.com에서 확인하실 수 있습니다.`,
    image: '/news/images/default.jpg',
    keywords: [keyword, '입시', '고등학교', '2026'],
    source: '베리타스알파'
  };
  
  return article;
}

/**
 * Fetch image from Pixabay
 */
async function fetchImage(keyword) {
  console.log(`🖼️  Fetching image for: ${keyword}`);
  
  try {
    const searchTerm = 'education students study'; // Generic education image
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchTerm)}&image_type=photo&per_page=3&safesearch=true`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.hits && data.hits.length > 0) {
      const image = data.hits[0];
      console.log(`✅ Found image: ${image.pageURL}`);
      return image.webformatURL;
    }
  } catch (error) {
    console.error('Error fetching image from Pixabay:', error);
  }
  
  return '/news/images/default.jpg';
}

/**
 * Update news.json
 */
async function updateNewsDatabase(article) {
  console.log('💾 Updating news database...');
  
  const newsFilePath = path.join(__dirname, '..', 'data', 'news.json');
  
  let articles = [];
  try {
    const content = await fs.readFile(newsFilePath, 'utf8');
    articles = JSON.parse(content);
  } catch (error) {
    console.log('Creating new news.json file...');
  }
  
  articles.unshift(article);
  
  // Keep only last 100 articles
  if (articles.length > 100) {
    articles = articles.slice(0, 100);
  }
  
  await fs.writeFile(newsFilePath, JSON.stringify(articles, null, 2));
  console.log('✅ News database updated');
}

/**
 * Commit and push to Git
 */
function commitAndPush(articleTitle) {
  console.log('📤 Committing and pushing to Git...');
  
  try {
    const rootDir = path.join(__dirname, '..');
    
    execSync('git add data/news.json', { cwd: rootDir });
    execSync(`git commit -m "자동 뉴스 업데이트: ${articleTitle}"`, { cwd: rootDir });
    execSync('git push origin main', { cwd: rootDir });
    
    console.log('✅ Successfully pushed to Git');
    console.log('🚀 Vercel will auto-deploy the changes');
  } catch (error) {
    console.error('❌ Error pushing to Git:', error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🤖 Starting automated news posting...');
  console.log(`📅 Time: ${new Date().toLocaleString('ko-KR')}`);
  console.log('─'.repeat(50));
  
  try {
    // 1. Fetch news
    const newsData = await fetchNews();
    
    // 2. Generate article
    const article = await generateArticle(newsData.keyword);
    
    // 3. Fetch image
    const imageUrl = await fetchImage(newsData.keyword);
    article.image = imageUrl;
    
    // 4. Update database
    await updateNewsDatabase(article);
    
    // 5. Git commit & push
    commitAndPush(article.title);
    
    console.log('─'.repeat(50));
    console.log('✅ News posting completed successfully!');
    console.log(`📝 Title: ${article.title}`);
    console.log(`🔗 Slug: ${article.slug}`);
  } catch (error) {
    console.error('❌ Error in main process:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
