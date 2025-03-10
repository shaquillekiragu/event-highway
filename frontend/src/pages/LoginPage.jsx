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
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { setAuthUser, setIsLoggedIn } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers();
        console.log(response.data.users, " <<< r.d.users");
        setUsers(response.data.users);
      } catch (err) {
        console.error(err);
      } finally {
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

    setInvalidEmailMsg(false);
    setInvalidPasswordMsg(false);

    const attemptedUser = users.find((user) => user.email === email);

    if (!attemptedUser) {
      setInvalidEmailMsg(true);
      return;
    }

    if (attemptedUser.user_password !== user_password) {
      setInvalidPasswordMsg(true);
      return;
    }

    setAuthUser(attemptedUser);
    setIsLoggedIn(true);
    navigate("/events");
  }

  if (isLoading) {
    return <Loading page={"Login"} />;
  }
  return (
    <main className="partPageHeight loginPageContainer">
      <article className="loginContainer">
        <header className="loginLayerOne">
          <h2>Login:</h2>
        </header>
        <form onSubmit={handleSubmit} className="loginLayerTwo">
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
          <button type="submit">Login</button>
        </form>
        <section className="loginLayerThree">
          {invalidEmailMsg ? (
            <span className="invalidMsg">
              User not found. Please enter in a valid email address.
            </span>
          ) : (
            <></>
          )}
          {invalidPasswordMsg ? (
            <span className="invalidMsg">
              Incorrect password. Please enter the correct password.
            </span>
          ) : (
            <></>
          )}
        </section>
      </article>
    </main>
  );
}

export default LoginPage;
