import Link from 'next/link';
import NewsCard from '@/components/NewsCard';
import { NewsArticle } from '@/lib/news-types';
import { promises as fs } from 'fs';
import path from 'path';

async function getLatestNews(): Promise<NewsArticle[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'news.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const articles = JSON.parse(fileContents);
    if (!Array.isArray(articles)) {
      console.error('news.json is not an array');
      return [];
    }
    return articles.sort((a: NewsArticle, b: NewsArticle) => {
      const dateB = b.date || b.publishDate || new Date().toISOString();
      const dateA = a.date || a.publishDate || new Date().toISOString();
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    }).slice(0, 6);
  } catch (error) {
    console.error('Error loading news.json:', error);
    return [];
  }
}

interface MWRanking {
  순위: number;
  학교명: string;
  종합점수: number;
}

async function getMWTopRankings(): Promise<MWRanking[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'mw-overall-ranking.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    if (!data || !Array.isArray(data.rankings)) {
      console.error('mw-overall-ranking.json is invalid');
      return [];
    }
    return data.rankings.slice(0, 10);
  } catch (error) {
    console.error('Error loading MW rankings:', error);
    return [];
  }
}

export default async function Home() {
  const latestNews = await getLatestNews();
  const topRankings = await getMWTopRankings();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Hero Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            엄마가 보고 있다
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium mb-6">
            전국 고등학교 진학 실적 정보
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/rankings"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              📊 MW 종합순위
            </Link>
            <Link 
              href="/foreign-language-high"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              🏫 외고 순위
            </Link>
            <Link 
              href="/autonomous-high"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              🎓 자사고 순위
            </Link>
            <Link 
              href="/ilta-ranking"
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              🔥 일타강사
            </Link>
          </div>
        </header>

        {/* Latest News Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">📰 최신 뉴스</h2>
              <p className="text-gray-600 text-sm mt-1">고등학교 진학 관련 최신 소식</p>
            </div>
            <Link 
              href="/news"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              전체보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* MW Rankings Preview */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">MW 종합순위 TOP 10</h2>
                <p className="text-purple-100 text-sm mt-1">서울대 + 의약계열 합격 실적 종합 순위</p>
              </div>
              <Link 
                href="/rankings"
                className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-all font-semibold text-sm"
              >
                전체 순위 →
              </Link>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b-2 border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">순위</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">학교명</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">종합점수</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topRankings.map((school, index) => (
                      <tr key={school.학교명} className={index < 3 ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {index === 0 && <span className="text-xl mr-2">🥇</span>}
                            {index === 1 && <span className="text-xl mr-2">🥈</span>}
                            {index === 2 && <span className="text-xl mr-2">🥉</span>}
                            <span className="font-bold text-gray-900">{school.순위}위</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{school.학교명}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-bold text-lg ${
                            index === 0 ? 'text-yellow-600' :
                            index === 1 ? 'text-gray-500' :
                            index === 2 ? 'text-orange-600' :
                            'text-purple-600'
                          }`}>
                            {school.종합점수}점
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/seoul/2026" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100">
            <h3 className="text-xl font-bold text-blue-600 mb-2">🏛️ 서울대 순위</h3>
            <p className="text-gray-600 text-sm">2021-2026년도 서울대 합격 실적</p>
          </Link>
          
          <Link href="/medical" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100">
            <h3 className="text-xl font-bold text-green-600 mb-2">🏥 의대 순위</h3>
            <p className="text-gray-600 text-sm">전국 의대 합격 실적 순위</p>
          </Link>
          
          <Link href="/about" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100">
            <h3 className="text-xl font-bold text-purple-600 mb-2">ℹ️ About</h3>
            <p className="text-gray-600 text-sm">엄마가 보고 있다 소개</p>
          </Link>
        </div>

      </div>
    </main>
  );
}
