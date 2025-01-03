import { JobPost } from "../models/jobPost.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v4 as uuidv4 } from 'uuid';
import { resumeScreener } from "../resumeScreener/resume.js";
// code fragment
import fetch from 'node-fetch';


const pendingJobs = {};
const addJob = asyncHandler(async (req, res) => {
  const { 
    jobTitle,
    jobLocation,
    noOfOpenings,
    minExperience,
    maxExperience,
    monthlySalary,
    offerBonus,
    jobDescription,
    skills,
    age,
    preferredLanguage,
    preferredIndustry,
    jobTimings,
    interviewDetails,
   } = req.body;

   const jobId = uuidv4();
   pendingJobs[jobId] = { 
    jobTitle,
    jobLocation,
    noOfOpenings,
    minExperience,
    maxExperience,
    monthlySalary,
    offerBonus,
    jobDescription,
    skills,
    age,
    preferredLanguage,
    preferredIndustry,
    jobTimings,
    interviewDetails,
   };
   console.log("1");
   console.log(pendingJobs);
  return res
  .status(200)
  .json(new ApiResponse(200, {jobId, pendingJobs}, "Posts details updated succesfully"));
});

const fetchAllJobs = asyncHandler(async (req, res) => {
  const posts = await JobPost.find().populate("createdBy", "_id");

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});


const apply = asyncHandler(async (req, res) => {
  const { 
    resume, jobDetails, userMail
   } = req.body;
  //console.log("email: ", email);

  

  const screenResults = await resumeScreener(resume, jobDetails)
  
  function cleanScreenResults(input) {
    // Trim leading and trailing spaces
    let cleanedInput = input.trim();

    // Replace any special characters with escaped versions
    cleanedInput = cleanedInput.replace(/\\/g, '\\\\')  // Escape backslashes
        .replace(/"/g, '\\"')  // Escape double quotes
        .replace(/\n/g, '\\n')  // Escape newlines
        .replace(/\r/g, '\\r')  // Escape carriage returns
        .replace(/\t/g, '\\t'); // Escape tabs

    return cleanedInput;
}

// Example of cleaning screenResults
const cleanedScreenResults = cleanScreenResults(screenResults);
console.log(cleanedScreenResults);
// Data to be sent in the EmailJS request
const data = {
  service_id: 'service_zn8soxl',
  template_id: 'template_j6mffzr',
  user_id: 'O1kaE1MkYaAmTAWyQ',
  accessToken: 'nw_RQoEHuYfHtRjWzlPu1',
  template_params: {
      to_name: 'Abhishek',
      from_name: 'NextGen',
      message: cleanedScreenResults,  // Use the cleaned version of screenResults
  },
};

async function sendEmail() {
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if the response is okay (status 2xx)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const text = await response.text();  // Get the response as plain text
    console.log('Response Text:', text);  // Log the raw response

    if (text === 'OK') {
      console.log('Your email was sent successfully!');
    } else {
      console.log('Unexpected response:', text);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

sendEmail();
  return res
    .status(201)
    .json(new ApiResponse(200, screenResults , "Resume Screened and results sent"));
});

const fetchLastAddedJob = asyncHandler(async (req, res) => {
  const lastAddedJob = await JobPost.findOne().sort({ _id: -1 }).exec();

  return res
    .status(200)
    .json(new ApiResponse(200, lastAddedJob, "Last added job fetched successfully"));
});





export { addJob,pendingJobs,fetchAllJobs ,apply, fetchLastAddedJob};
