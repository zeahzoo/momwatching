import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '일타 강사 순위 - 과목별 Top 10 | momwatching.com',
  description: '2026년 최신 일타 강사 순위. 수학, 영어, 국어, 과탐, 사탐 과목별 Top 10 강사를 정량·정성 분석으로 비교합니다.',
  keywords: '일타강사, 수능강사, 메가스터디, 이투스, 대성마이맥, 강사순위, 인강추천'
}

const subjects = [
  {
    id: 'math',
    name: '수학',
    emoji: '📐',
    description: '현우진, 정승제, 배성민 등 수학 일타 강사 Top 10',
    color: 'bg-blue-500',
    available: true
  },
  {
    id: 'english',
    name: '영어',
    emoji: '📚',
    description: '이명학, 주혜연, 조정식 등 영어 일타 강사 Top 10',
    color: 'bg-green-500',
    available: false
  },
  {
    id: 'korean',
    name: '국어',
    emoji: '✍️',
    description: '강민철, 김승리, 유대종 등 국어 일타 강사 Top 10',
    color: 'bg-purple-500',
    available: false
  },
  {
    id: 'science',
    name: '과탐',
    emoji: '🔬',
    description: '물리, 화학, 생명, 지구과학 일타 강사 Top 10',
    color: 'bg-orange-500',
    available: false
  },
  {
    id: 'social',
    name: '사탐',
    emoji: '🌍',
    description: '사회문화, 윤리, 지리, 역사, 경제 일타 강사 Top 10',
    color: 'bg-red-500',
    available: false
  }
]

export default function IltaRankingHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            일타 강사 순위
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            과목별 Top 10 강사 비교 분석
          </p>
          <p className="text-gray-500">
            정량 분석(60%) + 정성 분석(40%) 기반 객관적 순위
          </p>
        </div>

        {/* Update Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🔄</div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">자동 업데이트 시스템</h2>
              <p className="text-gray-700 mb-2">
                매월 1일 자동으로 최신 데이터를 수집하여 순위를 업데이트합니다.
              </p>
              <p className="text-sm text-gray-500">
                최근 업데이트: <span className="font-bold">2026년 2월 21일</span>
              </p>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition ${
                !subject.available ? 'opacity-60' : ''
              }`}
            >
              <div className={`${subject.color} text-white p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{subject.emoji}</span>
                  <h2 className="text-2xl font-bold">{subject.name}</h2>
                </div>
                {subject.available && (
                  <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </span>
                )}
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{subject.description}</p>
                {subject.available ? (
                  <Link
                    href={`/ilta-ranking/${subject.id}`}
                    className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    순위 보기 →
                  </Link>
                ) : (
                  <div className="text-center text-gray-500 font-semibold py-2">
                    준비 중 (3월 업데이트 예정)
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Methodology */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📊 순위 산정 방법론
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">정량 지표 (60%)</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span className="text-gray-700">
                    <strong>플랫폼 내 강좌 순위:</strong> 메가스터디, 이투스, 대성마이맥, EBSi
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span className="text-gray-700">
                    <strong>수강평 수:</strong> 인기도 지표
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span className="text-gray-700">
                    <strong>평점:</strong> 5점 만점 기준
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span className="text-gray-700">
                    <strong>유튜브 구독자:</strong> 대중 인지도
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-600 mb-4">정성 지표 (40%)</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span className="text-gray-700">
                    <strong>커뮤니티 언급 빈도:</strong> 오르비, 수만휘, 디시인사이드
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span className="text-gray-700">
                    <strong>긍정/부정 수강평 비율:</strong> 실제 수강생 피드백
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span className="text-gray-700">
                    <strong>"일타" 키워드 연관도:</strong> 업계 평판
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span className="text-gray-700">
                    <strong>시장 점유율:</strong> 유웨이 설문조사 등
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            왜 momwatching.com 순위인가?
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            입소문이나 주관적 평가가 아닌, <strong>공개된 데이터와 커뮤니티 평판을 종합</strong>하여 
            객관적인 순위를 제공합니다. 매월 자동으로 업데이트되어 항상 최신 정보를 유지합니다.
            학생 여러분의 현명한 강사 선택을 돕기 위해 만들어졌습니다.
          </p>
          <div className="mt-6">
            <Link 
              href="/" 
              className="inline-block text-blue-600 hover:underline font-semibold"
            >
              ← momwatching.com 홈으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
