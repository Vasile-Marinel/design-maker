// Importarea modulelor necesare
const express = require('express')  //express – Framework pentru crearea unui server web.
const mongoose = require('mongoose')    //mongoose – Biblioteca pentru conectarea la MongoDB.
const app = express()
const dotenv = require('dotenv')    //dotenv – Permite incarcarea variabilelor de mediu din .env.
const cors = require('cors')    //cors – Activeaza CORS (permite cereri intre domenii diferite).
const path = require('path')    //path – Module Node.js pentru lucrul cu cai de fisiere.

dotenv.config()     //incarca variabilele din .env

if(process.env.NODE_ENV === 'local'){   //Daca serverul ruleaza local (NODE_ENV === 'local'), permite accesul doar din http://localhost:3000 (de obicei un frontend React/Vue/Angular).
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))
}else{      //Daca ruleaza in productie, permite accesul de oriunde
    app.use(cors({
        credentials: true
    }))
}

//Importarea rutelor
if(process.env.NODE_ENV === 'production'){      //Daca serverul ruleaza in productie, importa rutele din folderul build
    app.use(express.static(path.join(__dirname,"./frontend/dist")))     //Seteaza folderul de unde se servesc fisierele statice
    app.get('*',(req,res) => {      //Trimite index.html pentru orice ruta
        res.sendFile(path.resolve(__dirname,'./','frontend','dist','index.html'))   //Trimite index.html pentru orice ruta
    })
}

//Conectarea la baza de date
const dbConnect = async () => {
    try {
        if(process.env.NODE_ENV === 'local'){   //Daca serverul ruleaza local, se conecteaza la baza de date locala
            await mongoose.connect(process.env.LOCAL_DB_URI)
            console.log('Local database is connect....')
        }else{
            await mongoose.connect(process.env.MONGODB_URI)   //Daca serverul ruleaza in productie, se conecteaza la baza de date de productie
            console.log('production database is connect....')
        }
    } catch (error) {
        console.log('database connection failed')
    }
}
dbConnect()

//Pornirea serverului
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is running on port ${PORT}..`))