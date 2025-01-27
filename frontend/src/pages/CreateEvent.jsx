import "../stylesheets/CreateEvent.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postEvent } from "../api";
import { useAuth } from "../contexts/UserContext";
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
      <div>
        <p></p>
      </div>
    );
  }
  return (
    <main className="createEventContainer">
      <article className="createEventSubcontainer">
        <header className="createEventLayerOne">
          <h2>Create a New Event</h2>
        </header>
        <form onSubmit={handleSubmit} className="createEventLayerTwo">
          <div className="formGroup">
            <label htmlFor="event_name">Event Name</label>
            <input
              type="text"
              id="event_name"
              name="event_name"
              value={eventData.event_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="host">Host</label>
            <input
              type="text"
              id="host"
              name="host"
              value={eventData.host}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="is_online">Is this event online?</label>
            <input
              type="checkbox"
              id="is_online"
              name="is_online"
              checked={eventData.is_online}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="venue">Venue (If offline event)</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={eventData.venue}
              onChange={handleChange}
              disabled={eventData.is_online}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="is_free">Is this event free?</label>
            <input
              type="checkbox"
              id="is_free"
              name="is_free"
              checked={eventData.is_free}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="cost_in_gbp">Cost (If not free)</label>
            <input
              type="number"
              id="cost_in_gbp"
              name="cost_in_gbp"
              value={eventData.cost_in_gbp}
              onChange={handleChange}
              disabled={eventData.is_free}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="attendee_limit">Attendee Limit</label>
            <input
              type="number"
              id="attendee_limit"
              name="attendee_limit"
              value={eventData.attendee_limit}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="event_start">Event Start Time</label>
            <input
              type="datetime-local"
              id="event_start"
              name="event_start"
              value={eventData.event_start}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="event_end">Event End Time</label>
            <input
              type="datetime-local"
              id="event_end"
              name="event_end"
              value={eventData.event_end}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submitButton">
            Create Event
          </button>
        </form>
        <section className="createEventLayerThree">
          {error && <p className="errorMessage">{error}</p>}
        </section>
      </article>
    </main>
  );
}

export default CreateEvent;
