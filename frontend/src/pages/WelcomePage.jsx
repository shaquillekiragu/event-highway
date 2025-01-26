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
    <main className="welcomeContainer">
      <article className="welcomeSubcontainer">
        <div className="welcomeLayerOne">
          <h2>Welcome to Event Highway!</h2>
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
    </main>
  );
}

export default WelcomePage;
