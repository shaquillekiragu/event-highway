import { Link } from "react-router-dom";
import FormatDateTime from "../FormatDateTime";
import "./EventCard.css";

function EventCard({ event }) {
  const path = `/events/${event.event_id}`;

  return (
    <Link className="eventCardLink" to={path}>
      <article className="eventCard">
        <div className="layerOne">
          <p className="host">Host: {event.host}</p>
          <p className="category">Category: {event.category}</p>
        </div>
        <div className="layerTwo">
          <h3 className="title">{event.event_name}</h3>
        </div>
        <div className="layerThree">
          {/* <img className="thumbnail" src={event.thumbnail} alt="Event thumbnail" /> */}
        </div>
        <div className="layerFour">
          <p className="eventStart">
            Event Start: {<FormatDateTime sqlTimestamp={event.event_start} />}
          </p>
          <p className="eventEnd">
            Event Finish: {<FormatDateTime sqlTimestamp={event.event_end} />}
          </p>
        </div>
        <div className="layerFive">
          <p className="isOnline">
            {event.is_online ? "ONLINE" : `VENUE: ${event.venue}`}
          </p>
          <p className="isFree">
            {event.is_free ? "FREE" : `COST: ${event.cost_in_gbp}`}
          </p>
          <p className="isLimit">
            {event.is_limit
              ? `Attendee Limit: ${event.attendee_limit}`
              : "No attendee limit"}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default EventCard;
