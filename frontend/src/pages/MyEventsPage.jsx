import "../stylesheets/MyEventsPage.css";
import { useAuth } from "../contexts/UserContext";
import EventCard from "../components/EventCard/EventCard";

function MyEventsPage() {
  const { myEvents } = useAuth();

  return (
    <main className="myEventsContainer">
      <section className="myEventsLayerOne">
        <h1>My Events</h1>
      </section>
      {myEvents.length ? (
        <ul className="gridContainer myEventsLayerTwoA">
          {myEvents.map((event) => (
            <li key={event.event_id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <section className="myEventsLayerTwoB">
          <h1 className="noEventsMsg">
            You're currently signed up to no events...
          </h1>
        </section>
      )}
    </main>
  );
}

export default MyEventsPage;
