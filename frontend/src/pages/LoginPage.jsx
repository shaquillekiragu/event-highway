import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { loginUser } from "../api.js";
import Loading from "../components/Loading";

function LoginPage() {
	const [email, setEmailAddress] = useState("");
	const [user_password, setUserPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { setAuthUser, setIsLoggedIn } = useAuth();

	function handleEmailChange(event) {
		setEmailAddress(event.target.value);
		setErrorMessage("");
	}

	function handlePasswordChange(event) {
		setUserPassword(event.target.value);
		setErrorMessage("");
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setErrorMessage("");
		setIsLoading(true);

		try {
			const response = await loginUser(email, user_password);
			
			if (response && response.data && response.data.user) {
				setAuthUser(response.data.user);
				setIsLoggedIn(true);
				navigate("/events");
			} else {
				setErrorMessage("Login failed. Please try again.");
			}
		} catch (err) {
			if (err.response && err.response.status === 401) {
				setErrorMessage("Invalid email or password. Please try again.");
			} else {
				setErrorMessage("An error occurred. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return <Loading page={"Login"} />;
	}

	return (
		<main className="min-h-[75vh] flex justify-center items-center py-16 px-8">
			<article className="flex flex-col items-center w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-gray-200">
				<header className="mb-8">
					<h2 className="text-3xl font-bold text-gray-800 m-0">Login</h2>
					<p className="text-gray-600 mt-2">
						Welcome back! Please login to your account.
					</p>
				</header>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-5 w-full [&_label]:font-semibold [&_label]:text-gray-700 [&_label]:text-sm [&_input]:p-4 [&_input]:border [&_input]:border-gray-300 [&_input]:rounded-lg [&_input]:text-base [&_input]:w-full [&_input]:focus:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-blue-500 [&_input]:focus:border-transparent [&_input]:transition-all"
				>
					<div>
						<label htmlFor="email">Email Address</label>
						<input
							placeholder="Enter your email address..."
							value={email}
							id="email"
							type="text"
							onChange={handleEmailChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="user_password">Password</label>
						<input
							placeholder="Enter your password..."
							value={user_password}
							id="user_password"
							type="password"
							onChange={handlePasswordChange}
							required
						/>
					</div>
					<button
						type="submit"
						className="h-14 w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-lg rounded-lg hover:from-blue-700 hover:to-teal-700 hover:shadow-lg transition-all duration-200 cursor-pointer mt-2"
					>
						Login
					</button>
				</form>
				<section className="text-center text-sm text-red-600 mt-4 min-h-5">
					{errorMessage && <span className="block">{errorMessage}</span>}
				</section>
			</article>
		</main>
	);
}

export default LoginPage;
