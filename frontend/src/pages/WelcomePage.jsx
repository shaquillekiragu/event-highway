import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/login");
  }
  function handleSignupClick() {
    navigate("/signup");
  }

  return (
    <main className="min-h-[75vh] flex justify-center mt-20">
      <article className="flex flex-col justify-center gap-5 pt-5 pb-10 px-20 border rounded-lg *:w-full *:h-full *:flex *:justify-center *:items-center">
        <header className="">
          <h1 className="mb-6 text-[32px] text-center">
            Welcome to Event Highway!
          </h1>
        </header>
        <section className="flex-col gap-4">
          <button
            onClick={handleLoginClick}
            className="w-30 h-[6vh] bg-black text-white text-xl hover:cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className="w-30 h-[6vh] bg-black text-white text-xl hover:cursor-pointer"
          >
            Sign Up!
          </button>
        </section>
        <section className="text-xl ml-2">
          <label htmlFor="proceed">Proceed without logging in: </label>
          <button
            onClick={() => {
              navigate("/events");
            }}
            className="w-30 h-[6vh] bg-black text-white text-xl hover:cursor-pointer"
          >
            Proceed
          </button>
        </section>
      </article>
    </main>
  );
}

export default WelcomePage;
