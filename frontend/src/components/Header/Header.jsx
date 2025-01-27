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
    setAuthUser({});
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
          <h1 className="event">Event</h1>
          <p className="errorMessage">
            LOGIN STATE ERROR. PLEASE REFRESH PAGE...
          </p>
        </section>
        <section className="thickblackBanner highwayContainer">
          <h1 className="highway">Highway</h1>
        </section>
      </header>
    );
  } else if (isTakingLoginAction) {
    return (
      <header>
        <section className="takingActionContainer">
          <Link className="headerTitleLink" to="/">
            <h1 className="event">Event</h1>
          </Link>
        </section>
        <section className="thickBlackBanner highwayContainer">
          <Link className="headerTitleLink" to="/">
            <h1 className="highway">Highway</h1>
          </Link>
        </section>
      </header>
    );
  } else if (isLoggedIn) {
    return (
      <header>
        <section className="loggedInContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="event">Event</h1>
          </Link>
          <p className="userStatus">
            User logged in: <span>{authUser.display_name}</span>
          </p>
          <button
            className="logoutButton logButton"
            onClick={handleLogoutClick}
          >
            Log Out
          </button>
        </section>
        <section className="thickBlackBanner highwayContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="highway">Highway</h1>
          </Link>
        </section>
      </header>
    );
  } else {
    return (
      <header>
        <section className="loggedOutContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="event">Event</h1>
          </Link>
          <button className="loginButton logButton" onClick={handleLoginClick}>
            Welcome Page (Login)
          </button>
        </section>
        <section className="thickBlackBanner highwayContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="highway">Highway</h1>
          </Link>
        </section>
      </header>
    );
  }
}

export default Header;
