import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../api";
import Loading from "../components/Loading/Loading.jsx";
import "../stylesheets/ViewEvent.css";

function ViewEvent() {
  const { event_id } = useParams();
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEventView() {
      try {
        const response = await getEvent(event_id);
        setEvent(response.data.event);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
    fetchEventView();
  }, [event_id]);

  console.log(event, " <<< event");

  if (isLoading) {
    return (
      <div className="thinBlackBanner">
        <Loading page={"View Event"} />
      </div>
    );
  }
  return (
    <>
      <div className="thinBlackBanner"></div>
      <article>
        <h2>{event.event_name}</h2>
        {/* <img src={event.thumbnail} alt="Event thumbnail" /> */}
        <p>Date posted: {<FormatDateTime sqlTimestamp={event.created_at} />}</p>
        <p>Publisher: {event.publisher}</p>
        <p>Category: {event.category}</p>
        <p>
          Event Start: {<FormatDateTime sqlTimestamp={event.event_start} />}
        </p>
        <p>Event Finish: {<FormatDateTime sqlTimestamp={event.event_end} />}</p>
        <p>Host: {event.host}</p>
        <p>Description: {event.event_description}</p>
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
            ? `Attendee Limit: The attendee limit for this event is ${event.attendee_limit}`
            : "Attendee Limit: There is no attendee limit for this event"}
        </p>
      </article>
    </>
  );
}

export default ViewEvent;
