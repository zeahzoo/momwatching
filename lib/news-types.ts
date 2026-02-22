export interface NewsArticle {
  id?: string;
  title: string;
  slug: string;
  date?: string;
  publishDate?: string;
  summary: string;
  content: string;
  image?: string;
  imageUrl?: string;
  keywords?: string[];
  tags?: string[];
  source?: string;
  author?: string;
  category?: string;
}

export interface NewsDatabase {
  articles: NewsArticle[];
}
