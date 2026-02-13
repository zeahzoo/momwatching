import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - momwatching.com',
  description: '    momwatching.com ',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About momwatching.com
          </h1>
          <p className="text-xl text-gray-600">
                
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/*  */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
               
            </h2>
            <p className="text-gray-700 leading-relaxed">
              momwatching.com         . 
                  ,    .
            </p>
          </section>

          {/*   */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
               
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>        </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>5      </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>/      </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>,       </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>      </span>
              </li>
            </ul>
          </section>

          {/*   */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
               
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">5  </h3>
                <p className="text-sm text-gray-600">
                   5         
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">/ </h3>
                <p className="text-sm text-gray-600">
                           
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2"> </h3>
                <p className="text-sm text-gray-600">
                  , ,       
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2"></h3>
                <p className="text-sm text-gray-600">
                    ,   ,    
                </p>
              </div>
            </div>
          </section>

          {/*   */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
               
            </h2>
            <p className="text-gray-700 leading-relaxed">
              momwatching.com       
                      . 
                        .
            </p>
          </section>

          {/* Footer Note */}
          <section className="border-t pt-6">
            <p className="text-sm text-gray-500 text-center">
                     . 
              <br />
               <a href="/contact" className="text-blue-600 hover:underline">Contact </a>  .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
