// import React, { useState } from "react";        //useState → Gestionarea stării pentru tipul formularului și vizibilitatea pop-up-ului.
// import Logo from "../assets/Design-Maker.png";
// //Importă iconițele pentru închidere (IoMdClose), Google (AiOutlineGoogle) și Facebook (FaFacebookF).
// import {IoMdClose} from 'react-icons/io'
// import {AiOutlineGoogle} from 'react-icons/ai'
// import {FaFacebookF} from 'react-icons/fa'

// const Index = () => {

//     const [type,setType] = useState('login')        //type → Stochează tipul formularului (login sau signup).
//     const [show,setShow] = useState(false)      //show → Controlează vizibilitatea pop-up-ului.
//     const [state,setState] = useState({     //state → Stochează datele introduse în formular.
//         name : '',
//         email : '',
//         password : ''
//     })
//     // Folosește Tailwind CSS pentru tranziția între vizibil/invizibil ('visible opacity-100' : 'invisible opacity-30'). Tailwind CSS este utilizat pentru stilizare și tranziții animate
//     return (
//         <div className='bg-[#18191b] min-h-screen w-full'>
//             <div className={`w-screen ${show ? 'visible opacity-100' : 'invisible opacity-30'} transition-all duration-500 h-screen fixed bg-[#252627ad] flex justify-center items-center`}>
//                 <div className='w-[350px] bg-[#323335] m-auto px-6 py-4 rounded-md relative'>
//                     <div onClick={()=>setShow(false)} className='absolute right-4 top-4 text-xl cursor-pointer text-white'><IoMdClose/></div>
//                     <h2 className='text-white pb-4 text-center text-xl'>Log in or Sign Up in seconds</h2>
//                     {
//                         type === 'signin' && <form>
//                             <div className='flex flex-col gap-3 mb-3 text-white'>
//                                 <label htmlFor="email">Email</label>
//                                 <input type="email" name='email' id='email' placeholder='email' value={state.email} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent'/>
//                             </div>
//                             <div className='flex flex-col gap-3 mb-3 text-white'>
//                                 <label htmlFor="password">Password</label>
//                                 <input type="password" name='password' id='password' placeholder='password' value={state.password} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent'/>
//                             </div>
//                             <div>
//                                 <button className='px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white'>Sign in</button>
//                             </div>
//                             <div className='flex py-4 justify-between items-center px-3'>
//                                 <div className='w-[45%] h-[1px] bg-[#434449]'></div>
//                                 <div className='w-[6%] text-center flex pb-1 px-1 text-white'>or</div>
//                                 <div className='w-[45%] h-[1px] bg-[#434449]'></div>
//                             </div>
//                             <div className='pb-4'>
//                                 <button className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-orange-700 w-full text-white outline-none hover:bg-orange-800'>
//                                     <span><AiOutlineGoogle/></span>
//                                     <span>Login with gmail</span>
//                                 </button>
//                             </div>
//                             <div>
//                                 <button className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-blue-700 w-full text-white outline-none hover:bg-blue-800'>
//                                     <span><FaFacebookF/></span>
//                                     <span>Login with facebook</span>
//                                 </button>
//                             </div>
//                         </form>
//                     }
//                     {
//                         type === 'signup' && <form>
//                             <div className='flex flex-col gap-3 mb-3 text-white'>
//                                 <label htmlFor="name">Name</label>
//                                 <input type="text" name='name' id='name' placeholder='name' value={state.name} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent'/>
//                             </div>
//                             <div className='flex flex-col gap-3 mb-3 text-white'>
//                                 <label htmlFor="email">Email</label>
//                                 <input type="email" name='email' id='email' placeholder='email' value={state.email} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent'/>
//                             </div>
//                             <div className='flex flex-col gap-3 mb-3 text-white'>
//                                 <label htmlFor="password">Password</label>
//                                 <input type="password" name='password' id='password' placeholder='password' value={state.password} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent'/>
//                             </div>
//                             <div>
//                                 <button className='px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white'>Sign in</button>
//                             </div>
//                             <div className='flex py-4 justify-between items-center px-3'>
//                                 <div className='w-[45%] h-[1px] bg-[#434449]'></div>
//                                 <div className='w-[6%] text-center flex pb-1 px-1 text-white'>or</div>
//                                 <div className='w-[45%] h-[1px] bg-[#434449]'></div>
//                             </div>
//                             <div className='pb-4'>
//                                 <button className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-orange-700 w-full text-white outline-none hover:bg-orange-800'>
//                                     <span><AiOutlineGoogle/></span>
//                                     <span>Login with gmail</span>
//                                 </button>
//                             </div>
//                             <div>
//                                 <button className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-blue-700 w-full text-white outline-none hover:bg-blue-800'>
//                                     <span><FaFacebookF/></span>
//                                     <span>Login with facebook</span>
//                                 </button>
//                             </div>
//                         </form>
//                     }

