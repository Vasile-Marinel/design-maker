// const { formidable } = require("formidable");
// const cloudinary = require("cloudinary").v2;
// const designModel = require("../models/designModel");

// class designController {
//     create_user_design = async (req, res) => {
//         console.log('Design controller loaded')
//         const form = formidable({});
//         const { uid } = req.user; // Preluăm uid-ul din token-ul JWT

//         try {
//             cloudinary.config({
//                 cloud_name: process.env.cloud_name,
//                 api_key: process.env.api_key,
//                 api_secret: process.env.api_secret,
//             })

//             const [fields, files] = await form.parse(req);
//             const { image } = files;

//             const { url } = await cloudinary.uploader.upload(image[0].filepath)

//             const design = await designModel.create({
//                 user_id: uid,
//                 components: [JSON.parse(fields.design[0])],
//                 image_url: url,
//             })

//         } catch (error) {
//             console.log(error.message);
//             return res.status(500).json({ message: error.message });
//         }
//     }
// }

// module.exports = new designController()




const { formidable } = require("formidable");
const cloudinary = require("cloudinary").v2;
const designModel = require("../models/designModel");
const userImageModel = require("../models/userImageModel");

const designImageModel = require("../models/designImageModel");
const backgroundModel = require("../models/backgroundModel");

class DesignController {
    create_user_design = async (req, res) => {

        const form = formidable();
        const { uid } = req.user; // Preluăm UID-ul utilizatorului autentificat din token

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
        const { designId } = req.params // Preluăm ID-ul design-ului din parametrii URL-ului

        try {
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
            });

            const [fields, files] = await form.parse(req);
            const { image } = files;
            const components = JSON.parse(fields.design[0]).design;      // Preluăm componentele din design

            const old_design = await designModel.getDesignById(designId); // Găsim design-ul vechi în baza de date folosind functia getDesignById din designModel

            if (old_design) {
                if (old_design.imageUrl) {
                    const splitImage = old_design.imageUrl.split('/');
                    const imageFile = splitImage[splitImage.length - 1];
                    const imageName = imageFile.split('.')[0];
                    await cloudinary.uploader.destroy(imageName); // Ștergem imaginea veche din Cloudinary
                }

                const { url } = await cloudinary.uploader.upload(image[0].filepath); // Încărcăm imaginea nouă în Cloudinary

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
                return res.status(404).json({ message: "Design not found" }); // În caz de eroare, returnăm un mesaj de eroare
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_user_design = async (req, res) => {
        const { designId } = req.params;  // Preluăm ID-ul design-ului din parametrii URL-ului

        try {
            const design = await designModel.getDesignById(designId); // Găsim design-ul în baza de date folosind functia getDesignById din designModel
            return res.status(200).json({ design: Object.values(design.components) }); // Returnăm design-ul găsit
        } catch (error) {
            return res.status(500).json({ message: error.message }); // În caz de eroare, returnăm un mesaj de eroare
        }
    }

    upload_user_image = async (req, res) => {
        const { uid } = req.user; // Preluăm UID-ul utilizatorului autentificat din token

        const form = formidable({});

        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
        });

        try {
            const [_, files] = await form.parse(req);
            const { image } = files; // Preluăm imaginea din fișierele încărcate

            const { url } = await cloudinary.uploader.upload(image[0].filepath); // Încărcăm imaginea în Cloudinary

            const userImage = await userImageModel.addUserImage({
                userId: uid,
                imageUrl: url
            }); // Adăugăm imaginea utilizatorului în baza de date

            return res.status(200).json({ userImage }); // Returnăm un mesaj de succes
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_user_image = async (req, res) => {
        const { uid } = req.user; // Preluăm UID-ul utilizatorului autentificat din token
        try {
            const images = await userImageModel.getUserImages(uid); // Obținem imaginile utilizatorului din baza de date
            return res.status(200).json({ images });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_initial_image = async (req, res) => {
        try {
            const images = await designImageModel.getAllDesignImages(); // Obținem imaginile utilizatorului din baza de date
            return res.status(200).json({ images });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_background_image = async (req, res) => {
        try {
            const images = await backgroundModel.getAllBackgroundImages(); // Obținem imaginile utilizatorului din baza de date
            return res.status(200).json({ images });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    get_user_designs = async (req, res) => {
        const { uid } = req.user; // Preluăm UID-ul utilizatorului autentificat din token

        try {
            const designs = (await designModel.getDesignsByUserId(uid)); // Obținem imaginile utilizatorului din baza de date
            return res.status(200).json({ designs });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new DesignController();





















// import { formidable } from "formidable";
// import create_user_design from "./designService.js";
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.api_secret,
// });

// class designController {
//     create_user_design = async (req, res) => {
//         console.log("Design controller loaded");
//         const form = formidable({});

//         try {
//             const [fields, files] = await form.parse(req);
//             const { image } = files;
//             const { userId } = fields;  // Preluăm userId-ul

//             let imageUrl = "";

//             if (image) {
//                 const uploadResult = await cloudinary.uploader.upload(image[0].filepath);
//                 imageUrl = uploadResult.secure_url;
//             }

//             const designData = JSON.parse(fields.design); // Extragem componentele

//             const designId = await create_user_design(userId, designData, imageUrl);
//             res.status(201).json({ success: true, designId });
//         } catch (error) {
//             console.error("Eroare la crearea design-ului:", error);
//             res.status(500).json({ success: false, message: "Eroare la crearea design-ului." });
//         }
//     };
// }

// export default new designController();
// // module.exports = new designController()
