import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { getUsers } from "../api.js";
import Loading from "../components/Loading/Loading";
import "../stylesheets/LoginPage.css";

function LoginPage() {
  const [users, setUsers] = useState([]);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [invalidMsg, setInvalidMsg] = useState(false);
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
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setHasAttemptedLogin(true);
    const isValidUsername = users.some((user) => {
      return user.username === username;
    });
    if (isValidUsername) {
      setAuthUser({ emailAddress: emailAddress });
      setIsLoggedIn(true);
      setInvalidMsg(false);
      navigate("/home");
    } else {
      setInvalidMsg(true);
    }
  }

  if (isLoading && !hasAttemptedLogin) {
    return <Loading page={"Login page"} />;
  }
  return (
    <>
      <p>Welcome to Event Highway!</p>
      <h3>Login:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address: </label>
        <input
          placeholder="Enter your email address..."
          value={emailAddress}
          id="email"
          type="text"
          onChange={handleEmailChange}
          required
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          placeholder="Enter your password..."
          value={password}
          id="password"
          type="password"
          onChange={handlePasswordChange}
          required
        />
        <br />
        <button type="submit" className="logButton">
          Login
        </button>
      </form>
      {invalidMsg ? (
        <span id="invalidMsg">
          Invalid email. Please enter in a valid email address.
        </span>
      ) : (
        <></>
      )}
    </>
  );
}

export default LoginPage;
