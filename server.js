// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Încarcă variabilele din fișierul .env
dotenv.config();

// 🔥 Inițializăm Firebase Admin SDK (inclusiv logul "connected")
require("./firebaseAdmin");

const app = express();
app.use(express.json());

// 🔐 Configurare CORS în funcție de mediu
app.use(cors({
    origin: process.env.NODE_ENV === 'local' ? 'http://localhost:5173' : true,
    credentials: true,
}));

// 🧭 Rute API
app.use("/api", require("./routes/authRoutes"));
app.use('/api', require('./routes/designRouts'));
// app.use('/api', require('./routes/authRoutes')); // activează dacă ai rute de autentificare

// 🌐 Servește frontend-ul în producție (vite build dist)
app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./frontend/dist/index.html"));
});

// 🚀 Pornește serverul
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}...`));