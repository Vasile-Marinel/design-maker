const admin = require("firebase-admin");

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        const token = authorization.split(' ')[1] // Extragem token-ul din header
        if (token) {
            try {
                // Verificăm token-ul folosind Firebase Admin SDK
                const decodedToken = await admin.auth().verifyIdToken(token);   //decodedToken conține informațiile utilizatorului autentificat, extrase din token-ul JWT emis de Firebase Authentication.

                // Adăugăm datele utilizatorului la request pentru a le folosi în rutele protejate
                req.user = decodedToken;

                next(); // Continuăm către ruta următoare
            } catch (error) {
                return res.status(401).json({ message: "Unauthorized" })
            }
        } else {
            return res.status(401).json({ message: "Unauthorized" })
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = auth

// const admin = require("firebase-admin");

// // Verificăm dacă Firebase Admin este deja inițializat
// if (!admin.apps.length) {
//     const serviceAccount = require("../video-editor-d9816-firebase-adminsdk-4511n-d5f01051ca.json");

//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount)
//     });
// }

// const auth = async (req, res, next) => {
//     const token = req.headers.authorization?.split("Bearer ")[1]; // Extragem token-ul din header

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized - No token provided" });
//     }
//     console.log(token)
//     try {
//         const decodedToken = await admin.auth().verifyIdToken(token);
//         req.user = decodedToken; // Adăugăm datele utilizatorului în request pentru acces în rutele protejate
//         next(); // Continuăm către ruta următoare
//     } catch (error) {
//         return res.status(403).json({ message: "Unauthorized - Invalid token", error: error.message });
//     }
// };

// module.exports = auth;
