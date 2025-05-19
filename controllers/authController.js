const { db } = require("../firebaseAdmin");;
const admin = require('firebase-admin');
const axios = require('axios');
require('dotenv').config();

class AuthController {
  get_user_profile = async (req, res) => {
    const { uid } = req.user;
    try {
      const userRef = db.collection('users').doc(uid);
      const doc = await userRef.get();

      if (!doc.exists) return res.status(404).json({ message: 'The profile does not exist!' });

      res.status(200).json({ user: doc.data() });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  update_user_profile = async (req, res) => {
    const { uid } = req.user;
    const { username, image } = req.body;

    try {
      const imageUrl = typeof image === 'string' ? image : image?.imageUrl || '';

      const userRef = db.collection('users').doc(uid);
      await userRef.set({ username, image: imageUrl }, { merge: true });

      res.status(200).json({ message: 'Profile successfully updated!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  update_password = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { email, uid } = req.user;

    try {
      // 1. Reautentificare cu parola veche
      const firebaseApiKey = process.env.FIREBASE_API_KEY; // Ne asiguram ca am setat aceasta variabila

      const verifyPasswordUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;
      const response = await axios.post(verifyPasswordUrl, {
        email,
        password: currentPassword,
        returnSecureToken: false
      });

      // 2. Daca parola este corecta, facem update
      await admin.auth().updateUser(uid, {
        password: newPassword
      });

      res.status(200).json({ success: true, message: "Password changed successfully!" });
    } catch (err) {
      console.error("❌ Error changing password:", err.response?.data || err.message);
      if (err.response?.data?.error?.message === 'INVALID_PASSWORD') {
        return res.status(401).json({ success: false, message: 'The current password is incorrect!' });
      }

      res.status(500).json({ success: false, message: "Eroare internă." });
    }
  };
}

module.exports = new AuthController()