import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js";
const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        console.log("user");
        const refreshToken = user.generateRefreshToken()
        console.log("user2");
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Somrthing went wrong while generating token")
    }
}

const registerUser = asyncHandler( async (req, res) => {

    const {username, email, password,country, name, contact,isSeller,desc} = req.body


    if (
        [username, email, password ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }  
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    console.log("email: ", email);
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    console.log(req.files);

    const img = req.files?.img[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

 

    const resume = req.files?.resume[0]?.path;
    
    

    if (!img) {
        throw new ApiError(400, "Image file is required")
    }
    console.log(req.body)
    const profileImg = await uploadOnCloudinary(img)
    console.log(profileImg)
    const resumeFileImage = await uploadOnCloudinary(resume)
    console.log(resumeFileImage)

    if (!profileImg) {
        throw new ApiError(400, "Image file is required")
    }
   

    const user = await User.create({

        username: username.toLowerCase(),
        email,
        password,
        img: profileImg.url,
        country,
        name,
        contact,
        resume: resumeFileImage?.url || "",
        isSeller,
        desc
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(
    async (req,res) => {
        // req body -> data
        //username or email
        //paswd check
        //access and refresh token
        //send cookie
        const {email, username, password} = req.body
        console.log(req.body);
        if(!(username || email)){
            throw new ApiError(400,"username or email is required")
        }
        console.log("2");
        const user = await User.findOne({
            $or: [{username},{email}]
        })
        console.log("3");
        if (!user) {
            throw new ApiError(404, "user does not exist")
        }
        console.log(user);
        

        const isPaswdValid = await user.isPasswordCorrect(password)
        if (!isPaswdValid) {
            throw new ApiError(401, "Invalid password")
        }
        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
        const loggedInUser = await User.findById(user._id).
        select("-password -refreshToken")
        const options = {
            httpOnly: true,
            path: '/' ,
            maxAge: 2 * 60 * 60 * 1000

        }


        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(200,
                loggedInUser,accessToken,
                "User logged in successfully")
        )

    })

const logoutUser = asyncHandler(async (req, res) => {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
                },
            },
                {
                    new: true
                }
            
        )
        
        const options = {
            httpOnly: true,
            sameSite: 'lax',
            path: '/' 
        }
        return res.status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200, "User logged out"))
    })
    
const refreshAccessToken = asyncHandler(async (req, res) => {
        const incomingRefreshToken =   req.cookies.refreshToken || req.body.refreshToken
        if(!incomingRefreshToken){
            throw new ApiError(401, "Unauthorized request")
        }
        try {
            const decodedToken = Jwt.verify(
                incomingRefreshToken,
                process.env.ACCESS_TOKEN_SECRET
            )
            const user = await User.findById(decodedToken?._id)
            if(!user){
                throw new ApiError(401, "Invalid request Token")
            }
            if (incomingRefreshToken !== user?.refreshToken) {
                throw new ApiError(401, "Refresh token is expired or used")
            }
            const options= {
                httpOnly: true,
                secure: true
                
            }
            const {accessToken, newrefreshToken} =  await generateAccessAndRefreshToken(user._id)
        
            return res.status(200)
            .cookie("accesToken", accessToken, options)
            .cookie("refreshToken", newrefreshToken, options)
            .json(
                new ApiResponse(200, 
                    {
                        accessToken, refreshToken: newrefreshToken
                    }, "Access token refreshed")
        )
        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid refresh token")
        }
    
    })

const changeCurrentPassword = asyncHandler(async(req,res) => {
        const {oldPassword, newPassword} = req.body
    
        const user = await User.findById(req.user?._id)
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    
        if(!isPasswordCorrect){
            throw new ApiError(400, "Invalid old Password")
        }
        user.password = newPassword
        await user.save({validateBeforeSave: false})
    
        return res.status(200)
        .json(new ApiResponse(200,{},"Password changed succeessfully"))
    
    
    
    })
    
const getCurrentUser = asyncHandler(async(req,res) => {
        return res.status(200)
        .json(new ApiResponse(200,
            req.user,
            "Fetched"))
    })
    
const updatAccountDetails = asyncHandler(async(req,res) => {
        const {fullName, email} = req.body
    
        if(!fullName || !email){
            throw new ApiError(400, "All fields are required")
        }
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    fullName,
                    email: email
                }
            },
            {new: true}
            ).select("-password")
            return res
            .status(200)
            .json(
                new ApiResponse
                (200,user, "Account details updated succesfully")
                )
    })
    
const updatUserImage = asyncHandler(async(req,res) => {
        const imageLocalPath = req.file?.path
    
        if (!imageLocalPath) {
            throw new ApiError(400, "Avatar file is missing")
        }
        const image = await uploadOnCloudinary(imageLocalPath)
        if (!avatar) {
            throw new ApiError(400,"Error while uploading cloudinary")
        }
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    image: image.url
                }
            },
            {new: true}
        ).select("-password")
        return res
            .status(200)
            .json(
                new ApiResponse
                (200,user, "Account details updated succesfully")
                )
    })
    
const updatUserResumeImage = asyncHandler(async(req,res) => {
        const resumeImageLocalPath = req.file?.path
    
        if (!resumeImageLocalPath) {
            throw new ApiError(400, "Avatar file is missing")
        }
        const resumeImage = await uploadOnCloudinary(resumeImageLocalPath)
        if (!resumeImage) {
            throw new ApiError(400,"Error while uploading cloudinary")
        }
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    resumeImage: resumeImage.url
                }
            },
            {new: true}
        ).select("-password")
        return res
            .status(200)
            .json(
                new ApiResponse
                (200,user, "Account details updated succesfully")
                )
    })
const fetchAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate("username","_id");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updatAccountDetails,
    updatUserImage,
    updatUserResumeImage,
    fetchAllUsers
}