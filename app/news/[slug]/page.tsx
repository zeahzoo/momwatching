import { NewsArticle } from '@/lib/news-types';
import { promises as fs } from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getNewsData(): Promise<NewsArticle[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'news.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading news.json:', error);
    return [];
  }
}

async function getArticle(slug: string): Promise<NewsArticle | null> {
  const articles = await getNewsData();
  return articles.find((article) => article.slug === slug) || null;
}

export async function generateStaticParams() {
  const articles = await getNewsData();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: '기사를 찾을 수 없습니다 - momwatching.com',
    };
  }

  return {
    title: `${article.title} - momwatching.com`,
    description: article.summary,
    keywords: article.keywords.join(', '),
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/news"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-semibold"
        >
          ← 정보방으로 돌아가기
        </Link>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-96 w-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-6 text-sm text-gray-500">
              <span>{new Date(article.date).toLocaleDateString('ko-KR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
              })}</span>
              <span>•</span>
              <span className="text-blue-600 font-semibold">{article.source}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Summary */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded">
              <p className="text-lg text-gray-700 leading-relaxed">
                {article.summary}
              </p>
            </div>

            {/* Content */}
            <div className="mb-8">
              <div 
                className="article-content text-gray-800"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
            
            <style jsx>{`
              .article-content {
                font-size: 1.125rem;
                line-height: 1.9;
                word-break: keep-all;
                overflow-wrap: break-word;
              }
              
              .article-content h2 {
                font-size: 1.875rem;
                font-weight: 700;
                color: #1e40af;
                margin-top: 2.5rem;
                margin-bottom: 1.25rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid #dbeafe;
              }
              
              .article-content h3 {
                font-size: 1.5rem;
                font-weight: 600;
                color: #2563eb;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              
              .article-content h4 {
                font-size: 1.25rem;
                font-weight: 600;
                color: #3b82f6;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
              }
              
              .article-content p {
                margin-bottom: 1.5rem;
                text-align: justify;
              }
              
              .article-content ul, .article-content ol {
                margin-bottom: 1.5rem;
                padding-left: 2rem;
              }
              
              .article-content li {
                margin-bottom: 0.75rem;
                line-height: 1.8;
              }
              
              .article-content strong {
                font-weight: 700;
                color: #1e3a8a;
              }
              
              .article-content blockquote {
                border-left: 4px solid #3b82f6;
                padding-left: 1.5rem;
                margin: 2rem 0;
                font-style: italic;
                color: #4b5563;
                background-color: #f3f4f6;
                padding: 1.5rem;
                border-radius: 0.5rem;
              }
              
              .article-content blockquote p:last-child {
                margin-bottom: 0;
              }
              
              @media (max-width: 768px) {
                .article-content {
                  font-size: 1rem;
                  line-height: 1.8;
                }
                
                .article-content h2 {
                  font-size: 1.5rem;
                }
                
                .article-content h3 {
                  font-size: 1.25rem;
                }
              }
            `}</style>

            {/* Keywords */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">키워드</h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            더 많은 정보가 필요하신가요?
          </h2>
          <p className="text-gray-600 mb-6">
            전국 고등학교 순위와 진학 실적을 확인해보세요
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
          >
            전체 순위 보기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
