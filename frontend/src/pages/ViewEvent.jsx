import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent, deleteEvent } from "../api";
import { useAuth } from "../contexts/UserContext.jsx";
import FormatDatetimeFrontend from "../components/FormatDatetime/FormatDatetimeFrontend";
import Loading from "../components/Loading/Loading.jsx";
import "../stylesheets/ViewEvent.css";

function ViewEvent() {
  const { event_id } = useParams();
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { authUser } = useAuth();
  const navigate = useNavigate();

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

  function handleUpdateClick() {
    navigate(`/update-event/${event.event_id}`);
  }

  async function handleDeleteClick() {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(event.event_id);
        alert("Event successfully deleted.");
        navigate("/events");
      } catch (err) {
        console.error("Error deleting event:", err);
        alert("Failed to delete the event. Please try again.");
      }
    }
  }

  if (isLoading) {
    return <Loading page={"View Event"} />;
  }
  return (
    <main className="viewEventContainer">
      <section className="viewLayerOne">
        <h2>{event.event_name}</h2>
        <p>
          Date posted:{" "}
          {<FormatDatetimeFrontend sqlTimestamp={event.created_at} />}
        </p>
        <p>Publisher: {event.publisher}</p>
        <p>Category: {event.category}</p>
        <p>
          Event Start:{" "}
          {<FormatDatetimeFrontend sqlTimestamp={event.event_start} />}
        </p>
        <p>
          Event Finish:{" "}
          {<FormatDatetimeFrontend sqlTimestamp={event.event_end} />}
        </p>
        <p>Host: {event.host}</p>
        <p>Description: {event.event_description}</p>
        <p>
          {event.is_online
            ? "Venue: This event is online"
            : `Venue: The venue for this event is: ${event.venue}, ${event.venue_address}`}
        </p>
        <p>
          {event.is_free
            ? "Price: This event is free"
            : `Price: The price for this event is: ${event.cost_in_gbp}`}
        </p>
        <p>
          {event.is_limit
            ? `Attendee Limit: The attendee limit for this event is: ${event.attendee_limit}`
            : "Attendee Limit: There is no attendee limit for this event"}
        </p>
      </section>
      {authUser.is_admin ? (
        <section className="viewLayerTwo">
          <button onClick={handleUpdateClick}>Update Event</button>
          <button onClick={handleDeleteClick}>Delete Event</button>
        </section>
      ) : (
        <></>
      )}
    </main>
  );
}

export default ViewEvent;
