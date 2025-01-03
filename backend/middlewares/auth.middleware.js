import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt  from "jsonwebtoken"
const verifyJWT =asyncHandler(async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "")
        const t2 = req.headers.authorization
        console.log(token);
        if (!token) {
            throw new ApiError(404, "Unauthorized request")
        }
       
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { algorithms: ['HS256'] });
          
            // If verification is successful, log the decoded token
            console.log(decodedToken);
        
        const user = await User.findById(decodedToken?._id)
        .select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401,"Invalid Access token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
}})


export default verifyJWT