import { useState, useEffect } from "react";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import "./Testimonial.css";

import axios from "axios";

import Markdown from "react-markdown";

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllHandler = async (e) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/post/fetchAllPosts",
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data.data);
        setPosts(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllHandler();
  }, [index]);

  const prevTestimonialHandler = () => {
    console.log("CLu");
    setIndex((prev) => prev - 1);
    if (index <= 0) {
      setIndex(posts.length - 1);
    }
  };

  const postTestimonialHandler = () => {
    setIndex((prev) => prev + 1);
    if (index >= posts.length - 1) {
      setIndex(0);
    }
  };

  const { desc, image, title } = posts.length > 0 ? posts[index] || {} : {};

  return (
    <div className="testi-cont">
      <section className="testimonials">
        <div className="container testimonials__container">
          <div className="testimonial">
            <div className="testi-user">
              <div className="testimonial__avatar">
                <img src={image} alt="Name" />
              </div>
              <p className="testimonial__quote">
                <Markdown>{`${desc}`}</Markdown>
              </p>
              <h5>{title}</h5>
            </div>
          </div>
          <div className="testimonials__btn-container">
            <button
              className="testimonials__btn"
              onClick={prevTestimonialHandler}
            >
              <IoIosArrowDropleftCircle />
            </button>
            <button
              className="testimonials__btn"
              onClick={postTestimonialHandler}
            >
              <IoIosArrowDroprightCircle />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
