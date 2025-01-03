import { useEffect, useState } from "react";
import "./JobSide.css";
import Img from "/jb.jpg";

import axios from "axios";
import { Link } from "react-router-dom";

import { SiChatbot } from "react-icons/si";
import Chatbot from "../../components/ChatBot/chatBot";

const JobSide = () => {
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/users/fetchAllUsers",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "http://localhost:5173/",
            },
          }
        );
        console.log(res.data.data);
        setUsers(res.data.data);
        console.log(users[2].name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);
  const [users, setUsers] = useState([]);
  const [bot, setBot] = useState(false);
  const chatBotToggle = () => {
    setBot(!bot);
  };
  const closeBot = () => {
    setBot(false);
  };
  return (
    <div className="js-cont">
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
            <Link to="/job" style={{ color: "black" }}>
              Post a Job
            </Link>
          </button>
        </div>
        <div className="img_section">
          <img src={Img} alt="" className="img_about" />
        </div>
      </div>
      <h3 className="my-projects">Listed Users</h3>
      <div className="js-users-cont">
        {users.map((user, index) => (
          <div className="user-card" key={index}>
            <h3>{user.name}</h3>
            <p>{user.desc}</p>
            <a href={user.resume}>Link to Resume</a>
            <span>{user.country}</span>
            <span>{user.email}</span>
          </div>
        ))}
      </div>
      <div className="js-chatbot">
        {!bot && <SiChatbot className="bot-icon" onClick={chatBotToggle} />}
        {bot && <Chatbot clos={chatBotToggle} />}
      </div>
    </div>
  );
};

export default JobSide;
