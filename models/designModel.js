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


const { db } = require("../firebaseAdmin"); // NU importa din ../server
// Firestore din Admin SDK suportă direct db.collection()

class DesignModel {
    async createDesign(data) {
        try {
            const designRef = await db.collection("designs").add(data);
            return { id: designRef.id, ...data };       //designRef.id - este ID-ul unic generat automat de Firestore pentru acel document
        } catch (error) {
            throw new Error("Failed to create design: " + error.message);
        }
    }
}

module.exports = new DesignModel();