import { Router } from "express";
import { addJob, fetchAllJobs, apply, fetchLastAddedJob } from "../controllers/jobPost.controller.js";


const jobRouter = Router();

jobRouter.route("/addJob").post(
  addJob
);
jobRouter.route("/fetchAllJobs").post(
  fetchAllJobs
);

jobRouter.route("/apply").post(
  apply
);
jobRouter.route("/fetchLastAddedJob").post(
  fetchLastAddedJob
);
export { jobRouter };
