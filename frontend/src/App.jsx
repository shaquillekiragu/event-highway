import { Routes, Route } from "react-router-dom";
import UserProvider from "./contexts/UserContext.jsx";
import "./App.css";
import WelcomePage from "./pages/WelcomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import ViewEvent from "./pages/ViewEvent.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/home" element={<EventsPage />}></Route>
        <Route path="/viewEvent/:event_id" element={<ViewEvent />}></Route>
        <Route path="/profile/:user_id" element={<ProfilePage />}></Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
