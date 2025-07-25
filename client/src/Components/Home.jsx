import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import full from "../assets/fullname.jpg";
import collegeImage from "../assets/srkrlogo.jpg";
import ChatBot from "./Chatbot.jsx";
import Footer from "./Footer.jsx";
import ImageSlider from "./ImageSlider.jsx";
import Maps from "./Maps.jsx";

const headings = [
  { name: "Facilities", path: "/facilities" },
  { name: "Fresher Guide", path: "/fresherguide" },
  { name: "Vacancy", path: "/vacancy" },
  { name: "Rules", path: "/rules" },
  { name: "Mess", path: "/mess" },
  
  { name: "Events", path: "/events" },
  { name: "Vacancy", path: "/vacancy" },
  { name: "Staff", path: "/staff" },
];

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="font-[Montserrat] p-2 sm:p-4 max-w-screen-lg mx-auto my-2 sm:my-4 overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="rounded-lg shadow-lg overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-center p-2 sm:p-3 rounded-t-lg bg-white">
          <img 
            src={collegeImage} 
            alt="SRKR Engineering College" 
            className="h-12 sm:h-16 w-auto mb-2 sm:mb-0 sm:mr-4"
          />
          <div className="w-full overflow-hidden">
            <img 
              src={full} 
              alt="Full Name" 
              className="w-full h-auto object-contain max-h-12 sm:max-h-16" 
            />
          </div>
        </div>
      </motion.div>

      {/* Title Banner */}
      <motion.div 
        className="w-full my-4 sm:my-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="font-black text-white bg-[#076593] py-2 sm:py-3 w-full text-center text-xl sm:text-2xl tracking-wider shadow-lg rounded-md relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-white opacity-10"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear", repeatDelay: 5 }}
          />
          SRKR Girls Hostel
        </h2>
      </motion.div>

      {/* Mobile Menu Toggle */}
      {isMobile && (
        <motion.button
          onClick={toggleMenu}
          className="w-full bg-[#054b6e] text-white py-3 rounded-lg mb-4 flex items-center justify-center"
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mr-2">Menu</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${menuOpen ? "transform rotate-180" : ""}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
          </svg>
        </motion.button>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 my-4 sm:my-8 md:h-[400px]">
        {/* Navigation Menu */}
        {(!isMobile || menuOpen) && (
          <motion.div 
            className="flex flex-col gap-2 sm:gap-4 md:w-1/3 h-full justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: isMobile ? 0 : 0.5 }}
          >
            {headings.map((heading, index) => (
              <Link key={index} to={heading.path} onClick={() => isMobile && setMenuOpen(false)}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: 1.03, backgroundColor: "#054b6e" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#076593] text-white text-base sm:text-lg font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-center shadow-md cursor-pointer flex items-center justify-center relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-white opacity-0"
                    whileHover={{ opacity: 0.1 }}
                  />
                  {heading.name}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
        
        {/* Image Slider */}
        {(!isMobile || !menuOpen) && (
          <motion.div 
            className="w-full md:w-2/3 h-full rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: isMobile ? 0 : 0.7 }}
          >
            <ImageSlider />
          </motion.div>
        )}
      </div>

      {/* Maps */}
      {(!isMobile || !menuOpen) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: isMobile ? 0.2 : 0.9 }}
          className="rounded-lg shadow-lg overflow-hidden my-4 sm:my-8"
        >
          <Maps />
        </motion.div>
      )}

      {/* Chat Bot */}
      <div className="fixed bottom-20 right-8 z-50">
        <ChatBot />
      </div>

      {/* Footer */}
      {(!isMobile || !menuOpen) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: isMobile ? 0.3 : 1.1 }}
          className="mt-4 sm:mt-8"
        >
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default Home;
