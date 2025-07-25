import { Calendar, X } from "lucide-react";
import React, { useEffect, useState } from "react";

// Shortened event descriptions
const eventsData = [
  {
    name: "New Year",
    date: "January 1, 2024",
    description: "Grand celebration with DJ party, fireworks, cake-cutting ceremony and a festive meal bringing everyone together to create unforgettable memories.",
    image: "https://img.freepik.com/free-photo/new-year-banner-with-fireworks_23-2149539970.jpg",
  },
  {
    name: "Makar Sankranti",
    date: "January 15, 2024",
    description: "Combined with New Year festivities featuring a Rangoli competition with prizes for top designs. Enjoy traditional sweets and cultural activities.",
    image: "https://srichants.in/wp-content/uploads/2024/11/Happy-Sankranti-1024x585.webp",
  },
  {
    name: "Holi",
    date: "March 25, 2024",
    description: "Vibrant celebration with colors, music and dance. The hostel provides colors for an unforgettable festival experience with traditional sweets.",
    image: "https://www.shutterstock.com/shutterstock/photos/788076238/display_1500/stock-photo-organic-gulal-colors-in-bowl-for-holi-festival-788076238.jpg",
  },
  {
    name: "Varalakshmi Vratham",
    date: "August 16, 2024",
    description: "Special celebration with decorated idol of Goddess Lakshmi, traditional puja ceremonies, spiritual chants, and a delicious feast.",
    image: "https://s3.amazonaws.com/RudraCentre/ProductImages/Articles/Varalakshmi-Pooja-at-home.jpg",
  },
  {
    name: "Vinayaka Chavithi",
    date: "September 7, 2024",
    description: "Celebration featuring Lord Ganesha idol adorned with flowers and lights, traditional puja rituals, and prasadam offerings.",
    image: "https://utsav.gov.in/public/uploads/event_picture_image/event_36/16491489141910328015.jpg",
  },
  {
    name: "Krishna Janmashtami",
    date: "August 26, 2024",
    description: "Traditional celebration with decorations, 'Utti' (Dahi Handi) game, cultural performances, and students in traditional attire.",
    image: "https://i.pinimg.com/474x/64/62/13/64621302548f871d262d06dc67121fa3.jpg",
  },
  {
    name: "Dussehra",
    date: "October 12, 2024",
    description: "Day begins with special puja, followed by traditional games, fun activities and a delicious feast for all residents.",
    image: "https://c4.wallpaperflare.com/wallpaper/767/126/351/festivals-holidays-dussehra-wallpaper-preview.jpg",
  },
  {
    name: "Diwali",
    date: "November 1, 2024",
    description: "Grand celebration with 'deepalu' decorations, firecrackers, and a special DJ night for everyone to enjoy the festival of lights.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq4a6cdS--1I1KXZb13ny_bnC1Ht0T0YJw4Q&s",
  },
  {
    name: "Christmas",
    date: "December 25, 2024",
    description: "Festive celebration with special prayers, church visits for Christian students, and beautiful decorations spreading holiday cheer.",
    image: "https://www.abhibus.com/blog/wp-content/uploads/2023/12/10-Reasons-Why-We-Celebrate-Christmas.jpg",
  },
];

const Events = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for images
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/400/300?text=Image+Not+Available";
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setSelectedImage(event.image);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedEvent(null);
    
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  // Close modal with escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && selectedEvent) {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [selectedEvent]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header with responsive text sizes */}
      <div className="bg-[#0870A4] text-white py-4 sm:py-6 shadow-md">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Festival Celebrations</h1>
          <p className="mt-2 text-sm sm:text-base opacity-90">Annual cultural events at SRKR Girls Hostel</p>
        </div>
      </div>

      {/* Responsive grid with proper spacing for different screens */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {eventsData.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => openEventModal(event)}
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                {isLoading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <>
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="absolute top-0 right-0 bg-[#0870A4] text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-bl-lg">
                      {event.date.split(", ")[0]}
                    </div>
                  </>
                )}
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{event.name}</h3>
                <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
                  <Calendar size={14} className="mr-1" />
                  {event.date}
                </div>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">{event.description}</p>
                <button 
                  className="mt-2 sm:mt-3 text-[#0870A4] text-xs sm:text-sm font-medium hover:underline"
                  aria-label={`Read more about ${event.name}`}
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Event Details - Responsive padding and positioning */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 sm:h-56 md:h-64">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.name}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <button
                className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white p-1 rounded-full shadow-md text-gray-800 hover:bg-gray-100"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{selectedEvent.name}</h3>
                  <div className="flex items-center text-[#0870A4] mt-1 text-sm sm:text-base">
                    <Calendar size={16} className="mr-2" />
                    <span>{selectedEvent.date}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm sm:text-base">{selectedEvent.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;