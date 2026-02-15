import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - 엄마가 보고 있다',
  description: '대한민국 고등학교 서울대 진학 실적을 분석하고 제공하는 엄마가 보고 있다 소개',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            엄마가 보고 있다
          </h1>
          <p className="text-xl text-gray-600">
            대한민국 고등학교 서울대 진학 데이터 분석 플랫폼
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* 소개 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              우리의 미션
            </h2>
            <p className="text-gray-700 leading-relaxed">
              엄마가 보고 있다는 대한민국 고등학교의 서울대학교 진학 실적을 체계적으로 분석하고 제공하는 데이터 플랫폼입니다. 
              학부모와 학생들이 객관적인 데이터를 바탕으로 진학 결정을 내릴 수 있도록 돕습니다.
            </p>
          </section>

          {/* 제공하는 정보 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              제공하는 정보
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>전국 주요 고등학교 서울대 진학 실적</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>5년간(2021-2025) 트렌드 분석</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>수시/정시 전형별 세부 데이터</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>지역별, 학교 유형별 비교 분석</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>매년 업데이트되는 최신 데이터</span>
              </li>
            </ul>
          </section>

          {/* 데이터 특징 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              데이터 특징
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">5년 트렌드</h3>
                <p className="text-sm text-gray-600">
                  최근 5년간 데이터를 통해 학교별 진학 추세를 파악할 수 있습니다
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">수시/정시</h3>
                <p className="text-sm text-gray-600">
                  전형 유형별로 구분된 데이터로 전략적 정보 제공
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">시각화</h3>
                <p className="text-sm text-gray-600">
                  차트, 그래프, 테이블로 한눈에 비교 가능
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">검색 및 필터</h3>
                <p className="text-sm text-gray-600">
                  학교명, 지역, 기간 등 다양한 필터로 원하는 정보 탐색
                </p>
              </div>
            </div>
          </section>

          {/* 비전 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              우리의 비전
            </h2>
            <p className="text-gray-700 leading-relaxed">
              엄마가 보고 있다는 단순한 순위 나열을 넘어서, 
              데이터 기반의 인사이트를 통해 학생과 학부모의 현명한 진로 선택을 돕습니다. 
              앞으로도 더 많은 데이터와 분석을 제공하여 교육 정보의 투명성을 높이겠습니다.
            </p>
          </section>

          {/* Footer Note */}
          <section className="border-t pt-6">
            <p className="text-sm text-gray-500 text-center">
              모든 데이터는 공개된 자료를 바탕으로 수집되었습니다. 
              <br />
              데이터 오류나 문의사항은 <a href="/contact" className="text-blue-600 hover:underline">Contact 페이지</a>를 통해 알려주세요.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
