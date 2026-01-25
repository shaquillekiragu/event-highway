import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { postEvent } from "../api";
import CreateEventForm from "../components/CreateEventForm";
import NotAnAdmin from "../components/NotAnAdmin";
import { currentDatetimeForDB } from "../components/FormatDatetime/dbDatetimeFunctions";
import stringToNum from "../utils";

function CreateEvent() {
	const [eventData, setEventData] = useState({
		publisher: "",
		host: "",
		event_name: "",
		event_start: "",
		event_end: "",
		event_description: "",
		createdAt: "",
		category: "",
		is_online: false,
		venue: "",
		venue_address: "",
		is_free: false,
		cost_in_gbp: 0,
		is_limit: false,
		attendee_limit: 0,
		thumbnail: "",
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { authUser } = useAuth();
	const navigate = useNavigate();

	function handleChange(event) {
		const { name, value, type, checked } = event.target;
		setEventData((prevState) => ({
			...prevState,
			[name]: type === "checkbox" ? checked : value,
		}));
	}

	async function handleSubmit(event) {
		try {
			event.preventDefault();
			setIsLoading(true);
			const createdAt = currentDatetimeForDB();

			const response = await postEvent(
				authUser.display_name,
				eventData.host,
				eventData.event_name,
				eventData.event_start,
				eventData.event_end,
				eventData.event_description,
				createdAt,
				eventData.category,
				eventData.is_online,
				eventData.venue,
				eventData.venue_address,
				eventData.is_free,
				stringToNum(eventData.cost_in_gbp),
				eventData.is_limit,
				stringToNum(eventData.attendee_limit),
				eventData.thumbnail
			);

			if (response.status === 201) {
				navigate(`/events/${response.data.event_id}`);
			} else {
				setError("Failed to create event. Please try again.");
			}
		} catch (error) {
			setError("An error occurred while creating the event.");
		} finally {
			setIsLoading(false);
		}
	}

	if (!authUser || !authUser.is_admin) {
		return <NotAnAdmin />;
	}
	return (
		<main className="min-h-screen flex flex-col justify-center items-center py-12 px-8">
			<header className="text-center mb-8">
				<h2 className="text-4xl font-bold text-gray-800 mb-3">
					Create a New Event
				</h2>
				<p className="text-gray-600 text-sm">
					Fill out the form below to create your event
				</p>
			</header>
			<section className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
				<CreateEventForm
					eventData={eventData}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
				/>
			</section>
			<section className="mt-6 min-h-8">
				{error && <p className="text-center text-red-600 font-medium">{error}</p>}
			</section>
		</main>
	);
}

export default CreateEvent;
