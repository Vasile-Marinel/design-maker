import React, {useState} from 'react'
import Logo from "../assets/Design-Maker.png";
import { Link } from 'react-router-dom'
import useDownloader from 'react-use-downloader' //importa useDownloader din react-use-downloader pentru a descarca imaginea
import * as htmlToImage from 'html-to-image' //importa html-to-image pentru a converti un element HTML in imagine
import html2canvas from 'html2canvas';
import api from '../utils/api';
import toast from 'react-hot-toast' //importa toast din react-hot-toast pentru a afisa notificari

const Header = ( {components, designId} ) => {

    const [loader, setLoader] = useState(false) //loader este folosit pentru a afisa loader-ul rotativ
    const { download } = useDownloader() //download este folosit pentru a descarca imaginea
    
    const saveImage = async () => {
        const getDiv = document.getElementById('main_design');
        const image = await htmlToImage.toBlob(getDiv)

        if (image) {
            const obj = {
                design: components
            }

            const formData = new FormData()     //FormData este folosit pentru a trimite datele catre server
            formData.append('design', JSON.stringify(obj))     //adauga imaginea in formData
            formData.append('image', image)

            try {
                setLoader(true)     //setLoader seteaza loader-ul la true pentru a afisa loader-ul rotativ
                const { data } = await api.put(`/api/update-user-design/${designId}`, formData)
                toast.success('The design was saved successfully!') //afiseaza un mesaj de succes
                setLoader(false)     //setLoader seteaza loader-ul la false pentru a ascunde loader-ul rotativ
            } catch (error) {
                setLoader(false)     //setLoader seteaza loader-ul la false pentru a ascunde loader-ul rotativ
                toast.error('Error saving design!') //afiseaza un mesaj de eroare
            }
        }
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
                    <button disabled={loader} onClick={saveImage} className='px-3 py-[6px] outline-none bg-[#252627] rounded-sm'>{loader ? 'Loading...' : 'Save'}</button>
                    <button onClick={downloadImage} className='px-3 py-[6px] outline-none bg-[#252627] rounded-sm'>Download</button>
                </div>
            </div>
        </div>
    )
}

export default Header
