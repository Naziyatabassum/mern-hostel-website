import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const chatContainerRef = useRef(null);
  
  // Scroll to bottom of chat when history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setChatHistory([...chatHistory, { sender: "user", text: message }]);
    
    // Show the category options after user sends a message
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          sender: "bot", 
          text: "Please select a category for your question:" 
        }
      ]);
      setShowCategories(true);
    }, 500);
    
    setMessage("");
  };

  const handleCategorySelect = (category, path) => {
    // Add the selected category to chat history
    setChatHistory(prev => [
      ...prev,
      { sender: "user", text: `I want to know about ${category}` }
    ]);

    // Hide the category options
    setShowCategories(false);

    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { sender: "bot", text: `Navigating to the page with information about ${category}.` }
      ]);
      
      // Navigate after a brief delay using window.location
      setTimeout(() => {
        // For Accommodation & Facilities, add a query parameter to scroll to the section
        if (category === "Accommodation & Facilities") {
          window.location.href = `${path}?section=accommodation`;
        } else {
          window.location.href = path;
        }
        setIsOpen(false);
      }, 1500);
    }, 500);
  };

  const categories = [
    { name: "Safety & Security", path: "/rules" },
    { name: "Food & Mess Services", path: "/mess" },
    { name: "Rules & Regulations", path: "/rules" },
    { name: "Accommodation & Facilities", path: "/fresherguide" }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button - responsive size */}
      <motion.button
        className="bg-[#076593] text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#054b6e]"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Chat Support"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      {/* Chat window - responsive width */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-12 right-0 w-72 sm:w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Compact header */}
            <div className="bg-[#076593] text-white p-2 sm:p-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm sm:text-base">Chat Support</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white hover:text-gray-200"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Chat messages - responsive height */}
            <div 
              ref={chatContainerRef}
              className="h-56 sm:h-64 md:h-72 overflow-y-auto p-2 sm:p-3 bg-gray-50"
            >
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-500 mt-16 text-sm sm:text-base">
                  <p>How can we help you today?</p>
                </div>
              ) : (
                <div>
                  {chatHistory.map((chat, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`mb-2 ${
                        chat.sender === "user" 
                          ? "text-right" 
                          : "text-left"
                      }`}
                    >
                      <span 
                        className={`inline-block px-2 py-1 rounded-lg text-sm ${
                          chat.sender === "user"
                            ? "bg-[#076593] text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {chat.text}
                      </span>
                    </motion.div>
                  ))}
                  
                  {/* Category selection - responsive grid */}
                  {showCategories && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3"
                    >
                      {categories.map((category, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleCategorySelect(category.name, category.path)}
                          className="bg-white border border-[#076593] text-[#076593] rounded p-2 text-xs sm:text-sm font-medium hover:bg-[#076593] hover:text-white transition-colors text-center"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {category.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
            
            {/* Compact chat input - responsive padding and text */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-2 sm:p-3 flex">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-l-md py-1 px-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#076593]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-[#076593] text-white px-2 sm:px-3 rounded-r-md hover:bg-[#054b6e]"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;