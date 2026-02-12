import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - momwatching.com',
  description: '고등학교 입시 정보를 제공하는 momwatching.com 소개',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About momwatching.com
          </h1>
          <p className="text-xl text-gray-600">
            고등학교 진학 정보의 새로운 기준
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* 소개 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎓 서비스 소개
            </h2>
            <p className="text-gray-700 leading-relaxed">
              momwatching.com은 중학생 자녀를 둔 학부모님들을 위한 고등학교 진학 정보 플랫폼입니다. 
              복잡한 입시 정보를 명확하게 정리하여, 올바른 진학 선택을 도와드립니다.
            </p>
          </section>

          {/* 서비스 목적 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎯 서비스 목적
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>전국 주요 고등학교의 대학 진학 실적을 객관적 데이터로 제공</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>5개년 추이 분석을 통한 학교별 트렌드 파악</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>수시/정시 비율 비교로 학교별 입시 전략 이해</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>지역별, 유형별 고등학교 순위 및 비교 정보 제공</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>최신 입시 뉴스 및 정책 변화 업데이트</span>
              </li>
            </ul>
          </section>

          {/* 데이터 출처 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📊 데이터 출처
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p className="text-gray-700 leading-relaxed">
                데이터는 공개 자료 및 사용자 제보를 종합하여 제공합니다. 
                모든 데이터는 정기적으로 업데이트됩니다.
              </p>
            </div>
          </section>

          {/* 사이트 특징 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ✨ 주요 특징
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📈 5개년 추이 분석</h3>
                <p className="text-sm text-gray-600">
                  최근 5년간의 진학 실적을 그래프로 시각화하여 학교별 성장 추세를 한눈에 파악
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🔄 수시/정시 비교</h3>
                <p className="text-sm text-gray-600">
                  수시와 정시 합격자 비율을 분석하여 학교별 입시 전략의 특징 제공
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🗺️ 지역별 순위</h3>
                <p className="text-sm text-gray-600">
                  서울, 경기, 전국 단위로 고등학교를 비교하고 순위 확인 가능
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📰 입시 뉴스</h3>
                <p className="text-sm text-gray-600">
                  최신 입시 정책, 대학별 전형 변화, 교육 동향 뉴스 제공
                </p>
              </div>
            </div>
          </section>

          {/* 팀 소개 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              👥 운영자 소개
            </h2>
            <p className="text-gray-700 leading-relaxed">
              momwatching.com은 입시 정보의 투명성과 접근성을 높이기 위해 
              교육 데이터 분석 전문가와 학부모 커뮤니티가 함께 운영하고 있습니다. 
              정확하고 유용한 정보 제공을 통해 학부모님들의 합리적인 진학 선택을 돕고자 합니다.
            </p>
          </section>

          {/* Footer Note */}
          <section className="border-t pt-6">
            <p className="text-sm text-gray-500 text-center">
              지속적인 개선과 업데이트를 통해 더 나은 서비스를 제공하겠습니다. 
              <br />
              문의사항은 <a href="/contact" className="text-blue-600 hover:underline">Contact 페이지</a>를 통해 보내주세요.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
