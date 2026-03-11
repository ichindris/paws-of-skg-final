const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['Accommodations', 'Going Out', 'Park', 'Services'] 
  },
  lat: { type: Number, required: true }, // Latitude
  lng: { type: Number, required: true }, // Longitude
  description: String,
  image: { type: String, default: "https://via.placeholder.com/400" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', LocationSchema);