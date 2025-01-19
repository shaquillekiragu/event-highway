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

  // function handleProfileClick() {
  //   navigate("/profile/:user_id");
  // }

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
    return (
      <div className="thinBlackBanner">
        <Loading page={"Events"} />
      </div>
    );
  }
  return (
    <main>
      <div className="thinBlackBanner"></div>
      <br />
      <h1>Events</h1>
      <br />
      {/* <button onClick={handleProfileClick}>Profile Page</button> */}
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
