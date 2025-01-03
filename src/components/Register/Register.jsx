import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";
import { motion } from "framer-motion";

import axios from "axios";
import "./Register.css";

function Register() {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    name: "",
    contact: "",
    resume: " ",
    isSeller: false,
    desc: "",
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    try {
      console.log(user)
      const formData = new FormData()
      formData.append('username', user.username);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('img', file);
      formData.append('country', user.country);
      formData.append('name', user.name);
      formData.append('contact', user.contact);
      formData.append('resume', res);
      formData.append('isSeller', user.isSeller); 
      formData.append('desc', user.desc);
      await axios.post("http://localhost:3000/api/v1/users/register", formData);
      console.log("User created successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.025,
    },
    tap: {
      scale: 0.975,
    },
  };

  return (
    <div className="register">
      <div className="cont-reg">
        <div className="nav-main-reg">
          <div className="opt-reg">
            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </div>
          <span className="textreg">register@admin.dev</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="leftform">
            <div className="line-reg">
              <FaUser className="icon-reg" /> <h1>Create new account</h1>
            </div>

            <label htmlFor="">Username</label>
            <input
              name="username"
              type="text"
              placeholder="johndoe"
              onChange={handleChange}
            />
            <label htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              placeholder="email"
              onChange={handleChange}
            />
            <label htmlFor="">Password</label>
            <input name="password" type="password" onChange={handleChange} />
            <label htmlFor="">Profile Picture</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor="">Country</label>
            <input
              name="country"
              type="text"
              placeholder="Uttar Pradesh"
              onChange={handleChange}
            />

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
            >
              Register
            </motion.button>
          </div>
          <div className="rightform">
            <div className="line-reg">
              <FaPenNib className="icon-reg" /> <h1>Basic Information</h1>
            </div>

            <div className="toggle">
              <label htmlFor="">Random toggle for Design purposes</label>
              <label className="switch">
                <input type="checkbox" onChange={handleChange} />
                <span className="slider round"></span>
              </label>
            </div>
            <label htmlFor="">Name</label>
            <input
              name="name"
              type="text"
              placeholder="dev"
              onChange={handleChange}
            />
            <label htmlFor="">Add Resume</label>
            <input type="file" onChange={(e) => setRes(e.target.files[0])} />
            <label htmlFor="">Phone Number</label>
            <input
              name="phone"
              type="text"
              placeholder="+1 234 567 89"
              onChange={handleChange}
            />
            <label htmlFor="">Write about Yourself 🖋️</label>
            <textarea
              placeholder="A short description of yourself"
              name="desc"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
