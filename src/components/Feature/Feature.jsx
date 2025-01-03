import "./Feature.css";
import IM from "/ai_sc.jpg";
import BK from "/block.jpg";
import CR from "/CR.jpg";
import EM from "/EM.jpg";
import IB from "/infobot.jpg";
import { useState } from "react";

const Feature = () => {
  const [ind, setIndex] = useState(1);

  const featureHandler = (e) => {
    const d = e.target.getAttribute("data");
    console.log(d);

    setIndex(d);
    console.log(ind);
  };

  const dummyDataList = [
    {
      id: 0,
      imageUrl: "",
      description: " ",
    },
    {
      id: 1,
      imageUrl: IM,
      description:
        "Utilizing cutting-edge AI technology, this feature streamlines the hiring process by intelligently analyzing resumes. It ensures a perfect match between a candidate's skills and the job's requirements while minimizing biases, enhancing efficiency and fairness in recruitment.",
    },
    {
      id: 2,
      imageUrl: EM,
      description:
        "This platform is dedicated to empowering women in their professional journeys. It offers mentorship opportunities, educational webinars, and a supportive community to help women navigate challenges and excel in their careers.",
    },
    {
      id: 3,
      imageUrl: CR,
      description:
        "Designed to assist professionals returning from career breaks, this feature provides personalized AI-driven guidance, skill enhancement workshops, and re-entry strategies. It helps bridge the gap, ensuring a smooth transition back into the workforce.",
    },
    {
      id: 4,
      imageUrl: BK,
      description:
        "This feature allows professionals to display their achievements through a Blockchain-verified portfolio. It ensures the authenticity and security of their work, building trust and enhancing the credibility of their professional profile",
    },
    {
      id: 5,
      imageUrl: IB,
      description:
        "Introducing InfoBot, your dedicated interview assistant. Whether you have questions about our products, services, or any other topic, InfoBot is here to provide quick answers, in-depth information, and reliable support 24/7. Designed to enhance the interviewer's experience on our website by answering any queries related to interview or its process , InfoBot ensures a smooth and efficient interaction. It makes valuable information readily available, guiding you effortlessly through your journey.",
    },
  ];

  return (
    <div className="containerf">
      <div className="textf">
        <div className="sm">
          <span>Features </span>
        </div>
        <div className="headtxt">What we are here to offer.</div>
        <div className="list">
          <div className="el">
            <span className="num">01</span>
            <span className="txt" data={1} onClick={featureHandler}>
              AI Resume Analysis
            </span>
            <span className="sym">{">"}</span>
          </div>
        </div>
        <div className="list">
          <div className="el">
            <span className="num">02</span>
            <span className="txt" data={2} onClick={featureHandler}>
              Women's Empowerment Network
            </span>
            <span className="sym">{">"}</span>
          </div>
        </div>{" "}
        <div className="list">
          <div className="el">
            <span className="num">03</span>
            <span className="txt" data={3} onClick={featureHandler}>
              Career Break Navigation
            </span>
            <span className="sym">{">"}</span>
          </div>
        </div>{" "}
        <div className="list">
          <div className="el">
            <span className="num">04</span>
            <span className="txt" data={4} onClick={featureHandler}>
              Blockchain Project Showcase
            </span>
            <span className="sym">{">"}</span>
          </div>
        </div>
        <div className="list">
          <div className="el">
            <span className="num">05</span>
            <span className="txt" data={5} onClick={featureHandler}>
              Info Bot
            </span>
            <span className="sym">{">"}</span>
          </div>
        </div>
      </div>
      <div className="comp">
        <div className="im">
          <img src={dummyDataList[ind].imageUrl} alt="" />
        </div>
        <div className="desc">
          <div className="desc-t">{dummyDataList[ind].description}</div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
