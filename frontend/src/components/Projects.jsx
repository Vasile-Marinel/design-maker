import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'     //Link din react-router-dom → permite navigarea intre pagini fara reincarcarea aplicatiei
import Item from '../components/Home/Item';     //Importa componenta Item pentru a afisa designurile recente
import api from '../utils/api';     //Importa api-ul pentru a face cereri catre server

const Projects = () => {

    const [designs, setDesign] = useState([])

    useEffect(() => {
        const get_user_design = async () => {
            try {
                const { data } = await api.get('/api/user-designs') //apeleaza api-ul pentru a obtine designurile recente ale utilizatorului
                setDesign(data.designs) //setam imaginile in state-ul images
            } catch (error) {
                console.log(error)
            }
        }
        get_user_design()
    }, [])

    return (
        <div className='h-[90vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
            <div className='grid grid-cols-5 gap-2 mt-2'>
                {   //map() → ia fiecare element din array si creeaza un <Link> cu o imagine.
                    //Primul parametru din .map(img, i) reprezinta valoarea fiecarui element din array-ul [1,2,3,...,26].
                    // Al doilea parametru (i) este indexul elementului.
                    designs.map((d,i)=> <Item key={i} design={d} />)
                }
            </div>
        </div>
    )
}

export default Projects