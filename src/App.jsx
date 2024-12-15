import { Routes, Route } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import EventsPage from "./pages/EventsPage";
import ViewEvent from "./pages/ViewEvent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route path="/home" element={<EventsPage />}></Route>
      <Route path="/viewEvent/:event_id" element={<ViewEvent />}></Route>
    </Routes>
  );
}

export default App;
