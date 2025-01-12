import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { getUsers } from "../api.js";
import Loading from "../components/Loading/Loading";
import "../stylesheets/LoginPage.css";

function LoginPage() {
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
        setUsers(response.data.users);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  function handleEmailChange(event) {
    setEmailAddress(event.target.value);
  }

  function handlePasswordChange(event) {
    setUserPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setHasAttemptedLogin(true);
    const isValidEmail = users.some((user) => {
      return user.email === email;
    });
    const attemptedUser = users.filter((user) => {
      return user.email === email;
    });
    if (!isValidEmail) {
      setInvalidEmailMsg(true);
    } else if (attemptedUser.user_password !== user_password) {
      setInvalidPasswordMsg(true);
    } else {
      setAuthUser({ email: email });
      setIsLoggedIn(true);
      setInvalidMsg(false);
      navigate("/events");
    }
  }

  if (isLoading && !hasAttemptedLogin) {
    return <Loading page={"Login page"} />;
  }
  return (
    <>
      <div className="thinRedBanner"></div>
      <p>Welcome to Event Highway!</p>
      <h3>Login:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address: </label>
        <input
          placeholder="Enter your email address..."
          value={email}
          id="email"
          type="text"
          onChange={handleEmailChange}
          required
        />
        <br />
        <label htmlFor="user_password">Password: </label>
        <input
          placeholder="Enter your password..."
          value={user_password}
          id="user_password"
          type="password"
          onChange={handlePasswordChange}
          required
        />
        <br />
        <button type="submit" className="logButton">
          Login
        </button>
      </form>
      {invalidEmailMsg ? (
        <span id="invalidMsg">
          Invalid email. Please enter in a valid email address.
        </span>
      ) : (
        <></>
      )}
      {invalidPasswordMsg ? (
        <span id="invalidMsg">
          Incorrect password. Please enter the correct password.
        </span>
      ) : (
        <></>
      )}
    </>
  );
}

export default LoginPage;
