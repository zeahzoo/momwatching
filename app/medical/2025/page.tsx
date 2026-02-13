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
        data_source: '  ',
        years_covered: ['2025'],
        universities_covered: ['_'],
        total_schools: 0,
        description: 'Error loading data',
        last_updated: new Date().toISOString()
      }
    };
  }
}

export const metadata = {
  title: '    2025 - momwatching.com',
  description: '      . 2025     .',
};

export default async function SnuMedical2025Page() {
  const data: Database = await getData();
  const medicalSchools = getSnuMedicalSchools(data, '2025');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
               
          </h1>
          <p className="text-xl text-gray-600">
            2025      
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-4">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold"> :</span> 2025
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold"> :</span>  
            </p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-semibold"> :</span> {medicalSchools.reduce((sum, school) => sum + school.total, 0)}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <SchoolTable schools={medicalSchools} startRank={1} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Top 10 </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicalSchools.slice(0, 10).map((school, index) => (
              <div key={school.name} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-800">{index + 1}. </span>
                    <span className="text-lg font-semibold">{school.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{school.total}</div>
                    <div className="text-sm text-gray-500"> {school.susi} /  {school.jeongsi}</div>
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
