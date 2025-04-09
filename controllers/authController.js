const { db } = require("../firebaseAdmin");;
const admin = require('firebase-admin');
const axios = require('axios');
require('dotenv').config();

class AuthController{
    get_user_profile = async (req, res) => {
        const { uid } = req.user;
        try {
          const userRef = db.collection('users').doc(uid);
          const doc = await userRef.get();
      
          if (!doc.exists) return res.status(404).json({ message: 'Profilul nu există' });
      
          res.status(200).json({ user: doc.data() });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      
      update_user_profile = async (req, res) => {
        const { uid } = req.user;
        const { username, image } = req.body;
      
        try {
          const userRef = db.collection('users').doc(uid);
          await userRef.set({ username, image }, { merge: true });
          res.status(200).json({ message: 'Profil actualizat' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      
      update_password = async (req, res) => {
        const { currentPassword, newPassword } = req.body;
    const { email, uid } = req.user;

    try {
        // 1. Reautentificare cu parola veche
        const firebaseApiKey = process.env.FIREBASE_API_KEY; // 🛑 Asigură-te că ai setat această variabilă

        const verifyPasswordUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;
        const response = await axios.post(verifyPasswordUrl, {
            email,
            password: currentPassword,
            returnSecureToken: false
        });

        // 2. Dacă parola este corectă, facem update
        await admin.auth().updateUser(uid, {
            password: newPassword
        });

        res.status(200).json({ success: true, message: "Parola a fost schimbată cu succes." });
    } catch (err) {
        console.error("❌ Eroare la schimbare parolă:", err.response?.data || err.message);
        if (err.response?.data?.error?.message === 'INVALID_PASSWORD') {
            return res.status(401).json({ success: false, message: 'Parola curentă este incorectă.' });
        }

        res.status(500).json({ success: false, message: "Eroare internă." });
    }
    };
}

module.exports = new AuthController()