import Link from 'next/link';
import { RankedSchool } from '@/lib/types';

interface SchoolTableProps {
  schools: RankedSchool[];
  startRank?: number;
}

export default function SchoolTable({ schools, startRank = 1 }: SchoolTableProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600 font-extrabold text-xl';
    if (rank === 2) return 'text-gray-500 font-extrabold text-xl';
    if (rank === 3) return 'text-amber-700 font-extrabold text-xl';
    if (rank <= 10) return 'text-blue-600 font-bold text-lg';
    return 'text-gray-700 font-semibold';
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-700 to-slate-600 text-white">
              <th className="px-3 py-3 text-center text-xs font-bold uppercase">순위</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">학교명</th>
              <th className="px-3 py-3 text-left text-xs font-bold uppercase hidden sm:table-cell">지역</th>
              <th className="px-3 py-3 text-left text-xs font-bold uppercase hidden md:table-cell">유형</th>
              <th className="px-3 py-3 text-center text-xs font-bold uppercase">총합</th>
              <th className="px-3 py-3 text-center text-xs font-bold uppercase">수시</th>
              <th className="px-3 py-3 text-center text-xs font-bold uppercase">정시</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schools.map((school, index) => {
              const rank = startRank + index;
              const medal = getRankBadge(rank);
              const isTop10 = rank <= 10;
              
              return (
                <tr
                  key={school.name}
                  className={`hover:bg-blue-50 transition-all duration-150 ${
                    isTop10 ? 'bg-gradient-to-r from-blue-50 to-white' : 'bg-white'
                  }`}
                >
                  <td className="px-3 py-4 text-center">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      <div className="flex items-center justify-center gap-1">
                        {medal && <span className="text-2xl">{medal}</span>}
                        <span className={getRankColor(rank)}>{rank}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full group"
                    >
                      <div className={`font-bold group-hover:text-blue-600 transition-colors ${
                        isTop10 ? 'text-gray-900 text-base' : 'text-gray-800 text-sm'
                      }`}>
                        {school.name}
                      </div>
                    </Link>
                  </td>
                  <td className="px-3 py-4 hidden sm:table-cell">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      {school.region && (
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md font-medium">
                          {school.region}
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className="px-3 py-4 hidden md:table-cell">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      {school.type && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md font-medium">
                          {school.type}
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      <div className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold text-base shadow-sm">
                        {school.total}명
                      </div>
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      <div className="text-sm font-semibold text-green-700">{school.susi}명</div>
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <Link 
                      href={`/school/${encodeURIComponent(school.name)}`}
                      className="block w-full h-full"
                    >
                      <div className="text-sm font-semibold text-orange-700">{school.jeongsi}명</div>
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
          <p className="text-gray-500 text-lg">데이터가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
