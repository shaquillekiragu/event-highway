import { useState, useEffect } from "react";
import getEvents from "../api.js";
import EventCard from "../components/EventCard/EventCard.jsx";
import Loading from "../components/Loading/Loading.jsx";
import "../stylesheets/EventsPage.css";

function EventsPage() {
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getEvents();
        setEventsList(response.data.events);
        console.log(eventsList, " <<< eventsList");
        setIsLoading(false);
      } catch (err) {
        console.error(err, " << error");
      }
    }
    fetchEvents();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <h1>Events</h1>
      <ul>
        {eventsList.map((event) => {
          return <li key={event.event_id}>{<EventCard event={event} />}</li>;
        })}
      </ul>
    </>
  );
}

export default EventsPage;
