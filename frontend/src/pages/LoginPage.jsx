import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { getUsers } from "../api.js";
import Loading from "../components/Loading";

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
        // console.log(response.data.users, " <<< r.d.users");
        setUsers(response.data.users);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // console.log(users, " <<< usersList");

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
    <main className="min-h-[75vh] flex justify-center items-center">
      <article className="flex flex-col items-center w-full p-2 sm:p-4 box-border relative -top-[10vh]">
        <header>
          <h2 className="text-xl sm:text-2xl m-0">Login:</h2>
        </header>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-[400px] [&_label]:font-bold [&_input]:p-2 sm:[&_input]:p-3 [&_input]:border [&_input]:border-solid [&_input]:border-[#ccc] [&_input]:rounded [&_input]:text-base [&_input]:w-full [&_button]:self-center [&_button]:w-1/2 [&_button]:p-2 sm:[&_button]:p-3 [&_button]:mt-[2.5vh]"
        >
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
          <button
            type="submit"
            className="h-[6vh] bg-black text-white text-xl hover:cursor-pointer"
          >
            Login
          </button>
        </form>
        <section className="text-center text-sm text-[#666]">
          {invalidEmailMsg ? (
            <span className="text-red-500">
              User not found. Please enter in a valid email address.
            </span>
          ) : (
            <></>
          )}
          {invalidPasswordMsg ? (
            <span className="text-red-500">
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
