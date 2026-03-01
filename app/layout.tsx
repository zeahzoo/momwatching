import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Script from 'next/script';

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
      <head>
        {/* Google AdSense - 신청 후 받은 코드를 여기에 삽입하세요 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5250822488285541"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        <Navigation />
        {children}
        <footer className="bg-gray-900 text-white py-6 mt-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center space-y-2">
              <div className="text-gray-400 text-sm">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  개인정보 처리방침
                </Link>
                {' | '}
                <Link href="/contact" className="hover:text-white transition-colors">
                  문의하기
                </Link>
              </div>
              <p className="text-gray-500 text-xs">
                © 2026 엄마가 보고 있다 (momwatching.com)
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
