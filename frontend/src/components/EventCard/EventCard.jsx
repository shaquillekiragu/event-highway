import FormatDateTime from "../FormatDateTime";
import "./EventCard.css";

function EventCard({ event }) {
  return (
    <article className="eventCard">
      <h2>{event.event_name}</h2>
      <p>Publisher: {event.publisher}</p>
      <p>Host: {event.host}</p>
      <p>Event Start: {<FormatDateTime sqlTimestamp={event.event_start} />}</p>
      <p>Event Finish: {<FormatDateTime sqlTimestamp={event.event_end} />}</p>
      <p>Description: {event.event_description}</p>
      <p>Date posted: {<FormatDateTime sqlTimestamp={event.created_at} />}</p>
      <p>Category: {event.category}</p>
      <p>
        {event.is_online
          ? "Venue: This event is online"
          : `Venue: The venue for this event is ${event.venue} at ${event.venue_address}`}
      </p>
      <p>
        {event.is_free
          ? "Price: This event is free"
          : `Price: The price for this event is ${event.cost_in_gbp}`}
      </p>
      <p>
        {event.is_limit
          ? "Attendee Limit: There is no attendee limit for this event"
          : `Attendee Limit: The attendee limit for this event is ${event.attendee_limit}`}
      </p>
      {/* <img src={event.thumbnail} alt="Event thumbnail" /> */}
    </article>
  );
}

export default EventCard;
