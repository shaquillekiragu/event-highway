import "../stylesheets/CreateEvent.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postEvent } from "../api";
import { useAuth } from "../contexts/UserContext";
import CreateEventForm from "../components/CreateEventForm/CreateEventForm";
import Loading from "../components/Loading/Loading";

function CreateEvent() {
  const { authUser } = useAuth();

  const [eventData, setEventData] = useState({});
  // const [publisher, setPublisher] = useState("");
  // const [host, setHost] = useState("");
  // const [event_name, setEventName] = useState("");
  // const [event_start, setEventStart] = useState("");
  // const [event_end, setEventEnd] = useState("");
  // const [event_description, setDescription] = useState("");
  // const [created_at, setCreatedAt] = useState("");
  // const [category, setCategory] = useState("");
  // const [is_online, setIsOnline] = useState(true);
  // const [venue, setVenue] = useState(null);
  // const [venue_address, setAddress] = useState(null);
  // const [is_free, setIsFree] = useState(true);
  // const [cost_in_gbp, setCost] = useState(null);
  // const [is_limit, setIsLimit] = useState(false);
  // const [attendee_limit, setAttendeeLimit] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await postEvent(
        authUser.display_name,
        eventData.host,
        eventData.event_name,
        eventData.event_start,
        eventData.event_end,
        eventData.event_description,
        eventData.created_at,
        eventData.category,
        eventData.is_online,
        eventData.venue,
        eventData.venue_address,
        eventData.is_free,
        eventData.cost_in_gbp,
        eventData.is_limit,
        eventData.attendee_limit
      );

      console.log(response, " <<< response");

      if (response.status === 201) {
        navigate(`/events/${response.data.event_id}`);
      } else {
        setError("Failed to create event. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while creating the event.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!authUser.is_admin) {
    return (
      <main className="notAdmin">
        <h1>Sign in as an event administrator to access this page...</h1>
      </main>
    );
  }
  return (
    <main className="createEventContainer">
      <article className="createEventSubcontainer">
        <header className="createEventLayerOne">
          <h2>Create a New Event</h2>
        </header>
        <section className="createEventLayerTwo">
          <CreateEventForm
            eventData={eventData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </section>
        <section className="createEventLayerThree">
          {error && <p className="errorMessage">{error}</p>}
        </section>
      </article>
    </main>
  );
}

export default CreateEvent;
