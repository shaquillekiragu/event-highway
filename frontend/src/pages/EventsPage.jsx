import { useState, useEffect } from "react";
import { useAuth } from "../contexts/UserContext";
import getEvents from "../api.js";
import EventCard from "../components/EventCard/EventCard.jsx";
import Loading from "../components/Loading/Loading.jsx";
import "../stylesheets/EventsPage.css";

function EventsPage() {
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

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
  } else if (isLoggedIn && isAdmin) {
    return (
      <main>
        <br />
        <header className="adminButtonHeader">
          <button onClick={navigate("/events")}>Create Event</button>
          <button onClick={navigate("/events")}>Update Event</button>
          <button onClick={navigate("/events")}>My Events</button>
        </header>
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
  } else if (isLoggedIn) {
    return (
      <main>
        <br />
        <header className="userButtonHeader">
          <button onClick={navigate("/events")}>My Events</button>
        </header>
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
  } else {
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
}

export default EventsPage;
