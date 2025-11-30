import { useAuth } from "../contexts/UserContext";
import EventCard from "../components/EventCard/EventCard";

function MyEventsPage() {
  const { myEvents } = useAuth();

  return (
    <main className="min-h-screen mt-[7.5vh]">
      <section className="w-full">
        <h1 className="text-center text-2xl mb-[7.5vh]">My Events</h1>
      </section>
      {myEvents.length ? (
        <ul className="grid gap-[2vw] p-0 mx-auto mb-[10vh] grid-cols-1 w-[60%] lg:grid-cols-2 lg:w-[80%] xl:grid-cols-3 xl:w-[90%]">
          {myEvents.map((event) => (
            <li key={event.event_id} className="list-none">
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <section className="w-full flex justify-center items-center">
          <h1 className="noEventsMsg text-center">
            You're currently signed up to no events...
          </h1>
        </section>
      )}
    </main>
  );
}

export default MyEventsPage;
