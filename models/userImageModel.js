// const {model, Schema} = require('mongoose');

// const user_image_schema = new Schema({
//     user_id: {
//         type: Schema.Types.ObjectId,
//         required: true,
//         ref: 'users'
//     },
//     image_url: {
//         type: String,
//         required: true
//     },
// },{timestamps: true})

// module.exports = model('user_images', user_image_schema)

const { db } = require('../firebaseAdmin'); // importă instanța de Firestore

class UserImageModel {
    async addUserImage({ userId, imageUrl }) {
        try {
            const docRef = await db.collection('user_images').add({
                userId,
                imageUrl,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return { id: docRef.id, userId, imageUrl };
        } catch (error) {
            throw new Error('Failed to upload image: ' + error.message);
        }
    }

    async getUserImages(userId) {
        try {
            const snapshot = await db.collection('user_images')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .get();

            const images = [];
            snapshot.forEach(doc => {
                images.push({ id: doc.id, ...doc.data() });
            });

            return images;
        } catch (error) {
            throw new Error('Failed to fetch user images: ' + error.message);
        }
    }
}

module.exports = new UserImageModel();
