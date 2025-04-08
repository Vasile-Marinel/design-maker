import React from "react";
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';       //useNavigate → permite navigarea programatica catre alta pagina


const Item = ({ design, type, delete_design }) => {
    return (
        <div className={`relative group w-full ${type ? "h-[100px]" : "h-[220px] px-2 mt-3"}`}>   {/* Afiseaza 8 designuri recente intr-un carousel*/}
            <Link to={`/design/${design.id}/edit`} className={`w-full h-full block bg-[#ffffff12] rounded-md ${type ? '' : 'p-4'}`}>
                <img className='w-full h-full rounded-md overflow-hidden' src={design.imageUrl} alt="" />
            </Link>
            <div onClick={() => delete_design(design.id)} className='absolute hidden cursor-pointer top-1 right-2 text-red-500 p-2 transition-all duration-500 group-hover:block'><FaTrash /></div>
        </div>
    )
}

export default Item