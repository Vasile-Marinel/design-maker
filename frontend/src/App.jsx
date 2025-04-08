//Acest fisier este punctul central al aplicatiei React si defineste navigatia folosind react-router-dom
//Acest App.jsx gestioneaza navigatia aplicatiei.
//Foloseste react-router-dom pentru rute dinamice si layout-uri cu copii.

import {  
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";    //createBrowserRouter → Creeaza rutele aplicatiei. RouterProvider → Ofera router-ul intregii aplicatii.
//Importam paginile si componentele necesare (Home, Projects, Templates, etc.).
import Index from './pages/Index'
import Layout from "./pages/Layout";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Templates from "./components/Templates";
import CreateDesign from "./components/CreateDesign";
import Main from "./pages/Main";
import {token_decode} from './utils/index'
import Settings from './components/Settings'

// Verifică dacă utilizatorul este autentificat
const token = localStorage.getItem('user_token');
const userInfo = token_decode(token);

const router = createBrowserRouter([    //createBrowserRouter → Creeaza rutele aplicatiei.
  {
    path: "/",    //path → Calea catre ruta.
    element: userInfo ? <Layout/> : <Index />,    //element → Componenta care va fi randata.
    children: [   //children → Rutele copil ale rutei parinte.
      {
        path: '/',        
        element: <Home />   
      },
      {
        path: '/templates',
        element: <Templates />
      },
      {
        path: '/projects',
        element: <Projects />
      }
    ]
  },
  {
    path: "/design/create",     //path → Calea catre ruta.
    element: userInfo ? <CreateDesign /> : <Navigate to='/' />  //Afiseaza CreateDesign (pentru crearea unui design). sau redirectioneaza catre pagina de login daca utilizatorul nu este autentificat.
  },
  {
    path: "/design/:designId/edit",   //Afisează Main (pentru editarea unui design, folosind un ID din URL).
    element: userInfo ? <Main /> : <Navigate to='/' />    //Afisează Main (pentru editarea unui design, folosind un ID din URL). sau redirectioneaza catre pagina de login daca utilizatorul nu este autentificat.
   },
   {
    path: "/settings",
    element: userInfo ? <Settings /> : <Navigate to='/' />
   }
])

function App() {    //RouterProvider face ca întreaga aplicație să folosească acest router.
  return <RouterProvider router={router} />   
}

export default App
