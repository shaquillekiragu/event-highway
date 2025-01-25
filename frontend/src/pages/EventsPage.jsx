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

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getEvents();
        setEventsList(response.data.events);
        console.log(response.data.events, " <<< response.data.events");
        setIsLoading(false);
      } catch (err) {
        console.error(err, " << fetchEvents error");
      }
    }
    fetchEvents();
  }, []);

  console.log(eventsList, " <<< eventsList");

  function handleCreateClick() {
    navigate("/create-event");
  }

  function handleMyEventsClick() {
    navigate("/my-events");
  }

  const isAdmin = authUser?.is_admin || false;

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
  } else if (isLoggedIn && isAdmin) {
    return (
      <main>
        <br />
        <header className="adminButtonHeader">
          <button onClick={handleCreateClick}>Create Event</button>
          <button onClick={handleMyEventsClick}>My Events</button>
        </header>
        <br />
        <h1>Events</h1>
        <br />
        {renderEventList()}
      </main>
    );
  } else if (isLoggedIn) {
    return (
      <main>
        <br />
        <header className="userButtonHeader">
          <button onClick={handleMyEventsClick}>My Events</button>
        </header>
        <br />
        <h1>Events</h1>
        <br />
        {renderEventList()}
      </main>
    );
  } else {
    return (
      <main>
        <br />
        <h1>Events</h1>
        <br />
        {renderEventList()}
      </main>
    );
  }
}

export default EventsPage;
