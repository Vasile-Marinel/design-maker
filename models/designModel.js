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

    async getDesignById(designId) {
        try {
            const designRef = db.collection("designs").doc(designId);
            const doc = await designRef.get();
    
            if (!doc.exists) {
                throw new Error("Design not found");
            }
    
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            throw new Error("Failed to fetch design: " + error.message);
        }
    }

    async updateDesignById(designId, newData) {
        try {
            const designRef = db.collection("designs").doc(designId);
            await designRef.set(newData, { merge: true }); // sau fără merge, dacă vrei suprascriere
            return true;
        } catch (error) {
            throw new Error("Failed to update design: " + error.message);
        }
    }

    async getDesignsByUserId(userId) {
        try {
            const snapshot = await db.collection("designs")
                .where("userId", "==", userId)
                .orderBy("createdAt", "desc")       // ordonare descrescătoare după data creării pentru a obține cele mai recente designuri in pagina de Home
                .get();
    
            const designs = [];
            snapshot.forEach(doc => {
                designs.push({ id: doc.id, ...doc.data() });
            });
    
            return designs;
        } catch (error) {
            throw new Error("Failed to fetch designs: " + error.message);
        }
    }

    async deleteDesignById(designId) {
        try {
            const designRef = db.collection("designs").doc(designId);
            await designRef.delete();
            return true;
        } catch (error) {
            throw new Error("Failed to delete design: " + error.message);
        }
    }
    
}

module.exports = new DesignModel();