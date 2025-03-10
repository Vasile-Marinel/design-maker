import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot – Functie care creeaza un nou root pentru aplicatia React.
createRoot(document.getElementById('root')).render(   //document.getElementById('root') – elementul HTML unde se va randa aplicatia(este definit in index.html)
  <App />
)
