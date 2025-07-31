import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function useAuth() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [myEvents, setMyEvents] = useState(() => {
    const savedEvents = localStorage.getItem("myEvents");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("authUser");
      setIsLoggedIn(false);
    }

    if (myEvents.length) {
      localStorage.setItem("myEvents", JSON.stringify(myEvents));
    } else {
      localStorage.removeItem("myEvents");
    }
  }, [authUser, myEvents]);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    myEvents,
    setMyEvents,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
