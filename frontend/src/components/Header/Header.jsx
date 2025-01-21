import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/UserContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isTakingLoginAction, setIsTakingLoginAction] = useState(false);

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
        <div className="errorHeaderContainer">
          <h1 className="event">Event</h1>
          <p className="errorMessage">
            LOGIN STATE ERROR. PLEASE REFRESH PAGE...
          </p>
        </div>
        <div className="thickblackBanner highwayContainer">
          <h1 className="highway">Highway</h1>
        </div>
      </header>
    );
  } else if (isTakingLoginAction) {
    return (
      <header>
        <div className="takingActionContainer">
          <Link className="headerTitleLink" to="/">
            <h1 className="event">Event</h1>
          </Link>
        </div>
        <div className="thickBlackBanner highwayContainer">
          <Link className="headerTitleLink" to="/">
            <h1 className="highway">Highway</h1>
          </Link>
        </div>
      </header>
    );
  } else if (isLoggedIn) {
    return (
      <header>
        <div className="loggedInContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="event">Event</h1>
          </Link>
          <Link className="profileButton">My Account</Link>
          <p className="userStatus">
            User logged in: <span>{authUser.display_name}</span>
          </p>
          <button
            className="logoutButton logButton"
            onClick={handleLogoutClick}
          >
            Log Out
          </button>
        </div>
        <div className="thickBlackBanner highwayContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="highway">Highway</h1>
          </Link>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div className="loggedOutContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="event">Event</h1>
          </Link>
          <button className="loginButton logButton" onClick={handleLoginClick}>
            Login
          </button>
        </div>
        <div className="thickBlackBanner highwayContainer">
          <Link className="headerTitleLink" to="/events">
            <h1 className="highway">Highway</h1>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
