import React, { useState } from "react";
import axios from "axios";
import "./Company.css";

const Company = ({ onButtonClick, jobID }) => {
  // State variables for input values
  const [companyName, setCompanyName] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [jobAddress, setJobAddress] = useState("");

  const handleSave = async () => {
    console.log({
      companyName,
      contactPersonName,
      phoneNumber,
      emailId,
      jobAddress,
    });
    try {
      console.log(jobID);
      const response = await axios.post(
        `http://localhost:3000/api/v1/company/addCompany/${jobID}`,
        {
          companyName,
          contactPersonName,
          phoneNumber,
          emailId,
          jobAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Job created with Company");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    onButtonClick("confrm");
  };

  return (
    <>
      <h1 className="comp-head">About Your Company</h1>
      <div className="sec1">
        <label htmlFor="">
          Company Name
          <input
            type="text"
            placeholder="Eg. Cyber info tech"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Contact Person Name
          <input
            type="text"
            placeholder="Eg. Abhishek"
            value={contactPersonName}
            onChange={(e) => setContactPersonName(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Phone Number
          <input
            type="tel"
            placeholder="Eg. Abhishek ka no."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Email Id
          <input
            type="email"
            placeholder="Eg. Abhishek ka email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Job Address
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={jobAddress}
            onChange={(e) => setJobAddress(e.target.value)}
          ></textarea>
        </label>

        <button type="button" onClick={handleSave} className="add-job-but">
          Post Job
        </button>
      </div>
    </>
  );
};

export default Company;
