import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';

export const metadata: Metadata = {
  title: 'MW 종합순위 - 전국 고등학교 순위 | 엄마가 보고 있다',
  description: '전국 고등학교의 서울대 + 의약계열 합격 실적을 종합한 MW 순위입니다.',
  keywords: 'MW순위, 고등학교순위, 서울대, 의대, 진학실적, 상산고, 휘문고, 단대부고',
};

interface RankingData {
  순위: number;
  학교명: string;
  종합점수: number;
}

interface RankingResponse {
  metadata: {
    ranking_name: string;
    ranking_period: string;
    total_schools: number;
    last_updated: string;
    note: string;
  };
  rankings: RankingData[];
}

async function getRankings(): Promise<RankingResponse> {
  const filePath = join(process.cwd(), 'public', 'data', 'mw-overall-ranking.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function RankingsPage() {
  const data = await getRankings();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          MW 종합순위
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          전국 고등학교 서울대 + 의약계열 합격 실적 종합 순위
        </p>
        <p className="text-sm text-gray-500">
          기간: {data.metadata.ranking_period} | 업데이트: {data.metadata.last_updated}
        </p>
      </div>

      {/* 설명 */}
      <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-8 max-w-4xl mx-auto">
        <h2 className="font-bold text-purple-800 mb-2">📊 MW 종합순위란?</h2>
        <p className="text-gray-700 text-sm">
          서울대 합격자 수 + 의약계열 합격자 수를 합산한 종합 순위
        </p>
      </div>

      {/* 순위 테이블 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  순위
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  학교명
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MW 종합점수
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.rankings.map((school, index) => (
                <tr 
                  key={school.학교명}
                  className={`hover:bg-gray-50 transition-colors ${
                    index < 3 ? 'bg-yellow-50' : 
                    index < 10 ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {index === 0 && <span className="text-2xl mr-2">🥇</span>}
                      {index === 1 && <span className="text-2xl mr-2">🥈</span>}
                      {index === 2 && <span className="text-2xl mr-2">🥉</span>}
                      <span className={`text-sm font-bold ${index < 10 ? 'text-gray-900' : 'text-gray-700'}`}>
                        {school.순위}위
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${index < 10 ? 'text-gray-900' : 'text-gray-700'}`}>
                      {school.학교명}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={`text-lg font-bold ${
                      index === 0 ? 'text-yellow-600' :
                      index === 1 ? 'text-gray-500' :
                      index === 2 ? 'text-orange-600' :
                      index < 10 ? 'text-blue-600' :
                      'text-gray-600'
                    }`}>
                      {school.종합점수}점
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 푸터 안내 */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>총 {data.metadata.total_schools}개 고등학교</p>
        <p className="mt-2">
          * 서울대 = 2024~2026년 합격자 수 합계<br />
          * 의약계열 = 의대 + 약대 + 치대 + 한의대 + 수의대
        </p>
      </div>
    </div>
  );
}
