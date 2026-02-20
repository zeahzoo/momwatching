import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '자율형사립고 순위 - MW 종합순위 | 엄마가 보고 있다',
  description: '전국 자율형사립고등학교의 서울대 + 의약계열 합격 실적을 종합한 MW 순위입니다.',
  keywords: '자사고, 자율형사립고, 상산고, 휘문고, 하나고, 민사고, 서울대, 의대, 진학실적',
};

interface RankingData {
  자사고_순위: number;
  MW_종합순위: number;
  학교명: string;
  MW_종합점수: number;
  서울대_3개년_총합: number;
  의약계열_총합: number;
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://momwatching.com';
  const res = await fetch(`${baseUrl}/data/autonomous-private-high-schools.json`, {
    next: { revalidate: 3600 } // 1시간마다 재검증
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function AutonomousHighPage() {
  const data = await getRankings();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          자율형사립고 순위
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          MW 종합순위 기준 (서울대 + 의약계열 합격 실적)
        </p>
        <p className="text-sm text-gray-500">
          기간: {data.metadata.ranking_period} | 업데이트: {data.metadata.last_updated}
        </p>
      </div>

      {/* 설명 */}
      <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8 max-w-4xl mx-auto">
        <h2 className="font-bold text-green-800 mb-2">📊 MW 종합순위란?</h2>
        <p className="text-gray-700 text-sm">
          서울대 합격자 수 + 의약계열 합격자 수를 합산한 종합 순위입니다.
        </p>
      </div>

      {/* 순위 테이블 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  자사고 순위
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  학교명
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MW 종합점수
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  전체 순위
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  서울대
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  의약계열
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.rankings.map((school, index) => (
                <tr 
                  key={school.학교명}
                  className={`hover:bg-gray-50 transition-colors ${
                    index < 3 ? 'bg-yellow-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {index === 0 && <span className="text-2xl mr-2">🥇</span>}
                      {index === 1 && <span className="text-2xl mr-2">🥈</span>}
                      {index === 2 && <span className="text-2xl mr-2">🥉</span>}
                      <span className="text-sm font-bold text-gray-900">
                        {school.자사고_순위}위
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {school.학교명}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-lg font-bold text-green-600">
                      {school.MW_종합점수}점
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      전체 {school.MW_종합순위}위
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">
                      {school.서울대_3개년_총합}명
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">
                      {school.의약계열_총합}명
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
        <p>총 {data.metadata.total_schools}개 자율형사립고등학교</p>
        <p className="mt-2">
          * 서울대 = 2024~2026년 합격자 수 합계<br />
          * 의약계열 = 의대 + 약대 + 치대 + 한의대 + 수의대
        </p>
      </div>
    </div>
  );
}
