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
    .then(async (result) => {
      const user = result.user;
      console.log("User info:", user);
      
        // Obține token-ul ID după autentificare
      const idToken = await user.getIdToken(true);
      // Salvează token-ul în localStorage
      localStorage.setItem('user_token', idToken);

      // Salvăm utilizatorul în Firestore dacă nu există deja
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
          await setDoc(userRef, {
              username: user.displayName,
              email: user.email,
              createdAt: new Date(),
              updatedAt: new Date(),
              image: user.photoURL || ""  // Dacă utilizatorul are o imagine de profil din Google, o salvăm
          });
          console.log("User info saved to Firestore!");
      } else {
          console.log("User already exists in Firestore.");
      }
       // Redirecționează utilizatorul la pagina principală
       window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error during Google login:", error);
    });
};

const loginWithEmailPassword = (email, password, setShakeEmail, setShakePassword, setLoginError) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("Logged in with email:", user);

            // Obține token-ul ID după autentificare
            const idToken = await user.getIdToken(true);
            // Salvează token-ul în localStorage
            localStorage.setItem('user_token', idToken);

            setLoginError(''); // stergem eroarea daca login-ul reuseste
            // Redirecționează utilizatorul la pagina principală
            window.location.href = "/";
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

        // Obține token-ul ID după crearea utilizatorului
        const idToken = await user.getIdToken(true);
        // Salvează token-ul în localStorage
        localStorage.setItem('user_token', idToken);

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {       //Daca utilizatorul nu exista in Firestore, il adauga
            await setDoc(userRef, {
                username: username,
                email: email,
                createdAt: new Date(),
                updatedAt: new Date(),  // Adăugat updatedAt
                image: "" // Inițial, nu are o imagine de profil
            });
            setEmailError('');
            console.log("User info saved to Firestore!");
        } else {
            console.log("User already exists in Firestore.");
        }
        // Redirecționează utilizatorul la pagina principală
        window.location.href = "/";

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
                                    placeholder="Password"
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