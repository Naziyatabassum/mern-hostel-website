import React, { useState } from "react";

const staffData = {
  management: [
    { 
      name: "Dr. Rajesh Kumar", 
      designation: "Chief Warden", 
      image: "/api/placeholder/300/300", // Using placeholder for the artifact
      experience: "10 years", 
      pdf: "/pdfs/chief_warden_details.pdf",
      faculty: { name: "IT Dept", pdf: "/pdfs/it_department.pdf" },
      phone: "+91 98765 43210",
      email: "rajesh.kumar@hostel.com",
      timings: "9 AM - 5 PM"
    },
    { 
      name: "Ms. Priya Sharma", 
      designation: "Lady Superintendent", 
      image: "/api/placeholder/300/300", 
      experience: "8 years",
      phone: "+91 87654 32109",
      email: "priya.sharma@hostel.com",
      timings: "9 AM - 5 PM"
    },
  ],
  accounts: [
    { 
      name: "Mr. Suresh Verma", 
      designation: "Accounts Manager", 
      image: "/api/placeholder/300/300", 
      experience: "12 years",
      phone: "+91 76543 21098",
      email: "suresh.verma@hostel.com",
      timings: "10 AM - 6 PM"
    },
    { 
      name: "Ms. Anjali Rao", 
      designation: "Accounts Assistant", 
      image: "/api/placeholder/300/300", 
      experience: "6 years",
      phone: "+91 65432 10987",
      email: "anjali.rao@hostel.com",
      timings: "10 AM - 6 PM"
    },
  ],
  wardens: [
    { name: "Mr. Amit Tiwari", designation: "Warden", image: "/api/placeholder/300/300", experience: "5 years", phone: "", email: "", floor: "1st Floor", students: "1st Year" },
    { name: "Ms. Neha Sharma", designation: "Warden", image: "/api/placeholder/300/300", experience: "4 years", phone: "", email: "", floor: "2nd Floor", students: "1st Year" },
    { name: "Mr. Vinay Das", designation: "Warden", image: "/api/placeholder/300/300", experience: "6 years", phone: "", email: "", floor: "3rd Floor", students: "2nd Year" },
    { name: "Ms. Kavita Nair", designation: "Warden", image: "/api/placeholder/300/300", experience: "7 years", phone: "", email: "", floor: "4th Floor", students: "2nd Year" },
    { name: "Mr. Rohan Iyer", designation: "Warden", image: "/api/placeholder/300/300", experience: "3 years", phone: "", email: "", floor: "5th Floor", students: "3rd Year" },
    { name: "Ms. Meera Joshi", designation: "Warden", image: "/api/placeholder/300/300", experience: "5 years", phone: "", email: "", floor: "6th Floor", students: "3rd Year" },
  ],
  messStaff: [
    { name: "Mr. Ramesh Patel", designation: "Mess Incharge", image: "/api/placeholder/300/300", experience: "9 years" },
    { name: "Mr. Sunil Kumar", designation: "Server", image: "/api/placeholder/300/300", experience: "2 years" },
    { name: "Ms. Pooja Yadav", designation: "Server", image: "/api/placeholder/300/300", experience: "3 years" },
    { name: "Mr. Arjun Singh", designation: "Cook", image: "/api/placeholder/300/300", experience: "7 years" },
    { name: "Ms. Rekha Verma", designation: "Helper", image: "/api/placeholder/300/300", experience: "5 years" },
    { name: "Mr. Manoj Tiwari", designation: "Helper", image: "/api/placeholder/300/300", experience: "4 years" },
  ],
  maintenance: [
    { name: "Ms. Sunita Devi", designation: "Housekeeping", image: "/api/placeholder/300/300", experience: "10 years" },
    { name: "Mr. Ashok Mehta", designation: "Plumber", image: "/api/placeholder/300/300", experience: "15 years" },
  ],
  security: [
    { name: "Mr. Anil Yadav", designation: "Security Guard", image: "/api/placeholder/300/300", experience: "5 years" },
    { name: "Mr. Rajiv Sharma", designation: "Security Guard", image: "/api/placeholder/300/300", experience: "7 years" },
  ],
};

const Staff = () => {
  const [activeSection, setActiveSection] = useState("management");
  const [expandedMember, setExpandedMember] = useState(null);

  // Function to format section names
  const formatSectionName = (name) => {
    return name.replace(/([A-Z])/g, ' $1').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Function to toggle member expansion on mobile
  const toggleMemberDetails = (section, index) => {
    const memberKey = `${section}-${index}`;
    setExpandedMember(expandedMember === memberKey ? null : memberKey);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#0870A4] mb-4 sm:mb-6">Hostel Staff & Workers</h1>
      
      {/* Mobile Category Selector */}
      <div className="md:hidden mb-4 overflow-x-auto">
        <div className="flex whitespace-nowrap p-1">
          {Object.keys(staffData).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-3 py-2 mr-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section
                  ? "bg-[#0870A4] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {formatSectionName(section)}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Staff Sections */}
      <div className="hidden md:block">
        {Object.entries(staffData).map(([section, staff]) => (
          <section key={section} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize bg-white p-3 rounded-lg shadow-sm">
              {formatSectionName(section)}
            </h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {staff.map((member, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-lg border border-gray-300 w-24 h-24 sm:w-28 sm:h-28 object-cover mb-3 sm:mb-0 sm:mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-center sm:text-left">{member.name}</h3>
                      {member.designation && <p className="text-gray-600 text-sm text-center sm:text-left">{member.designation}</p>}
                      <p className="text-sm text-[#0870A4] text-center sm:text-left">Experience: {member.experience}</p>
                      {member.phone && <p className="text-sm text-gray-600">Phone: {member.phone}</p>}
                      {member.email && (
                        <p className="text-sm text-gray-600">
                          Email: <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">{member.email}</a>
                        </p>
                      )}
                      {member.timings && <p className="text-sm text-gray-600">Hours: {member.timings}</p>}
                      {member.floor && (
                        <p className="text-sm text-gray-600">
                          Floor: {member.floor} ({member.students})
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Mobile Staff Section */}
      <div className="md:hidden">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 capitalize bg-white p-3 rounded-lg shadow-sm">
          {formatSectionName(activeSection)}
        </h2>
        <div className="space-y-3">
          {staffData[activeSection].map((member, index) => {
            const memberKey = `${activeSection}-${index}`;
            const isExpanded = expandedMember === memberKey;
            
            return (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                onClick={() => toggleMemberDetails(activeSection, index)}
              >
                <div className="flex items-center p-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full border border-gray-300 w-16 h-16 object-cover mr-3"
                  />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.designation}</p>
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? "transform rotate-180" : ""}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 border-t border-gray-100">
                    <p className="text-sm text-[#0870A4] mb-1">Experience: {member.experience}</p>
                    {member.phone && <p className="text-sm text-gray-600 mb-1">Phone: {member.phone}</p>}
                    {member.email && (
                      <p className="text-sm text-gray-600 mb-1">
                        Email: <a href={`mailto:${member.email}`} className="text-blue-600 underline">{member.email}</a>
                      </p>
                    )}
                    {member.timings && <p className="text-sm text-gray-600 mb-1">Hours: {member.timings}</p>}
                    {member.floor && (
                      <p className="text-sm text-gray-600 mb-1">
                        Floor: {member.floor} ({member.students})
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 bg-[#0870A4] text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Staff;