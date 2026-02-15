import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '외국어고등학교 순위 - 엄마가 보고 있다',
  description: '전국 외국어고등학교의 대학 진학 실적을 비교 분석합니다.',
  keywords: '외고, 외국어고, 대원외고, 명덕외고, 대일외고, 한영외고, 진학실적',
};

export default function ForeignLanguageHighPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          외국어고등학교 순위
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          전국 외국어고등학교의 대학 진학 실적 데이터를 준비 중입니다.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 max-w-2xl mx-auto">
          <p className="text-gray-700 text-left">
            <strong className="text-blue-600">곧 공개 예정:</strong><br />
            • 대원외고, 명덕외고, 대일외고, 한영외고 등 주요 외고<br />
            • 서울대, SKY 대학 진학 실적<br />
            • 수시/정시 합격자 분석<br />
            • 최근 5년간 트렌드 비교
          </p>
        </div>
      </div>
    </div>
  );
}
