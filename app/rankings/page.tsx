'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SchoolTable from '@/components/SchoolTable';
import SearchBar from '@/components/SearchBar';
import { getRankedSchools, getAvailableYears } from '@/lib/utils';
import { Database, RankedSchool } from '@/lib/types';

export default function Rankings() {
  const [data, setData] = useState<Database | null>(null);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [rankedSchools, setRankedSchools] = useState<RankedSchool[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setRankedSchools(getRankedSchools(data, selectedYear));
      });
  }, []);

  useEffect(() => {
    if (!data) return;
    setRankedSchools(getRankedSchools(data, selectedYear));
  }, [data, selectedYear]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600"> ...</div>
      </div>
    );
  }

  const regions = ['', ...new Set(rankedSchools.map(s => s.region).filter(Boolean))];
  const types = ['', ...new Set(rankedSchools.map(s => s.type).filter(Boolean))];

  const filteredSchools = rankedSchools.filter(school => {
    const regionMatch = selectedRegion === '' || school.region === selectedRegion;
    const typeMatch = selectedType === '' || school.type === selectedType;
    return regionMatch && typeMatch;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← 
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
             
          </h1>
          <p className="text-gray-600">
                |  {rankedSchools.length} 
          </p>
        </header>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <SearchBar schools={Object.keys(data.schools)} />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4"></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Year Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {getAvailableYears(data).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                 
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Count */}
          <div className="mt-4 text-sm text-gray-600">
             <strong className="text-blue-600">{filteredSchools.length}</strong> 
          </div>
        </div>

        {/* Rankings List */}
        <SchoolTable schools={filteredSchools} startRank={1} />
      </div>
    </main>
  );
}
