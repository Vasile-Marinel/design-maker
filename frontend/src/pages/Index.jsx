import React, { useState } from "react";        //useState → Gestionarea stării pentru tipul formularului și vizibilitatea pop-up-ului.
import Logo from "../assets/Design-Maker.png";
//Importă iconițele pentru închidere (IoMdClose), Google (AiOutlineGoogle) și Facebook (FaFacebookF).
import {IoMdClose} from 'react-icons/io'
import {AiOutlineGoogle} from 'react-icons/ai'
import {FaFacebookF} from 'react-icons/fa'

const Index = () => {

    const [type,setType] = useState('login')        //type → Stochează tipul formularului (login sau signup).
    const [show,setShow] = useState(false)      //show → Controlează vizibilitatea pop-up-ului.
    const [state,setState] = useState({     //state → Stochează datele introduse în formular.
        name : '',
        email : '',
        password : ''
    })
    // Folosește Tailwind CSS pentru tranziția între vizibil/invizibil ('visible opacity-100' : 'invisible opacity-30'). Tailwind CSS este utilizat pentru stilizare și tranziții animate
    return (
        <div className='bg-[#18191b] min-h-screen w-full'>
            <div className={`w-screen ${show ? 'visible opacity-100' : 'invisible opacity-30'} transition-all duration-500 h-screen fixed bg-[#252627ad] flex justify-center items-center`}>
                <div className='w-[350px] bg-[#323335] m-auto px-6 py-4 rounded-md relative'>
                    <div onClick={()=>setShow(false)} className='absolute right-4 top-4 text-xl cursor-pointer text-white'><IoMdClose/></div>
                    <h2 className='text-white pb-4 text-center text-xl'>Log in or Sign Up in seconds</h2>
                    {
                        type === 'signin' && <form>
                            <div className='flex flex-col gap-3 mb-3 text-white'>
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' id='email' placeholder='email' value={state.email} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent'/>
                            </div>
                            <div className='flex flex-col gap-3 mb-3 text-white'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' id='password' placeholder='password' value={state.password} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent'/>
                            </div>
                            <div>
                                <button className='px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white'>Sign in</button>
                            </div>
                            <div className='flex py-4 justify-between items-center px-3'>
                                <div className='w-[45%] h-[1px] bg-[#434449]'></div>
                                <div className='w-[6%] text-center flex pb-1 px-1 text-white'>or</div>
                                <div className='w-[45%] h-[1px] bg-[#434449]'></div>
                            </div>
                            <div className='pb-4'>
                                <button className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-orange-700 w-full text-white outline-none hover:bg-orange-800'>
                                    <span><AiOutlineGoogle/></span>
                                    <span>Login with gmail</span>
                                </button>
                            </div>
                            <div>
                                <button className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-blue-700 w-full text-white outline-none hover:bg-blue-800'>
                                    <span><FaFacebookF/></span>
                                    <span>Login with facebook</span>
                                </button>
                            </div>
                        </form>
                    }
                    {
                        type === 'signup' && <form>
                            <div className='flex flex-col gap-3 mb-3 text-white'>
                                <label htmlFor="name">Name</label>
                                <input type="text" name='name' id='name' placeholder='name' value={state.name} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent'/>
                            </div>
                            <div className='flex flex-col gap-3 mb-3 text-white'>
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' id='email' placeholder='email' value={state.email} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent'/>
                            </div>
                            <div className='flex flex-col gap-3 mb-3 text-white'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' id='password' placeholder='password' value={state.password} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent'/>
                            </div>
                            <div>
                                <button className='px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white'>Sign in</button>
                            </div>
                            <div className='flex py-4 justify-between items-center px-3'>
                                <div className='w-[45%] h-[1px] bg-[#434449]'></div>
                                <div className='w-[6%] text-center flex pb-1 px-1 text-white'>or</div>
                                <div className='w-[45%] h-[1px] bg-[#434449]'></div>
                            </div>
                            <div className='pb-4'>
                                <button className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-orange-700 w-full text-white outline-none hover:bg-orange-800'>
                                    <span><AiOutlineGoogle/></span>
                                    <span>Login with gmail</span>
                                </button>
                            </div>
                            <div>
                                <button className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-blue-700 w-full text-white outline-none hover:bg-blue-800'>
                                    <span><FaFacebookF/></span>
                                    <span>Login with facebook</span>
                                </button>
                            </div>
                        </form>
                    }
                    
                </div>
            </div>
            <div className='bg-[#252627] shadow-md'>
                <div className='w-[93%] m-auto py-3'>
                    <div className='flex justify-between items-center'>
                        <div className='w-[250px] h-[48px]'>
                            <img className='w-full h-full' src={Logo} alt="" />
                        </div>
                        <div className='flex gap-4'>
                            <button onClick={()=>{
                                setType('signin')
                                setShow(true)
                                }} className='py-2 w-[80px] text-center bg-blue-500 text-white transition-all hover:bg-blue-600 rounded-[5px] font-medium'>Sign in</button>
                            <button onClick={()=>{
                                setType('signup')
                                setShow(true)
                                }} className='py-2 w-[80px] text-center bg-purple-500 text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium'>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-full justify-center items-center p-4'>
                <div className='py-[168px] flex justify-center items-center flex-col gap-6'>
                    <h2 className='text-5xl text-[#c7c5c5] font-bold'>What will you design today?</h2>
                    <span className='text-[#aca9a9] text-2xl font-medium'>Design Maker makes it easy to create and share professional designs.</span>
                    <button onClick={()=>{
                                setType('signup')
                                setShow(true)
                                }} className='py-2 w-[200px] text-center bg-purple-500 text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium'>Sign Up for free</button>
                </div>
            </div>
        </div>
    )
}

export default Index;