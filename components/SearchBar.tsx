'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  schools: string[];
}

export default function SearchBar({ schools }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = schools.filter(school =>
        school.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (school: string) => {
    setQuery('');
    setSuggestions([]);
    router.push(`/school/${encodeURIComponent(school)}`);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="학교 이름을 검색하세요..."
        className="w-full px-6 py-4 text-lg border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        aria-label="학교 검색"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border-2 border-blue-200 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((school) => (
            <li
              key={school}
              onClick={() => handleSelect(school)}
              className="px-6 py-3 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              {school}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
