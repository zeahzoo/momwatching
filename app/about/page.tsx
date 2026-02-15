import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - 엄마가 보고 있다',
  description: '대한민국 고등학교 진학 실적과 교육 데이터를 분석하고 제공하는 엄마가 보고 있다 소개',
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
            대한민국 교육 데이터를 투명하게 공개하는 플랫폼
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* 소개 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              우리의 미션
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong className="text-blue-600">엄마가 보고 있다</strong>는 대한민국 고등학교의 진학 실적과 교육 데이터를 체계적으로 수집·분석하여 투명하게 공개하는 데이터 플랫폼입니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              학부모와 학생들이 객관적인 데이터를 바탕으로 현명한 진학 결정을 내릴 수 있도록 돕습니다. 
              엄마의 따뜻하지만 날카로운 시선으로 교육 현장의 진실을 지켜봅니다.
            </p>
          </section>

          {/* 제공하는 정보 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              제공하는 데이터
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-blue-900 mb-2">📊 현재 제공 중</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>서울대 진학 실적</strong> - 전국 고등학교 5년간(2021-2026) 수시/정시 데이터</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>의대 진학 실적</strong> - 전국 고등학교 의학계열 합격 현황</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                <h3 className="font-bold text-gray-900 mb-2">🚀 추가 예정</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>SKY(서울대/연세대/고려대) 통합 진학 실적</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>주요 국립대(카이스트/포스텍/서울시립대 등) 진학 데이터</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>특목고/자사고 내신 및 입시 결과 통계</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>지역별/학교 유형별 심층 분석</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 데이터 특징 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              데이터 특징
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📅 장기 트렌드</h3>
                <p className="text-sm text-gray-600">
                  5년 이상 데이터를 통해 학교별 진학 추세를 파악할 수 있습니다
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🔍 상세 분류</h3>
                <p className="text-sm text-gray-600">
                  수시/정시, 전형별로 구분된 세부 데이터 제공
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📈 시각화</h3>
                <p className="text-sm text-gray-600">
                  차트, 그래프, 테이블로 한눈에 비교 가능
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🔎 검색 및 필터</h3>
                <p className="text-sm text-gray-600">
                  학교명, 지역, 기간 등 다양한 필터로 원하는 정보 탐색
                </p>
              </div>
            </div>
          </section>

          {/* 왜 엄마가 보고 있다인가 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              왜 "엄마가 보고 있다"인가?
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-3">
                엄마의 시선은 <strong className="text-blue-600">따뜻하지만 날카롭습니다.</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                자녀의 미래를 위해 학교 선택부터 진학 전략까지, 
                엄마는 모든 것을 꼼꼼히 살펴봅니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>"엄마가 보고 있다"</strong>는 그런 엄마들의 마음으로, 
                교육 데이터의 투명성을 높이고 정보 격차를 줄이기 위해 시작했습니다.
              </p>
            </div>
          </section>

          {/* 비전 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              우리의 비전
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong className="text-blue-600">엄마가 보고 있다</strong>는 단순한 순위 나열을 넘어서, 
              데이터 기반의 인사이트를 통해 학생과 학부모의 현명한 진로 선택을 돕습니다.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>모든 교육 데이터를 투명하게 공개합니다</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>정보 비대칭을 줄여 공정한 교육 환경을 만듭니다</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>객관적 데이터로 현명한 의사결정을 지원합니다</span>
              </li>
            </ul>
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
