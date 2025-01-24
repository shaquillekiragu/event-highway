import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { postUser } from "../api";
import SignUpForm from "../components/SignUpForm/SignUpForm.jsx";
import "../stylesheets/SignUpPage.css";

function SignUpPage() {
  const [hasPosted, setHasPosted] = useState(true);
  const [hasInputtedInfo, setHasInputtedInfo] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [is_admin, setIsAdmin] = useState(null);

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setHasInputtedInfo(true);
      setHasPosted(false);

      await postUser(
        first_name,
        last_name,
        display_name,
        email,
        user_password,
        is_admin
      );
      setHasPosted(true);
      setAuthUser({
        first_name: first_name,
        last_name: last_name,
        display_name: display_name,
        email: email,
        user_password: user_password,
        is_admin: is_admin,
      });
      setIsLoggedIn(true);
      console.log(authUser, "authUser");
      console.log(isLoggedIn, "isLoggedIn");
      navigate("/events");
    } catch (err) {
      console.error(err, " << postUser error");
    }
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleDisplayNameChange(event) {
    setDisplayName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setUserPassword(event.target.value);
  }

  function handleIsAdminChange(event) {
    setIsAdmin(event.target.value);
  }

  if (hasInputtedInfo && (!hasPosted || !isLoggedIn)) {
    return (
      <p>
        <em>Signing you in...</em>
      </p>
    );
  }
  return (
    <main className="signupContainer">
      <div className="signupLayerOne">
        <p>Welcome to Event Highway!</p>
      </div>
      <div className="signupLayerTwo">
        <h3>Sign Up:</h3>
      </div>
      <article className="signupLayerThree">
        <SignUpForm
          handleSubmit={handleSubmit}
          handleFirstNameChange={handleFirstNameChange}
          handleLastNameChange={handleLastNameChange}
          handleDisplayNameChange={handleDisplayNameChange}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleIsAdminChange={handleIsAdminChange}
        />
      </article>
    </main>
  );
}

export default SignUpPage;
