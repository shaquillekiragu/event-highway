import { Link } from "react-router-dom";
import FormatDateTime from "../FormatDateTime";
import "./EventCard.css";

function EventCard({ event }) {
  const path = `/events/${event.event_id}`;

  return (
    <Link className="eventCardLink" to={path}>
      <article className="eventCard">
        <div className="layerOne">
          <p className="host">
            <strong>{event.host}</strong>
          </p>
          <p className="category">
            <strong>{event.category}</strong>
          </p>
        </div>
        <div className="layerTwo">
          <h2 className="title">{event.event_name}</h2>
        </div>
        <div className="layerThree">
          <span>
            <p className="isOnline">
              <strong>
                {event.is_online
                  ? "This event is ONLINE"
                  : `VENUE: ${event.venue}`}
              </strong>
            </p>
          </span>
          <span>
            <p className="isFree">
              <strong>
                {event.is_free
                  ? "This event is FREE"
                  : `COST: £${event.cost_in_gbp}`}
              </strong>
            </p>
          </span>
          <span>
            <p className="isLimit">
              <strong>
                {event.is_limit
                  ? `ATTENDEE LIMIT: ${event.attendee_limit}`
                  : "NO ATTENDEE LIMIT"}
              </strong>
            </p>
          </span>
        </div>
        <div className="layerFour">
          <div className="layerFourA">
            <p className="eventStartLabel">Event Start:</p>
            <p className="eventStart">
              <strong>
                {<FormatDateTime sqlTimestamp={event.event_start} />}
              </strong>
            </p>
          </div>
          <div className="layerFourB">
            <p className="eventEndLabel">Event Finish:</p>
            <p className="eventEnd">
              <strong>
                {<FormatDateTime sqlTimestamp={event.event_end} />}
              </strong>
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default EventCard;
