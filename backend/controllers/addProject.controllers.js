
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {Project} from "../models/addProject.model.js";


const addProject = asyncHandler( async (req, res) => {

    const {projectTitle,
        desc,
        gitLink,
        wantToContribute,
        domain,
        isDeployed} = req.body
    //console.log("email: ", email);

  
    const img = req.files?.img[0]?.path;

    
    const profileImg = await uploadOnCloudinary(img)

    if (!profileImg) {
        throw new ApiError(400, "Image file is required")
    }
   

    const project = await Project.create({
        projectTitle,
        desc,
        gitLink,
        wantToContribute,
        domain,
        isDeployed,
        img: profileImg.url,
        // createdBy: req?.user._id

    })

    const createdProject = await Project.findById(project._id)

    if (!createdProject) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdProject, "Project added Successfully")
    )

} )

export {addProject}