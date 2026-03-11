const mongoose = require('mongoose');
require('dotenv').config();

console.log("--- MongoDB Connection Test ---");
console.log("Target URI:", process.env.MONGO_URI ? "Found in .env" : "NOT FOUND");

async function runTest() {
    try {
        console.log("Attempting to reach Atlas...");
        await mongoose.connect(process.env.MONGO_URI, { 
            serverSelectionTimeoutMS: 5000 
        });
        console.log("✅ SUCCESS: Connected to Thessaloniki Pet Database!");
        process.exit(0);
    } catch (err) {
        console.error("❌ CONNECTION FAILED");
        console.error("Error Name:", err.name);
        console.error("Error Code:", err.code);
        console.error("Message:", err.message);
        
        if (err.code === 'ENOTFOUND') {
            console.log("\n💡 DIAGNOSIS: Your computer cannot find the address. Try switching your Wi-Fi to a Mobile Hotspot for 1 minute to see if it connects.");
        } else if (err.message.includes('Authentication failed')) {
            console.log("\n💡 DIAGNOSIS: Your password or username is wrong.");
        }
        process.exit(1);
    }
}

runTest();