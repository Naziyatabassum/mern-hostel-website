import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Facilities = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isScrolling, setIsScrolling] = useState(false);
  
  const location = useLocation();
  
  // Get scroll position for shadow effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Get facility icons as component
  const getIcon = (iconName) => {
    // Simple function to render a letter inside a circle
    // In a production app, you'd import actual icons
    return (
      <div className="w-10 h-10 rounded-full bg-[#076593] text-white flex items-center justify-center mr-3">
        <span className="text-xl font-bold">{iconName.charAt(0).toUpperCase()}</span>
      </div>
    );
  };
  
  const facilities = [
    { id: 1, name: "High-Speed WiFi", description: "Stay connected with our lightning-fast internet service, available throughout the hostel. Perfect for online classes, streaming, gaming, or video calls with family and friends.", icon: "wifi", category: "essential" },
    { id: 2, name: "Study Room", description: "A dedicated quiet space designed for productive study sessions. Equipped with individual desks, ergonomic chairs, proper lighting, and power outlets to help you focus on your academics.", icon: "book", category: "academic" },
    { id: 3, name: "Digital Room", description: "Our modern digital room features computers, printers, and scanners for all your technological needs. A perfect space for completing assignments or working on projects.", icon: "desktop", category: "academic" },
    { id: 4, name: "24/7 Hot Water", description: "Enjoy hot water available round the clock in all bathrooms. Our efficient water heating system ensures you never have to worry about cold showers, regardless of the time or season.", icon: "shower", category: "essential" },
    { id: 5, name: "Secure Lockers", description: "Every room is equipped with personal lockers to keep your valuables safe. Each locker can be secured with your own lock to provide peace of mind during your stay.", icon: "lock", category: "essential" },
    { id: 6, name: "Backup Generator", description: "Never worry about power outages affecting your studies or comfort. Our backup generator kicks in automatically to ensure uninterrupted electricity supply throughout the hostel.", icon: "bolt", category: "essential" },
    { id: 7, name: "Stationery Store", description: "Our on-premise stationery store stocks all academic essentials. From notebooks and pens to project materials, find everything you need without leaving the hostel.", icon: "pen", category: "service" },
    { id: 8, name: "3 Modern Lifts", description: "Navigate between floors effortlessly with our three high-speed elevators. Designed to minimize wait times during peak hours and ensure easy access to all parts of the building.", icon: "arrow-up", category: "infrastructure" },
    { id: 9, name: "3 Spacious Dining Halls", description: "Enjoy your meals in any of our three well-maintained dining areas. Designed to accommodate all residents comfortably during meal times with clean, hygienic serving facilities.", icon: "utensils", category: "essential" },
    { id: 10, name: "Laundry Service", description: "Take advantage of our washing machine service available twice weekly. Keep your clothes fresh and clean without the hassle of finding off-campus laundry facilities.", icon: "washer", category: "service" }
  ];

  const filteredFacilities = activeTab === 'all' ? facilities : facilities.filter(facility => facility.category === activeTab);

  return (
    <div className="min-h-screen bg-white font-[Montserrat]">
      {/* Header - Responsive text size */}
      <div className="bg-[#076593] py-4 px-4 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Hostel Facilities</h1>
      </div>

      {/* Introduction - Responsive padding and max-width */}
      <div className="container px-4 sm:px-6 py-4 sm:py-6 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto text-center">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Our hostel is equipped with state-of-the-art facilities designed to create a balanced environment 
          for both academic pursuits and comfortable living. We understand the importance of providing 
          students with everything they need to succeed in their studies while enjoying their time at our accommodation.
        </p>
      </div>

      {/* Tabs - Sticky on scroll with shadow effect */}
      <div className={`bg-gray-50 py-2 sm:py-4 border-b border-gray-200 sticky top-0 z-10 transition-shadow ${isScrolling ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-2 sm:px-4 flex overflow-x-auto gap-2 sm:gap-4 md:justify-center pb-1">
          {['all', 'essential', 'academic', 'service', 'infrastructure'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base whitespace-nowrap transition-colors duration-200 ${activeTab === tab ? 'text-[#076593] font-medium border-b-2 border-[#076593]' : 'text-gray-600 hover:text-[#076593]'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Grid - Responsive grid columns and spacing */}
      <div className="container mx-auto px-4 py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredFacilities.map((facility) => (
          <div 
            key={facility.id} 
            className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="h-36 sm:h-40 md:h-48 overflow-hidden">
              <img 
                src={`/api/placeholder/600/400?text=${facility.name}`} 
                alt={facility.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col">
              <div className="flex items-center mb-2 sm:mb-3">
                {getIcon(facility.icon)}
                <h3 className="text-base sm:text-lg font-semibold text-[#076593]">{facility.name}</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 flex-grow">{facility.description}</p>
              <span className="mt-3 sm:mt-4 inline-block bg-gray-100 text-[#076593] text-xs px-2 py-1 rounded">
                {facility.category.charAt(0).toUpperCase() + facility.category.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section - Responsive padding and text size */}
      <div className="bg-white text-[#076593] py-8 sm:py-12 text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Ready to Experience Our Hostel?</h2>
        <p className="text-sm sm:text-base md:text-lg max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-4 sm:mb-6 px-4">
          Hurry up! Check for the vacancy here...
        </p>
        <a 
          href="/vacancy" 
          className="inline-block bg-[#076593] text-white font-bold py-2 px-4 sm:px-5 rounded-full text-xs sm:text-sm md:text-base hover:bg-[#065480] transition-colors duration-300"
        >
          Check Vacancy
        </a>
      </div>

    </div>
  );
};

export default Facilities;