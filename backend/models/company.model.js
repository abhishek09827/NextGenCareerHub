import mongoose from "mongoose";
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    companyName: String,
    contactPersonName: String,
    phoneNumber: String,
    emailId: String,
    jobAddress: String,
    jobs: [{
      type: Schema.Types.ObjectId,
      ref: 'JobPost',
    }],
  },
  { timestamp: true }
);

const company = mongoose.model("Company", companySchema);

export { company };
