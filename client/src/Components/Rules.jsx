import React, { useState } from "react";

const rules = [
  { title: "⏰ Members must return to the hostel before 6:30 P.M. Permission is required to stay out at night." },
  { title: "🚫 Ragging is a serious offence and is punishable, including police intervention and expulsion." },
  { title: "📚 Study hours must be followed from 8:30 P.M. to 10:30 P.M." },
  { title: "⚡ Usage of heating coils, iron boxes, kettles, etc., is strictly prohibited. Heavy penalties apply." },
  { title: "👕 Dress code: Decent dressing is required. Short shirts/tops and low-waist trousers are prohibited." },
  { title: "🏥 Sick students must inform hostel authorities or seek immediate medical attention." },
  { title: "⚖ Residents must not argue with hostel staff. Complaints should be reported to the warden." },
  { title: "🚫 No personal work should be assigned to hostel staff." },
  { title: "🍽 Mess timings and dining hall conduct must be strictly followed." },
  { title: "🏚 Students are responsible for any damage to hostel property. Defacing walls/doors is prohibited." },
  { title: "🔒 Valuables should not be kept in hostel rooms. Students are responsible for their belongings." },
  { title: "💡 Fans and lights must be switched off when not in use. Penalty of Rs.500/- for violations." },
  { title: "🧹 Hostel inmates must maintain cleanliness and avoid food and water wastage." },
  { title: "🔐 Rooms must be properly locked when leaving for mess, bath, etc." },
  { title: "🚭 Possession/consumption of alcohol, drugs, or smoking is strictly prohibited." },
  { title: "📝 Leaving town requires prior written permission from the Warden." },
  { title: "⚖ No hostel inmate shall take the law into their own hands. Report issues to hostel authorities." },
  { title: "⚽ Playing cricket, football, etc., inside the hostel or common halls is strictly prohibited." },
  { title: "🚷 Parents/guests are not allowed inside hostel rooms without permission." },
  { title: "⏳ Visitors are not permitted in the hostel beyond 8:00 P.M." },
  { title: "🎂 Birthday celebrations require prior permission and must be in designated areas." },
  { title: "📜 Notices, campaigns, or collections in the hostel require prior permission." },
  { title: "📌 Notices displayed by authorities are deemed to be acknowledged by all inmates." },
  { title: "🚫 Male visitors (except parents) are not permitted in the Ladies Hostel." },
];

const dosAndDonts = [
  { title: "🙏 Be respectful to all staff members, especially teaching staff. Be courteous, polite, and honest." },
  { title: "👔 Dress appropriately for classes and outside the hostel, especially in town and during college functions." },
  { title: "🧹 Assist in keeping the hostel clean, neat, and pollution-free." },
  { title: "🏫 Take pride in being an institute alumni and aim for excellence in all fields." },
  { title: "🆔 Always carry an identity card issued by the institute when outside the hostel." },
  { title: "⏳ Be punctual and regular in all classes, functions, and activities." },
  { title: "🏚 Treat hostel property with care and help maintain it." },
  { title: "🚷 Ensure that personal guests do not stay in the hostel unless authorized by authorities." },
  { title: "🚫 Bringing intoxicants (liquor, drugs) into the hostel and consuming them is strictly prohibited." },
  { title: "❌ Immoral acts are strictly prohibited." },
  { title: "⚠ Do not participate in political, anti-national, anti-social, or undesirable activities inside or outside the hostel." },
  { title: "🚫 Do not indulge in any form of ragging." },
  { title: "🏫 Do not engage in any activity that tarnishes the image of the institute." },
  { title: "🚭 Do not smoke or consume alcohol in the hostel." },
  { title: "⚡ Do not use unauthorized electrical appliances." },
];

const Rules = () => {
  const [activeSection, setActiveSection] = useState("rules");
  
  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6 min-h-screen font-sans bg-gradient-to-r from-blue-50 to-gray-100 text-gray-900">
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0870A4]">🏠 Hostel Guidelines</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Ensuring a safe and disciplined hostel environment</p>
      </div>

      {/* Mobile Navigation Tabs */}
      <div className="md:hidden flex mb-4 border-b">
        <button 
          className={`flex-1 py-2 text-center font-medium ${activeSection === 'rules' ? 'text-[#0870A4] border-b-2 border-[#0870A4]' : 'text-gray-500'}`}
          onClick={() => setActiveSection('rules')}
        >
          Rules
        </button>
        <button 
          className={`flex-1 py-2 text-center font-medium ${activeSection === 'dosDonts' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
          onClick={() => setActiveSection('dosDonts')}
        >
          Dos & Don'ts
        </button>
      </div>

      {/* Rules Section */}
      <div className={`bg-white shadow-xl rounded-xl p-3 sm:p-4 md:p-6 ${activeSection === 'dosDonts' ? 'hidden md:block' : ''}`}>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0870A4] text-center mb-4">📜 Rules and Regulations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {rules.map((rule, index) => (
            <div key={index} className="bg-blue-100 shadow-md rounded-lg p-2 sm:p-3 md:p-4 hover:shadow-lg transition text-center text-xs sm:text-sm font-medium border-l-4 border-[#0870A4] flex items-center">
              <span>{rule.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dos and Don'ts Section */}
      <div className={`bg-white shadow-xl rounded-xl p-3 sm:p-4 md:p-6 mt-6 sm:mt-8 md:mt-10 ${activeSection === 'rules' ? 'hidden md:block' : ''}`}>
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 text-center mb-4">✅ Dos and Don'ts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {dosAndDonts.map((item, index) => (
            <div key={index} className="bg-green-100 shadow-md rounded-lg p-2 sm:p-3 md:p-4 hover:shadow-lg transition text-center text-xs sm:text-sm font-medium border-l-4 border-green-600 flex items-center">
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-4 right-4">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-[#0870A4] text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Rules;