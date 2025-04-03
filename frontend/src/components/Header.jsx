import React from 'react'
import Logo from "../assets/Design-Maker.png";
import { Link } from 'react-router-dom'
import useDownloader from 'react-use-downloader' //importa useDownloader din react-use-downloader pentru a descarca imaginea
import * as htmlToImage from 'html-to-image' //importa html-to-image pentru a converti un element HTML in imagine

const Header = () => {

    const { download } = useDownloader() //download este folosit pentru a descarca imaginea
    const saveImage = () => {

    }

    const downloadImage = async () => {
        const getDiv = document.getElementById('main_design');
        if (!getDiv) {
            console.error("❌ Elementul cu id 'main_design' nu a fost găsit.");
            return;
        }

        try {
            const dataUrl = await htmlToImage.toPng(getDiv, {
                style: {
                    transform: 'scale(1)',
                }
            });
            download(dataUrl, 'design.png');
        } catch (err) {
            console.error("❌ Eroare la generarea imaginii:", err);
        }
    }

    return (
        <div className='h-[60px] bg-gradient-to-r from-[#212122] via-[#27282b] to-[#2a2b2c] w-full'>
            <div className='flex justify-between px-10 items-center text-gray-300 h-full'>
                <Link to='/'>
                    <div className='w-[250px] h-[48px]'>
                        <img className='w-full h-full' src={Logo} alt="" />
                    </div>
                </Link>

                <div className='flex justify-center items-center gap-2 text-gray-300'>
                    <button onClick={saveImage} className='px-3 py-[6px] outline-none bg-[#252627] rounded-sm'>Save</button>
                    <button onClick={downloadImage} className='px-3 py-[6px] outline-none bg-[#252627] rounded-sm'>Download</button>
                </div>
            </div>
        </div>
    )
}

export default Header