import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/addProject.model.js";
import { Post } from "../models/post.model.js";

const addPost = asyncHandler(async (req, res) => {
  const { title, desc, tags } = req.body;
  //console.log("email: ", email);

  const img = req.files?.image[0]?.path;

  const profileImg = await uploadOnCloudinary(img);

  if (!profileImg) {
    throw new ApiError(400, "Image file is required");
  }

  const post = await Post.create({
    title,
    desc,
    tags,
    // createdBy: req.user._id,
    image: profileImg.url,
  });

  const createdPost = await Post.findById(post._id);

  if (!createdPost) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdPost, "Post added Successfully"));
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
const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json(new ApiResponse(404, null, "Post not found"));
  }

  if (post.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json(
        new ApiResponse(
          403,
          null,
          "Permission denied. You are not the creator of this post."
        )
      );
  }

  await post.remove();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Post deleted successfully"));
});

export { addPost, fetchAllPosts, updatePost, deletePost };
