const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/hostelBooking');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Bed Booking Schema
const BedBookingSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  bedNumber: { type: Number, required: true, min: 1, max: 4 },
  isBooked: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now }
});

// Compound index to ensure unique bed in a room
BedBookingSchema.index({ roomNumber: 1, bedNumber: 1 }, { unique: true });

const BedBooking = mongoose.model('BedBooking', BedBookingSchema);

// Get all booked beds (grouped by room)
app.get('/api/booked-beds', async (req, res) => {
  try {
    const bookedBeds = await BedBooking.find({ isBooked: true });
    
    // Group by room number
    const roomsMap = new Map();
    bookedBeds.forEach(bed => {
      if (!roomsMap.has(bed.roomNumber)) {
        roomsMap.set(bed.roomNumber, []);
      }
      roomsMap.get(bed.roomNumber).push(bed.bedNumber);
    });
    
    // Convert to array of objects
    const result = Array.from(roomsMap).map(([roomNumber, beds]) => ({
      roomNumber,
      bookedBeds: beds
    }));
    
    res.json({ bookedRooms: result });
  } catch (error) {
    console.error('Error fetching booked beds:', error);
    res.status(500).json({ error: 'Failed to fetch booked beds' });
  }
});

// Book beds
app.post('/api/book-beds', async (req, res) => {
  try {
    const { bookings } = req.body;

    if (!bookings || !Array.isArray(bookings)) {
      return res.status(400).json({ error: 'Invalid bookings data' });
    }

    // Validate each booking
    for (const booking of bookings) {
      if (!booking.roomNumber || !booking.bedNumber) {
        return res.status(400).json({ error: 'Each booking must have roomNumber and bedNumber' });
      }
      if (booking.bedNumber < 1 || booking.bedNumber > 4) {
        return res.status(400).json({ error: 'Bed number must be between 1 and 4' });
      }
    }

    const operations = bookings.map(booking => ({
      updateOne: {
        filter: { 
          roomNumber: booking.roomNumber,
          bedNumber: booking.bedNumber
        },
        update: { $set: { isBooked: true } },
        upsert: true
      }
    }));

    await BedBooking.bulkWrite(operations);

    res.status(201).json({ message: 'Beds booked successfully' });
  } catch (error) {
    console.error('Error booking beds:', error);
    res.status(500).json({ error: 'Failed to book beds' });
  }
});

// Unbook a bed
app.post('/api/unbook-bed', async (req, res) => {
  try {
    const { roomNumber, bedNumber } = req.body;

    if (!roomNumber || !bedNumber) {
      return res.status(400).json({ error: 'Room number and bed number are required' });
    }

    await BedBooking.findOneAndUpdate(
      { roomNumber, bedNumber },
      { $set: { isBooked: false } }
    );

    res.json({ message: 'Bed unbooked successfully' });
  } catch (error) {
    console.error('Error unbooking bed:', error);
    res.status(500).json({ error: 'Failed to unbook bed' });
  }
});

// Handle unhandled routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));