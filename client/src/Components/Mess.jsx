import React, { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const meals = ["Breakfast", "Lunch", "Dinner"];

const vegMenu = {
  Monday: { Breakfast: "Onion Dosa", Lunch: "Brinjal", Dinner: "Dondakaya" },
  Tuesday: { Breakfast: "Idli & Sambar", Lunch: "Cabbage", Dinner: "Cauliflower" },
  Wednesday: { Breakfast: "Bonda", Lunch: "Lady's Finger", Dinner: "Veg Biryani & Paneer" },
  Thursday: { Breakfast: "Uthappam", Lunch: "Gongura", Dinner: "Brinjal" },
  Friday: { Breakfast: "Dosa", Lunch: "Chole Bhature", Dinner: "Fried Rice" },
  Saturday: { Breakfast: "Vada & Upma", Lunch: "Tomato Rice", Dinner: "Chapathi/Dosa" },
  Sunday: { Breakfast: "Mysore Bhaji", Lunch: "Biryani & Paneer", Dinner: "Sambar" },
};

const nonVegMenu = {
  Monday: { Breakfast: "Onion Dosa", Lunch: "Brinjal", Dinner: "Dondakaya" },
  Tuesday: { Breakfast: "Idli & Sambar", Lunch: "Cabbage", Dinner: "Omlette & Sambar" },
  Wednesday: { Breakfast: "Bonda", Lunch: "Lady's Finger", Dinner: "Biryani & Chicken Curry" },
  Thursday: { Breakfast: "Uthappam", Lunch: "Gongura", Dinner: "Brinjal" },
  Friday: { Breakfast: "Dosa", Lunch: "Chole Bhature", Dinner: "Boiled Egg" },
  Saturday: { Breakfast: "Vada & Upma", Lunch: "Tomato Rice", Dinner: "Chapathi/Dosa" },
  Sunday: { Breakfast: "Mysore Bhaji", Lunch: "Biryani & Chicken Curry", Dinner: "Sambar" },
};

// Placeholder images since actual paths might not be available
const mealImages = {
  Breakfast: "/api/placeholder/300/200",
  Lunch: "/api/placeholder/300/200",
  Dinner: "/api/placeholder/300/200",
};

function Menu() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [menuType, setMenuType] = useState("veg");
  const menuData = menuType === "veg" ? vegMenu : nonVegMenu;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white p-2 sm:p-4 md:p-6 font-sans text-black">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 sm:mb-4">Hostel Menu</h1>
      <p className="text-center text-black mb-4 text-sm sm:text-base md:text-lg px-2 sm:px-4 md:px-8 max-w-4xl">
        Our hostel provides a balanced and nutritious menu with both vegetarian and non-vegetarian options. The meals are carefully 
        prepared to cater to different dietary preferences, ensuring taste and quality. Choose between vegetarian and non-vegetarian options to see the menu for the week.
      </p>
      
      <div className="mb-4 sm:mb-6 flex space-x-2 sm:space-x-4">
        <button 
          className={`px-3 sm:px-4 md:px-6 py-1 sm:py-2 font-semibold rounded-lg text-sm sm:text-base ${menuType === "veg" ? "bg-[#0870A4] text-white" : "bg-blue-200 text-black hover:bg-blue-300"}`}
          onClick={() => setMenuType("veg")}
        >
          Vegetarian
        </button>
        <button 
          className={`px-3 sm:px-4 md:px-6 py-1 sm:py-2 font-semibold rounded-lg text-sm sm:text-base ${menuType === "nonveg" ? "bg-[#0870A4] text-white" : "bg-blue-200 text-black hover:bg-blue-300"}`}
          onClick={() => setMenuType("nonveg")}
        >
          Non-Vegetarian
        </button>
      </div>
      
      <div className="relative w-full max-w-4xl px-2 sm:px-4">
        {selectedDay && (
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
        )}
        
        {/* Mobile View - Accordion Style */}
        <div className="block md:hidden w-full">
          {days.map((day) => (
            <div key={day} className="mb-2 border rounded-md shadow-sm bg-white overflow-hidden">
              <div 
                className="font-semibold text-center text-white p-2 bg-[#0870A4] cursor-pointer"
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </div>
              <div className="p-2">
                {meals.map((meal) => (
                  <div key={meal} className="flex justify-between items-center py-1 border-b last:border-b-0">
                    <span className="font-medium">{meal}:</span>
                    <span className="text-gray-700">{menuData[day][meal]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop View - Table Style */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-2 bg-[#0870A4] text-white font-semibold text-center p-3 rounded-md w-full">
            <div className="p-2">Day / Meal</div>
            {meals.map((meal) => (
              <div key={meal} className="p-2">{meal}</div>
            ))}
          </div>
          {days.map((day) => (
            <div 
              key={day} 
              className="grid grid-cols-4 gap-2 bg-white shadow-md p-3 rounded-md w-full border-b cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedDay(day)}
            >
              <div className="font-semibold text-center text-white p-2 bg-[#0870A4] rounded-md">{day}</div>
              {meals.map((meal) => (
                <div key={meal} className="p-2 bg-gray-50 text-center rounded-md">
                  {menuData[day][meal]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal View */}
      {selectedDay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-4 sm:p-6 shadow-2xl rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-center">{selectedDay} Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {meals.map((meal) => (
                <div key={meal} className="text-center">
                  <img 
                    src={mealImages[meal]} 
                    alt={meal} 
                    className="w-full h-32 object-cover rounded-md mx-auto"
                  />
                  <p className="mt-2 font-semibold">{meal}</p>
                  <p className="text-gray-700">{menuData[selectedDay][meal]}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" 
                onClick={() => setSelectedDay(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;