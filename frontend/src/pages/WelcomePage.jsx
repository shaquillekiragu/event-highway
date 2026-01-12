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
		<main className="min-h-[75vh] flex justify-center items-center gap-16 py-16 px-8">
			{/* <div className="">
        <p className=""></p>
      </div> */}
			<article className="flex flex-col justify-center items-center gap-8 pt-12 pb-16 px-16 bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full h-fit">
				<header className="text-center">
					<h1 className="py-2 mb-4 text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
						Welcome to Event Highway!
					</h1>
					<p className="text-gray-600 text-lg">
						Discover and book amazing events in your area
					</p>
				</header>
				<section className="flex flex-col gap-4 w-full">
					<button
						onClick={handleLoginClick}
						className="w-full h-14 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-lg rounded-lg hover:from-blue-700 hover:to-teal-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
					>
						Login
					</button>
					<button
						onClick={handleSignupClick}
						className="w-full h-14 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-lg rounded-lg hover:from-blue-700 hover:to-teal-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
					>
						Sign Up!
					</button>
				</section>
				<section className="text-center w-full pt-4 border-t border-gray-200">
					<p className="text-gray-600 mb-4">Or</p>
					<button
						onClick={() => {
							navigate("/events");
						}}
						className="w-full h-14 bg-gray-100 text-gray-700 font-semibold text-lg rounded-lg hover:bg-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
					>
						Browse Events
					</button>
				</section>
			</article>
		</main>
	);
}

export default WelcomePage;
