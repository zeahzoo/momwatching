export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  date: string;
  summary: string;
  content: string;
  image: string;
  keywords: string[];
  source: string;
}

export interface NewsDatabase {
  articles: NewsArticle[];
}
