import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast' //importa Toaster din react-hot-toast pentru a afisa notificari

// createRoot – Functie care creeaza un nou root pentru aplicatia React.
createRoot(document.getElementById('root')).render(   //document.getElementById('root') – elementul HTML unde se va randa aplicatia(este definit in index.html)
  <>
    <App />
    <Toaster />
  </>
)
