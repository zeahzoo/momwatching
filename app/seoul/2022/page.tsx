import SchoolTable from '@/components/SchoolTable';
import { getSchoolsByYear } from '@/lib/utils';
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
        years_covered: ['2022'],
        universities_covered: ['서울대'],
        total_schools: 0,
        description: 'Error loading data',
        last_updated: new Date().toISOString()
      }
    };
  }
}

export const metadata = {
  title: '2022년 서울대 진학 순위 - momwatching.com',
  description: '2022학년도 전국 고등학교 서울대 합격자 순위. 수시, 정시 합격자 현황.',
};

export default async function Seoul2022Page() {
  const data: Database = await getData();
  const schools = getSchoolsByYear(data, '2022');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            2022년 서울대 진학 순위
          </h1>
          <p className="text-xl text-gray-600">
            2022학년도 전국 고등학교 서울대 합격자 현황
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{schools.length}</p>
              <p className="text-gray-600 text-sm">집계 학교 수</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {schools.reduce((sum, s) => sum + s.total, 0)}
              </p>
              <p className="text-gray-600 text-sm">총 합격자 수</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {schools.reduce((sum, s) => sum + s.susi, 0)}
              </p>
              <p className="text-gray-600 text-sm">수시 합격</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {schools.reduce((sum, s) => sum + s.jeongsi, 0)}
              </p>
              <p className="text-gray-600 text-sm">정시 합격</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <SchoolTable schools={schools} startRank={1} />
        </div>
      </div>
    </main>
  );
}
