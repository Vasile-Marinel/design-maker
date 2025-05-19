const admin = require("firebase-admin");

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        const token = authorization.split(' ')[1] // Extragem token-ul din header
        if (token) {
            try {
                // Verificam token-ul folosind Firebase Admin SDK
                const decodedToken = await admin.auth().verifyIdToken(token);   //decodedToken contine informatiile utilizatorului autentificat, extrase din token-ul JWT emis de Firebase Authentication.

                // Adaugam datele utilizatorului la request pentru a le folosi in rutele protejate
                req.user = decodedToken;

                next(); // Continuam catre ruta urmatoare
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