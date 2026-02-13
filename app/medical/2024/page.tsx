import SchoolTable from '@/components/SchoolTable';
import { getMedicalSchools } from '@/lib/utils';
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
        years_covered: ['2024'],
        universities_covered: [''],
        total_schools: 0,
        description: 'Error loading data',
        last_updated: new Date().toISOString()
      }
    };
  }
}

export const metadata = {
  title: '   Top 20 - momwatching.com',
  description: '     . 2024    .',
};

export default async function MedicalPage() {
  const data: Database = await getData();
  const medicalSchools = getMedicalSchools(data, '2024');
  const top20 = medicalSchools.slice(0, 20);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
              
          </h1>
          <p className="text-xl text-gray-600">
            2024     Top 20
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-4">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold"> :</span> 2024
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold"> :</span>    
            </p>
          </div>
        </div>

        <div className="mb-8">
          <SchoolTable schools={top20} startRank={1} />
        </div>
      </div>
    </main>
  );
}
