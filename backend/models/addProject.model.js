import mongoose from "mongoose"
const { Schema } = mongoose;


const projectSchema = new Schema({
    projectTitle: String,
    desc: String,
    img: String,
    gitLink: String,
    wantToContribute: String,
    domain: String,
    isDeployed: String,
    // createdBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // }
  },{timestamp: true}
  )

const Project = mongoose.model(
    "Project",
    projectSchema
    
  );

export { Project }