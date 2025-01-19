import { useNavigate } from "react-router-dom";
import "../stylesheets/WelcomePage.css";

function WelcomePage() {
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/login");
  }
  function handleSignupClick() {
    navigate("/signup");
  }

  return (
    <section className="welcomePage">
      <div className="thinBlackBanner"></div>
      <div className="welcomeContainer">
        <article className="welcomeSubcontainer">
          <p>Welcome to Event Highway!</p>
          <button onClick={handleLoginClick} className="logButton">
            Login
          </button>
          <button onClick={handleSignupClick} className="logButton">
            Sign Up!
          </button>
          <br />
          <br />
          <label htmlFor="proceed">Proceed without logging in: </label>
          <button
            onClick={() => {
              navigate("/events");
            }}
            className="logButton"
          >
            Proceed
          </button>
        </article>
      </div>
    </section>
  );
}

export default WelcomePage;
