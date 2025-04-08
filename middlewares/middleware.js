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