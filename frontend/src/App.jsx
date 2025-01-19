import { Routes, Route } from "react-router-dom";
import UserProvider from "./contexts/UserContext.jsx";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import ViewEvent from "./pages/ViewEvent.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
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
        <Route path="/viewEvent/:event_id" element={<ViewEvent />}></Route>
        {/* <Route path="/profile/:user_id" element={<ProfilePage />}></Route> */}
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
