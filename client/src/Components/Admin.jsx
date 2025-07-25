import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [bookedRooms, setBookedRooms] = useState([]);
  const [bookingsInput, setBookingsInput] = useState('');

  const fetchBookedBeds = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/booked-beds');
      if (!response.ok) throw new Error('Failed to fetch booked beds');
      const data = await response.json();
      setBookedRooms(data.bookedRooms || []);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to fetch booked beds');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedBeds();
  }, []);

  const handleSubmit = async () => {
    const bookings = bookingsInput
      .split(',')
      .map(item => item.trim())
      .filter(item => item)
      .map(item => {
        const [roomNumber, bedNumber] = item.split(':').map(part => part.trim());
        return {
          roomNumber,
          bedNumber: parseInt(bedNumber),
        };
      })
      .filter(
        booking =>
          /^\d{3}$/.test(booking.roomNumber) &&
          [1, 2, 3, 4].includes(booking.bedNumber)
      );

    if (bookings.length === 0) {
      setMessage('Please enter valid bookings (e.g., "101:1, 101:2, 102:3")');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/book-beds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer your-secret-key-123`,
        },
        body: JSON.stringify({ bookings }),
      });

      if (!response.ok) throw new Error('Failed to book beds');

      await fetchBookedBeds();
      setMessage('Beds booked successfully!');
      setBookingsInput('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to book beds');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBed = async (roomNumber, bedNumber) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/unbook-bed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer your-secret-key-123`,
        },
        body: JSON.stringify({ roomNumber, bedNumber }),
      });

      if (!response.ok) throw new Error('Failed to remove booked bed');

      await fetchBookedBeds();
      setMessage(`Bed ${bedNumber} in room ${roomNumber} has been unbooked`);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to remove booked bed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Hostel Bed Booking Admin Panel</h2>
        <div className="space-y-4">
          <textarea
            placeholder='Enter bookings (e.g., 101:1, 101:2, 102:3)'
            value={bookingsInput}
            onChange={(e) => setBookingsInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={loading}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Booking...' : 'Book Beds'}
          </button>

          {message && (
            <div
              className={`p-2 rounded ${
                message.includes('successfully')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Currently Booked Beds</h3>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="space-y-3">
                {bookedRooms.map((room) => (
                  <div key={room.roomNumber} className="bg-gray-100 p-3 rounded-md">
                    <div className="font-bold">Room {room.roomNumber}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[1, 2, 3, 4].map((bed) => (
                        <div
                          key={bed}
                          className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                            room.bookedBeds.includes(bed)
                              ? 'bg-red-500 text-white'
                              : 'bg-green-500 text-white'
                          }`}
                        >
                          Bed {bed}
                          {room.bookedBeds.includes(bed) && (
                            <button
                              onClick={() => handleRemoveBed(room.roomNumber, bed)}
                              disabled={loading}
                              className="text-white hover:text-red-200 text-lg disabled:opacity-50"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
