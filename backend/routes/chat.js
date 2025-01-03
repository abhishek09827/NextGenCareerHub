import { Router } from "express";

import  {chatBot}  from "../controllers/chatbot.controller.js";
const chatRouter = Router();


chatRouter.route("").post(
  chatBot
);

export { chatRouter };
