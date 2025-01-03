import { Router } from "express";
import { addCompany } from "../controllers/company.controller.js";

import  {chatBot}  from "../controllers/chatbot.controller.js";
const companyRouter = Router();

companyRouter.route("/addCompany/:id").post(
  addCompany
);

companyRouter.route("/chatbot").post(
  chatBot
);

export { companyRouter };