//                 </div>
//             </div>
//             <div className='bg-[#252627] shadow-md'>
//                 <div className='w-[93%] m-auto py-3'>
//                     <div className='flex justify-between items-center'>
//                         <div className='w-[250px] h-[48px]'>
//                             <img className='w-full h-full' src={Logo} alt="" />
//                         </div>
//                         <div className='flex gap-4'>
//                             <button onClick={()=>{
//                                 setType('signin')
//                                 setShow(true)
//                                 }} className='py-2 w-[80px] text-center bg-blue-500 text-white transition-all hover:bg-blue-600 rounded-[5px] font-medium'>Sign in</button>
//                             <button onClick={()=>{
//                                 setType('signup')
//                                 setShow(true)
//                                 }} className='py-2 w-[80px] text-center bg-purple-500 text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium'>Sign Up</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='w-full h-full justify-center items-center p-4'>
//                 <div className='py-[168px] flex justify-center items-center flex-col gap-6'>
//                     <h2 className='text-5xl text-[#c7c5c5] font-bold'>What will you design today?</h2>
//                     <span className='text-[#aca9a9] text-2xl font-medium'>Design Maker makes it easy to create and share professional designs.</span>
//                     <button onClick={()=>{
//                                 setType('signup')
//                                 setShow(true)
//                                 }} className='py-2 w-[200px] text-center bg-purple-500 text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium'>Sign Up for free</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Index;

import React, { useState } from "react";
import {AiOutlineGoogle} from 'react-icons/ai'
import Logo from "../assets/Design-Maker.png";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { auth, provider, db } from '../../../firebaseConfig'; // Importă autentificarea și provider-ul
import '../pages/Login.css';
import { doc, setDoc, getDoc } from "firebase/firestore"; // Importă Firestore
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User info:", user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
};

const loginWithEmailPassword = (email, password, setShakeEmail, setShakePassword, setLoginError) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in with email:", user);
            setLoginError(''); // sterge eroarea daca login-ul reuseste
        })
        .catch((error) => {
            console.error("Error signing in with email and password:", error);
            setShakeEmail(true);
            setShakePassword(true);
            setTimeout(() => {
                setShakeEmail(false);
                setShakePassword(false);
            }, 500);
            setLoginError("Email or password incorrect");
        });
};
// async function loginWithEmailPassword(email, password, setShakeEmail, setShakePassword, setLoginError) {
//     try {
//         await signInWithEmailAndPassword(auth, email, password);
//         console.log("Logged in successfully");
//         setLoginError(''); // Șterge eroarea dacă login-ul reușește
//     } catch (error) {
//         setShakeEmail(true);
//         setTimeout(() => setShakeEmail(false), 500);
//         setShakePassword(true);
//         setTimeout(() => setShakePassword(false), 500);
//         setLoginError("Email or password incorrect");
//     }
// }

const registerWithEmailPassword = async (email, password, username, setShakeEmail, setShakePassword, setEmailError, setShakeUsername) => {
    let hasError = false;       // Daca hasError este true, functia se oprește si nu mai incearcă sa autentifice sau sa inregistreze utilizatorul
    //Previne apelarea inutila a functiei Firebase daca deja stim ca datele sunt invalide

    if (!username.trim()) { // Verifica daca username-ul este gol
        setShakeUsername(true);
        setTimeout(() => setShakeUsername(false), 500);
        hasError = true;
    }

    if (!email.includes("@")) {
        setShakeEmail(true);
        setTimeout(() => setShakeEmail(false), 500);
        hasError = true;
        setEmailError('');
    }

    if (password.length < 6) {
        setShakePassword(true);
        setTimeout(() => setShakePassword(false), 500);
        hasError = true;
    }
    
    if (hasError) return;

    try {
        // Creează un utilizator cu email și parola
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User created:", user);

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {       //Daca utilizatorul nu exista in Firestore, il adauga
            await setDoc(userRef, {
                username: username,
                email: email,
                createdAt: new Date(),
            });
            setEmailError('');
            console.log("User info saved to Firestore!");
        } else {
            console.log("User already exists in Firestore.");
        }

    } catch (error) {
         // Aici gestionăm erorile
         if (error.code === 'auth/email-already-in-use') {
            setShakeEmail(true);
            setTimeout(() => setShakeEmail(false), 500);
            setEmailError("Email is already in use");
        } else {
            console.error("Error:", error);
        }
    }
};

