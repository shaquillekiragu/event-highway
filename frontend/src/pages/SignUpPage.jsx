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
      setAuthUser({ email: email });
      setIsLoggedIn(true);
      console.log(authUser, "authUser");
      console.log(isLoggedIn, "isLoggedIn");
      navigate("/events");
    } catch (err) {
      console.error(err);
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
    setUserPassword(event.target.value);
  }

  if (hasInputtedInfo && (!hasPosted || !isLoggedIn)) {
    return (
      <p>
        <em>Signing you in...</em>
      </p>
    );
  }
  return (
    <>
      <p>Welcome to Event Highway!</p>
      <SignUpForm
        handleSubmit={handleSubmit}
        handleFirstNameChange={handleFirstNameChange}
        handleLastNameChange={handleLastNameChange}
        handleDisplayNameChange={handleDisplayNameChange}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleIsAdminChange={handleIsAdminChange}
      />
    </>
  );
}

export default SignUpPage;
