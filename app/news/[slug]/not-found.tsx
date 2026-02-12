import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            정보를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-8">
            요청하신 정보가 존재하지 않거나 삭제되었습니다.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/news"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              정보방으로
            </Link>
            <Link 
              href="/"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              홈으로
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
