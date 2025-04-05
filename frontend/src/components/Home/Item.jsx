import React from "react";
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';       //useNavigate → permite navigarea programatica catre alta pagina


const Item = ({ design }) => {
    return (
        <div className='relative group w-full h-[220px] px-2'>   {/* Afiseaza 8 designuri recente intr-un carousel*/}
            <Link to={`/design/${design.id}/edit`} className='w-full h-full block bg-[#ffffff12] p-4 rounded-md'>
                <img className='w-full h-full rounded-md overflow-hidden' src={design.imageUrl} alt="" />
            </Link>
            <div className='absolute hidden cursor-pointer top-1 right-2 text-red-500 p-2 transition-all duration-500 group-hover:block'><FaTrash /></div>
        </div>
    )
}

export default Item