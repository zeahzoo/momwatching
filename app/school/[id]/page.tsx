'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { getSchoolById } from '@/lib/utils';
import { Database, RankedSchool } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function SchoolDetail({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Database | null>(null);
  const [school, setSchool] = useState<RankedSchool | null>(null);

  useEffect(() => {
    const schoolId = decodeURIComponent(params.id);
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        const schoolData = getSchoolById(data, schoolId);
        setSchool(schoolData);
      });
  }, [params.id]);

  if (!data || !school) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">로딩 중...</div>
      </div>
    );
  }

  // Line Chart Data (5년 추이)
  const lineChartData = {
    labels: school.yearData.map(d => d.year + '년'),
    datasets: [
      {
        label: '총 합격자',
        data: school.yearData.map(d => d.total),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: '수시',
        data: school.yearData.map(d => d.susi),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.3,
      },
      {
        label: '정시',
        data: school.yearData.map(d => d.jeongsi),
        borderColor: 'rgb(251, 146, 60)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '서울대 합격자 5년 추이',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  // Doughnut Chart Data (수시/정시 비율)
  const doughnutChartData = {
    labels: ['수시', '정시'],
    datasets: [
      {
        data: [school.susi, school.jeongsi],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(251, 146, 60)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: '2025년 수시/정시 비율',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <Link href="/rankings" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← 전체 순위
          </Link>
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-500">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {school.name}
            </h1>
            <div className="flex gap-3 mb-6">
              {school.region && (
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                  📍 {school.region}
                </span>
              )}
              {school.type && (
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold">
                  🏫 {school.type}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-sm text-blue-700 font-semibold mb-2">총 합격자 (2025)</div>
                <div className="text-4xl font-bold text-blue-900">{school.total}</div>
                <div className="text-sm text-blue-600 mt-1">명</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-sm text-green-700 font-semibold mb-2">수시</div>
                <div className="text-4xl font-bold text-green-900">{school.susi}</div>
                <div className="text-sm text-green-600 mt-1">
                  {school.total > 0 ? Math.round((school.susi / school.total) * 100) : 0}%
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-6 text-center">
                <div className="text-sm text-orange-700 font-semibold mb-2">정시</div>
                <div className="text-4xl font-bold text-orange-900">{school.jeongsi}</div>
                <div className="text-sm text-orange-600 mt-1">
                  {school.total > 0 ? Math.round((school.jeongsi / school.total) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Line Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div style={{ height: '400px' }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div style={{ height: '400px' }} className="flex items-center justify-center">
              <div style={{ maxWidth: '300px', width: '100%' }}>
                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Historical Data Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 연도별 상세 데이터</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-6 py-3 text-left text-sm font-bold text-blue-900">연도</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-blue-900">총 합격자</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-green-900">수시</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-orange-900">정시</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-blue-900">수시 비율</th>
                </tr>
              </thead>
              <tbody>
                {school.yearData.slice().reverse().map((yearData, index) => (
                  <tr key={yearData.year} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{yearData.year}년</td>
                    <td className="px-6 py-4 text-center text-gray-900 font-bold">{yearData.total}</td>
                    <td className="px-6 py-4 text-center text-green-700 font-semibold">{yearData.susi}</td>
                    <td className="px-6 py-4 text-center text-orange-700 font-semibold">{yearData.jeongsi}</td>
                    <td className="px-6 py-4 text-center text-blue-700 font-semibold">
                      {yearData.total > 0 ? Math.round((yearData.susi / yearData.total) * 100) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Notice */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <h3 className="font-bold text-yellow-900 mb-2">⚠️ 데이터 유의사항</h3>
          <p className="text-sm text-yellow-800">
            본 데이터는 {data.metadata.data_source}에서 수집한 공개 정보입니다. 
            정확한 정보는 해당 학교에 직접 문의하시기 바랍니다.
          </p>
        </div>
      </div>
    </main>
  );
}
