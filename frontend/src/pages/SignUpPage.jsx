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

	const { setAuthUser, setIsLoggedIn } = useAuth();

	const navigate = useNavigate();

	async function handleSubmit(event) {
		try {
			event.preventDefault();
			setIsSubmitting(true);
			setErrorMessage(null);

			const response = await postUser(
				first_name,
				last_name,
				display_name,
				email,
				user_password,
				is_admin
			);

			if (response && response.data && response.data.user) {
				setAuthUser(response.data.user);
				setIsLoggedIn(true);
				navigate("/events");
			} else {
				setErrorMessage("Sign up failed. Please try again.");
			}
		} catch (err) {
			console.error(err, " << postUser error");
			if (err.response && err.response.status === 409) {
				setErrorMessage("A user with this email already exists.");
			} else if (err.response && err.response.data && err.response.data.msg) {
				setErrorMessage(err.response.data.msg);
			} else {
				setErrorMessage("An error occurred during sign up. Please try again.");
			}
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
		<main className="w-full min-h-[75vh] flex justify-center items-center py-16 px-8">
			<article className="w-full max-w-2xl flex flex-col justify-center bg-white rounded-2xl shadow-2xl p-10 border border-gray-200">
				<header className="w-full h-fit flex justify-center mb-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
						<p className="text-gray-600">
							Join Event Highway and start discovering events
						</p>
					</div>
				</header>
				<section className="w-full h-fit">
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
				<section className="flex flex-col justify-center mt-6 min-h-8">
					{isSubmitting && (
						<p className="text-center text-blue-600 font-medium">
							<em>Signing you up...</em>
						</p>
					)}
					{errorMessage && (
						<p className="text-center text-red-600 font-medium">{errorMessage}</p>
					)}
				</section>
			</article>
		</main>
	);
}

export default SignUpPage;
