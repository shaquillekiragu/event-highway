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
    <main className="partPageHeight welcomePageContainer">
      <article className="welcomeContainer">
        <header className="welcomeLayerOne">
          <h1>Welcome to Event Highway!</h1>
        </header>
        <section className="welcomeLayerTwo">
          <button onClick={handleLoginClick} className="!bg-red-300">
            Login
          </button>
          <button onClick={handleSignupClick}>Sign Up!</button>
        </section>
        <section className="welcomeLayerThree">
          <label htmlFor="proceed">Proceed without logging in: </label>
          <button
            onClick={() => {
              navigate("/events");
            }}
          >
            Proceed
          </button>
        </section>
      </article>
    </main>
  );
}

export default WelcomePage;
