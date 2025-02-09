import { createContext, useState, useContext, useEffect } from "react";

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
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("authUser");
      setIsLoggedIn(false);
    }
  }, [authUser]);

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
