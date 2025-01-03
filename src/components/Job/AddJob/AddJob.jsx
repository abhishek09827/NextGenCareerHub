import React, { useState } from "react";
import "./AddJob.css";
import axios from "axios";
import { useUser } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
const AddJob = ({ onButtonClick, job }) => {
  const [addJob, setJob] = useState();
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobLocation: "",
    noOfOpenings: "",
    minExperience: "",
    maxExperience: "",
    monthlySalary: "",
    offerBonus: false,
    jobDescription: "",
    skills: "",
    age: "",
    preferredLanguage: "",
    preferredIndustry: "",
    jobTimings: "",
    interviewDetails: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/job/addJob",
        jobDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Job creation initiated");
      setJob(response.data.jobId);
      console.log(response.data);
      job(response.data.jobId);
    } catch (err) {
      console.log(err);
    }

    onButtonClick("aboutJob");
  };

  return (
    <div className="addjob-cont">
      <form onSubmit={handleSubmit} className="add-job">
        <h1>Basic Job Details</h1>
        <div className="sec1">
          <label htmlFor="jobTitle">
            Job Title
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              value={jobDetails.jobTitle}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="jobLocation">Job Location</label>
          <select
            name="jobLocation"
            id="jobLocation"
            value={jobDetails.jobLocation}
            onChange={handleInputChange}
          >
            <option value="">Pick your city</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Noida">Noida</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
          </select>

          <label htmlFor="noOfOpenings">
            No Of Openings
            <input
              type="number"
              name="noOfOpenings"
              id="noOfOpenings"
              placeholder="Eg .2"
              value={jobDetails.noOfOpenings}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <h1>Candidate Requirement</h1>
        <div className="sec1">
          <div className="job-drop">
            <label htmlFor="minExperience">
              Minimum Experience
              <select
                name="minExperience"
                id="minExperience"
                value={jobDetails.minExperience}
                onChange={handleInputChange}
              >
                <option value="Fresher">Fresher</option>
                <option value="6 Months">6 Months</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
              </select>
            </label>
            <label htmlFor="maxExperience">
              Maximum Experience
              <select
                name="maxExperience"
                id="maxExperience"
                value={jobDetails.maxExperience}
                onChange={handleInputChange}
              >
                <option value="Fresher">Fresher</option>
                <option value="6 Months">6 Months</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
              </select>
            </label>
          </div>

          <label htmlFor="monthlySalary">
            Monthly In-hand Salary
            <input
              type="range"
              name="monthlySalary"
              id="monthlySalary"
              value={jobDetails.monthlySalary}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="offerBonus">
            Do you offer bonus in addition to monthly salary?
            <div className="checkbox-label">
              <label htmlFor="offerBonusYes">
                Yes
                <input
                  type="checkbox"
                  name="offerBonus"
                  id="offerBonusYes"
                  checked={jobDetails.offerBonus}
                  onChange={handleInputChange}
                />
              </label>
              <label htmlFor="offerBonusNo">
                No
                <input
                  type="checkbox"
                  name="offerBonus"
                  id="offerBonusNo"
                  checked={!jobDetails.offerBonus}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </label>

          <label htmlFor="jobDescription">
            Job Info / Job Description
            <textarea
              name="jobDescription"
              id="jobDescription"
              cols="20"
              rows="10"
              value={jobDetails.jobDescription}
              onChange={handleInputChange}
            ></textarea>
          </label>

          <label htmlFor="skills">
            Skills
            <input
              type="text"
              name="skills"
              id="skills"
              value={jobDetails.skills}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <h1>Personal details, Education, additional info</h1>
        <div className="sec1">
          <label htmlFor="age">
            Age
            <input
              type="number"
              name="age"
              id="age"
              value={jobDetails.age}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="preferredLanguage">
            Preferred Language
            <input
              type="text"
              name="preferredLanguage"
              id="preferredLanguage"
              value={jobDetails.preferredLanguage}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="preferredIndustry">
            Preferred Industry
            <input
              type="text"
              name="preferredIndustry"
              id="preferredIndustry"
              value={jobDetails.preferredIndustry}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <h2>Timings</h2>
        <div className="sec1">
          <label htmlFor="jobTimings">
            Job Timings
            <textarea
              name="jobTimings"
              id="jobTimings"
              cols="10"
              rows="10"
              placeholder="9:30 AM - 6:30 PM | Monday to Saturday"
              value={jobDetails.jobTimings}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label htmlFor="interviewDetails">
            Interview Details
            <textarea
              name="interviewDetails"
              id="interviewDetails"
              cols="10"
              rows="10"
              placeholder="9:30 AM - 6:30 PM | Monday to Saturday"
              value={jobDetails.interviewDetails}
              onChange={handleInputChange}
            ></textarea>
          </label>
        </div>
        <button
          type="submit"
          className="add-job-but"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddJob;
