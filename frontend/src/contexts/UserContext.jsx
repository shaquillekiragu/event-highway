import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { validateToken } from "../api";

export const UserContext = createContext();

export function useAuth() {
	return useContext(UserContext);
}

export default function UserProvider({ children }) {
	const [authUser, setAuthUser] = useState(() => {
		const savedUser = localStorage.getItem("authUser");
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		const token = localStorage.getItem("token");
		return !!token;
	});

	const [isValidating, setIsValidating] = useState(true);

	const [myEvents, setMyEvents] = useState(() => {
		const savedEvents = localStorage.getItem("myEvents");
		return savedEvents ? JSON.parse(savedEvents) : [];
	});

	function logout() {
		setAuthUser(null);
		setIsLoggedIn(false);
		localStorage.removeItem("authUser");
		localStorage.removeItem("token");
	}

	const logoutCallback = useCallback(logout, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const savedUser = localStorage.getItem("authUser");

		if (token && savedUser) {
			validateToken()
				.then((response) => {
					if (response && response.data && response.data.user) {
						setAuthUser(response.data.user);
					} else {
						logoutCallback();
					}
				})
				.catch(() => {
					logoutCallback();
				})
				.finally(() => {
					setIsValidating(false);
				});
		} else {
			if (!token) {
				logoutCallback();
			}
			setIsValidating(false);
		}
	}, [logoutCallback]);

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
		logout: logoutCallback,
		isValidating,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
