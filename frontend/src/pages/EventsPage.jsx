import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import EventCard from "../components/EventCard/EventCard.jsx";
import { getEvents } from "../api.js";
import Loading from "../components/Loading/Loading.jsx";
import "../stylesheets/EventsPage.css";

function EventsPage() {
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { authUser, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  const isAdmin = authUser?.is_admin || false;

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getEvents();
        setEventsList(response.data.events);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, [eventsList]);

  function handleCreateClick() {
    navigate("/create-event");
  }

  function handleMyEventsClick() {
    navigate("/my-events");
  }

  const renderEventList = () => (
    <ul className="gridContainer">
      {eventsList.map((event) => (
        <li key={event.event_id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );

  if (isLoading) {
    return <Loading page={"Events"} />;
  } else if (error) {
    return (
      <main className="pagePageHeight">
        <h1 className="eventsPageTitle">Events</h1>
        <p className="errorText">{error}</p>
      </main>
    );
  } else if (isLoggedIn && isAdmin) {
    return (
      <main className="fullPageHeight">
        <header className="adminButtonHeader">
          <button onClick={handleCreateClick}>Create Event</button>
          <button onClick={handleMyEventsClick}>My Events</button>
        </header>
        <h1 className="eventsPageTitle">Events</h1>
        {renderEventList()}
      </main>
    );
  } else if (isLoggedIn) {
    return (
      <main className="fullPageHeight">
        <header className="userButtonHeader">
          <button onClick={handleMyEventsClick}>My Events</button>
        </header>
        <h1 className="eventsPageTitle">Events</h1>
        {renderEventList()}
      </main>
    );
  } else {
    return (
      <main className="fullPageHeight">
        <h1 className="eventsPageTitle">Events</h1>
        {renderEventList()}
      </main>
    );
  }
}

export default EventsPage;
