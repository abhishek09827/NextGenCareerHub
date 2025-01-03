import { useState } from "react";
import AddJob from "./AddJob/AddJob";
import Company from "./Company/Company";
import Confirm from "./Confirm/Confirm";
import MultiStepProgressBar from "./ProgressBar/MultiStepProgressBar";
import "./Job.css";

import Img from "/jb.jpg";

const Job = () => {
  const [page, setPage] = useState("addJob");
  const [addJob, setJob] = useState("");
  const nextPage = (page) => {
    setPage(page);
  };
  const aJob = (e) => {
    setJob(e);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("addJob");
        break;
      case "2":
        setPage("aboutJob");
        break;
      case "3":
        setPage("cnfrm");
        break;
      case "4":
        alert("Ooops! Seems like you did not fill the form.");
        break;
      default:
        setPage("1");
    }
  };
  return (
    <div className="job-cont">
      <div className="job-cont-head">
        <div className="header">
          <h2>JOb Posting Made Easy</h2>
          <p>
            Simplify your hiring process with our user-friendly job posting
            platform. Create, edit, and publish job listings effortlessly,
            reaching a wider audience to find the perfect candidates for your
            team
          </p>
          <button className="read-btn">
            <a href="#fr" style={{ textDecoration: "none", color: "black" }}>
              Post a Job
            </a>
          </button>
        </div>
        <div className="img_section">
          <img src={Img} alt="" className="img_about" />
        </div>
      </div>
      <div className="job-cont-form" id="fr">
        <h2>Post a Job in minutes. Start with Recruitments Easily</h2>
        <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
        {
          {
            addJob: <AddJob onButtonClick={nextPage} job={aJob} />,
            aboutJob: (
              <Company onButtonClick={nextPage} job={aJob} jobID={addJob} />
            ),
            confrm: <Confirm onButtonClick={nextPage} />,
          }[page]
        }
      </div>
    </div>
  );
};

export default Job;
