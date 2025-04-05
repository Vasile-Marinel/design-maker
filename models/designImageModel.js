// const {model, Schema} = require('mongoose');

// const design_image_schema = new Schema({
//     image_url: {
//         type: String,
//         required: true
//     }
// },{timestamps: true})

// module.exports = model('design_images', design_image_schema)

const { db } = require('../firebaseAdmin'); // importă instanța Firestore

class DesignImageModel {
    async addDesignImage(imageUrl) {
        try {
            const docRef = await db.collection('design_images').add({
                imageUrl,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return { id: docRef.id, imageUrl };
        } catch (error) {
            throw new Error('Failed to add design image: ' + error.message);
        }
    }

    async getAllDesignImages() {
        try {
            const snapshot = await db.collection('design_images')
                .orderBy('createdAt', 'desc')
                .get();

            const images = [];
            snapshot.forEach(doc => {
                images.push({ id: doc.id, ...doc.data() });
            });

            return images;
        } catch (error) {
            throw new Error('Failed to fetch design images: ' + error.message);
        }
    }
}

module.exports = new DesignImageModel();
