import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-main">
      <div className="part2">
        <div className="hero-main-txt">
          <span style={{ "--i": 1 }}>T</span>
          <span style={{ "--i": 2 }}>h</span>
          <span style={{ "--i": 3 }}>i</span>
          <span style={{ "--i": 4 }}>n</span>
          <span style={{ "--i": 5 }}>K</span>
          <span className="black" style={{ "--i": 6 }}>
            |
          </span>
          <span style={{ "--i": 7 }}>j</span>
          <span style={{ "--i": 8 }}>o</span>
          <span style={{ "--i": 9 }}>b</span>
          <span className="black" style={{ "--i": 10 }}>
            |
          </span>
          <span style={{ "--i": 11 }}>t</span>
          <span style={{ "--i": 12 }}>h</span>
          <span style={{ "--i": 13 }}>i</span>
          <span style={{ "--i": 14 }}>n</span>
          <span style={{ "--i": 15 }}>k</span>
          <span className="black" style={{ "--i": 16 }}>
            |
          </span>
          <span style={{ "--i": 17 }}>U</span>
          <span style={{ "--i": 18 }}>s</span>
          <span style={{ "--i": 19 }}>.</span>
          <span style={{ "--i": 20 }}>.</span>
        </div>
        <span className="hero-byline">Smart way to recruite</span>

        <div className="txt1">Come be a Part </div>
        <div className="txt2"> of the </div>
        <div className="txt1">Journey</div>
        <div className="hero-but">
          {" "}
          <button className="readmore">
            {" "}
            <span>Read More</span>
          </button>
          <button className="readmore1">
            {" "}
            <Link
              to="/job"
              style={{
                textDecoration: "none",
                color: "skyblue",
              }}
            >
              <span>Are you a Recruiter?</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
