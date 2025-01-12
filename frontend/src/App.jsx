import { Routes, Route } from "react-router-dom";
import UserProvider from "./contexts/UserContext.jsx";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import EventsPage from "./pages/EventsPage";
import ViewEvent from "./pages/ViewEvent";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/home" element={<EventsPage />}></Route>
        <Route path="/viewEvent/:event_id" element={<ViewEvent />}></Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
