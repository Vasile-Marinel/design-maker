import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'

import CreateComponent from './CreateComponent'

const CreateDesign = () => {

    const ref = useRef()        //ref-ul este folosit pentru a accesa elementul DOM, DOM este structura de obiecte a documentului HTML  
    const { state } = useLocation()     //Preia datele trimise din `Home` in 'state'
    //useNavigate din Home trimite datele(pe path-ul specificat) introduse de utilizator pentru dimensiuni personalizate catre aceasta pagina, iar useLocation le preia

    const obj = {     //acest obiect (obj) defineste un element grafic
        name: "main_frame",   //numele obiectului
        type: "rect",   //tipul obiectului, in cazul de fata un dreptunghi
        id: Math.floor((Math.random() * 100) + 1),      //un id unic generat aleator
        height: state.height,       //inaltimea si latimea obiectului
        width: state.width,
        z_index: 1,     //z-index-ul obiectului, adica ordinea de afisare
        color: "green",
        image: ""
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center relative'>
            <div ref={ref} className='relative w-auto h-auto overflow-auto'>
                <CreateComponent info={obj} current_component={{}} />
            </div>
        </div>
    )
}

export default CreateDesign