function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');  // Adăugat pentru sign up
    const [shakeEmail, setShakeEmail] = useState(false);
    const [shakePassword, setShakePassword] = useState(false);
    const [emailError, setEmailError] = useState('');  // Stare pentru mesajul de eroare
    const [shakeUsername, setShakeUsername] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='auth-body flex justify-center items-center min-h-screen w-full h-full'>
            <div className='absolute top-4 left-4 w-[300px] h-[58px]'>
                <img className='w-full h-full' src={Logo} alt="" />
            </div>
            <div className='py-[168px] flex justify-center items-center flex-col gap-6'>
                <h2 className='text-5xl text-[#c7c5c5] font-bold auth-login-text'>What will you design today?</h2>
                <span className='text-[#aca9a9] text-2xl font-medium auth-login-text'>Design Maker makes it easy to create and share professional designs.</span>
            </div>
            <div className="container flex justify-center items-center w-full h-full top-9 left-0 right-0">
                <div className="auth-main">
                    {/* Checkbox pentru a schimba între login și sign up */}
                    <input className="auth-input" type="checkbox" id="auth-chk" aria-hidden="true" />

                    {/* Formul de signup */}
                    <div className="auth-signup">
                        <form>
                            <label className="auth-label" htmlFor="auth-chk" aria-hidden="true">Sign up</label>
                            <input className={`auth-textBox ${shakeUsername ? "shake" : ""}`}
                                type="text"
                                name="txt"
                                placeholder="User name"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input className={`auth-textBox ${shakeEmail ? "shake" : ""}`}
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <p className="email-error-message">{emailError}</p>}  {/* Afiseaza mesajul de eroare */}
                            {/* <input className="textBox"
                                type="number"
                                name="broj"
                                placeholder="Phone Number"
                                required
                            /> */}
                            <div className="password-container">
                                <input className={`auth-textBox ${shakePassword ? "shake" : ""}`}
                                    type={showPassword ? "text" : "password"}
                                    name="pswd"
                                    placeholder="Password (6+ characters)"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </span>
                            </div>
                            <button className="auth-loginButton auth-button" 
                                type="button"
                                onClick={() => registerWithEmailPassword(email, password, username, setShakeEmail, setShakePassword, setEmailError, setShakeUsername)}
                            >
                                Sign up
                            </button>
                        </form>
                    </div>

                    {/* Formul de login */}
                    <div className="auth-login">
                        <form>
                            <label className="auth-label" htmlFor="auth-chk" aria-hidden="true">Login</label>
                            <input className={`auth-textBox ${shakeEmail ? "shake" : ""}`}
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="password-container">
                                <input className={`auth-textBox ${shakePassword ? "shake" : ""}`}
                                    type={showPassword ? "text" : "password"}
                                    name="pswd"
                                    placeholder="Password (6+ characters)"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </span>
                            </div>
                            {loginError && <p className="login-error-message">{loginError}</p>}
                            <button className="auth-loginButton auth-button"
                                type="button"
                                onClick={() => loginWithEmailPassword(email, password, setShakeEmail, setShakePassword, setLoginError)}
                            >
                                Login
                            </button>

                            <div className="auth-or-divider">
                                <span>or</span>
                            </div>
                            
                            <button
                                type="button"
                                className="auth-google-button auth-button px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-orange-700 w-full text-white outline-none hover:bg-orange-800"
                                onClick={loginWithGoogle}
                            >
                                <span className="auth-googleIcon"><AiOutlineGoogle/></span>
                                <span className="auth-googleText">Login with Google</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;