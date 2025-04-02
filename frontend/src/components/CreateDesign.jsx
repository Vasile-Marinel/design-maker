import React, { useEffect, useRef, useState } from 'react'
import * as htmlToImage from 'html-to-image'  //importa html-to-image pentru a converti un element HTML in imagine
import { useLocation, useNavigate } from 'react-router-dom'
import RotateLoader from 'react-spinners/RotateLoader'  //importa RotateLoader pentru a afisa un loader rotativ
import { db } from 'C:\\Users\\vasil\\OneDrive\\Desktop\\AC_Informatica\\ANUL3\\Design_editor\\firebaseConfig.js'; // Importăm configurările Firebase
import { collection, addDoc } from '@firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { getAuth } from '@firebase/auth'; // Importăm getAuth din Firebase

import CreateComponent from './CreateComponent'
import api from '../utils/api'

const CreateDesign = () => {

    const ref = useRef()        //ref-ul este folosit pentru a accesa elementul DOM, DOM este structura de obiecte a documentului HTML  
    const { state } = useLocation()     //Preia datele trimise din `Home` in 'state'
    //useNavigate din Home trimite datele(pe path-ul specificat) introduse de utilizator pentru dimensiuni personalizate catre aceasta pagina, iar useLocation le preia

    const navigate = useNavigate()     //useNavigate este folosit pentru a naviga catre o alta pagina

    // const obj = {     //acest obiect (obj) defineste un element grafic
    //     name: "main_frame",   //numele obiectului
    //     type: "rect",   //tipul obiectului, in cazul de fata un dreptunghi
    //     id: Math.floor((Math.random() * 100) + 1),      //un id unic generat aleator
    //     height: state.height,       //inaltimea si latimea obiectului
    //     width: state.width,
    //     z_index: 1,     //z-index-ul obiectului, adica ordinea de afisare
    //     color: "#fff",
    //     image: ""
    // }
    const obj = {
        //components: { // Aici trebuie să includem componentele ca un map
        //main_frame: {
        name: "main_frame",
        type: "rect",
        id: Math.floor((Math.random() * 100) + 1),
        height: state.height,
        width: state.width,
        z_index: 1,
        color: "#fff",
        image: "",
        //}
        //}
    };

    const [loader, setLoader] = useState(false)     //loader este folosit pentru a afisa un loader rotativ in timpul procesului de salvare a design-ului

    const create_design = async () => {
        //if (!ref.current) return; // Verificăm dacă ref-ul este valid
        const image = await htmlToImage.toBlob(ref.current)     //converteste elementul DOM in imagine

        const design = JSON.stringify(obj)     //converteste elementul DOM in JSON

        if (image) {
            const formData = new FormData()     //FormData este folosit pentru a trimite datele catre server
            formData.append('design', design)     //adauga imaginea in formData
            formData.append('image', image)

            try {
                setLoader(true)     //setLoader seteaza loader-ul la true pentru a afisa loader-ul rotativ
                const { data } = await api.post('/api/create-user-design', formData)
                navigate(`/design/${data.design.id}/edit`)     //navigheaza catre pagina design-ului creat
                setLoader(false)     //setLoader seteaza loader-ul la false pentru a ascunde loader-ul rotativ
            } catch (error) {
                setLoader(false)     //setLoader seteaza loader-ul la false pentru a ascunde loader-ul rotativ
                console.log(error.response.data)
            }
        }


        //     const image = await htmlToImage.toBlob(ref.current);
        // const design = JSON.stringify(obj);

        // if (image) {
        //     const formData = new FormData();
        //     formData.append("design", design);
        //     formData.append("image", image);
        //     formData.append("userId", getAuth().currentUser.uid);
        //     console.log(getAuth().currentUser.uid)

        //     try {
        //         setLoader(true);
        //         const { data } = await api.post("/api/create-user-design", formData);
        //         navigate(`/design/${data.designId}/edit`);
        //     } catch (error) {
        //         console.log(error.response.data);
        //     }
        // }




        //     const image = await htmlToImage.toBlob(ref.current);
        //     //const design = JSON.stringify(obj);
        //     console.log(image)

        //     if (image) {
        //         const formData = new FormData();
        //         formData.append('design', design);
        //         formData.append('image', image);

        //         try {
        //             setLoader(true);

        //             // Obținem utilizatorul curent autentificat
        //             const user = getAuth().currentUser;

        //             if (!user) {
        //                 // Dacă nu este autentificat, redirecționăm la login
        //                 navigate('/login');
        //                 return;
        //             }

        //             // Crearea unui nou design în Firestore, asociat cu ID-ul utilizatorului
        //             const docRef = await addDoc(collection(db, "designs"), {
        //                 // designData: design,
        //                 // width: state.width,
        //                 // height: state.height,
        //                 // createdAt: new Date(),
        //                 // updatedAt: new Date(),
        //                 // userId: user.uid,  // Salvăm ID-ul utilizatorului în design
        //                 components: obj.components, // Salvăm obiectul ca un map
        //                 createdAt: new Date(),
        //                 updatedAt: new Date(),
        //                 userId: user.uid,
        //             });


        //             // Salvăm imaginea în Firebase Storage
        //             const imageRef = ref(storage, `designs/${docRef.id}.png`);
        //             const uploadTask = uploadBytesResumable(imageRef, image);

        //             uploadTask.on(
        //                 "state_changed",
        //                 (snapshot) => {
        //                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //                     console.log('Upload is ' + progress + '% done');
        //                 },
        //                 (error) => {
        //                     console.log(error);
        //                     setLoader(false);
        //                 },
        //                 async () => {
        //                     const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        //                     console.log('File available at', downloadURL);

        //                     // **Actualizăm documentul existent cu URL-ul imaginii**
        //                     await updateDoc(doc(db, "designs", docRef.id), {
        //                         imageUrl: downloadURL,
        //                     });

        //                     // Navigăm către pagina de editare a design-ului
        //                     navigate(`/design/${docRef.id}/edit`);
        //                 }
        //             );
        //         } catch (error) {
        //             console.log(error);
        //             setLoader(false);
        //         }
        //     }
    }

    useEffect(() => {
        if (state && ref.current) {
            create_design()
        } else {
            navigate('/')
        }
    }, [state, ref])

    return (
        <div className='w-screen h-screen flex justify-center items-center relative'>
            <div ref={ref} className='relative w-auto h-auto overflow-auto'>
                <CreateComponent info={obj} current_component={{}} />
            </div>
            {
                loader && <div className='left-0 top-0 w-full h-full flex justify-center items-center bg-black absolute'><RotateLoader color='white' /></div>
            }
        </div>
    )
}

export default CreateDesign