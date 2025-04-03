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

class DesignController {
    create_user_design = async (req, res) => {
        console.log("Design controller loaded");
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

    get_user_design = async (req, res) => {
        const { designId } = req.params;  // Preluăm ID-ul design-ului din parametrii URL-ului
        
        try {
            const design = await designModel.getDesignById(designId); // Găsim design-ul în baza de date folosind functia getDesignById din designModel
            return res.status(200).json({ design : Object.values(design.components) }); // Returnăm design-ul găsit
        } catch (error) {
            return res.status(500).json({ message: error.message }); // În caz de eroare, returnăm un mesaj de eroare
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
