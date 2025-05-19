const { db } = require('../firebaseAdmin'); // Import Firestore din admin SDK

class TemplateModel {
    // Adauga un nou template
    async createTemplate(data) {
        try {
            const templateRef = await db.collection('templates').add({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return { id: templateRef.id, ...data };
        } catch (error) {
            throw new Error('Failed to create template: ' + error.message);
        }
    }

    // Returneaza toate template-urile
    async getAllTemplates() {
        try {
            const snapshot = await db.collection('templates')
                .orderBy('createdAt', 'desc')
                .get();

            const templates = [];
            snapshot.forEach(doc => {
                templates.push({ id: doc.id, ...doc.data() });
            });

            return templates;
        } catch (error) {
            throw new Error('Failed to fetch templates: ' + error.message);
        }
    }

    // Returneaza un singur template dupa ID
    async getTemplateById(templateId) {
        try {
            const doc = await db.collection('templates').doc(templateId).get();
            if (!doc.exists) {
                throw new Error('Template not found');
            }
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            throw new Error('Failed to fetch template: ' + error.message);
        }
    }

    // Sterge un template dupa ID
    async deleteTemplate(templateId) {
        try {
            await db.collection('templates').doc(templateId).delete();
            return true;
        } catch (error) {
            throw new Error('Failed to delete template: ' + error.message);
        }
    }
}

module.exports = new TemplateModel();