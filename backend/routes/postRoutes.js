import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { addProject } from "../controllers/addProject.controllers.js";
import cookieParser from "cookie-parser";
import {
  addPost,
  deletePost,
  fetchAllPosts,
  updatePost,
} from "../controllers/post.controller.js";
const postRouter = Router();

postRouter.route("/addPost").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  addPost
);
postRouter.route("/fetchAllPosts").post(fetchAllPosts);
postRouter.route("/updatePost/:id").post(updatePost);
postRouter.route("/deletePost/:id").post(verifyJWT, deletePost);

export { postRouter };
