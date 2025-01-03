import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/addProject.model.js";
import { Post } from "../models/post.model.js";
import { JobPost } from "../models/jobPost.model.js";
import { company } from "../models/company.model.js";
import { addJob, pendingJobs } from "./jobPost.controller.js";


const addCompany = asyncHandler(async (req, res) => {
  const { 
    companyName,
    contactPersonName,
    phoneNumber,
    emailId,
    jobAddress,
   } = req.body;
  //console.log("email: ", email);

  

  const Company = await company.create({
    companyName,
      contactPersonName,
      phoneNumber,
      emailId,
      jobAddress,
      
  });

  const createdCompany = await company.findById(Company._id);

  if (!createdCompany) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  console.log(req.params?._id);
  const job = pendingJobs[req.params?._id]
  console.log("2"); 
  console.log(job); 
  const jobCreated = await JobPost.create({
    ...job,
    createdBy: Company._id
  })
  await company.findByIdAndUpdate(Company._id, { $push: { jobs: jobCreated._id } });

  delete pendingJobs[req.params?.id];
  return res
    .status(201)
    .json(new ApiResponse(200, createdCompany, "Post added Successfully"));
});

const fetchAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("createdBy", "_id");

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});
const updatePost = asyncHandler(async (req, res) => {
  const { title, desc, tags } = req.body;

  const post = await Post.findByIdAndUpdate(
    req.params?.id,
    {
      $set: {
        title: title,
        desc: desc,
        tags: tags,
      },
    },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, post, "Posts details updated succesfully"));
});


export { addCompany};
