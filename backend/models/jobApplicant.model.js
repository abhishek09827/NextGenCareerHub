import mongoose from 'mongoose';

const jobApplicantSchema = new mongoose.Schema({
  applicant: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    resume: String,
  },
  jobDetails: {
    position: String,
    company: String,
    location: String,
    experience: String,
    education: String,
  },
  keywords: [String],
});

const JobApplicant = mongoose.model('Job', jobApplicantSchema);

export {JobApplicant};
