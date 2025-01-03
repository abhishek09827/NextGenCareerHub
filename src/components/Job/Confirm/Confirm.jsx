import { useNavigate } from "react-router-dom";
import "./Confirm.css";

const Confirm = () => {
  const navigate = useNavigate();
  const cnfrmHandler = () => {
    navigate("/js");
  };

  return (
    <div className="confirmation-box dark-theme">
      <p>
        Hello! The job has been posted,
        <br /> <br />
        Thanks for registering your company with us.
      </p>
      <button className="confirm-button" onClick={cnfrmHandler}>
        Confirm
      </button>
    </div>
  );
};

export default Confirm;
