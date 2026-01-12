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
				setUsers(response.data.users);
			} catch (err) {
				console.error(err);
			} finally {
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
					{invalidEmailMsg && (
						<span className="block">
							User not found. Please enter a valid email address.
						</span>
					)}
					{invalidPasswordMsg && (
						<span className="block">
							Incorrect password. Please enter the correct password.
						</span>
					)}
				</section>
			</article>
		</main>
	);
}

export default LoginPage;
