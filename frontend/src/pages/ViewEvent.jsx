import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent, deleteEvent } from "../api";
import { useAuth } from "../contexts/UserContext.jsx";
import FormatDatetimeFrontend from "../components/FormatDatetime/FormatDatetimeFrontend";
import Loading from "../components/Loading/Loading.jsx";

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
    <main className="min-h-[75vh] flex flex-col justify-center items-center gap-10 my-15 mx-[15%]">
      {isLoggedIn ? (
        <section className="w-full flex justify-end">
          {hasSignedUp === false ? (
            <button onClick={handleEventSignup}>Sign up for this event!</button>
          ) : (
            <button onClick={handleEventRemoval}>
              I'm no longer attending this event...
            </button>
          )}
        </section>
      ) : (
        <></>
      )}

      <section className="flex flex-col gap-3 text-2xl">
        <h1 className="text-center text-3xl mb-15">{eventObj.event_name}</h1>
        <p>
          Date posted:{" "}
          {<FormatDatetimeFrontend sqlTimestamp={eventObj.created_at} />}
        </p>
        <p>Publisher: {eventObj.publisher}</p>
        <p>Category: {eventObj.category}</p>
        <p>
          Event Start:{" "}
          {<FormatDatetimeFrontend sqlTimestamp={eventObj.event_start} />}
        </p>
        <p>
          Event Finish:{" "}
          {<FormatDatetimeFrontend sqlTimestamp={eventObj.event_end} />}
        </p>
        <p>Host: {eventObj.host}</p>
        <p>Description: {eventObj.event_description}</p>
        <p>
          {eventObj.is_online
            ? "Venue: This event is online"
            : `Venue: The venue for this event is: ${eventObj.venue}, ${eventObj.venue_address}`}
        </p>
        <p>
          {eventObj.is_free
            ? "Price: This event is free"
            : `Price: The price for this event is: £${eventObj.cost_in_gbp}`}
        </p>
        <p>
          {eventObj.is_limit
            ? `Attendee Limit: The attendee limit for this event is: ${eventObj.attendee_limit}`
            : "Attendee Limit: There is no attendee limit for this event"}
        </p>
      </section>

      {isLoggedIn && authUser.is_admin ? (
        <section className="w-full flex justify-between mt-6 [&_button]:h-8">
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
