import NewsCard from '@/components/NewsCard';
import { NewsArticle } from '@/lib/news-types';
import { promises as fs } from 'fs';
import path from 'path';

async function getNewsData(): Promise<NewsArticle[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'news.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const articles = JSON.parse(fileContents);
    // Sort by date, newest first
    return articles.sort((a: NewsArticle, b: NewsArticle) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading news.json:', error);
    return [];
  }
}

export default async function NewsPage() {
  const articles = await getNewsData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            입시 뉴스
          </h1>
          <p className="text-xl text-gray-600">
            최신 고등학교 입시 및 진학 뉴스를 확인하세요
          </p>
        </header>

        {/* News Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">아직 등록된 뉴스가 없습니다.</p>
            <p className="text-gray-400 text-sm mt-2">곧 최신 입시 뉴스를 제공할 예정입니다.</p>
          </div>
        )}
      </div>
    </main>
  );
}
