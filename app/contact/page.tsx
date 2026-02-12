import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - momwatching.com',
  description: '문의사항이나 의견을 보내주세요',
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
            문의사항이나 의견을 보내주세요
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* 이메일 연락처 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📧 이메일 문의
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <p className="text-gray-700 mb-2">
                모든 문의사항은 아래 이메일로 보내주세요:
              </p>
              <a 
                href="mailto:ceo@momwatching.com" 
                className="text-2xl font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                ceo@momwatching.com
              </a>
              <p className="text-sm text-gray-600 mt-3">
                일반 문의, 정보 제공, 제휴 및 비즈니스 제안 등 모든 문의를 받습니다.
              </p>
            </div>
          </section>

          {/* 정보 제공 안내 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📝 정보 제공 안내
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              더 정확하고 유용한 정보를 제공하기 위해 여러분의 도움이 필요합니다:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>학교별 진학 실적 정보 (공개 가능한 자료)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>입시 관련 유용한 자료 및 링크</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>사이트 개선을 위한 제안 사항</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>데이터 오류나 수정이 필요한 내용</span>
              </li>
            </ul>
          </section>

          {/* 문의 유형 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              💬 주요 문의 유형
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🔍 데이터 관련</h3>
                <p className="text-sm text-gray-600">
                  학교 정보 수정 요청, 데이터 오류 신고, 업데이트 문의
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">💡 제안 사항</h3>
                <p className="text-sm text-gray-600">
                  새로운 기능 제안, UI/UX 개선 의견, 콘텐츠 요청
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🤝 협업 문의</h3>
                <p className="text-sm text-gray-600">
                  파트너십, 광고, 데이터 활용 등 비즈니스 관련 문의
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">❓ 기타 문의</h3>
                <p className="text-sm text-gray-600">
                  사이트 이용 방법, 일반 문의, 기타 의견
                </p>
              </div>
            </div>
          </section>

          {/* 문의 폼 (선택사항 - 향후 구현) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📮 빠른 문의
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-600 text-center mb-4">
                온라인 문의 양식은 준비 중입니다.
              </p>
              <p className="text-gray-600 text-center">
                현재는 <a href="mailto:ceo@momwatching.com" className="text-blue-600 hover:underline font-semibold">이메일</a>로 문의해 주시기 바랍니다.
              </p>
            </div>
          </section>

          {/* 응답 시간 안내 */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              ⏱️ 응답 시간
            </h2>
            <p className="text-gray-600 leading-relaxed">
              보내주신 문의는 영업일 기준 2-3일 이내에 답변드리겠습니다. 
              긴급한 사항이나 데이터 오류는 우선적으로 처리됩니다.
            </p>
          </section>

          {/* Footer Note */}
          <section className="border-t pt-6">
            <p className="text-sm text-gray-500 text-center">
              여러분의 소중한 의견이 더 나은 서비스를 만듭니다. 
              <br />
              감사합니다! 🙏
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
