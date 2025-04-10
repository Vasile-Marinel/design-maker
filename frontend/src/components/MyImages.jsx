import React, { useEffect, useState } from 'react'
import Image from './Image'
import api from '../utils/api'
import SyncLoader from 'react-spinners/SyncLoader'
import toast from 'react-hot-toast'

const MyImages = ({ add_image }) => {

    const [images, setImages] = useState([])
    const [loader, setLoader] = useState(false)

    const imageUpload = async (e) => {
        if (e.target.files.length > 0) {
            const formData = new FormData()
            formData.append('image', e.target.files[0])

            try {
                setLoader(true) //setLoader seteaza loader-ul la true pentru a afisa loader-ul rotativ
                const { data } = await api.post('/api/upload-user-image', formData)
                setImages([...images, data.userImage]) //adaugam imaginea in array-ul de imagini
                toast.success('Image uploaded successfully!') //afiseaza un mesaj de succes
                setLoader(false)
            } catch (error) {
                setLoader(false)     //setLoader seteaza loader-ul la false pentru a ascunde loader-ul rotativ
                toast.error('Error loading image!')     //afiseaza un mesaj de eroare
            }
        }
    }

    useEffect(() => {
        const get_images = async () => {
            try {
                const { data } = await api.get('/api/get-user-image')
                setImages(data.images) //setam imaginile in state-ul images
            } catch (error) {
                console.log(error)
            }
        }
        get_images()
    }, [])

    return (
        <div>
            <div className='w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3'>
                <label className='text-center cursor-pointer' htmlFor="image">Upload Image</label>
                <input readOnly={loader} onChange={imageUpload} type="file" id='image' className='hidden' />
            </div>
            {
                loader && <div className='flex justify-center items-center mb-2'>
                    <SyncLoader color='#fff' />
                </div>
            }
            <div className="mt-8">

                <div className='h-[80vh] overflow-y-auto scrollbar-hide'>
                    <Image add_image={add_image} images={images} />
                </div>
            </div>
        </div>
    )
}

export default MyImages