import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/lib/news-types';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link href={`/news/${article.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer border-t-4 border-blue-500">
        <div className="relative h-48 w-full">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
            <span>{new Date(article.date).toLocaleDateString('ko-KR')}</span>
            <span>•</span>
            <span className="text-blue-600">{article.source}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {article.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {article.keywords.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
