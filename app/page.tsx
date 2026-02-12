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
          className="block mb-12 py-5 px-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] text-white"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">🎉 오픈 기념 이벤트</h2>
            
            <div className="max-w-3xl mx-auto text-sm leading-snug space-y-1">
              <p className="font-medium">고등학교 대학 합격 정보를 제공해주세요! (사진, 동영상, 문서 형태 모두 가능)</p>
              <p className="font-medium">각 대학별 합격 인원에 대한 정보를 제공해 주세요. 모든 대학의 정보가 소중합니다.</p>
              <p className="font-medium">중복되지 않은 유효한 정보 제공 시 5,000원 상당의 상품권을 드립니다.</p>
              <p className="text-xs mt-2 opacity-90">📧 정보 제공: contact@momwatching.com</p>
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
