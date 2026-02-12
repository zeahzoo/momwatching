import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "고등학교 입시 순위 - 서울대 진학 실적",
  description: "전국 주요 고등학교의 서울대 진학 실적을 한눈에 확인하세요. 5개년 추이 분석, 수시/정시 비율, 지역별 순위 제공.",
  keywords: "고등학교, 입시, 순위, 서울대, 진학 실적, 수시, 정시",
  metadataBase: new URL('https://momwatching.com'),
  openGraph: {
    title: "고등학교 입시 순위 - momwatching.com",
    description: "전국 주요 고등학교의 서울대 진학 실적 분석",
    type: "website",
    url: "https://momwatching.com",
    siteName: "momwatching.com",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "고등학교 입시 순위 - momwatching.com",
    description: "전국 주요 고등학교의 서울대 진학 실적 분석",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification tag
    // Replace 'YOUR_VERIFICATION_CODE' with actual code from Google Search Console
    google: 'YOUR_VERIFICATION_CODE',
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
              <div className="flex gap-6 items-center">
                <Link href="/about" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  About
                </Link>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1">
                    의대 진학
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link href="/medical/2024" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-md">
                      2024년
                    </Link>
                    <Link href="/medical/2023" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 opacity-50 cursor-not-allowed">
                      2023년 (준비중)
                    </Link>
                    <Link href="/medical/2022" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 opacity-50 cursor-not-allowed">
                      2022년 (준비중)
                    </Link>
                    <Link href="/medical/2021" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 opacity-50 cursor-not-allowed rounded-b-md">
                      2021년 (준비중)
                    </Link>
                  </div>
                </div>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1">
                    서울대 진학
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link href="/seoul/2025" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-md">
                      2025년
                    </Link>
                    <Link href="/seoul/2024" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      2024년
                    </Link>
                    <Link href="/seoul/2023" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      2023년
                    </Link>
                    <Link href="/seoul/2022" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      2022년
                    </Link>
                    <Link href="/seoul/2021" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-md">
                      2021년
                    </Link>
                  </div>
                </div>
                <Link href="/rankings" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  종합 순위
                </Link>
                <Link href="/news" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  입시 뉴스
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
