import { Link } from "react-router-dom";
import FormatDatetimeFrontend from "./FormatDatetime/FormatDatetimeFrontend";

function EventCard({ event }) {
  const path = `/events/${event.event_id}`;

  return (
    <Link
      className="w-full h-full no-underline block"
      to={path}
      aria-label={`View details for event: ${event.event_name}`}
    >
      <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-full h-full p-6 m-0 border border-gray-200 hover:border-blue-300 hover:-translate-y-1">
        <section className="w-full flex justify-between mb-4">
          <p className="text-sm text-gray-600">
            Host:{" "}
            <strong className="text-blue-600 font-semibold">
              {event.host}
            </strong>
          </p>
          <p className="text-sm text-gray-600">
            Category:{" "}
            <strong className="text-teal-600 font-semibold">
              {event.category}
            </strong>
          </p>
        </section>
        <section className="w-full flex justify-center mb-6">
          <h2 className="font-bold text-xl text-gray-800 title line-clamp-2 text-center">
            {event.event_name}
          </h2>
        </section>
        <section className="w-full flex flex-col items-center my-6 space-y-3">
          <div className="w-full flex justify-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                event.is_online
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {event.is_online ? "🌐 ONLINE" : `📍 ${event.venue}`}
            </span>
          </div>
          <div className="w-full flex justify-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                event.is_free
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {event.is_free ? "🆓 FREE" : `💰 £${event.cost_in_gbp}`}
            </span>
          </div>
          <div className="w-full flex justify-center">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
              {event.is_limit
                ? `👥 Limit: ${event.attendee_limit}`
                : "👥 No Limit"}
            </span>
          </div>
        </section>
        <section className="w-full flex justify-around pt-4 border-t border-gray-200">
          <section className="flex flex-col items-center">
            <p className="m-0 mb-1 text-xs text-gray-500 font-medium">
              Event Start
            </p>
            <p className="text-sm font-semibold text-gray-700">
              {event.event_start ? (
                <FormatDatetimeFrontend sqlTimestamp={event.event_start} />
              ) : (
                "TBD"
              )}
            </p>
          </section>
          <section className="flex flex-col items-center">
            <p className="m-0 mb-1 text-xs text-gray-500 font-medium">
              Event Finish
            </p>
            <p className="text-sm font-semibold text-gray-700">
              {event.event_end ? (
                <FormatDatetimeFrontend sqlTimestamp={event.event_end} />
              ) : (
                "TBD"
              )}
            </p>
          </section>
        </section>
      </article>
    </Link>
  );
}

export default EventCard;
