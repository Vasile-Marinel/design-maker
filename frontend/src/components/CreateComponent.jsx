import React from 'react'

const CreateComponent = ({info,current_component,removeComponent}) => {

    const randValue = Math.floor(Math.random() * 100)
    let html = ''

    if (info.name === 'main_frame'){
        html = <div className='hover:border-[2px] hover:border-indigo-500 shadow-md' 
        style={{
            width: info.width + 'px',
            height: info.height + 'px',
            background: info.color,
            zIndex: info.z_index,
        }}>
            {
                info.image && <img className='w-full h-full' src={info.image} alt='image' />
            }
        </div>
    }

    return html
}

export default CreateComponent