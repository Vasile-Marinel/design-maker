const { db } = require('../firebaseAdmin'); // importa instanta Firestore

class BackgroundImageModel {
    async addBackgroundImage(imageUrl) {
        try {
            const docRef = await db.collection('background_images').add({
                imageUrl,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return { id: docRef.id, imageUrl };
        } catch (error) {
            throw new Error('Failed to add background image: ' + error.message);
        }
    }

    async getAllBackgroundImages() {
        try {
            const snapshot = await db.collection('background_images')
                .orderBy('createdAt', 'desc')
                .get();

            const images = [];
            snapshot.forEach(doc => {
                images.push({ id: doc.id, ...doc.data() });
            });

            return images;
        } catch (error) {
            throw new Error('Failed to fetch background images: ' + error.message);
        }
    }
}

module.exports = new BackgroundImageModel();
