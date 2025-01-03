import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  fetchAllUsers,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { addProject } from "../controllers/addProject.controllers.js";
import cookieParser from "cookie-parser";
import { addPost } from "../controllers/post.controller.js";
const userRouter = Router();
userRouter.route("/register").post(
  upload.fields([
    {
      name: "img",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
  ]),

  registerUser
);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/fetchAllUsers").post(fetchAllUsers);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/getCurrentUser").post(verifyJWT, getCurrentUser);

userRouter.route("/addProject").post(
  upload.fields([
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  addProject
);
userRouter.route("/addPost").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  addPost
);
export { userRouter };
