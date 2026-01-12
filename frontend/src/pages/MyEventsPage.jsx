import { useAuth } from "../contexts/UserContext";
import EventCard from "../components/EventCard";

function MyEventsPage() {
	const { myEvents } = useAuth();

	return (
		<main className="min-h-screen py-8 px-8">
			<section className="w-full mb-12">
				<h1 className="text-5xl font-bold text-gray-800 mb-2 text-center">
					My Events
				</h1>
				<p className="text-gray-600 text-center">Events you're registered for</p>
			</section>
			{myEvents.length ? (
				<ul className="grid gap-6 p-0 mx-auto mb-16 grid-cols-3 w-full max-w-300">
					{myEvents.map((event) => (
						<li key={event.event_id} className="list-none">
							<EventCard event={event} />
						</li>
					))}
				</ul>
			) : (
				<section className="w-full flex flex-col justify-center items-center py-20">
					<div className="text-6xl mb-4">📅</div>
					<h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
						No events yet
					</h2>
					<p className="text-gray-500 text-center">
						You're currently signed up to no events...
					</p>
				</section>
			)}
		</main>
	);
}

export default MyEventsPage;
