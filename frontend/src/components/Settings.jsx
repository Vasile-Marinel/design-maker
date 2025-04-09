import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Settings = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');


    const goToHome = () => {
        navigate('/');
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get('/api/user-profile')
                setUser(data.user)
                setUsername(data.user.username || '')
                setImage(data.user.image || '')
            } catch (err) {
                console.error('Failed to fetch user profile', err)
            }
        }

        fetchUser()
    }, [])

    const updateProfile = async () => {
        try {
            const payload = {
                username,
                image
            }

            await api.put('/api/update-user-profile', payload)
            toast.success('Profil actualizat cu succes!')
        } catch (err) {
            toast.error('Eroare la actualizarea profilului!')
        }
    }

    const updatePassword = async () => {
        if (!currentPassword || !password) {
            toast.error("Fill in both password fields!");
            return;
        }
    
        try {
            const res = await api.put('/api/update-password', {
                currentPassword,
                newPassword: password,
            });
    
            if (res.data.success) {
                toast.success('Password changed successfully!');
                setCurrentPassword('');
                setPassword('');
            } else {
                toast.error(res.data.message || 'The password could not be changed!');
            }
        } catch (err) {
            toast.error('Error changing password!');
        }
    }

    return (
        <div className='p-5 text-white bg-[#18191b] min-h-screen justify-center items-center flex flex-col'>
            <h2 className='text-2xl mb-4'>Profile Settings</h2>

            <div className='mb-3'>
                <label>New username</label>
                <br />
                <input value={username} onChange={e => setUsername(e.target.value)} className='w-[400px] px-3 py-2 rounded bg-[#2c2c2c] mt-1' />
            </div>

            <div className='mb-3'>
                <label>Profile icon (URL)</label>
                <br />
                <input value={image} onChange={e => setImage(e.target.value)} className='w-[400px] px-3 py-2 rounded bg-[#2c2c2c] mt-1' />
            </div>

            <button onClick={updateProfile} className='bg-purple-600 px-4 py-2 rounded text-white mr-3'>
                Save Profile
            </button>

            <div className='mt-6 mb-3'>
                <label>Current Password</label>
                <br />
                <div className="relative w-[400px]">
                    <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className='w-full px-3 py-2 rounded bg-[#2c2c2c] mt-1 pr-10'
                    />
                    <span
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-[16px] text-gray-400 cursor-pointer"
                    >
                        {showCurrentPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </span>
                </div>
            </div>

            <div className='mt-6 mb-3'>
                <label>New Password</label>
                <br />
                <div className="relative w-[400px]">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-[#2c2c2c] mt-1 pr-10"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[16px] text-gray-400 cursor-pointer"
                    >
                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </span>
                </div>
            </div>

            <button onClick={updatePassword} className='bg-red-500 px-4 py-2 rounded text-white'>
                Change password
            </button>

            <button
                onClick={goToHome}
                className='absolute top-5 left-10 mt-4 text-sm text-indigo-400 hover:underline'
            >
                ← Return to Home
            </button>
        </div>
    )
}

export default Settings
