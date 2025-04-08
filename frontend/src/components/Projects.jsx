import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'     //Link din react-router-dom → permite navigarea intre pagini fara reincarcarea aplicatiei
import Item from '../components/Home/Item';     //Importa componenta Item pentru a afisa designurile recente
import api from '../utils/api';     //Importa api-ul pentru a face cereri catre server
import toast from 'react-hot-toast';     //Importa toast pentru a afisa mesaje de succes sau eroare

const Projects = ({ type, designId }) => {

    const [designs, setDesign] = useState([])

    const get_user_design = async () => {
        try {
            const { data } = await api.get('/api/user-designs') //apeleaza api-ul pentru a obtine designurile recente ale utilizatorului
            setDesign(data.designs) //setam imaginile in state-ul images
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        get_user_design()
    }, [])

    const delete_design = async (designId) => {
        try {
            const { data } = await api.put(`/api/delete-user-design/${designId}`)
            toast.success('The design was successfully deleted!') //afiseaza un mesaj de succes
            get_user_design() //apeleaza din nou functia pentru a obtine designurile recente ale utilizatorului dupa ce a fost sters un design
        } catch (error) {
            toast.error('Error deleting design!')     //afiseaza un mesaj de eroare
        }
    }

    return (
        <div className='h-[90vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full'>
            <div className={type ? 'grid grid-cols-2 gap-2 mt-2 w-full' : 'grid grid-cols-4 gap-2 mt-2 w-full'}>
                {   //map() → ia fiecare element din array si creeaza un <Link> cu o imagine.
                    //Primul parametru din .map(img, i) reprezinta valoarea fiecarui element din array-ul [1,2,3,...,26].
                    // Al doilea parametru (i) este indexul elementului.
                    designs.map((d, i) => d.id !== designId && <Item key={i} design={d} type={type} delete_design={delete_design} />)   //Afiseaza design-urile utilizatorului in fereastra Projects din editare inafara de design-ul curent(pentru ca acesta sa nu fie sters)
                }
            </div>
        </div>
    )
}

export default Projects