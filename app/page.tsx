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
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.error('Error loading data.json:', error);
    return {
      schools: {},
      metadata: {
        collection_date: new Date().toISOString(),
        data_source: 'Error',
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
    const filePath = path.join(process.cwd(), 'public', 'data', 'news.json');
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
  const rankedSchools = getRankedSchools(data, '2026');
  const latestNews = await getLatestNews();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Hero Header */}
        <header className="text-center mb-12">
          <div className="inline-block px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-bold mb-5 shadow-lg">
            2026학년도
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            서울대 진학 순위
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium">
            전국 <span className="text-blue-600 font-bold">{rankedSchools.length}개</span> 고등학교 실적 분석
          </p>
        </header>

        {/* Rankings Card */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">전체 순위</h2>
              <p className="text-blue-100 text-sm mt-1">2026학년도 서울대학교 진학 실적</p>
            </div>
            <div className="p-6">
              <SchoolTable schools={rankedSchools} startRank={1} />
            </div>
          </div>
        </div>

        {/* Latest News Section */}
        {latestNews.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">정보방</h2>
                <p className="text-gray-600 text-sm mt-1">최신 입시 소식</p>
              </div>
              <Link 
                href="/news"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                전체보기 →
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
