import type { Metadata } from "next";
import "./globals.css";

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
        {children}
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © 2026 고등학교 입시 순위. 본 데이터는 참고 자료로만 활용해 주시기 바랍니다.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                데이터 출처: 베리타스알파, 공공데이터
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
