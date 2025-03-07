import React from "react";
import Header from "../components/Header";
import { BsGrid1X2, BsFillImageFill, BsFolder, BsCloudUploadFill} from "react-icons/bs";
import { FaShapes } from "react-icons/fa";
import { TfiText } from "react-icons/tfi";
import { RxTransparencyGrid } from "react-icons/rx";

const Main = () => {
    return (
        <div className='min-w-screen h-screen bg-black'>
            <Header/>
            <div className='flex h-[calc(100%-60px)] w-screen'>
                <div className='w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-auto'>
                    <div className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsGrid1X2/></span>
                        <span className='text-xs font-medium'>Design</span>
                    </div>

                    <div className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaShapes/></span>
                        <span className='text-xs font-medium'>Shapes</span>
                    </div>

                    <div className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsCloudUploadFill/></span>
                        <span className='text-xs font-medium'>Upload</span>
                    </div>

                    <div className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><TfiText/></span>
                        <span className='text-xs font-medium'>Text</span>
                    </div>

                    <div className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsFolder/></span>
                        <span className='text-xs font-medium'>Project</span>
                    </div>

                    <div className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsFillImageFill/></span>
                        <span className='text-xs font-medium'>Image</span>
                    </div>

                    <div className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><RxTransparencyGrid/></span>
                        <span className='text-xs font-medium'>Background</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main