import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
cloudinary.config({ 
  cloud_name: 'dem9nwt6u', 
  api_key: '436217149691334', 
  api_secret: '2o93f46o-sFrfxJbK9oXgQDLbwc'
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type: "auto"})
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export default uploadOnCloudinary