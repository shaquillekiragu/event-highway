import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { getUsers } from "../api.js";
import fetchUserObject from "../utils.js";
import Loading from "../components/Loading/Loading";
import "../stylesheets/LoginPage.css";

function LoginPage() {
  console.log("HELLO");
  const [users, setUsers] = useState([]);
  const [email, setEmailAddress] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [invalidEmailMsg, setInvalidEmailMsg] = useState(false);
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState(false);
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers();
        console.log(response.data.users, " <<< r.d.users");
        setUsers(response.data.users);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  console.log(users, " <<< usersList");

  function handleEmailChange(event) {
    setEmailAddress(event.target.value);
  }

  function handlePasswordChange(event) {
    setUserPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(email, " <<< email");

    if (!hasAttemptedLogin) {
      setHasAttemptedLogin(true);
      setInvalidEmailMsg(false);
      setInvalidPasswordMsg(false);

      const isValidEmail = users.some((user) => {
        return user.email === email;
      });

      const attemptedUser = fetchUserObject(users, email);
      console.log(attemptedUser, " <<< attemptedUser");

      if (!isValidEmail) {
        setInvalidEmailMsg(true);
      } else if (attemptedUser.user_password !== user_password) {
        setInvalidPasswordMsg(true);
      } else {
        setAuthUser({ email: email });
        setIsLoggedIn(true);
        setHasAttemptedLogin(false);
        setInvalidMsg(false);
        navigate("/events");
      }
    } else {
      setHasAttemptedLogin(false);
      navigate("/login");
    }
  }

  if (isLoading && !hasAttemptedLogin) {
    return <Loading page={"Login"} />;
  }
  return (
    <main className="loginContainer">
      <div className="loginLayerOne">
        <p>Welcome to Event Highway!</p>
      </div>
      <div className="loginLayerTwo">
        <h3>Login:</h3>
      </div>
      <form onSubmit={handleSubmit} className="loginLayerThree">
        <label htmlFor="email">Email Address: </label>
        <input
          placeholder="Enter your email address..."
          value={email}
          id="email"
          type="text"
          onChange={handleEmailChange}
          required
        />
        <label htmlFor="user_password">Password: </label>
        <input
          placeholder="Enter your password..."
          value={user_password}
          id="user_password"
          type="password"
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="logButton">
          Login
        </button>
      </form>
      {invalidEmailMsg ? (
        <span id="invalidMsg" className="loginLayerFour">
          Invalid email. Please enter in a valid email address.
        </span>
      ) : (
        <></>
      )}
      {invalidPasswordMsg ? (
        <span id="invalidMsg" className="loginLayerFour">
          Incorrect password. Please enter the correct password.
        </span>
      ) : (
        <></>
      )}
    </main>
  );
}

export default LoginPage;
