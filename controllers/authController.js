const { db } = require("../firebaseAdmin");;
const admin = require('firebase-admin');

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

        console.log("🔄 Actualizare profil pentru uid:", uid);
        console.log("📤 Date primite:", { username, image });
      
        try {
          const userRef = db.collection('users').doc(uid);
          await userRef.set({ username, image }, { merge: true });
          res.status(200).json({ message: 'Profil actualizat' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      
      update_password = async (req, res) => {
        const { uid } = req.user;
        const { password } = req.body;
        console.log("🔄 Actualizare parolă pentru uid:", password);
    
        console.log("🔐 Schimbare parolă pentru:", uid);
    
        try {
            const updatedUser = await admin.auth().updateUser(uid, {
                password: password
            });
    
            console.log("✅ Parolă actualizată:", updatedUser.email);
            res.status(200).json({ message: "Parola a fost schimbată cu succes." });
        } catch (err) {
            console.error("❌ Eroare la schimbare parolă:", err);
            res.status(500).json({ message: err.message });
        }
    };
}

module.exports = new AuthController()