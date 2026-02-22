'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ConsultingRequest {
  id: number;
  name: string;
  email: string;
  grade: string;
  title: string;
  content: string;
  timestamp: string;
  createdAt: string;
  status: string;
}

export default function AdminConsultingPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requests, setRequests] = useState<ConsultingRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ConsultingRequest | null>(null);

  const ADMIN_PASSWORD = 'momwatching2026'; // 나중에 환경변수로 변경 권장

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadRequests();
    } else {
      alert('비밀번호가 틀렸습니다');
    }
  };

  const loadRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/consulting');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    alert('이메일이 복사되었습니다: ' + email);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🔒 관리자 로그인
          </h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">교육 상담 관리</h1>
              <p className="text-gray-600">총 {requests.length}건의 상담 신청</p>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              홈으로
            </Link>
          </div>
        </header>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">로딩 중...</div>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-600">아직 상담 신청이 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {requests.map((req) => (
              <div 
                key={req.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{req.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>👤 {req.name}</span>
                      <span>•</span>
                      <span>🎓 {req.grade}</span>
                      <span>•</span>
                      <span>📅 {new Date(req.createdAt || req.timestamp).toLocaleString('ko-KR')}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyEmail(req.email)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📧 이메일 복사
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{req.content}</p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">이메일:</span>
                  <a 
                    href={`mailto:${req.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {req.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
