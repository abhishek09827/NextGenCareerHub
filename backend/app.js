import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import https from "https";
import fs from "fs";
import bodyParser from "body-parser";
const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// const options = {
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert'),
// };
// const server = https.createServer(options, app);

//routes

import { userRouter } from "./routes/useRoutes.js";
import { postRouter } from "./routes/postRoutes.js";
import { jobRouter } from "./routes/jobPosts.js";
import { companyRouter } from "./routes/company.js";
import { chatRouter } from "./routes/chat.js";
// import { resume } from "./routes/screening.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/company", companyRouter);
app.use("/webhook", chatRouter);
// app.use("/api/v1/resume", resume);

export { app };
