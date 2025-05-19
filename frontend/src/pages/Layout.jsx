import React, { useState, useEffect } from "react";        //useState → folosit pentru a gestiona starea componentei, este o biblioteca de hook-uri standard React
import Logo from "../assets/Design-Maker.png";
import { Link, useLocation } from "react-router-dom";        //Link-creeaza linkuri pentru navigare intre pagini fara reincarcare
import { FaHome } from "react-icons/fa";
import { BsFolder, BsGrid1X2 } from "react-icons/bs";
import { Outlet } from "react-router-dom";      //este locul unde vor fi afisate componentele paginilor pe baza rutei actuale
import { useNavigate } from "react-router-dom";      //useNavigate → permite navigarea programatica intre pagini
import { token_decode } from "../utils/index";
import default_profile_icon from "../assets/default_profile_icon.png"; // Importa imaginea implicita pentru profil
import api from "../utils/api";      //Importa api-ul pentru a face cereri catre server
import { SiInstagram } from "react-icons/si";
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { BiSolidLandscape } from "react-icons/bi";


const Layout = () => {

    const token = localStorage.getItem('user_token');
    const userInfo = token_decode(token);
    const [firestoreUser, setFirestoreUser] = useState(null);


    const navigate = useNavigate()    //useNavigate → permite navigarea programatica catre alta pagina
    const { pathname } = useLocation()    // retine ruta curenta (de exemplu, /projects, /templates)
    const [show, setShow] = useState(false)     //show → controleaza vizibilitatea formularului pentru dimensiuni
    const [showFormats, setShowFormats] = useState(false);

    // const create = (e) => {
    //     e.preventDefault(); // Evita ca formularul sa adauge parametri in URL
    //     navigate('/design/create', {    //Navigheaza catre ruta /design/create si trimite datele introduse de utilizator pentru dimensiuni personalizate
    //         state: {
    //             replace: true, // Evita salvarea parametrilor în istoric
    //             type: 'create',
    //             width: 900,
    //             height: 650
    //         }
    //     })
    // }

    const logout = () => {
        localStorage.removeItem('user_token') //Sterge datele utilizatorului din localStorage
        window.location.href = '/' //Redirectioneaza utilizatorul catre pagina de login
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get("/api/user-profile");
                setFirestoreUser(data.user);
            } catch (err) {
                console.log("Eroare la preluarea profilului:", err);
            }
        };

        fetchProfile();
    }, []);

    const handleFormatSelect = (width, height) => {
        setShowFormats(false);
        navigate('/design/create', {
            state: {
                replace: true,
                type: 'create',
                width,
                height
            }
        });
    };


    return (
        <div className='bg-[#18191b] min-h-screen w-full overflow-hidden'>
            <div className='bg-[#252627] shadow-md fixed left-0 top-0 w-full z-20'>
                <div className='w-[93%] m-auto py-3'>
                    <div className='flex justify-between items-center'>
                        <div className='w-[250px] h-[48px]'>
                            <img className='w-full h-full' src={Logo} alt="" />
                        </div>
                        <div className='flex gap-4 justify-center items-center relative'>
                            {/* <button onClick={create} className='py-2 px-6 overflow-hidden text-center bg-[#8b3dff] text-white rounded-[3px] font-medium hover:bg-[#9553f8]'>Create a Design</button> */}
                            <div className='relative'>
                                <button
                                    onClick={() => setShowFormats(!showFormats)}
                                    className='py-2 px-6 overflow-hidden text-center bg-[#8b3dff] text-white rounded-[3px] font-medium hover:bg-[#9553f8]'
                                >
                                    Create a Design
                                </button>

                                {/* Dropdown-ul cu formate */}
                                <div className={`absolute right-0 top-[110%] w-[250px] bg-[#252627] border border-[#3b3b3b] rounded-md p-4 transition-all duration-300 z-40 ${showFormats ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                                    <p className="text-white font-semibold text-sm mb-3">Choose a format</p>
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => handleFormatSelect(800, 800)} className="text-left text-white hover:bg-[#3c3c3d] px-3 py-2 rounded-md flex items-center gap-2">
                                            <SiInstagram /> Instagram Post (800x800)
                                        </button>
                                        <button onClick={() => handleFormatSelect(720, 840)} className="text-left text-white hover:bg-[#3c3c3d] px-3 py-2 rounded-md flex items-center gap-2">
                                            <SiInstagram /> Instagram Story (720x840)
                                        </button>
                                        <button onClick={() => handleFormatSelect(820, 312)} className="text-left text-white hover:bg-[#3c3c3d] px-3 py-2 rounded-md flex items-center gap-2">
                                            <MdPhotoSizeSelectLarge /> Banner (820x312)
                                        </button>
                                        <button onClick={() => handleFormatSelect(600, 870)} className="text-left text-white hover:bg-[#3c3c3d] px-3 py-2 rounded-md flex items-center gap-2">
                                            <BiSolidLandscape /> Poster (600x870)
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => setShow(!show)} className='cursor-pointer'>
                                <img src={userInfo?.picture || firestoreUser?.image || default_profile_icon} className='w-[45px] h-[45px] rounded-full' alt="prfile" />
                            </div>
                            <div className={`absolute top-[60px] right-0 w-[320px] bg-[#313030] p-3 border border-gray-700 transition duration-500 ${show ? 'visible opacity-100' : 'invisible opacity-30'}`}>
                                <div className='px-2 py-2 flex justify-start gap-5 items-center'>
                                    <img src={userInfo?.picture || firestoreUser?.image || default_profile_icon} className='w-[40px] h-[40px] rounded-full' alt="prfile" />
                                    <div className='flex justify-center flex-col items-start'>
                                        <span className='text-[#e0dddd] font-bold text-md text-md w-[240px] truncate overflow-hidden block'>{firestoreUser?.username}</span>
                                        <span className='text-[#c4c0c0] font-bold text-md w-[240px] truncate overflow-hidden block'>{firestoreUser?.email}</span>
                                    </div>
                                </div>
                                <ul className='text-[#e0dddd] font-semibold'>
                                    <li>
                                        <Link to="/settings" className='p-2 block'>
                                            <span>Settings</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <div onClick={logout} className='p-2 cursor-pointer'>
                                            <span>Logout</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex mt-16'>
                <div className='sidebar w-[300px] p-5 h-[calc(100vh-70px)] fixed'>
                    <div className='px-2 py-2 flex justify-start gap-5 items-center mb-3'>
                        <img className='w-[40px] h-[40px] rounded-full' src={userInfo?.picture || firestoreUser?.image || default_profile_icon} alt="image" />
                        <div className='flex justify-center flex-col items-start'>
                            <span className='text-[#e0dddd] font-bold text-md'>{firestoreUser?.username}</span>
                            {/* <span className='text-[#c4c0c0] text-sm'>Free</span> */}
                        </div>
                    </div>
                    <ul className='px-4 flex flex-col gap-2'>
                        <li>
                            <Link to='/' className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${pathname === '/' ? 'bg-[#ffffff26]' : ''} rounded-[4px]`}>
                                <span className='text-xl'><FaHome /></span>
                                <span className='font-medium'>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/projects' className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${pathname === '/projects' ? 'bg-[#ffffff26]' : ''} rounded-[4px]`}>
                                <span className='text-xl'><BsFolder /></span>
                                <span className='font-medium'>Projects</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/templates' className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${pathname === '/templates' ? 'bg-[#ffffff26]' : ''} rounded-[4px]`}>
                                <span className='text-xl'><BsGrid1X2 /></span>
                                <span className='font-medium'>Templates</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='ml-[300px] w-[calc(100%-300px)]'>
                    <div className='py-4 pr-4'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;