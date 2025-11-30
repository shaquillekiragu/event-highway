import { Link } from "react-router-dom";
import FormatDatetimeFrontend from "./FormatDatetime/FormatDatetimeFrontend";

function EventCard({ event }) {
  const path = `/events/${event.event_id}`;

  return (
    <Link
      className="w-full h-full no-underline text-black hover:[&_.title]:underline hover:[&_.title]:text-[rgb(50,50,50)]"
      to={path}
      aria-label={`View details for event: ${event.event_name}`}
    >
      <article className="border border-black rounded-[5%] w-full h-full p-[2.5vw] m-0">
        <section className="w-full flex justify-between">
          <p className="[&_strong]:text-blue">
            Host: <strong>{event.host}</strong>
          </p>
          <p className="[&_strong]:text-green">
            Category: <strong>{event.category}</strong>
          </p>
        </section>
        <section className="w-full flex justify-center">
          <h2 className="font-serif title">{event.event_name}</h2>
        </section>
        <section className="w-full flex flex-col items-center my-[5vh]">
          <p className="w-full m-0 flex justify-center">
            <strong>
              {event.is_online
                ? "This event is ONLINE"
                : `VENUE: ${event.venue}`}
            </strong>
          </p>
          <p className="w-full m-0 flex justify-center my-[2vh]">
            <strong>
              {event.is_free
                ? "This event is FREE"
                : `COST: £${event.cost_in_gbp}`}
            </strong>
          </p>
          <p className="w-full m-0 flex justify-center">
            <strong>
              {event.is_limit
                ? `ATTENDEE LIMIT: ${event.attendee_limit}`
                : "NO ATTENDEE LIMIT"}
            </strong>
          </p>
        </section>
        <section className="w-full flex justify-around">
          <section className="flex flex-col items-center">
            <p className="m-0 mb-[0.25vh]">Event Start:</p>
            <p>
              <strong>
                {event.event_start ? (
                  <FormatDatetimeFrontend sqlTimestamp={event.event_start} />
                ) : (
                  "TBD"
                )}
              </strong>
            </p>
          </section>
          <section className="flex flex-col items-center">
            <p className="m-0 mb-[0.25vh]">Event Finish:</p>
            <p>
              <strong>
                {event.event_end ? (
                  <FormatDatetimeFrontend sqlTimestamp={event.event_end} />
                ) : (
                  "TBD"
                )}
              </strong>
            </p>
          </section>
        </section>
      </article>
    </Link>
  );
}

export default EventCard;
