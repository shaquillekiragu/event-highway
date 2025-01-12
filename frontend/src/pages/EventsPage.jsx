import { useState, useEffect } from "react";
import getEvents from "../api.js";
import EventCard from "../components/EventCard/EventCard.jsx";
import Loading from "../components/Loading/Loading.jsx";
import "../stylesheets/EventsPage.css";

function EventsPage() {
  console.log("ONE");
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("TWO");

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
      <h1>HELLO</h1>
      <ul>
        {eventsList.map((event) => {
          return <li>{<EventCard event={event} />}</li>;
        })}
      </ul>
    </>
  );
}

export default EventsPage;
