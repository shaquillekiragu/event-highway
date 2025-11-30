import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/UserContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [isTakingLoginAction, setIsTakingLoginAction] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  function handleLogoutClick(event) {
    event.preventDefault();
    setAuthUser(null);
    localStorage.removeItem("authUser");
    setIsLoggedIn(false);
    navigate("/events");
  }

  function handleLoginClick(event) {
    event.preventDefault();
    navigate("/");
  }

  useEffect(() => {
    setIsTakingLoginAction(
      location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
        ? true
        : false
    );
  }, [location.pathname]);

  if (isTakingLoginAction && isLoggedIn) {
    return (
      <header>
        <section className="errorHeaderContainer">
          <h1 className="event text-center">Event</h1>
          <p className="errorMessage">
            LOGIN STATE ERROR. You are logged in whilst taking a login action.
            Please click <Link to="/events">HERE</Link>...
          </p>
        </section>
        <section className="w-screen h-[15vh] relative highwayContainer">
          <h1 className="highway text-center">Highway</h1>
        </section>
      </header>
    );
  } else if (isTakingLoginAction) {
    return (
      <header>
        <section className="takingActionContainer">
          <Link className="headerTitleLink" to="/">
            <h1 className="event text-center">Event</h1>
          </Link>
        </section>
        <section className="w-screen h-[15vh] relative highwayContainer">
          <Link className="headerTitleLink" to="/">
            <h1 className="highway text-center">Highway</h1>
          </Link>
        </section>
      </header>
    );
  } else if (isLoggedIn) {
    return (
      <header>
        <section className="loggedInContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="event text-center">Event</h1>
          </Link>
          <p className="userStatus">
            User logged in: <span>{authUser.display_name}</span>
          </p>
          <button className="logoutButton" onClick={handleLogoutClick}>
            Log Out
          </button>
        </section>
        <section className="w-screen h-[15vh] relative highwayContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="highway text-center">Highway</h1>
          </Link>
        </section>
      </header>
    );
  } else {
    return (
      <header>
        <section className="loggedOutContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="event text-center">Event</h1>
          </Link>
          <button className="loginButton" onClick={handleLoginClick}>
            Welcome Page (Login)
          </button>
        </section>
        <section className="w-screen h-[15vh] relative highwayContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="highway text-center">Highway</h1>
          </Link>
        </section>
      </header>
    );
  }
}

export default Header;
