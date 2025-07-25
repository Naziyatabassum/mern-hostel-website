import React, { useEffect, useRef } from "react";

const FreshersGuide = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.src = "";
        iframeRef.current.style.display = "none";
      }
    }, 480000); // 8 minutes
    return () => clearTimeout(timer);
  }, []);

  const feeData = [
    ["1st Year", 50000, 30000],
    ["2nd Year", 50000, 35000],
    ["3rd Year", 60000, 30000],
    ["4th Year", 60000, 35000],
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-6 font-sans text-gray-800">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">Welcome to SRKR Hostel</h1>
          <p className="text-xl text-blue-600 max-w-2xl mx-auto">
            Your comprehensive guide to starting your hostel life right
          </p>
          <div className="mt-8 w-full h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
        </div>

        {/* Video Section */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-all duration-300">
          <iframe
            ref={iframeRef}
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/rMYWk1n0K9M?autoplay=1"
            title="Freshers Guide"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          ></iframe>
        </div>

        {/* About Section */}
        <section className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="h-10 w-1 bg-blue-600 mr-4 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-800">About SRKR Hostel</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            The SRKR Hostel is designed to make your college life comfortable, safe, and enriching. 
            With 24/7 security, dedicated study areas, hygienic mess facilities, and friendly wardens, 
            your transition from home to hostel is made seamless.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Safety First</h3>
              <p className="text-gray-700">24/7 security with CCTV surveillance and biometric access</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Comfortable Living</h3>
              <p className="text-gray-700">Spacious rooms with proper ventilation and natural light</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Community</h3>
              <p className="text-gray-700">Regular events and activities to foster friendships</p>
            </div>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="h-10 w-1 bg-blue-600 mr-4 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-800">Fee Structure</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left rounded-tl-xl">Year</th>
                  <th className="p-4 text-left">Sem 1 Fee</th>
                  <th className="p-4 text-left">Sem 2 Fee</th>
                  <th className="p-4 text-left rounded-tr-xl">Total</th>
                </tr>
              </thead>
              <tbody>
                {feeData.map(([year, sem1, sem2], index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}
                  >
                    <td className="p-4 font-medium">{year}</td>
                    <td className="p-4">₹{sem1.toLocaleString()}</td>
                    <td className="p-4">₹{sem2.toLocaleString()}</td>
                    <td className="p-4 font-bold text-blue-700">₹{(sem1 + sem2).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">* Fees are subject to change. Please verify with hostel office.</p>
        </section>

        {/* Checklist & Tips Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Checklist */}
          <section className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="h-10 w-1 bg-blue-600 mr-4 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">What to Bring</h2>
            </div>
            <ul className="space-y-4">
              {[
                "College Admission Letter & Hostel Allotment Slip",
                "Government ID (Aadhar, PAN, etc.)",
                "Bedding (Mattress, pillow, bedsheet)",
                "Bucket, mug, toiletries (soap, toothpaste, detergent)",
                "Locks for cupboard & suitcase",
                "Notebooks, pens, scientific calculator",
                "Extension board for charging multiple devices",
                "Raincoat/Umbrella (during monsoon)",
                "Medicines, prescriptions (if any)"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tips */}
          <section className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="h-10 w-1 bg-blue-600 mr-4 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">Pro Tips</h2>
            </div>
            <div className="space-y-6">
              {[
                {
                  title: "Get Involved",
                  content: "Join clubs and activities to make friends faster and build your network",
                  icon: "👥"
                },
                {
                  title: "Stay Organized",
                  content: "Maintain a routine for study, meals, and relaxation to stay productive",
                  icon: "📅"
                },
                {
                  title: "Stay Connected",
                  content: "Regular calls with family help with homesickness and transition",
                  icon: "📱"
                },
                {
                  title: "Respect Rules",
                  content: "Follow hostel guidelines and keep your space clean for everyone's comfort",
                  icon: "📜"
                }
              ].map((tip, index) => (
                <div key={index} className="flex items-start bg-blue-50 p-4 rounded-lg">
                  <span className="text-2xl mr-4">{tip.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-800 mb-1">{tip.title}</h3>
                    <p className="text-gray-700">{tip.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

       
      </div>
    </div>
  );
};

export default FreshersGuide;