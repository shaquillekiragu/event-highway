import "../stylesheets/CreateEvent.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { postEvent } from "../api";
import CreateEventForm from "../components/CreateEventForm/CreateEventForm";
import NotAnAdmin from "../components/NotAnAdmin/NotAnAdmin";
const {
  currentDatetimeForDB,
} = require("../components/FormatDatetime/databaseDatetimeFunctions");

function CreateEvent() {
  const [eventData, setEventData] = useState({});
  const [error, setError] = useState("");

  const { authUser } = useAuth();

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

    const createdAt = currentDatetimeForDB();

    try {
      const response = await postEvent(
        authUser.display_name,
        eventData.host,
        eventData.event_name,
        eventData.event_start,
        eventData.event_end,
        eventData.event_description,
        createdAt,
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
    return <NotAnAdmin />;
  }
  return (
    <main className="createEventContainer">
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
    </main>
  );
}

export default CreateEvent;
