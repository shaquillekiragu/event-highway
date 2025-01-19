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
      <article className="welcomeContainer">
        <div className="welcomeLayerOne">
          <p>Welcome to Event Highway!</p>
        </div>
        <div className="welcomeLayerTwo">
          <button onClick={handleLoginClick} className="logButton">
            Login
          </button>
          <button onClick={handleSignupClick} className="logButton">
            Sign Up!
          </button>
        </div>
        <div className="welcomeLayerThree">
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
        </div>
      </article>
    </section>
  );
}

export default WelcomePage;
