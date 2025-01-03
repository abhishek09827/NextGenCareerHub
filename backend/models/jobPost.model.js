import mongoose from "mongoose";
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    jobTitle: String,
    jobLocation: String,
    noOfOpenings: String,
    minExperience: String,
    maxExperience: String,
    monthlySalary: String,
    offerBonus: Boolean,
    jobDescription: String,
    skills: String,
    age: String,
    preferredLanguage: String,
    preferredIndustry: String,
    jobTimings: String,
    interviewDetails: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    }
  },
  { timestamp: true }
);

const JobPost = mongoose.model("Jobpost", jobSchema);

export { JobPost };
