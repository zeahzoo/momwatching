import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "고등학교 입시 순위 - 서울대 진학 실적",
  description: "전국 주요 고등학교의 서울대 진학 실적을 한눈에 확인하세요. 5개년 추이 분석, 수시/정시 비율, 지역별 순위 제공.",
  keywords: "고등학교, 입시, 순위, 서울대, 진학 실적, 수시, 정시",
  openGraph: {
    title: "고등학교 입시 순위",
    description: "전국 주요 고등학교의 서울대 진학 실적 분석",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                momwatching.com
              </Link>
              <div className="flex gap-6">
                <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  고등학교 순위
                </Link>
                <Link href="/news" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  입시 뉴스
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-900 text-white py-6 mt-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center">
              <p className="text-gray-500 text-xs">
                데이터 출처: 베리타스알파
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
