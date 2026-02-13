import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - momwatching.com',
  description: '  ',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
              
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/*   */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
               
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <p className="text-gray-700 mb-2">
                    :
              </p>
              <a 
                href="mailto:ceo@momwatching.com" 
                className="text-2xl font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                ceo@momwatching.com
              </a>
              <p className="text-sm text-gray-600 mt-3">
                 ,  ,        .
              </p>
            </div>
          </section>

          {/*    */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
                      :
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>    (  )</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>     </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>    </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>    </span>
              </li>
            </ul>
          </section>

          {/*   */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2"> </h3>
                <p className="text-sm text-gray-600">
                     ,   ,  
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2"> </h3>
                <p className="text-sm text-gray-600">
                    , UI/UX  ,  
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2"> </h3>
                <p className="text-sm text-gray-600">
                  , ,      
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2"> </h3>
                <p className="text-sm text-gray-600">
                    ,  ,  
                </p>
              </div>
            </div>
          </section>

          {/*   ( -  ) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
               
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-600 text-center mb-4">
                    .
              </p>
              <p className="text-gray-600 text-center">
                 <a href="mailto:ceo@momwatching.com" className="text-blue-600 hover:underline font-semibold"></a>   .
              </p>
            </div>
          </section>

          {/*    */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
               
            </h2>
            <p className="text-gray-600 leading-relaxed">
                  2-3  . 
                   .
            </p>
          </section>

          {/* Footer Note */}
          <section className="border-t pt-6">
            <p className="text-sm text-gray-500 text-center">
                    . 
              <br />
              !
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
