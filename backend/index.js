import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({})
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
connectDB()
.then(
() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Conneceted to port : ${process.env.PORT}`);
    })
}
)
.catch((err) => {
    console.log("Mongo Conn failed");
})
