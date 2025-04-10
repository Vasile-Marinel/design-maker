import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { token_decode } from "../utils/index";
import default_profile_icon from "../assets/default_profile_icon.png";

const Settings = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');

    const token = localStorage.getItem('user_token');
    const [firestoreUser, setFirestoreUser] = useState(null);
    const userInfo = token_decode(token);

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
                setFirestoreUser(data.user);
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
            }

            await api.put('/api/update-user-profile', payload)
            toast.success('Profile successfully updated!')
        } catch (err) {
            toast.error('Error updating profile!')
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

    const handleImageUpload = async (e) => {
        if (e.target.files.length > 0) {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            try {
                const { data } = await api.post('/api/upload-user-image', formData);
                const imageUrl = data.userImage.imageUrl;

                // Actualizează în Firestore user.image
                await api.put('/api/update-user-profile', {
                    username, // păstrăm username-ul existent
                    image: imageUrl
                });

                setImage(imageUrl);
                toast.success('Profile picture has been updated!');
            } catch (error) {
                toast.error('Error loading image!');
                console.log(error);
            }
        }
    };

    return (
        <div className='p-5 text-white bg-[#18191b] min-h-screen justify-center items-center flex flex-col'>
            <h2 className='text-2xl mb-4'>Profile Settings</h2>
            <img src={userInfo?.picture || firestoreUser?.image || default_profile_icon} className='w-[80px] h-[80px] rounded-full' alt="prfile" />

            <div className='mb-3'>
                <label>New username</label>
                <br />
                <input value={username} onChange={e => setUsername(e.target.value)} className='w-[400px] px-3 py-2 rounded bg-[#2c2c2c] mt-1' />
            </div>

            <div className='mb-3'>
                {/* <label>Profile icon (URL)</label>
                <br />
                <input value={image} onChange={e => setImage(e.target.value)} className='w-[400px] px-3 py-2 rounded bg-[#2c2c2c] mt-1' /> */}
                <br />
                <div className='w-[400px] h-[40px] flex justify-center items-center bg-purple-700 rounded-sm text-white cursor-pointer hover:bg-purple-500'>
                    <label className='cursor-pointer' htmlFor="profile-icon-upload">Upload Profile Image</label>
                    <input
                        onChange={handleImageUpload}
                        type="file"
                        id="profile-icon-upload"
                        className='hidden'
                    />
                </div>
            </div>

            <button onClick={updateProfile} className='bg-purple-700 px-4 py-2 rounded text-white mr-3 hover:bg-purple-500'>
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
                        placeholder="Current Password"
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
                        placeholder="Password (6+ characters)"
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

            <button onClick={updatePassword} className='bg-red-700 px-4 py-2 rounded text-white hover:bg-red-500'>
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
