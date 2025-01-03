import "./About.css";
import Spline from "@splinetool/react-spline";
import { useRef } from "react";

const About = () => {
  const can = useRef(null);
  return (
    <div className="containera">
      <div className="headline">
        <div className="head">
          <h1>About Us</h1>
        </div>
        <div className="model">
          <Spline
            scene="https://prod.spline.design/se8tMtBCFL4R1Myi/scene.splinecode"
            ref={can}
          />
        </div>
      </div>
      <div className="desc-ab">
        <p>
          Welcome to NextGen Career Hub – Where Innovation Meets Professional
          Growth. Founded with a vision to harness the power of AI and
          Blockchain for career advancement, our platform is dedicated to
          empowering professionals, especially women, through ground-breaking
          technologies.
        </p>
        <br />
        <p>
          We believe in creating a transformative space that nurtures talent,
          bridges workforce gaps, and supports career breaks, all while
          fostering an environment of growth and innovation. Join us on this
          journey of reshaping the professional landscape and discover your true
          potential at NextGen Career Hub.
        </p>
      </div>
    </div>
  );
};

export default About;
