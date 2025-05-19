const { formidable } = require("formidable");
const cloudinary = require("cloudinary").v2;
const designModel = require("../models/designModel");
const userImageModel = require("../models/userImageModel");

const designImageModel = require("../models/designImageModel");
const backgroundModel = require("../models/backgroundModel");
const templateModel = require("../models/templateModel");
const { db } = require('../firebaseAdmin');
const admin = require('firebase-admin');


class DesignController {
    create_user_design = async (req, res) => {

        const form = formidable();
        const { uid } = req.user; // Preluam UID-ul utilizatorului autentificat din token

        try {
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
            });

            const [fields, files] = await form.parse(req);
            const { image } = files;

            let imageUrl = "";
            if (image) {
                const { url } = await cloudinary.uploader.upload(image[0].filepath);
                imageUrl = url;
            }

            const designData = {
                userId: uid,
                components: JSON.parse(fields.design[0]),
                imageUrl: imageUrl,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const newDesign = await designModel.createDesign(designData);
            return res.status(201).json({ message: "Design saved successfully", design: newDesign });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: error.message });
        }
    };

    update_user_design = async (req, res) => {
        const form = formidable();
        const { designId } = req.params // Preluam ID-ul design-ului din parametrii URL-ului

        try {
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
            });

            const [fields, files] = await form.parse(req);
            const { image } = files;
            const components = JSON.parse(fields.design[0]).design;      // Preluam componentele din design

            const old_design = await designModel.getDesignById(designId); // Gasim design-ul vechi în baza de date folosind functia getDesignById din designModel

            if (old_design) {
                if (old_design.imageUrl) {
                    const splitImage = old_design.imageUrl.split('/');
                    const imageFile = splitImage[splitImage.length - 1];
                    const imageName = imageFile.split('.')[0];
                    await cloudinary.uploader.destroy(imageName); // Stergem imaginea veche din Cloudinary
                }

                const { url } = await cloudinary.uploader.upload(image[0].filepath); // Incarcam imaginea noua in Cloudinary

                // await designModel.findByIdAndUpdate(designId, {
                //     imageUrl: url,
                //     components
                // })
                await designModel.updateDesignById(designId, {
                    imageUrl: url,
                    components,
                    updatedAt: new Date()
                });

                return res.status(200).json({ message: "Image saved successfully" });

            } else {
                return res.status(404).json({ message: "Design not found" }); // In caz de eroare, returnam un mesaj de eroare
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_user_design = async (req, res) => {
        const { designId } = req.params;  // Preluam ID-ul design-ului din parametrii URL-ului

        try {
            const design = await designModel.getDesignById(designId); // Gasim design-ul în baza de date folosind functia getDesignById din designModel
            return res.status(200).json({ design: Object.values(design.components) }); // Returnam design-ul gasit
        } catch (error) {
            return res.status(500).json({ message: error.message }); // In caz de eroare, returnam un mesaj de eroare
        }
    }

    upload_user_image = async (req, res) => {
        const { uid } = req.user; // Preluam UID-ul utilizatorului autentificat din token

        const form = formidable({});

        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
        });

        try {
            const [_, files] = await form.parse(req);
            const { image } = files; // Preluam imaginea din fisierele incarcate

            const { url } = await cloudinary.uploader.upload(image[0].filepath); // Incarcam imaginea in Cloudinary

            const userImage = await userImageModel.addUserImage({
                userId: uid,
                imageUrl: url
            }); // Adaugam imaginea utilizatorului in baza de date

            return res.status(200).json({ userImage }); // Returnam un mesaj de succes
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_user_image = async (req, res) => {
        const { uid } = req.user; // Preluam UID-ul utilizatorului autentificat din token
        try {
            const images = await userImageModel.getUserImages(uid); // Obtinem imaginile utilizatorului din baza de date
            return res.status(200).json({ images });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_initial_image = async (req, res) => {
        try {
            const images = await designImageModel.getAllDesignImages(); // Obtinem imaginile utilizatorului din baza de date
            return res.status(200).json({ images });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_background_image = async (req, res) => {
        try {
            const images = await backgroundModel.getAllBackgroundImages(); // Obtinem imaginile utilizatorului din baza de date
            return res.status(200).json({ images });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_user_designs = async (req, res) => {
        const { uid } = req.user; // Preluam UID-ul utilizatorului autentificat din token

        try {
            const designs = (await designModel.getDesignsByUserId(uid)); // Obtinem imaginile utilizatorului din baza de date
            return res.status(200).json({ designs });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    delete_user_design = async (req, res) => {
        const { designId } = req.params; // Preluam ID-ul design-ului din parametrii URL-ului

        try {
            await designModel.deleteDesignById(designId); // Stergem design-ul din baza de date folosind functia deleteDesignById din designModel
            return res.status(200).json({ message: "Design deleted successfully" }); // Returnam un mesaj de succes
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_templates = async (req, res) => {
        try {
            const templates = (await templateModel.getAllTemplates()); // Obtinem imaginile utilizatorului din baza de date
            return res.status(200).json({ templates });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    add_user_template = async (req, res) => {
        const { template_id } = req.params;
        const { uid } = req.user;   // Preluam UID-ul utilizatorului autentificat din token

        try {
            const template = (await templateModel.getTemplateById(template_id)); // Obtinem imaginile utilizatorului din baza de date
            const design = await designModel.createDesign({
                userId: uid,
                components: template.components,
                imageUrl: template.imageUrl,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            return res.status(200).json({ design });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
}

module.exports = new DesignController();