import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent, deleteEvent } from "../api";
import { useAuth } from "../contexts/UserContext.jsx";
import FormatDatetimeFrontend from "../components/FormatDatetime/FormatDatetimeFrontend";
import Loading from "../components/Loading.jsx";

function ViewEvent() {
	const { event_id } = useParams();
	const [eventObj, seteventObj] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const { authUser, isLoggedIn, myEvents, setMyEvents } = useAuth();
	const navigate = useNavigate();

	const [hasSignedUp, setHasSignedUp] = useState(null);

	useEffect(() => {
		if (myEvents.length === 0) {
			setHasSignedUp(false);
		} else {
			const isSigned = myEvents.some((myEvent) => {
				return myEvent.event_id === eventObj.event_id;
			});
			setHasSignedUp(isSigned);
		}
	}, [myEvents, eventObj.event_id]);

	useEffect(() => {
		async function fetchEventView() {
			try {
				const response = await getEvent(event_id);
				seteventObj(response.data.event);
				setIsLoading(false);
			} catch (err) {
				console.error(err);
				setIsLoading(false);
			}
		}
		fetchEventView();
	}, [event_id]);

	function handleEventSignup(event) {
		event.preventDefault();

		if (hasSignedUp) alert("You've already signed up for this event");

		if (window.confirm("Are you sure you want to sign up for this event?")) {
			setMyEvents((prevEvents) => [...prevEvents, eventObj]);
			alert("You're now signed up for this event!");
			setHasSignedUp(true);
		}
	}

	function handleEventRemoval(event) {
		event.preventDefault();

		if (
			window.confirm(
				"Are you sure you want to remove this event from your My Events list?"
			)
		) {
			if (hasSignedUp === true) {
				const newMyEventsList = myEvents.filter((myEvent) => {
					return myEvent.event_id !== eventObj.event_id;
				});

				setMyEvents(newMyEventsList);
				alert("This event is no longer listed in your My Events list.");
				setHasSignedUp(false);
			} else {
				alert(
					"ERROR: This event is not listed on your My Events list already. Click 'Ok' and refresh the page"
				);
			}
		}
	}

	function handleUpdateClick(event) {
		event.preventDefault();
		navigate(`/update-event/${eventObj.event_id}`, {
			state: { eventObj: eventObj },
		});
	}

	async function handleDeleteClick(event) {
		event.preventDefault();

		const confirmation = window.confirm(
			"Are you sure you want to delete this event?"
		);
		if (!confirmation) {
			return;
		}

		try {
			await deleteEvent(eventObj.event_id);
			alert("Event successfully deleted.");
			navigate("/events");
		} catch (err) {
			console.error("Error deleting event:", err);
			alert("Failed to delete the event. Please try again.");
		}
	}

	if (isLoading) {
		return <Loading page={"View Event"} />;
	}
	return (
		<main className="min-h-[75vh] flex flex-col items-center gap-8 py-12 px-8 max-w-4xl mx-auto">
			{isLoggedIn && (
				<section className="w-full flex justify-end mb-4">
					{hasSignedUp === false ? (
						<button
							onClick={handleEventSignup}
							className="h-12 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg rounded-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
						>
							Sign up for this event!
						</button>
					) : (
						<button
							onClick={handleEventRemoval}
							className="h-12 px-6 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold text-lg rounded-lg hover:from-red-600 hover:to-pink-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
						>
							Cancel Registration
						</button>
					)}
				</section>
			)}

			<article className="w-full bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
				<h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
					{eventObj.event_name}
				</h1>

				<div className="grid grid-cols-2 gap-6 mb-8">
					<div className="bg-gradient-to-br from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-100">
						<p className="text-sm text-gray-600 mb-1">Category</p>
						<p className="text-lg font-semibold text-blue-700">{eventObj.category}</p>
					</div>
					<div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-100">
						<p className="text-sm text-gray-600 mb-1">Host</p>
						<p className="text-lg font-semibold text-teal-700">{eventObj.host}</p>
					</div>
				</div>

				<div className="space-y-4 mb-8">
					<div className="flex gap-3">
						<span className="text-gray-500 font-medium min-w-35">Event Start:</span>
						<span className="text-gray-800 font-semibold">
							{eventObj.event_start ? (
								<FormatDatetimeFrontend sqlTimestamp={eventObj.event_start} />
							) : (
								"TBD"
							)}
						</span>
					</div>
					<div className="flex items-start gap-3">
						<span className="text-gray-500 font-medium min-w-35">Event Finish:</span>
						<span className="text-gray-800 font-semibold">
							{eventObj.event_end ? (
								<FormatDatetimeFrontend sqlTimestamp={eventObj.event_end} />
							) : (
								"TBD"
							)}
						</span>
					</div>
					<div className="flex items-start gap-3">
						<span className="text-gray-500 font-medium min-w-35">Date posted:</span>
						<span className="text-gray-800">
							{<FormatDatetimeFrontend sqlTimestamp={eventObj.created_at} />}
						</span>
					</div>
					<div className="flex items-start gap-3">
						<span className="text-gray-500 font-medium min-w-35">Publisher:</span>
						<span className="text-gray-800">{eventObj.publisher}</span>
					</div>
				</div>

				<div className="bg-gray-50 p-6 rounded-lg mb-8">
					<p className="text-sm text-gray-600 mb-2 font-medium">Description</p>
					<p className="text-gray-800 leading-relaxed">
						{eventObj.event_description}
					</p>
				</div>

				<div className="grid grid-cols-3 gap-4 mb-8">
					<div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
						<p className="text-xs text-gray-600 mb-1">Venue</p>
						<p className="text-sm font-semibold text-blue-700">
							{eventObj.is_online ? "🌐 Online" : eventObj.venue}
						</p>
						{!eventObj.is_online && (
							<p className="text-xs text-gray-600 mt-1">{eventObj.venue_address}</p>
						)}
					</div>
					<div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
						<p className="text-xs text-gray-600 mb-1">Price</p>
						<p className="text-sm font-semibold text-green-700">
							{eventObj.is_free ? "🆓 Free" : `£${eventObj.cost_in_gbp}`}
						</p>
					</div>
					<div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-100">
						<p className="text-xs text-gray-600 mb-1">Attendee Limit</p>
						<p className="text-sm font-semibold text-teal-700">
							{eventObj.is_limit ? eventObj.attendee_limit : "Unlimited"}
						</p>
					</div>
				</div>

				{isLoggedIn && authUser.is_admin && (
					<section className="w-full flex justify-between gap-4 pt-6 border-t border-gray-200">
						<button
							onClick={handleUpdateClick}
							className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-lg rounded-lg hover:from-blue-700 hover:to-teal-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
						>
							Update Event
						</button>
						<button
							onClick={handleDeleteClick}
							className="flex-1 h-12 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold text-lg rounded-lg hover:from-red-600 hover:to-pink-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
						>
							Delete Event
						</button>
					</section>
				)}
			</article>
		</main>
	);
}

export default ViewEvent;
