import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { patchEvent } from "../api";
import UpdateEventForm from "../components/UpdateEventForm";
import NotAnAdmin from "../components/NotAnAdmin";
import formatDatetimeForDB from "../components/FormatDatetime/dbDatetimeFunctions";
import stringToNum from "../utils";

function UpdateEvent() {
	const { event_id } = useParams();
	const { state } = useLocation();

	const [eventData, setEventData] = useState(
		state?.eventData || {
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
		}
	);
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

			// console.log(eventData.event_start, " <<< event_start");
			// console.log(eventData.event_end, " <<< event_end");
			// console.log(eventData.created_at, " <<< created_at");

			// const formattedEventStart = formatDatetimeForDB(eventData.event_start);
			// const formattedEventEnd = formatDatetimeForDB(eventData.event_end);
			// const formattedCreatedAt = formatDatetimeForDB(eventData.created_at);

			const response = await patchEvent(
				event_id,
				authUser.display_name,
				eventData.host,
				eventData.event_name,
				eventData.event_start,
				eventData.event_end,
				// formattedEventStart,
				// formattedEventEnd,
				eventData.event_description,
				// formattedCreatedAt,
				eventData.created_at,
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

			if (response.status === 200) {
				navigate(`/events/${event_id}`);
			} else {
				setError("Failed to update event. Please try again.");
			}
		} catch (error) {
			setError("An error occurred while updating the event.");
		} finally {
			setIsLoading(false);
		}
	}

	if (!authUser.is_admin) {
		return <NotAnAdmin />;
	}
	return (
		<main className="min-h-screen flex flex-col justify-center items-center py-12 px-8">
			<header className="text-center mb-8">
				<h2 className="text-4xl font-bold text-gray-800 mb-3">Update Event</h2>
				<p className="text-gray-600 text-sm">Modify the event details below</p>
			</header>
			<section className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
				{isLoading ? (
					<p className="text-center text-blue-600 font-medium">Loading...</p>
				) : (
					<UpdateEventForm
						eventData={eventData}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
					/>
				)}
			</section>
			<section className="mt-6 min-h-8">
				{error && <p className="text-center text-red-600 font-medium">{error}</p>}
			</section>
		</main>
	);
}

export default UpdateEvent;
