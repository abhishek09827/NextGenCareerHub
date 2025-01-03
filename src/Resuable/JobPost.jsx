import "./JobPost.css";
import axios from "axios";
import {
  FaLocationArrow,
  FaClock,
  FaDollarSign,
  FaUsers,
  FaCheck,
  FaCross,
} from "react-icons/fa";

const JobPostCard = ({ job, user, flag }) => {
  const applyHandler = () => {
    console.log("Email", user.email);
    console.log("job Description", job);
  };
  applyHandler();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      await axios.post(
        "http://localhost:3000/api/v1/job/apply",
        {
          resume: user.resume,
          jobDetails: job,
          userMail: "abhishekk09827@gmail.com",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User created successfully");
      flag();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="job-post-card">
      <h2>{job.jobTitle}</h2>
      <div className="top-line">
        <p>
          <FaLocationArrow /> <span>{job.jobLocation}</span>
        </p>
        <p>
          <FaClock /> {job.jobTimings}
        </p>
      </div>
      <p>{job.jobDescription}</p>
      <p>{job.interviewDetails}</p>
      <div className="top-line">
        <p>
          Experience: {job.minExperience} - {job.maxExperience}
        </p>
        <p>
          {" "}
          <FaDollarSign /> <span>{job.monthlySalary}</span>{" "}
        </p>{" "}
      </div>

      <p>Preferred Language: {job.preferredLanguage}</p>
      <p>Skills: {job.skills}</p>
      <button onClick={handleSubmit} className="smart-but">
        Smart Apply
      </button>
    </div>
  );
};

export default JobPostCard;
