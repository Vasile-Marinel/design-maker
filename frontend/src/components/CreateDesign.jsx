import React, { useEffect, useRef, useState } from 'react'
import * as htmlToImage from 'html-to-image'  //importa html-to-image pentru a converti un element HTML in imagine
import { useLocation, useNavigate } from 'react-router-dom'
import RotateLoader from 'react-spinners/RotateLoader'  //importa RotateLoader pentru a afisa un loader rotativ

import CreateComponent from './CreateComponent'
import api from '../utils/api'

const CreateDesign = () => {

    const ref = useRef()        //ref-ul este folosit pentru a accesa elementul DOM, DOM este structura de obiecte a documentului HTML  
    const { state } = useLocation()     //Preia datele trimise din `Home` in 'state'
    //useNavigate din Home trimite datele(pe path-ul specificat) introduse de utilizator pentru dimensiuni personalizate catre aceasta pagina, iar useLocation le preia

    const navigate = useNavigate()     //useNavigate este folosit pentru a naviga catre o alta pagina

    const obj = {
        name: "main_frame",
        type: "rect",
        id: Date.now(), // Generăm un ID unic folosind timestamp-ul curent
        height: state.height,
        width: state.width,
        z_index: 1,
        color: "#fff",
        image: "",
    };

    const [loader, setLoader] = useState(false)     //loader este folosit pentru a afisa un loader rotativ in timpul procesului de salvare a design-ului

    const create_design = async () => {
        //if (!ref.current) return; // Verificăm dacă ref-ul este valid
        const image = await htmlToImage.toBlob(ref.current)     //converteste elementul DOM in imagine

        const design = JSON.stringify([obj])     //converteste elementul DOM in JSON

        if (image) {
            const formData = new FormData()     //FormData este folosit pentru a trimite datele catre server
            formData.append('design', design)     //adauga imaginea in formData
            formData.append('image', image)

            try {
                setLoader(true)     //setLoader seteaza loader-ul la true pentru a afisa loader-ul rotativ
                const { data } = await api.post('/api/create-user-design', formData)
                navigate(`/design/${data.design.id}/edit`)     //navigheaza catre pagina design-ului creat
                setLoader(false)     //setLoader seteaza loader-ul la false pentru a ascunde loader-ul rotativ
            } catch (error) {
                setLoader(false)     //setLoader seteaza loader-ul la false pentru a ascunde loader-ul rotativ
                console.log(error.response.data)
            }
        }
    }

    useEffect(() => {
        if (state && ref.current) {
            create_design()
        } else {
            navigate('/')
        }
    }, [state, ref])

    return (
        <div className='w-screen h-screen flex justify-center items-center relative'>
            <div ref={ref} className='relative w-auto h-auto overflow-auto'>
                <CreateComponent info={obj} current_component={{}} />
            </div>
            {
                loader && <div className='left-0 top-0 w-full h-full flex justify-center items-center bg-black absolute'><RotateLoader color='white' /></div>
            }
        </div>
    )
}

export default CreateDesign