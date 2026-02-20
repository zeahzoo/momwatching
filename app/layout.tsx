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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link href="/" className="flex items-center gap-3 text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700">
                <Image src="/logo.svg" alt="엄마가 보고 있다 로고" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
                <span className="whitespace-nowrap">엄마가 보고 있다</span>
              </Link>
              <div className="flex gap-3 md:gap-6 items-center flex-wrap text-sm md:text-base">
                <Link href="/news" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
                  뉴스
                </Link>
                <Link href="/rankings" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
                  종합순위
                </Link>
                <Link href="/foreign-language-high" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
                  외고순위
                </Link>
                <Link href="/autonomous-high" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
                  자사고순위
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
                  Contact
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
                  About
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
