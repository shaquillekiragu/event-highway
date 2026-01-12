import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import EventCard from "../components/EventCard.jsx";
import { getEvents } from "../api.js";
import Loading from "../components/Loading.jsx";

function EventsPage() {
	const [eventsList, setEventsList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const { authUser, isLoggedIn } = useAuth();

	const navigate = useNavigate();

	const isAdmin = authUser?.is_admin || false;

	useEffect(() => {
		async function fetchEvents() {
			try {
				const response = await getEvents();
				if (response && response.data && response.data.events) {
					setEventsList(response.data.events);
				} else {
					setError("Failed to load events. Please try again later.");
				}
			} catch (err) {
				setError("Failed to load events. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		}
		fetchEvents();
	}, []);

	function handleCreateClick() {
		navigate("/create-event");
	}

	function handleMyEventsClick() {
		navigate("/my-events");
	}

	const renderEventList = () => (
		<ul className="grid gap-6 p-0 mx-auto mb-16 grid-cols-3 w-full max-w-300">
			{eventsList.map((event) => (
				<li key={event.event_id} className="list-none">
					<EventCard event={event} />
				</li>
			))}
		</ul>
	);

	if (isLoading) {
		return <Loading page={"Events"} />;
	} else if (error) {
		return (
			<main className="pagePageHeight">
				<h1 className="my-[10vh] mb-[6vh] text-center">Events</h1>
				<p className="errorText">{error}</p>
			</main>
		);
	} else if (isLoggedIn && isAdmin) {
		return (
			<main className="min-h-screen py-8 px-8">
				<header className="flex justify-end gap-4 mb-8">
					<button
						className="h-12 px-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-lg rounded-lg hover:from-blue-700 hover:to-teal-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
						onClick={handleCreateClick}
					>
						Create Event
					</button>
					<button
						onClick={handleMyEventsClick}
						className="h-12 px-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-lg rounded-lg hover:from-blue-700 hover:to-teal-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
					>
						My Events
					</button>
				</header>
				<h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">
					Discover Events
				</h1>
				{renderEventList()}
			</main>
		);
	} else if (isLoggedIn) {
		return (
			<main className="min-h-screen py-8 px-8">
				<header className="flex justify-end mb-8">
					<button
						onClick={handleMyEventsClick}
						className="h-12 px-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-lg rounded-lg hover:from-blue-700 hover:to-teal-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
					>
						My Events
					</button>
				</header>
				<h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">
					Discover Events
				</h1>
				{renderEventList()}
			</main>
		);
	} else {
		return (
			<main className="min-h-screen py-8 px-8">
				<h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">
					Discover Events
				</h1>
				{renderEventList()}
			</main>
		);
	}
}

export default EventsPage;
