// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// 1. Safe Model Definition (Prevents Overwrite Errors)
// const Location = mongoose.models.Location || mongoose.model('Location', new mongoose.Schema({
//     name: String,
//     type: String,
//     lat: Number,
//     lng: Number,
//     image: String,
//     description: String
// }));

// 2. Database Connection with Timeout
// const connectDB = async () => {
//     try {
//         console.log("⏳ Connecting to MongoDB...");
//         await mongoose.connect(process.env.MONGO_URI, {
//             serverSelectionTimeoutMS: 5000 
//         });
//         console.log("✅ MongoDB Connected Successfully!");
//     } catch (err) {
//         console.error("❌ Database Connection Failed!");
//         console.log("🚀 Switching to Demo Mode (Local Data)...");
//     }
// };
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// --- MOCK DATA ---
// let locations = [
//     { 
//         id: 1, 
//         name: "The Modernist Thessaloniki", 
//         type: "Accommodations", 
//         lat: 40.6346, 
//         lng: 22.9427, 
//         image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600",
//         description: "Boutique hotel. Very dog-friendly rooms available." 
//     },
//     { 
//         id: 2, 
//         name: "Electra Palace", 
//         type: "Accommodations", 
//         lat: 40.6327, 
//         lng: 22.9402, 
//         image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
//         description: "Luxury stay at Aristotelous Square. Pets welcome." 
//     },
//     { 
//       id: 3, 
//       name: "Kitchen Bar", 
//       type: "Going Out", 
//       lat: 40.6325, 
//       lng: 22.9405, 
//       image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600",
//       description: "Port-side dining with great views. Very accommodating to large dogs." 
//     },
//     { 
//       id: 4, 
//       name: "Local Thessaloniki", 
//       type: "Going Out", 
//       lat: 40.6310, 
//       lng: 22.9440, 
//       image: "https://images.unsplash.com/photo-1559925393-8be0ec41b51e?w=600",
//       description: "Popular cafe-bar in the center. Pets are welcome in the outdoor seating area." 
//     }
// ];

// // Local User Store for Demo
// const users = [{ email: "student@ihu.gr", password: "password123", name: "Thessaloniki User" }];

// // --- ROUTES ---

// app.get('/', (req, res) => res.send('<h1>🐾 Paws in SKG API Live</h1>'));

// // GET Locations with Cloud-to-Local Fallback
// app.get('/api/locations', async (req, res) => {
//     try {
//         // Try DB first, but don't wait more than 2 seconds
//         const dbLocations = await Location.find().maxTimeMS(2000); 
//         if (dbLocations && dbLocations.length > 0) {
//             return res.json(dbLocations);
//         }
//         res.json(locations); 
//     } catch (err) {
//         res.json(locations); 
//     }
// });

// // DELETE Location
// app.get('/api/locations/delete/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         // Attempt Cloud Delete if ID is a MongoDB ObjectId
//         if (mongoose.Types.ObjectId.isValid(id)) {
//             await Location.findByIdAndDelete(id);
//         }
//         // Always update local array too
//         locations = locations.filter(loc => loc.id != id);
//         res.json({ success: true, message: "Deleted" });
//     } catch (err) {
//         res.status(500).json({ success: false });
//     }
// });

// // LOGIN
// app.post('/api/login', (req, res) => {
//     const { email, password } = req.body;
//     const user = users.find(u => u.email === email && u.password === password);
//     if (user) {
//         res.json({ success: true, user });
//     } else {
//         res.status(401).json({ success: false, message: "Invalid email or password" });
//     }
// });

// // SIGNUP
// app.post('/api/signup', (req, res) => {
//     const { name, email, password } = req.body;
    
//     // Check if user already exists
//     const exists = users.find(u => u.email === email);
//     if (exists) {
//         return res.status(400).json({ success: false, message: "User already exists!" });
//     }

//     const newUser = { name, email, password };
//     users.push(newUser); 
//     console.log(`✨ New user registered: ${name}`);
//     res.json({ success: true, user: newUser });
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));