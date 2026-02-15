import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "엄마가 보고 있다 - 고등학교 서울대 진학 실적 분석",
  description: "전국 고등학교의 서울대학교 진학 실적을 분석합니다. 5년간 트렌드, 수시/정시 비교, 지역별 분석을 제공합니다.",
  keywords: "서울대, 진학실적, 고등학교, 입시정보, 수시, 정시, 대입, 엄마가보고있다",
  metadataBase: new URL('https://momwatching.com'),
  openGraph: {
    title: "엄마가 보고 있다 - 고등학교 서울대 진학 실적",
    description: "전국 고등학교 서울대 진학 데이터 분석",
    type: "website",
    url: "https://momwatching.com",
    siteName: "엄마가 보고 있다",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "엄마가 보고 있다 - 고등학교 서울대 진학 실적",
    description: "전국 고등학교 서울대 진학 데이터 분석",
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
  icons: {
    icon: '/favicon.svg',
    apple: '/logo.svg',
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
              <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-blue-600 hover:text-blue-700">
                <Image src="/logo.svg" alt="엄마가 보고 있다 로고" width={40} height={40} className="w-10 h-10" />
                <span>엄마가 보고 있다</span>
              </Link>
              <div className="flex gap-6 items-center">
                <Link href="/about" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  About
                </Link>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1">
                    의대 진학 실적
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase border-b">최신 데이터</div>
                    <Link href="/medical/2026" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      2026
                    </Link>
                    <Link href="/medical/2025" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      2025
                    </Link>
                    <div className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase border-b mt-2">과거 데이터</div>
                    <Link href="/medical/2024" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      2024
                    </Link>
                    <Link href="/medical/2023" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 opacity-50 cursor-not-allowed">
                      2023 (준비중)
                    </Link>
                    <Link href="/medical/2022" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 opacity-50 cursor-not-allowed">
                      2022 (준비중)
                    </Link>
                    <Link href="/medical/2021" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 opacity-50 cursor-not-allowed rounded-b-md">
                      2021 (준비중)
                    </Link>
                  </div>
                </div>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1">
                    서울대 실적
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link href="/seoul/2026" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-md">
                      2026
                    </Link>
                    <Link href="/seoul/2025" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      2025
                    </Link>
                    <Link href="/seoul/2024" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      2024
                    </Link>
                    <Link href="/seoul/2023" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      2023
                    </Link>
                    <Link href="/seoul/2022" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      2022
                    </Link>
                    <Link href="/seoul/2021" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-md">
                      2021
                    </Link>
                  </div>
                </div>
                <Link href="/rankings" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  전체 순위
                </Link>
                <Link href="/news" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  뉴스
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
                © 2025 엄마가 보고 있다 (momwatching.com)
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
