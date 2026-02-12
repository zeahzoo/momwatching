import Link from 'next/link';
import { RankedSchool } from '@/lib/types';

interface SchoolCardProps {
  school: RankedSchool;
  rank: number;
}

export default function SchoolCard({ school, rank }: SchoolCardProps) {
  return (
    <Link href={`/school/${encodeURIComponent(school.name)}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-blue-500 cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-blue-600">#{rank}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{school.name}</h3>
              <div className="flex gap-2 mt-1">
                {school.region && (
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {school.region}
                  </span>
                )}
                {school.type && (
                  <span className="text-sm px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {school.type}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{school.total}</div>
            <div className="text-sm text-gray-500">명</div>
          </div>
        </div>
        <div className="flex gap-4 text-sm text-gray-600">
          <div className="flex-1 bg-green-50 rounded p-2 text-center">
            <div className="font-semibold text-green-700">수시</div>
            <div className="text-lg font-bold text-green-900">{school.susi}</div>
          </div>
          <div className="flex-1 bg-orange-50 rounded p-2 text-center">
            <div className="font-semibold text-orange-700">정시</div>
            <div className="text-lg font-bold text-orange-900">{school.jeongsi}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
