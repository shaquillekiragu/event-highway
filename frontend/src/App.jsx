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
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/events" element={<EventsPage />}></Route>
        <Route path="/my-events" element={<MyEventsPage />}></Route>
        <Route path="/view-event/:event_id" element={<ViewEvent />}></Route>
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
