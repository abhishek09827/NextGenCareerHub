import { dialogClasses } from "@mui/material";
import "./Carrer.css";
import cr from "/infobot.jpg";

const Carrer = () => {
  return (
    <div className="carrer-cont">
      <div className="carrer-cont-hero">
        <p style={{ visibility: "hidden" }} className="hid">
          orem ipsum dolor sit amet consectetur adipisicing elit. Corporis ex
          laboriosam corrupti sint, numquam sit commodi repellendus et maxime
          explicabo, a natus omnis animi aliquid officiis vel sunt doloribus
          officia nam quo earum, nemo quia aspernatur cumque. Eveniet cupiditate
          magnam vitae natus? Modi enim quos ducimus amet ipsum laudantium
          consequatur laborum. Vel sint temporibus explicabo facere ipsum
          perspiciatis modi earum ex, numquam, distinctio ab? Quae minus eum
          omnis nemo? In repudiandae vel eaque praesentium porro illum,
          aspernatur facilis.
        </p>
        <div className="carrer-cont-card">
          <h1 className="dark-text">Presenting to You </h1>
          <div className="carrer-card-desc">
            <p className="dark-text">
              A unbiased, informative and more than an assistant. A guide to all
              your queries
            </p>
            <img
              src={cr}
              alt=""
              className="carrer-chat"
              style={{ height: "70px", borderRadius: "50%" }}
            />{" "}
            <span className="dark-text">Click to Chat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrer;
