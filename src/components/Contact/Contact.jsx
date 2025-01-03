import "./Contact.css";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cont, setCont] = useState("");

  const nameHandler = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };
  const mailHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="cont">
      <div className="nav-main">
        <div className="opt">
          <span className="red"></span>
          <span className="yellow"></span>
          <span className="green"></span>
        </div>
        <span className="text">contact@admin.dev</span>
      </div>
      <div className="window">
        <form action="">
          <label htmlFor="">
            To start with , whats <span>your name </span>
          </label>
          <div className="line">
            <label htmlFor="">➡️ ~ Enter name :</label>
            <input
              type="text"
              name="name"
              id=""
              onChange={nameHandler}
              value={name}
            />
          </div>
          {name && <div className="res">✅ {name}</div>}
          {name && (
            <div className="block">
              <label htmlFor="">
                To start with , whats <span>your Email </span>
              </label>
              <div className="line">
                <label htmlFor="">➡️ ~ Enter email :</label>
                <input
                  type="text"
                  name="email"
                  id=""
                  onChange={mailHandler}
                  value={email}
                />
              </div>
              {email && <div className="res">✅ {email}</div>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
