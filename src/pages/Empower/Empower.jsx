import "./Empower.css";

import Testimonials from "../../components/Empowerment/Testimonials";
import TextEditor from "../../components/TextEditor/TextEditor";
import Card from "../../Resuable/Card";
import { FaPlusCircle } from "react-icons/fa";
import Im from "/womenBG.jpg";
import wT from "/wT.jpg";
import sp from "/sp.jpg";
import kN from "/kN.jpg";
import { Link } from "react-router-dom";

const Empower = () => {
  const d = [
    {
      title: "Arundhati Bhattacharya ",

      img: "path/to/image1.jpg",
      desc: `Arundhati Bhattacharya, a luminary in the Indian tech industry, is making waves as the CEO of Salesforce India. With a trailblazing career that includes being the first woman Chairperson of the State Bank of India, Bhattacharya is a driving force in technological innovation and digital transformation in banking.`,

      socialLinks: [
        { url: "https://twitter.com/example1", icon: "twitter" },
        { url: "https://facebook.com/example1", icon: "linkedIn" },
      ],
    },
    {
      title: "Debjani Ghosh ",
      img: "path/to/image2.jpg",
      desc: `Leading the National Association of Software and Service Companies, Debjani Ghosh is a key advocate for India’s IT sector. Her focus on digitalization and gender diversity has marked her as a pivotal figure in shaping the industry’s contribution to India’s economic landscape.
      `,
      socialLinks: [
        { url: "https://twitter.com/example1", icon: "twitter" },
        { url: "https://facebook.com/example1", icon: "linkedIn" },
      ],
    },
    {
      title: "Falguni Nayar",
      img: "path/to/image3.jpg",
      desc: `From a successful career in investment banking to founding Nykaa, Falguni Nayar has transformed the landscape of Indian e-commerce in beauty and fashion. Under her guidance, Nykaa has become a household name, synonymous with quality and style.
      `,
      socialLinks: [
        { url: "https://twitter.com/example1", icon: "twitter" },
        { url: "https://facebook.com/example1", icon: "linkedIn" },
      ],
    },
    {
      title: "Vinita Gupta",
      img: "path/to/image4.jpg",
      desc: `Steering Lupin Limited, a global pharmaceutical giant, Vinita Gupta is a powerhouse in the industry. Her strategic vision has been instrumental in Lupin’s global expansion and positioning as a formidable player in the pharmaceutical world.
     `,
      socialLinks: [
        { url: "https://twitter.com/example1", icon: "twitter" },
        { url: "https://facebook.com/example1", icon: "linkedIn" },
      ],
    },
  ];
  return (
    <div className="empower-cont">
      <div className="empower-title">
        <div
          className="empower-head"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {" "}
          <h1>EmpowHER </h1>
          <p style={{ color: "white", fontSize: "26px" }}>
            The Ultimate Hub for Women's Growth and Leadership.
            <br />A portal for growth, netwoking and all things good!!
          </p>
        </div>

        <img src={Im} alt="" />
      </div>
      <div className="filler">
        <h1> Our Aim</h1>
      </div>
      <div className="empower-hero">
        <div className="herosec">
          <div className="herosec1">
            <h2>Connecting Women across Professions</h2>
            <p className="hero-desc">
              Create a vibrant network that connects aspiring women
              professionals with experienced mentors. This platform is designed
              to facilitate mentorship and guidance, crucial for career
              development and personal growth, and helps women navigate through
              their professional landscapes.?
            </p>
          </div>

          <img src={wT} alt="" />
        </div>

        <div className="herosec2">
          <div className="herosec1">
            <h2>Tailored Support for Women's Career Journeys</h2>
            <p className="hero-desc">
              Provide specialized support and resources that address the unique
              challenges faced by women in the workforce. This section is
              committed to equipping women with essential tools and advice for
              their career advancement, ensuring their success and growth in
              professional settings.
            </p>
          </div>
          <img src={sp} alt="" />
        </div>
        <div className="herosec">
          <div className="herosec1">
            <h2>Knowledge Sharing by Inspirational Women</h2>
            <p className="hero-desc">
              Cultivate a space where distinguished women leaders share their
              knowledge through blogs and articles. This feature is focused on
              empowering women by offering insights, experiences, and practical
              advice from successful figures in various fields, creating a
              community of informed and empowered women professionals.
            </p>
          </div>
          <img src={kN} alt="" />
        </div>
      </div>
      <div className="filler">
        <h1> Top Women Voices</h1>
      </div>
      <div
        className="empower-profiles"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {d.map((data) => {
          return (
            <Card
              key={data.title}
              title={data.title}
              img={data.img}
              desc={data.desc}
              socialLinks={data.socialLinks}
            />
          );
        })}
      </div>
      <div className="filler">
        <h1> Top Stories</h1>
      </div>

      <Testimonials />
      <Link to="/createPost">
        <FaPlusCircle /> Add Post
      </Link>
    </div>
  );
};

export default Empower;
