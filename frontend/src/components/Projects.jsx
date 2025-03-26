import React from 'react'
import { Link } from 'react-router-dom'     //Link din react-router-dom → permite navigarea intre pagini fara reincarcarea aplicatiei

const Projects = () => {
    return (
        <div className='h-[90vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
            <div className='grid grid-cols-2 gap-2'>
                {   //map() → ia fiecare element din array si creeaza un <Link> cu o imagine.
                    //Primul parametru din .map(img, i) reprezinta valoarea fiecarui element din array-ul [1,2,3,...,26].
                    // Al doilea parametru (i) este indexul elementului.
                    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,25,26].map((img,i)=><Link key={i} className='w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'>
                        <img className='w-full h-full object-fill' src={`http://localhost:5173/project.png`} alt="" />
                    </Link>)
                }
            </div>
        </div>
    )
}

export default Projects