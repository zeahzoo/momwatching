import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import SchoolCard from '@/components/SchoolCard';
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
  const schoolNames = Object.keys(data.schools || {});
  const latestNews = await getLatestNews();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            고등학교 입시 순위
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            서울대 진학 실적 기준 (2025년)
          </p>
          <p className="text-sm text-gray-500">
            출처: {data.metadata.data_source} | 업데이트: {new Date(data.metadata.last_updated).toLocaleDateString('ko-KR')}
          </p>
        </header>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <SearchBar schools={schoolNames} />
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">서비스 소개</h2>
          <div className="text-gray-700 space-y-2">
            <p>전국 주요 고등학교의 서울대 진학 실적을 한눈에 확인할 수 있습니다.</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>{data.metadata.total_schools}개 학교</strong> 데이터 제공</li>
              <li><strong>{data.metadata.years_covered.join(', ')}년</strong> 5개년 추이 분석</li>
              <li>수시/정시 합격자 비율 시각화</li>
              <li>지역별, 학교 유형별 필터링</li>
            </ul>
          </div>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {top20.map((school, index) => (
              <SchoolCard key={school.name} school={school} rank={index + 1} />
            ))}
          </div>
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
