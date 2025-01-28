import { Link } from "react-router-dom";
import FormatDatetimeFrontend from "../FormatDatetime/FormatDatetimeFrontend";
import "./EventCard.css";

function EventCard({ event }) {
  const path = `/events/${event.event_id}`;

  return (
    <Link
      className="eventCardLink"
      to={path}
      aria-label={`View details for event: ${event.event_name}`}
    >
      <article className="eventCard">
        <section className="layerOne">
          <p className="host">
            Host: <strong>{event.host}</strong>
          </p>
          <p className="category">
            Category: <strong>{event.category}</strong>
          </p>
        </section>
        <section className="layerTwo">
          <h2 className="title">{event.event_name}</h2>
        </section>
        <section className="layerThree">
          <p className="isOnline">
            <strong>
              {event.is_online
                ? "This event is ONLINE"
                : `VENUE: ${event.venue}`}
            </strong>
          </p>
          <p className="isFree">
            <strong>
              {event.is_free
                ? "This event is FREE"
                : `COST: £${event.cost_in_gbp}`}
            </strong>
          </p>
          <p className="isLimit">
            <strong>
              {event.is_limit
                ? `ATTENDEE LIMIT: ${event.attendee_limit}`
                : "NO ATTENDEE LIMIT"}
            </strong>
          </p>
        </section>
        <section className="layerFour">
          <section className="layerFourA">
            <p className="eventStartLabel">Event Start:</p>
            <p className="eventStart">
              <strong>
                {event.event_start ? (
                  <FormatDatetimeFrontend sqlTimestamp={event.event_start} />
                ) : (
                  "TBD"
                )}
              </strong>
            </p>
          </section>
          <section className="layerFourB">
            <p className="eventEndLabel">Event Finish:</p>
            <p className="eventEnd">
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
