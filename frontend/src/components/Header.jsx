import { useState, useEffect } from "react";
import { useAuth } from "../contexts/UserContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Header() {
	const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

	const [isTakingLoginAction, setIsTakingLoginAction] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	function handleLogoutClick(event) {
		event.preventDefault();
		setAuthUser(null);
		localStorage.removeItem("authUser");
		setIsLoggedIn(false);
		navigate("/events");
	}

	function handleLoginClick(event) {
		event.preventDefault();
		navigate("/");
	}

	useEffect(() => {
		setIsTakingLoginAction(
			location.pathname === "/" ||
				location.pathname === "/login" ||
				location.pathname === "/signup"
				? true
				: false
		);
	}, [location.pathname]);

	if (isTakingLoginAction && isLoggedIn) {
		return (
			<header className="bg-gradient-to-r from-blue-600 to-teal-600 shadow-lg">
				<section className="flex items-center w-full h-20 min-h-fit gap-20 px-8">
					<h1 className="text-5xl m-0 text-white font-bold tracking-tight">Event</h1>
					<p className="m-0 relative text-red-200 bg-red-500/20 px-4 py-2 rounded-lg border border-red-400">
						LOGIN STATE ERROR. You are logged in whilst taking a login action. Please
						click{" "}
						<Link to="/events" className="underline font-semibold text-white">
							HERE
						</Link>
						...
					</p>
				</section>
				<section className="w-full h-24 bg-gradient-to-r from-blue-700 to-teal-700 relative flex justify-between items-center px-8">
					<h1 className="text-5xl m-0 text-white font-bold tracking-tight">
						Highway
					</h1>
				</section>
			</header>
		);
	} else if (isTakingLoginAction) {
		return (
			<header className="bg-gradient-to-r from-blue-600 to-teal-600 shadow-lg">
				<section className="flex items-center w-full h-20 min-h-fit px-8">
					<Link className="no-underline" to="/">
						<h1 className="text-5xl m-0 text-white font-bold tracking-tight hover:opacity-90 transition-opacity">
							Event
						</h1>
					</Link>
				</section>
				<section className="w-full h-24 bg-gradient-to-r from-blue-700 to-teal-700 relative flex justify-between items-center px-8">
					<Link className="no-underline" to="/">
						<h1 className="text-5xl m-0 text-white font-bold tracking-tight hover:opacity-90 transition-opacity">
							Highway
						</h1>
					</Link>
				</section>
			</header>
		);
	} else if (isLoggedIn) {
		return (
			<header className="bg-gradient-to-r from-blue-600 to-teal-600 shadow-lg">
				<section className="flex justify-between items-center w-full px-8 h-20">
					<Link className="no-underline" to="/events">
						<h1 className="text-5xl m-0 text-white font-bold tracking-tight hover:opacity-90 transition-opacity">
							Event
						</h1>
					</Link>
					<div className="flex items-center gap-6">
						<p className="whitespace-nowrap relative m-0 invisible sm:visible right-[5vw] sm:right-0 text-white [&_span]:visible [&_span]:text-yellow-200 [&_span]:font-semibold">
							User logged in: <span>{authUser.display_name}</span>
						</p>
						<button
							className="h-12 px-6 m-0 relative bg-white text-blue-700 font-semibold text-lg rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
							onClick={handleLogoutClick}
						>
							Log Out
						</button>
					</div>
				</section>
				<section className="w-full h-24 bg-gradient-to-r from-blue-700 to-teal-700 relative flex justify-between items-center px-8">
					<Link className="no-underline" to="/events">
						<h1 className="text-5xl m-0 text-white font-bold tracking-tight hover:opacity-90 transition-opacity">
							Highway
						</h1>
					</Link>
				</section>
			</header>
		);
	} else {
		return (
			<header className="bg-gradient-to-r from-blue-600 to-teal-600 shadow-lg">
				<section className="flex justify-between items-center w-full h-20 min-h-fit gap-[20vw] sm:gap-[15vw] lg:gap-8 px-8">
					<Link className="no-underline" to="/events">
						<h1 className="text-5xl m-0 text-white font-bold tracking-tight hover:opacity-90 transition-opacity">
							Event
						</h1>
					</Link>
					<button
						className="h-12 px-6 m-0 relative bg-white text-blue-700 font-semibold text-lg rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
						onClick={handleLoginClick}
					>
						Welcome Page (Login)
					</button>
				</section>
				<section className="w-full h-24 bg-gradient-to-r from-blue-700 to-teal-700 relative flex justify-between items-center px-8">
					<Link className="no-underline" to="/events">
						<h1 className="text-5xl m-0 text-white font-bold tracking-tight hover:opacity-90 transition-opacity">
							Highway
						</h1>
					</Link>
				</section>
			</header>
		);
	}
}

export default Header;
