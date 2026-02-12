import SchoolTable from '@/components/SchoolTable';
import { getSnuMedicalSchools } from '@/lib/utils';
import { Database } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

async function getData(): Promise<Database> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.error('Error loading data.json:', error);
    return {
      schools: {},
      metadata: {
        collection_date: new Date().toISOString(),
        data_source: '데이터 로드 실패',
        years_covered: ['2025'],
        universities_covered: ['서울대_의대'],
        total_schools: 0,
        description: 'Error loading data',
        last_updated: new Date().toISOString()
      }
    };
  }
}

export const metadata = {
  title: '서울대 의대 진학 순위 2025 - momwatching.com',
  description: '전국 고등학교 서울대 의과대학 합격자 순위를 확인하세요. 2025년 서울대 의대 진학 실적 데이터.',
};

export default async function SnuMedical2025Page() {
  const data: Database = await getData();
  const medicalSchools = getSnuMedicalSchools(data, '2025');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            서울대 의대 진학 순위
          </h1>
          <p className="text-xl text-gray-600">
            2025년 전국 고등학교 서울대 의대 합격자 순위
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-4">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">데이터 연도:</span> 2025학년도
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">집계 대상:</span> 서울대학교 의과대학
            </p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-semibold">총 합격자:</span> {medicalSchools.reduce((sum, school) => sum + school.total, 0)}명
            </p>
          </div>
        </div>

        <div className="mb-8">
          <SchoolTable schools={medicalSchools} startRank={1} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Top 10 학교</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicalSchools.slice(0, 10).map((school, index) => (
              <div key={school.name} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-800">{index + 1}. </span>
                    <span className="text-lg font-semibold">{school.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{school.total}명</div>
                    <div className="text-sm text-gray-500">수시 {school.susi} / 정시 {school.jeongsi}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
