// firebaseAdmin.js
const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();    // incarcam variabilele din fisierul .env

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error("❌ Missing GOOGLE_APPLICATION_CREDENTIALS in .env");
}

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    console.log("✅ Firestore database is connected...");
} catch (error) {
    console.error("❌ Firestore database connection failed:", error);
}

const db = admin.firestore();

module.exports = { admin, db };
