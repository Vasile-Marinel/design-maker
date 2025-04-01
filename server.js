// // Importarea modulelor necesare
// const express = require('express')  //express – Framework pentru crearea unui server web.
// const mongoose = require('mongoose')    //mongoose – Biblioteca pentru conectarea la MongoDB.
// const app = express()
// const dotenv = require('dotenv')    //dotenv – Permite incarcarea variabilelor de mediu din .env.
// const cors = require('cors')    //cors – Activeaza CORS (permite cereri intre domenii diferite).
// const path = require('path')    //path – Module Node.js pentru lucrul cu cai de fisiere.

// dotenv.config()     //incarca variabilele din .env

// if(process.env.NODE_ENV === 'local'){   //Daca serverul ruleaza local (NODE_ENV === 'local'), permite accesul doar din http://localhost:3000 (de obicei un frontend React/Vue/Angular).
//     app.use(cors({
//         origin: 'http://localhost:3000',
//         credentials: true
//     }))
// }else{      //Daca ruleaza in productie, permite accesul de oriunde
//     app.use(cors({
//         credentials: true
//     }))
// }

// //Importarea rutelor
// if(process.env.NODE_ENV === 'production'){      //Daca serverul ruleaza in productie, importa rutele din folderul build
//     app.use(express.static(path.join(__dirname,"./frontend/dist")))     //Seteaza folderul de unde se servesc fisierele statice
//     app.get('*',(req,res) => {      //Trimite index.html pentru orice ruta
//         res.sendFile(path.resolve(__dirname,'./','frontend','dist','index.html'))   //Trimite index.html pentru orice ruta
//     })
// }

// //Conectarea la baza de date
// const dbConnect = async () => {
//     try {
//         if(process.env.NODE_ENV === 'local'){   //Daca serverul ruleaza local, se conecteaza la baza de date locala
//             await mongoose.connect(process.env.LOCAL_DB_URI)
//             console.log('Local database is connect....')
//         }else{
//             await mongoose.connect(process.env.MONGODB_URI)   //Daca serverul ruleaza in productie, se conecteaza la baza de date de productie
//             console.log('production database is connect....')
//         }
//     } catch (error) {
//         console.log('database connection failed')
//     }
// }
// dbConnect()

// //Pornirea serverului
// const PORT = process.env.PORT

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}..`))



//             VARIANTA 2


// const express = require("express");
// const admin = require("firebase-admin");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// dotenv.config();

// const app = express();

// // Configurare CORS
// if (process.env.NODE_ENV === "local") {
//     app.use(cors({
//         origin: "http://localhost:3000",
//         credentials: true
//     }));
// } else {
//     app.use(cors({ credentials: true }));
// }

// // Inițializare Firebase Admin SDK
// try {
//     admin.initializeApp({
//         credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS))
//     });
    
//     const db = admin.firestore();
    
//     if (process.env.NODE_ENV === "local") {
//         console.log("✅ Local Firestore database is connected...");
//     } else {
//         console.log("✅ Production Firestore database is connected...");
//     }
// } catch (error) {
//     console.error("❌ Firestore database connection failed:", error);
// }

// // Servește frontend-ul în producție
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "./frontend/dist")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"));
//     });
// }

// // Pornirea serverului
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}..`));

// module.exports = { db: admin.firestore() };

const express = require("express");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Încarcă variabilele din fișierul .env
dotenv.config();

const app = express();
app.use(express.json())

// Configurare CORS în funcție de mediu
if (process.env.NODE_ENV === 'local') {
    app.use(cors({
        origin: 'http://localhost:5173', // Frontend-ul local
        credentials: true
    }));
} else {
    // Dacă suntem în producție, setăm doar credentials
    app.use(cors({
        credentials: true
    }));
} // Permitem cererile CORS
// acestă configurație este complet validă și recomandată atunci când frontend-ul și backend-ul rulează pe porturi sau domenii diferite în timpul dezvoltării. 
// Dacă, de exemplu, frontend-ul tău este pe localhost:5173 și backend-ul pe localhost:5004, acest lucru face ca backend-ul să permită 
// cererile doar de la localhost:5173 și să trateze corect cookie-urile (dacă folosești autentificare bazată pe sesiuni).

 app.use('/api', require('./routes/designRouts'))    //Importam rutele pentru autentificare
// app.use('/api', require('./routes/authRoutes'))    //Importam rutele pentru autentificare
// Inițializare Firebase Admin SDK
try {
        admin.initializeApp({
        credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS))      //Atunci cand suntem in productie, folosim credentialele de productie
    });

    console.log("✅ Firestore database is connected...");
} catch (error) {
    console.error("❌ Firestore database connection failed:", error);
}

// Obținem referința către baza de date Firestore
const db = admin.firestore();

// Servește frontend-ul în producție (dacă este necesar)
app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"));
});

// Pornirea serverului
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}...`));

module.exports = { db };