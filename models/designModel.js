// const {model, Schema} = require('mongoose');

// const user_schema = new Schema({
//     user_id: {
//         type: Schema.Types.ObjectId,
//         required: true,
//         ref: 'users'
//     },
//     components: {
//         type: Array,
//         default: []
//     },
//     image_url: {
//         type: String,
//         default: ''
//     },
// },{timestamps: true})

// module.exports = model('designs', user_schema)



const db = require("../server"); // Importăm instanța Firestore

class DesignModel {
    async createDesign(data) {
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            const designRef = await db.collection("designs").add(data);
            return { id: designRef.id, ...data };
        } catch (error) {
            throw new Error("Failed to create design: " + error.message);
        }
    }
}

module.exports = new DesignModel();




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
// module.exports = new create_user_design();