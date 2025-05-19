// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Incarca variabilele din fisierul .env
dotenv.config();

// Initializam Firebase Admin SDK (inclusiv logul "connected")
require("./firebaseAdmin");

const app = express();
app.use(express.json());

// Configurare CORS în functie de mediu
app.use(cors({
    origin: process.env.NODE_ENV === 'local' ? 'http://localhost:5173' : true,
    credentials: true,
}));

// Rute API
app.use("/api", require("./routes/authRoutes"));
app.use('/api', require('./routes/designRouts'));
// app.use('/api', require('./routes/authRoutes')); // activeaza dacă ai rute de autentificare

// Serveste frontend-ul în productie (vite build dist)
app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./frontend/dist/index.html"));
});

//Pornim serverul
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}...`));