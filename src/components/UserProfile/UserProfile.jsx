import { useState } from "react";

import Card from "../../Resuable/Card";
import "./UserProfile.css";
import USER from "/hero_BG.jpg";
import { FaLinkedin, FaPen } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [showmodal, setShowmodal] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();
  const d = [
    {
      index: 1,
      title: "Farm Financer",
      img: "/bg.jpg",
      desc: `A one stop solution to deal with all the financial hassales for farmers`,
    },
    {
      index: 2,
      title: "Athena Data Analytics",
      img: "/pr2.png",
      desc: `Leveraging machine learning to transform big data into actionable insights for businesses`,
    },
    {
      index: 3,
      title: "Green Horizon Energy",
      img: "/pr3.png",
      desc: `Developing sustainable, renewable energy solutions to combat climate change`,
    },
    {
      index: 4,
      title: "Urban Agriculture Revolution",
      img: "/pr4.png",
      desc: `Implementing vertical farming techniques to create food security in urban environments`,
    },
  ];

  const modalHandler = () => {
    navigate("/addproject");
  };

  const closeModal = () => {
    setShowmodal(false);
  };

  return (
    <>
      {showmodal && (
        <div className="modal-overlay">
          <div className="centre-user" tabIndex="-1" role="dialog">
            <AddProject onClose={closeModal} />
          </div>
        </div>
      )}
      <div className="cont-userpro">
        <div className="left-user">
          <div className="user-img">
            <img src={user.img} alt="" />
          </div>
          <div className="user-desc">
            <p>{user.desc}</p>
          </div>
          <div className="user-social">
            <div className="u-link">
              <span className="icon">
                <FaLinkedin />
              </span>
              <span className="link">
                Lorem ipsum dolor sit amet consectetur.
              </span>
            </div>
            <div className="u-link">
              <span className="icon">
                <FiGithub />
              </span>
              <span className="link">
                Lorem, ipsum dolor sit amet consectetur .
              </span>
            </div>
          </div>
        </div>

        <div className="right-user">
          <div className="user-header">
            <div className="user-head">
              <h1>
                Hello , It's <span className="head-name">{user.name}</span>{" "}
              </h1>
            </div>
            <div className="user-edit">
              <FaPen />
            </div>
          </div>

          <div className="user-deets">
            <span className="user-info">{user.desc}</span>
            <span className="user-info">{user.email}</span>
            <span className="user-info">{user.country}</span>
            <span className="user-info">{user.contact}</span>
            <span className="user-info">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
              dolores accusamus laborum.
            </span>
          </div>
          <div className="user-project-sec">
            <div className="user-projects">
              {d.map((e) => {
                return <Card key={e.index} title={e.title} img={e.img} />;
              })}
            </div>
            <div className="user-add-pro" onClick={modalHandler}>
              <Card title={<FaPlus />} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
