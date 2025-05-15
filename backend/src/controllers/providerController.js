import providerModel from "../models/provider.js"

import {v2 as cloudinary} from  "cloudinary"

import {config} from "../config.js"

cloudinary.config({



    cloud_name: config.cloudinary.cloudinary_name,
   
    api_key: config.cloudinary.cloudinary_api_key,

    api_secret: config.cloudinary.cloudinary_api_secret
});

const providerController = {};

 providerController.getAllProviders = async (req, res) => {


    const providers = await providerModel.find();

    res.json(providers);
    


 }

 //insert

 providerController.insertProviders = async (req, res) => {


    const {name, telephone} = req.body;
    let imageURL = ""


    //subir imagen

    if (req.file){

        const result = await cloudinary.uploader.upload(



            req.file.path,
            {



             folder: "public",
            allowed_formats: ["png", "jpg", "jpeg"]

            }

        )
        imageURL = result.secure_url


    }

    const newProvider = new providerModel({name, telephone, image: imageURL});
    await newProvider.save();

    res.json({message: "provider saved"})

 }

 export default providerController;