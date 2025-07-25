import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ventilationRooms = [
  "101", "102", "103", "104", "105", "106", "107", "122", "123", "124", "125", "126", "127", "128",
  "201", "202", "203", "204", "205", "206", "207", "222", "223", "224", "225", "226", "227", "228",
];
const nonVentilationRooms = [
  "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121",
  "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221",
];

const Vacancy = () => {
  const navigate = useNavigate();
  const [highlightedBlock1, setHighlightedBlock1] = useState("1st Years");
  const [highlightedBlock2, setHighlightedBlock2] = useState("4th Years");
  const [showRooms, setShowRooms] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showVacancyPopup, setShowVacancyPopup] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);
  const [inputError, setInputError] = useState("");
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedBlock1((prev) =>
        prev === "1st Years" ? "2nd Years" : prev === "2nd Years" ? "3rd Years" : "1st Years"
      );
      setHighlightedBlock2((prev) => (prev === "4th Years" ? "Final Years" : "4th Years"));
    }, 3000);

    const timer = setTimeout(() => {
      setShowRooms(true);
    }, 8000);

    const fetchBookedBeds = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5001/api/booked-beds');
        if (!response.ok) throw new Error('Failed to fetch booked beds');
        const data = await response.json();
        setBookedRooms(data.bookedRooms || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookedBeds();

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (showVacancyPopup && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showVacancyPopup]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleCheckVacancy = () => {
    setShowVacancyPopup(true);
    setUserInput("");
    setPredictionResult(null);
    setInputError("");
  };

  const navigateToAdmin = () => {
    console.log("Navigating to admin panel");
    navigate('/vacancy/admin-panel');  // Try direct navigation to admin-panel
  };

  const isRoomFullyBooked = (roomNumber) => {
    const room = bookedRooms.find(r => r.roomNumber === roomNumber);
    return room && room.bookedBeds.length === 4;
  };

  const getBookedBedsForRoom = (roomNumber) => {
    const room = bookedRooms.find(r => r.roomNumber === roomNumber);
    return room ? room.bookedBeds : [];
  };

  const BedLayout = ({ roomNumber }) => {
    const bookedBeds = getBookedBedsForRoom(roomNumber);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Room {roomNumber} - Beds</h3>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((bed) => (
              <div
                key={bed}
                className={`w-24 h-24 ${
                  bookedBeds.includes(bed) 
                    ? 'bg-red-500' 
                    : 'bg-green-500'
                } text-white flex flex-col items-center justify-center font-bold rounded-md shadow-lg`}
              >
                <div className="text-xl">Bed {bed}</div>
                <div className="text-sm mt-1">
                  {bookedBeds.includes(bed) ? 'Booked' : 'Available'}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedRoom(null)}
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);

  const handleSubmit = async () => {
    setInputError("");
    if (!userInput.trim()) {
      setInputError("Please enter a valid input before submitting");
      return;
    }
    
    setIsLoadingPrediction(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_input: userInput,
          is_holiday: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server.");
      }

      const data = await response.json();
      setPredictionResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the prediction. Please try again.");
    } finally {
      setIsLoadingPrediction(false);
    }
  };

  const handleCloseVacancyPopup = () => {
    setShowVacancyPopup(false);
    setUserInput("");
    setPredictionResult(null);
    setInputError("");
  };

  const VacancyPopup = () => {
    const popupInputRef = useRef(null);

    useEffect(() => {
      if (popupInputRef.current) {
        popupInputRef.current.focus();
      }
    }, []);

    const handlePopupClick = (e) => {
      e.stopPropagation();
    };

    const handleInputChange = (e) => {
      setUserInput(e.target.value);
      if (inputError) {
        setInputError("");
      }
    };

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handlePopupClick}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-bold mb-4">Check Room Vacancy</h3>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder='e.g., "I would like to book a room next week", "2023-11-15"'
            className={`w-full p-2 border ${inputError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            ref={popupInputRef}
          />
          
          {inputError && (
            <div className="text-red-500 text-sm mt-1">
              {inputError}
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoadingPrediction}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoadingPrediction ? "Loading..." : "Submit"}
            </button>
            <button
              onClick={handleCloseVacancyPopup}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>

          {predictionResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h4 className="font-bold text-lg mb-2">Prediction Results</h4>
              <p>Current Vacancy: {predictionResult.current_vacancy_percentage}%</p>
              <p>Booking Vacancy: {predictionResult.booking_vacancy_percentage}%</p>
              <p>Booking Percentage: {predictionResult.booking_booking_percentage}%</p>
              <p>Booking Date: {predictionResult.booking_date}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 text-gray-900 p-6 w-full overflow-hidden">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-4">🏢 Hostel Overview</h1>

      <div className="flex w-full justify-center items-start gap-8">
        <div className="flex flex-col items-center">
          <div className="flex gap-12">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-blue-800 mb-2">🏢 Block-1</h2>
              <div className="relative flex flex-col bg-gray-800 p-4 rounded-lg shadow-xl w-48">
                {[...Array(6)].map((_, index) => {
                  const floor = 6 - index;
                  const isHighlighted =
                    (highlightedBlock1 === "1st Years" && floor <= 2) ||
                    (highlightedBlock1 === "2nd Years" && floor >= 3 && floor <= 4) ||
                    (highlightedBlock1 === "3rd Years" && floor >= 5);

                  return (
                    <div
                      key={floor}
                      className={`w-full h-14 flex items-center justify-center text-lg font-bold transition-all ${
                        isHighlighted ? "bg-blue-500 text-white shadow-md" : "bg-gray-300"
                      }`}
                    >
                      Floor {floor}
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-md shadow-md">
                {highlightedBlock1}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-green-800 mb-2">🏢 Block-2</h2>
              <div className="relative flex flex-col bg-gray-800 p-4 rounded-lg shadow-xl w-48">
                {[...Array(6)].map((_, index) => {
                  const floor = 6 - index;
                  const isHighlighted = highlightedBlock2 === "4th Years";

                  return (
                    <div
                      key={floor}
                      className={`w-full h-14 flex items-center justify-center text-lg font-bold transition-all ${
                        isHighlighted ? "bg-green-500 text-white shadow-md" : "bg-gray-300"
                      }`}
                    >
                      Floor {floor}
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-md shadow-md">
                {highlightedBlock2}
              </div>
            </div>
          </div>

          {showRooms && (
            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={handleCheckVacancy}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={loading}
              >
                Check Room Vacancy
              </button>
              
              {loading && <div className="text-center text-gray-500">Loading room status...</div>}
            </div>
          )}
        </div>

        {showRooms && (
          <div className="flex flex-col items-center w-[50%]">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🏠 Room Layout</h2>
            <div className="flex flex-col gap-4 w-full">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md w-full">
                <h3 className="text-lg font-bold text-blue-800 mb-2">🌬 Ventilation Rooms</h3>
                <div className="grid grid-cols-8 gap-2 w-full">
                  {ventilationRooms.map((room) => (
                    <div
                      key={room}
                      onClick={() => handleRoomClick(room)}
                      className={`w-14 h-10 ${
                        isRoomFullyBooked(room) 
                          ? 'bg-red-500' 
                          : 'bg-blue-400'
                      } text-white flex items-center justify-center font-bold rounded-md shadow-sm text-sm cursor-pointer hover:${
                        isRoomFullyBooked(room) 
                          ? 'bg-red-600' 
                          : 'bg-blue-500'
                      }`}
                    >
                      {room}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full">
                <h3 className="text-lg font-bold text-gray-800 mb-2">🚪 Non-Ventilation Rooms</h3>
                <div className="grid grid-cols-8 gap-2 w-full">
                  {nonVentilationRooms.map((room) => (
                    <div
                      key={room}
                      onClick={() => handleRoomClick(room)}
                      className={`w-14 h-10 ${
                        isRoomFullyBooked(room) 
                          ? 'bg-red-500' 
                          : 'bg-gray-500'
                      } text-white flex items-center justify-center font-bold rounded-md shadow-sm text-sm cursor-pointer hover:${
                        isRoomFullyBooked(room) 
                          ? 'bg-red-600' 
                          : 'bg-gray-600'
                      }`}
                    >
                      {room}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showVacancyPopup && <VacancyPopup />}
      {selectedRoom && <BedLayout roomNumber={selectedRoom} />}
    </div>
  );
};

export default Vacancy;