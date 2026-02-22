import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '사회탐구 일타 강사 순위 Top 9 - 2026년 2월 | momwatching.com',
  description: '2026년 최신 사회탐구 일타 강사 순위. 이지영, 대세사탐, 박봄 등 Top 9 강사의 강의 스타일, 추천 대상, 수강평을 비교 분석합니다.',
  keywords: '일타강사, 사탐강사, 이지영, 이투스, EBSi, 사회문화, 생활과윤리, 한국지리, 정치와법'
}

interface Teacher {
  rank: number
  name: string
  platform: string
  representativeCourse: string
  rating: number
  reviewCount: number
  marketShare: number
  teachingStyle: string
  strengths: string[]
  targetStudents: string
  communityReputation: {
    positive: string
    negative: string
  }
  score: number
}

interface RankingData {
  subject: string
  subjectName: string
  lastUpdated: string
  period: string
  methodology: string
  sources: string[]
  rankings: Teacher[]
  notes: string[]
}

async function getRankingData(): Promise<RankingData> {
  const fs = require('fs')
  const path = require('path')
  const filePath = path.join(process.cwd(), 'public/ilta-ranking/data/social_ranking_2026-02.json')
  const fileContent = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContent)
}

export default async function SocialRankingPage() {
  const data = await getRankingData()

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/ilta-ranking" className="text-blue-600 hover:underline mb-4 inline-block">
            ← 일타 강사 순위 홈
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            사회탐구 일타 강사 순위 Top 9
          </h1>
          <p className="text-gray-600">
            최종 업데이트: {data.lastUpdated} | 기준: {data.period}
          </p>
        </div>

        {/* Methodology */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-3">📊 순위 산정 방법</h2>
          <p className="text-blue-800 mb-4">{data.methodology}</p>
          <div className="text-sm text-blue-700">
            <strong>출처:</strong> {data.sources.join(', ')}
          </div>
        </div>

        {/* Rankings Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="py-4 px-6 text-left font-bold text-gray-700">순위</th>
                <th className="py-4 px-6 text-left font-bold text-gray-700">강사명</th>
                <th className="py-4 px-6 text-left font-bold text-gray-700">소속</th>
                <th className="py-4 px-6 text-left font-bold text-gray-700">대표 강좌</th>
                <th className="py-4 px-6 text-center font-bold text-gray-700">점유율</th>
                <th className="py-4 px-6 text-center font-bold text-gray-700">종합점수</th>
              </tr>
            </thead>
            <tbody>
              {data.rankings.map((teacher) => (
                <tr key={teacher.rank} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                      teacher.rank === 1 ? 'bg-yellow-500' :
                      teacher.rank === 2 ? 'bg-gray-400' :
                      teacher.rank === 3 ? 'bg-amber-600' :
                      'bg-gray-600'
                    }`}>
                      {teacher.rank}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">{teacher.name}</td>
                  <td className="py-4 px-6 text-gray-700">{teacher.platform}</td>
                  <td className="py-4 px-6 text-gray-700">{teacher.representativeCourse}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-blue-600 font-bold">{teacher.marketShare}%</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-green-600 font-bold">{teacher.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Info */}
        <div className="space-y-8">
          {data.rankings.map((teacher) => (
            <div key={teacher.rank} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {teacher.rank}위. {teacher.name}
                  </h2>
                  <p className="text-gray-600">{teacher.platform} | {teacher.representativeCourse}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{teacher.score}</div>
                  <div className="text-sm text-gray-500">종합점수</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">📚 교수 스타일</h3>
                  <p className="text-gray-700">{teacher.teachingStyle}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">🎯 추천 대상</h3>
                  <p className="text-gray-700">{teacher.targetStudents}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-bold text-gray-800 mb-2">✅ 주요 강점</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {teacher.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <h3 className="font-bold text-green-700 mb-2">👍 긍정 평가</h3>
                  <p className="text-gray-700 italic">"{teacher.communityReputation.positive}"</p>
                </div>
                <div>
                  <h3 className="font-bold text-red-700 mb-2">👎 유의사항</h3>
                  <p className="text-gray-700 italic">"{teacher.communityReputation.negative}"</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <span>⭐ 평점: {teacher.rating}/5.0</span>
                <span>💬 수강평: {teacher.reviewCount.toLocaleString()}개</span>
                <span>📈 점유율: {teacher.marketShare}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">📝 참고사항</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {data.notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link 
            href="/ilta-ranking" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            다른 과목 순위 보기
          </Link>
        </div>
      </div>
    </div>
  )
}
