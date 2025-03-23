import React from "react";

const Image = ({add_image}) => {
    return (
        <div className='grid grid-cols-2 gap-2'>
            {
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,25,26].map((img,i)=><div key={i} onClick={()=>add_image('http://localhost:5173/project.png')} className='w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'>
                    <img className='w-full h-full object-fill' src={`http://localhost:5173/project.png`} alt="" />
                </div>)
            }
        </div>
    )
}

export default Image