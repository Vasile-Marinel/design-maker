import React from "react";

const Image = ({add_image, images}) => {
    return (
        <div className='grid grid-cols-2 gap-2'>
            {
                images.map((item,i)=><div key={i} onClick={()=>add_image(item.imageUrl)} className='w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'>
                    <img className='w-full h-full object-fill' src={item.imageUrl} alt="image" />
                </div>)
            }
        </div>
    )
}

export default Image