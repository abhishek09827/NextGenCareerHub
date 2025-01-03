import "./Project.css";
import PRO from "/bg.jpg";
import { FaGithub } from "react-icons/fa";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaMedkit } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { motion } from "framer-motion";

const Project = ({ data }) => {
  if (!data || data.length === 0) {
    // Handle the case where data is not available or is an empty array
    return null;
  }

  const project = data[0];
  return (
    <div className="cont-project">
      <div className="left">
        <motion.span
          initial={{
            x: "250%",
            y: "50%",
          }}
          animate={{
            x: "10%",
          }}
          transition={{
            type: "easein",
            delay: "0.1",
            duration: "0.7",
          }}
          className="addon"
        >
          <FaGithub className="icon-pro" />
        </motion.span>
        <motion.span
          initial={{
            x: "250%",
            y: "50%",
          }}
          animate={{
            x: "10%",
          }}
          transition={{
            type: "easein",
            delay: "0.1",
            duration: "0.7",
          }}
          className="addon"
        >
          <FaRocket className="icon-pro" />
        </motion.span>
        <motion.span
          initial={{
            x: "250%",
            y: "50%",
          }}
          animate={{
            x: "10%",
          }}
          transition={{
            duration: "0.7",
          }}
          className="addon"
        >
          <FaClock className="icon-pro" />
        </motion.span>
      </div>
      <div className="center">
        <h1>{project[0]}</h1>
        <div className="made">
          {" "}
          <h3>Built by </h3> <span> Dev</span>
        </div>
        <motion.div
          className="card-pro"
          initial={{ scale: "0.9", rotate: "-5deg" }}
          animate={{ rotate: "0deg" }}
          whileHover={{ scale: "1", rotateZ: "2deg" }}
          transition={{ delay: "0.2" }}
        >
          <img src={PRO} alt="" />
          <div className="text-pro">
            <h1>{project[0]}</h1>
            <p>{project[1]}</p>
          </div>
          <div className="end-pro">
            <div className="end-pro-left">
              <span>link to project</span>
            </div>
            <div className="end-pro-right">
              <FiThumbsUp className="icon-like" />

              <FiThumbsDown className="icon-like" />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="right">
        <motion.span
          initial={{
            x: "-250%",
          }}
          animate={{
            x: "-10%",
          }}
          transition={{
            duration: "0.7",
          }}
          className="addon"
        >
          <FaMedkit className="icon-pro" />
        </motion.span>
        <motion.span
          initial={{
            x: "-250%",
          }}
          animate={{
            x: "-10%",
          }}
          transition={{
            duration: "0.7",
          }}
          className="addon"
        >
          <FaUserFriends className="icon-pro" />
        </motion.span>
        <motion.span
          initial={{
            x: "-250%",
            rotate: "0deg",
          }}
          animate={{
            x: "-10%",
            rotateX: "5deg",
          }}
          transition={{
            type: "easein",
            delay: "0.1",
            duration: "0.7",
          }}
          className="addon"
        >
          <FaUserFriends className="icon-pro" />
        </motion.span>
      </div>
    </div>
  );
};

export default Project;
