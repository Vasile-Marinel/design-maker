import React from "react";
import { TbRefresh } from "react-icons/tb";

const Element = ({ id, info, exId }) => {
    return (
        <>
            {
                exId ? <>
                    <div onMouseDown={() => info.resizeElement(exId, info)} className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
                    </div>
                    <div onMouseDown={() => info.resizeElement(exId, info)} className='hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
                    </div>
                    <div onMouseDown={() => info.resizeElement(exId, info)} className='hidden absolute group-hover:block -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
                    </div>
                </>
                    : <>
                        <div onMouseDown={() => info.resizeElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
                        </div>
                        <div onMouseDown={() => info.resizeElement(id, info)} className='hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
                        </div>
                        <div onMouseDown={() => info.resizeElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
                        </div>
                    </>
            }
            <div onMouseDown={() => info.resizeElement(id, info)} className='hidden absolute group-hover:block -top-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
            </div>

            <div onMouseDown={() => info.rotateElement(id, info)} className='w-[25px] flex absolute justify-center cursor-pointer left-[50%] -translate-x-[50%] -top-14 items-center hover:bg-indigo-600 hover:text-white h-[25px] rounded-full border-2 border-slate-500'>
                <TbRefresh />
            </div>

            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block -top-[3px] left-[50%] translate-[-50%,0%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
            </div>
            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block top-[50%] -left-[3px] translate-[-0%,50%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
            </div>
            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block top-[50%] -right-[3px] translate-[-0%,50%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
            </div>
            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] left-[50%] translate-[-50%,0%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]'>
            </div>
        </>
    )
}

export default Element