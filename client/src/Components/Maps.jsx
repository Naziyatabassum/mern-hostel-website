import { ExternalLink, MapPin, Navigation } from "lucide-react";
import React from "react";

const Maps = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gradient-to-b from-white to-blue-50 py-8 sm:py-12 md:py-16 px-4">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-8 md:mb-12">
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <MapPin className="text-blue-600" size={24} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Our Location</h2>
            </div>
            
            <p className="text-base sm:text-lg text-gray-600">
              Visit our campus located at SRKR Girls Hostel, Bhimavaram. We're conveniently 
              situated in the heart of the city with easy access to all major facilities.
            </p>
            
            <div className="flex justify-center md:justify-start">
              <a
                href="https://www.google.com/maps/search/?api=1&query=SRKR+Girls+Hostel+Bhimavaram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg text-sm sm:text-base"
              >
                <Navigation size={16} className="hidden sm:inline" />
                Get Directions
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <div className="relative overflow-hidden rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl border-2 sm:border-4 border-white h-64 sm:h-80 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1743921209465!6m8!1m7!1s0pd9RDTZUozj-VI1J-fA4w!2m2!1d16.54549158444856!2d81.49536427850208!3f261.71446633169677!4f30.92544462224049!5f0.4000000000000002"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="SRKR Girls Hostel Map"
              ></iframe>
              
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2 sm:p-4">
                <div className="flex items-center justify-between flex-wrap gap-1 text-xs sm:text-sm md:text-base">
                  <span className="font-medium text-gray-800">SRKR Girls Hostel</span>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=SRKR+Girls+Hostel+Bhimavaram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    View larger map <ExternalLink size={12} className="ml-1 hidden sm:inline" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg">
            <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800">Address</h3>
            <p className="text-sm sm:text-base text-gray-600">SRKR Girls Hostel, College Road, Bhimavaram, Andhra Pradesh 534202</p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg">
            <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800">Opening Hours</h3>
            <p className="text-sm sm:text-base text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800">Contact</h3>
            <p className="text-sm sm:text-base text-gray-600">Phone: (123) 456-7890<br />Email: info@srkrhostel.edu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;