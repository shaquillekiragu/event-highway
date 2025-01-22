import { useState, useEffect } from "react";
import getEvents from "../api.js";
import EventCard from "../components/EventCard/EventCard.jsx";
import Loading from "../components/Loading/Loading.jsx";
import "../stylesheets/EventsPage.css";

function EventsPage() {
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("HELLO");

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
    return <Loading page={"Events"} />;
  }
  return (
    <main>
      <br />
      <h1>Events</h1>
      <br />
      <ul className="gridContainer">
        {eventsList.map((event) => {
          console.log(event, " <<< event");
          return (
            <li key={event.event_id}>
              <EventCard event={event} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default EventsPage;
