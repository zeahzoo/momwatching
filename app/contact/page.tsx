import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - 엄마가 보고 있다',
  description: '엄마가 보고 있다 - 문의 및 제안사항을 보내주세요',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            문의사항이나 제안을 환영합니다
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* 이메일 연락처 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              이메일 문의
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <p className="text-gray-700 mb-2">
                주요 연락처:
              </p>
              <a 
                href="mailto:ceo@momwatching.com" 
                className="text-2xl font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                ceo@momwatching.com
              </a>
              <p className="text-sm text-gray-600 mt-3">
                데이터 오류, 제휴 문의, 개선 제안 등 모든 문의를 환영합니다.
              </p>
            </div>
          </section>

          {/* 문의 가능 사항 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              문의 가능 사항
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              다음과 같은 내용으로 문의해주세요:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>데이터 오류 신고 (정확한 자료 첨부)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>새로운 기능 제안</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>제휴 및 협력 문의</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>기타 일반 문의</span>
              </li>
            </ul>
          </section>

          {/* 협업 분야 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              협업 가능 분야
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">데이터 제공</h3>
                <p className="text-sm text-gray-600">
                  추가 교육 데이터, 대학 입시 정보 제공 협력
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">기술 협업</h3>
                <p className="text-sm text-gray-600">
                  데이터 분석, UI/UX 개선, 시스템 고도화
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">마케팅 협력</h3>
                <p className="text-sm text-gray-600">
                  콘텐츠, 광고, 제휴 마케팅 등 협업 제안
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">언론 협조</h3>
                <p className="text-sm text-gray-600">
                  인터뷰, 기사 협조, 데이터 제공
                </p>
              </div>
            </div>
          </section>

          {/* 문의 양식 (추후 구현 예정) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              온라인 문의 양식
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-600 text-center mb-4">
                문의 양식은 준비 중입니다.
              </p>
              <p className="text-gray-600 text-center">
                현재는 <a href="mailto:ceo@momwatching.com" className="text-blue-600 hover:underline font-semibold">이메일</a>로 문의해 주세요.
              </p>
            </div>
          </section>

          {/* 응답 시간 안내 */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              응답 시간
            </h2>
            <p className="text-gray-600 leading-relaxed">
              보내주신 문의는 영업일 기준 2-3일 내에 답변 드립니다. 
              긴급한 사항은 제목에 [긴급]을 표시해 주세요.
            </p>
          </section>

          {/* Footer Note */}
          <section className="border-t pt-6">
            <p className="text-sm text-gray-500 text-center">
              여러분의 소중한 의견이 더 나은 서비스를 만듭니다. 
              <br />
              언제든지 연락주세요!
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
