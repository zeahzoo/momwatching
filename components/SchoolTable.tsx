import Link from 'next/link';
import { RankedSchool } from '@/lib/types';

interface SchoolTableProps {
  schools: RankedSchool[];
  startRank?: number;
}

export default function SchoolTable({ schools, startRank = 1 }: SchoolTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <th className="px-4 py-3 text-left text-sm font-bold">#</th>
              <th className="px-4 py-3 text-left text-sm font-bold">학교명</th>
              <th className="px-4 py-3 text-left text-sm font-bold hidden sm:table-cell">지역</th>
              <th className="px-4 py-3 text-left text-sm font-bold hidden md:table-cell">유형</th>
              <th className="px-4 py-3 text-center text-sm font-bold">총합</th>
              <th className="px-4 py-3 text-center text-sm font-bold">수시</th>
              <th className="px-4 py-3 text-center text-sm font-bold">정시</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, index) => {
              const rank = startRank + index;
              const isEven = index % 2 === 0;
              
              return (
                <tr
                  key={school.name}
                  className={`border-b border-gray-200 hover:bg-blue-50 transition-colors cursor-pointer ${
                    isEven ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-4 py-3">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      <div className="text-lg font-bold text-blue-600">{rank}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      <div className="font-semibold text-gray-900 hover:text-blue-600">
                        {school.name}
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      {school.region && (
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                          {school.region}
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      {school.type && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {school.type}
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      <div className="text-lg font-bold text-gray-900">{school.total}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      <div className="text-base font-semibold text-green-700">{school.susi}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      <div className="text-base font-semibold text-orange-700">{school.jeongsi}</div>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {schools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">데이터가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
