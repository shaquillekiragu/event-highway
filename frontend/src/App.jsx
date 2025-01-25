import { Routes, Route } from "react-router-dom";
import UserProvider from "./contexts/UserContext.jsx";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import MyEventsPage from "./pages/MyEventsPage.jsx";
import ViewEvent from "./pages/ViewEvent.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import UpdateEvent from "./pages/UpdateEvent.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/view-event/:event_id" element={<ViewEvent />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/update-event/:event_id" element={<UpdateEvent />} />
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
