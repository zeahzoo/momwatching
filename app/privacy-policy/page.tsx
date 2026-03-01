export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">개인정보 처리방침</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. 개인정보의 수집 및 이용 목적</h2>
          <p>momwatching.com(이하 "사이트")은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>웹사이트 서비스 제공 및 운영</li>
            <li>문의사항 응답 및 고객 지원</li>
            <li>서비스 개선 및 통계 분석</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. 수집하는 개인정보의 항목</h2>
          <p>사이트는 기본적으로 개인정보를 수집하지 않습니다. 다만, 다음의 정보가 자동으로 생성되어 수집될 수 있습니다:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
            <li>광고 식별자 및 방문 기록 (Google AdSense 이용 시)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. 개인정보의 보유 및 이용 기간</h2>
          <p>사이트는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>웹사이트 방문기록: 3개월</li>
            <li>문의사항: 처리 완료 후 1년</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. 쿠키(Cookie)의 운용</h2>
          <p>사이트는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
          <p className="mt-2">쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Google AdSense 및 광고</h2>
          <p>본 사이트는 Google AdSense를 통해 광고를 게재합니다. Google은 쿠키를 사용하여 이 웹사이트를 방문한 기록과 다른 웹사이트를 방문한 기록을 기반으로 광고를 게재합니다.</p>
          <p className="mt-2">사용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google 광고 설정 페이지</a>에서 맞춤 광고를 사용하지 않도록 설정할 수 있습니다.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. 정보주체의 권리·의무 및 그 행사방법</h2>
          <p>정보주체는 다음과 같은 권리를 행사할 수 있습니다:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리정지 요구</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. 개인정보 보호책임자</h2>
          <p>사이트는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
          <div className="mt-2">
            <p>이메일: contact@momwatching.com</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. 개인정보 처리방침 변경</h2>
          <p>이 개인정보 처리방침은 2026년 3월 1일부터 적용됩니다. 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
        </section>

        <section className="text-sm text-gray-500 mt-8">
          <p>최종 업데이트: 2026년 3월 1일</p>
        </section>
      </div>
    </div>
  );
}
