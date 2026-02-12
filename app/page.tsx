import Link from 'next/link';
import SchoolTable from '@/components/SchoolTable';
import NewsCard from '@/components/NewsCard';
import { getRankedSchools } from '@/lib/utils';
import { Database } from '@/lib/types';
import { NewsArticle } from '@/lib/news-types';
import { promises as fs } from 'fs';
import path from 'path';

async function getData(): Promise<Database> {
  try {
    // Read data.json from the file system
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.error('Error loading data.json:', error);
    // Fallback data in case of error
    return {
      schools: {},
      metadata: {
        collection_date: new Date().toISOString(),
        data_source: '데이터 로드 실패',
        years_covered: ['2025'],
        universities_covered: ['서울대'],
        total_schools: 0,
        description: 'Error loading data',
        last_updated: new Date().toISOString()
      }
    };
  }
}

async function getLatestNews(): Promise<NewsArticle[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'news.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const articles = JSON.parse(fileContents);
    return articles.sort((a: NewsArticle, b: NewsArticle) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 3);
  } catch (error) {
    console.error('Error loading news.json:', error);
    return [];
  }
}

export default async function Home() {
  const data: Database = await getData();
  const rankedSchools = getRankedSchools(data, '2025');
  const top20 = rankedSchools.slice(0, 20);
  const latestNews = await getLatestNews();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            고등학교 입시 순위
          </h1>
        </header>

        {/* Event Banner */}
        <a 
          href="mailto:contact@momwatching.com"
          className="block mb-12 p-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] text-white"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-6">momwatching.com 오픈 기념 이벤트</h2>
            
            <div className="max-w-2xl mx-auto text-lg leading-relaxed">
              <p className="mb-4 font-semibold text-xl">학부모님과 학생 여러분께 드리는 특별한 기회!</p>
              
              <p className="mb-4">귀하의 학교 또는 자녀 학교의 진학 정보를 공유해주세요.</p>
              
              <ul className="mb-4 space-y-2">
                <li>• 서울대/의대 합격 실적</li>
                <li>• 수시/정시 합격 인원</li>
                <li>• 연도별 데이터</li>
              </ul>
              
              <p className="mb-6 font-semibold text-xl">중복되지 않은 유효한 정보 제공 시 상품권을 드립니다!</p>
              
              <div className="flex items-center justify-center gap-2 text-2xl">
                <span>📧</span>
                <span className="font-bold underline">제보: contact@momwatching.com</span>
              </div>
            </div>
          </div>
        </a>

        {/* Top 20 Rankings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Top 20 순위</h2>
            <Link 
              href="/rankings"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
            >
              전체 순위 보기 →
            </Link>
          </div>
          <SchoolTable schools={top20} startRank={1} />
        </div>

        {/* Latest News Section */}
        {latestNews.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">최신 입시 뉴스</h2>
              <Link 
                href="/news"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
              >
                뉴스 전체보기 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
