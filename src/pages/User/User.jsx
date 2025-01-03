import ProjectGallery from "../../Resuable/ProjectGallery";
import { Link } from "react-router-dom";
import Carrer from "../../components/Carrer/Carrer";

import { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";

import "./User.css";
import axios from "axios";
import JobPost from "../../Resuable/JobPost";

import { FaUserAstronaut } from "react-icons/fa";

const User = () => {
  const [jobs, setJobs] = useState([]);
  const [flag, setFlag] = useState(false);
  const { user } = useUser();

  const onFlag = () => {
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 2200);
  };

  useEffect(() => {
    const fetchAllHandler = async (e) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/job/fetchAllJobs",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "http://localhost:5173/",
            },
          }
        );

        console.log(response.data.data);
        setJobs(response.data.data);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllHandler();
  }, []);
  return (
    <div>
      <hr />
      <Link to="/userProfile">
        {" "}
        <span className="n-text"> Welcome back</span>
        <span className="hi-text">{user.name}</span>{" "}
        <span className="n-text">
          {" "}
          <FaUserAstronaut />
        </span>{" "}
      </Link>{" "}
      <hr />
      <h3 className="my-projects">My Projects</h3>
      <ProjectGallery />
      <h3 className="my-projects">Job Listings</h3>
      <div className="job-gallery">
        {jobs.map((job, index) => (
          <JobPost key={index} job={job} user={user} flag={onFlag} />
        ))}
      </div>
      {flag && (
        <div className="popup">
          <p>Applied for Job Successfully!</p>
        </div>
      )}
      <Carrer />
    </div>
  );
};

export default User;
