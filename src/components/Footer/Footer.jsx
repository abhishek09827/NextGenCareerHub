import "./Footer.css";

import logo from "/logo.jpg";
import { FaLinkedin, FaFacebookF } from "react-icons/fa";
import {
  AiFillInstagram,
  AiOutlineSearch,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <article className="footer__section">
          <div className="footer__brand">
            <img src={logo} alt="logo" className="foot_img" />
            <p>NextGEN</p>
          </div>
          <div className="footer__socials">
            <a
              href="https://www.linkedin.com/in"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaLinkedin className="footer-icon" />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaFacebookF className="footer-icon" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <AiOutlineTwitter className="footer-icon" />
            </a>
            <a
              href="https://www.instagram.com/aakashreddy2912/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <AiFillInstagram className="footer-icon" />
            </a>
          </div>
        </article>
        <article className="footer__section">
          <AiOutlineSearch className="footer-icon" />
          <input type="text" name="" id="" placeholder="Search" />
          <button>Subscribe Here</button>
        </article>
      </div>
      <div className="footer__copyright">
        <small>Made with ❤️ in 2024 </small>
      </div>
    </footer>
  );
};

export default Footer;
