import "./Card.css";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Card = ({ title, img, desc, socialLinks }) => {
  return (
    <div className="card-cont">
      {title && <div className="card-head">{title}</div>}
      {img && <div className="card-img">{<img src={img} alt="" />}</div>}
      {desc && <div className="card-desc">{desc}</div>}
      {socialLinks && (
        <div className="card-social-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon === "twitter" && <FaTwitter />}
              {link.icon === "linkedIn" && <FaLinkedinIn />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
