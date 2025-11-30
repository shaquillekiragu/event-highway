import { useState, useEffect } from "react";
import { useAuth } from "../contexts/UserContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

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
        <section className="flex justify-start items-center w-full h-[12vh] min-h-fit gap-[20vw]">
          <h1 className="text-[8vh] m-0 text-black relative left-[3.5vw] my-[3vh] text-center">
            Event
          </h1>
          <p className="m-0 relative text-red">
            LOGIN STATE ERROR. You are logged in whilst taking a login action.
            Please click <Link to="/events">HERE</Link>...
          </p>
        </section>
        <section className="w-screen h-[15vh] relative flex justify-between items-center">
          <h1 className="text-[8vh] m-0 text-white relative left-[4vw] text-center">
            Highway
          </h1>
        </section>
      </header>
    );
  } else if (isTakingLoginAction) {
    return (
      <header>
        <section className="flex justify-start items-center w-full h-[12vh] min-h-fit">
          <Link className="no-underline" to="/">
            <h1 className="text-[8vh] m-0 text-black relative left-[3.5vw] my-[3vh] text-center">
              Event
            </h1>
          </Link>
        </section>
        <section className="w-screen h-[15vh] relative flex justify-between items-center">
          <Link className="no-underline" to="/">
            <h1 className="text-[8vh] m-0 text-white relative left-[4vw] text-center">
              Highway
            </h1>
          </Link>
        </section>
      </header>
    );
  } else if (isLoggedIn) {
    return (
      <header>
        <section className="flex justify-between items-center flex-nowrap w-[95%] mr-[5%]">
          <Link className="no-underline" to="/events">
            <h1 className="text-[8vh] m-0 text-black relative left-[3.5vw] my-[3vh] text-center">
              Event
            </h1>
          </Link>
          <p className="whitespace-nowrap relative m-0 max-[599px]:invisible max-[599px]:right-[5vw] [&_span]:visible [&_span]:text-red">
            User logged in: <span>{authUser.display_name}</span>
          </p>
          <button
            className="h-[6vh] m-0 relative bg-black text-white text-xl hover:cursor-pointer"
            onClick={handleLogoutClick}
          >
            Log Out
          </button>
        </section>
        <section className="w-screen h-[15vh] relative flex justify-between items-center">
          <Link className="no-underline" to="/events">
            <h1 className="text-[8vh] m-0 text-white relative left-[4vw] text-center">
              Highway
            </h1>
          </Link>
        </section>
      </header>
    );
  } else {
    return (
      <header>
        <section className="flex justify-start items-center w-full h-[12vh] min-h-fit max-[599px]:gap-[20vw] min-[600px]:max-[1079px]:gap-[15vw] lg:gap-[8vw]">
          <Link className="no-underline" to="/events">
            <h1 className="text-[8vh] m-0 text-black relative left-[3.5vw] my-[3vh] text-center">
              Event
            </h1>
          </Link>
          <button
            className="h-[6vh] m-0 relative left-[8vw] lg:left-[10vw] bg-black text-white text-xl hover:cursor-pointer"
            onClick={handleLoginClick}
          >
            Welcome Page (Login)
          </button>
        </section>
        <section className="w-screen h-[15vh] relative flex justify-between items-center">
          <Link className="no-underline" to="/events">
            <h1 className="text-[8vh] m-0 text-white relative left-[4vw] text-center">
              Highway
            </h1>
          </Link>
        </section>
      </header>
    );
  }
}

export default Header;
