import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getEvents from "../api.js";
import EventCard from "../components/EventCard/EventCard.jsx";
import Loading from "../components/Loading/Loading.jsx";
import "../stylesheets/EventsPage.css";

function EventsPage() {
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  function handleProfileClick() {
    navigate("/profile/:user_id");
  }

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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <h1>Events</h1>
      <button onClick={handleProfileClick}>Profile Page</button>
      <ul>
        {eventsList.map((event) => (
          <li key={event.event_id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
