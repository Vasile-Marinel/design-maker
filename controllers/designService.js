// import { db } from "../firebaseConfig.js";
// import { collection, addDoc } from "@firebase/firestore";

// const create_user_design = async (userId, components, imageUrl) => {
//     try {
//         const docRef = await addDoc(collection(db, "designs"), {
//             userId,
//             components,
//             imageUrl,
//             createdAt: new Date(),
//             updatedAt: new Date()
//         });

//         return docRef.id; // Returnăm ID-ul documentului nou creat
//     } catch (error) {
//         console.error("Eroare la salvarea design-ului:", error);
//         throw error;
//     }
// };

// export default create_user_design; // Export default