import "./Sign.css";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true
const Sign = () => {
  const navigate = useNavigate();
  const { signIn, user } = useUser();
  const [u, setU] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setU((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        u,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      signIn(response.data.data);

      navigate("/user");

      console.log("User loggedIn successfully");
      console.log(response.data.data);
      console.log(response.data.data.username);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sign-cont">
      <form action="" className="sign" onSubmit={handleSubmit}>
        <div className="sign-main-reg">
          <div className="opt-reg">
            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </div>
          <span className="textreg">sign@admin.dev</span>
        </div>
        <div className="sign-field">
          {" "}
          <label htmlFor="'">
            Email:
            <input name="email" type="email" onChange={handleChange} />
          </label>
          <label htmlFor="'">
            Username:
            <input name="username" type="text" onChange={handleChange} />
          </label>
          <label htmlFor="'">
            Password:
            <input name="password" type="password" onChange={handleChange} />
          </label>
        </div>

        <div className="sign-button-field">
          {" "}
          <button className="sign-button" type="submit">
            Submit
          </button>
          <button className="sign-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Sign;
