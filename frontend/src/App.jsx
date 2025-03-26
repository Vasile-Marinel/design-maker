//Acest fisier este punctul central al aplicatiei React si defineste navigatia folosind react-router-dom
//Acest App.jsx gestioneaza navigatia aplicatiei.
//Foloseste react-router-dom pentru rute dinamice si layout-uri cu copii.

import {  
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";    //createBrowserRouter → Creeaza rutele aplicatiei. RouterProvider → Ofera router-ul intregii aplicatii.
//Importam paginile si componentele necesare (Home, Projects, Templates, etc.).
import Index from './pages/Index'
import Layout from "./pages/Layout";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Templates from "./components/Templates";
import CreateDesign from "./components/CreateDesign";
import Main from "./pages/Main";

const router = createBrowserRouter([    //createBrowserRouter → Creeaza rutele aplicatiei.
  {
    path: "/",    //path → Calea catre ruta.
    element: <Index />,    //element → Componenta care va fi randata.
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
    element: <CreateDesign />   //element → Componenta care va fi randata.
  },
  {
    path: "/design/:id/edit",   //Afisează Main (pentru editarea unui design, folosind un ID din URL).
    element: <Main />
   }
])

function App() {    //RouterProvider face ca întreaga aplicație să folosească acest router.
  return <RouterProvider router={router} />   
}

export default App
