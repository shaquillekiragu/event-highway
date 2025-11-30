import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { postUser } from "../api";
import SignUpForm from "../components/SignUpForm.jsx";

function SignUpPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [is_admin, setIsAdmin] = useState(false);

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setIsSubmitting(true);
      setErrorMessage(null);

      await postUser(
        first_name,
        last_name,
        display_name,
        email,
        user_password,
        is_admin
      );

      setAuthUser({
        first_name: first_name,
        last_name: last_name,
        display_name: display_name,
        email: email,
        user_password: user_password,
        is_admin: is_admin,
      });

      setIsLoggedIn(true);
      navigate("/events");
    } catch (err) {
      console.error(err, " << postUser error");
    } finally {
      setIsSubmitting(false);
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
    setIsAdmin(event.target.checked);
  }

  return (
    <main className="w-full min-h-[75vh] flex justify-center">
      <article className="w-full flex flex-col justify-center">
        <header className="col-start-2 col-end-3 w-full h-fit flex justify-center mt-10 mb-4">
          <h2>Sign Up:</h2>
        </header>
        <section className="col-start-2 col-end-3 w-full h-fit">
          <SignUpForm
            handleSubmit={handleSubmit}
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            handleDisplayNameChange={handleDisplayNameChange}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleIsAdminChange={handleIsAdminChange}
          />
        </section>
        <section className="flex flex-col justify-center m-10">
          {isSubmitting && (
            <p className="statusMessage">
              <em>Signing you up...</em>
            </p>
          )}
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </section>
      </article>
    </main>
  );
}

export default SignUpPage;
