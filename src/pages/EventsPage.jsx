import { useState, useEffect } from "react";
import getEvents from "../../api";
import EventCard from "../components/EventCard/EventCard.jsx";
import Loading from "../components/Loading/Loading.jsx";

function EventsPage() {
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getEvents();
        setEventsList(response);
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
    <ul>
      {eventsList.map((event) => {
        return (
          <li>
            <EventCard event={event} />
          </li>
        );
      })}
    </ul>
  );
}

export default EventsPage;
