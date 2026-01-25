import axios from "axios";

const API_URL =
	import.meta.env.MODE === "production"
		? "https://event-highway-backend.onrender.com"
		: "http://localhost:9090";

const apiClient = axios.create({
	baseURL: API_URL,
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401 || error.response?.status === 403) {
			localStorage.removeItem("token");
			localStorage.removeItem("authUser");

			if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

// GET:

// Authentication endpoints
export async function loginUser(email, user_password) {
	try {
		const response = await apiClient.post("/api/login", {
			email,
			user_password,
		});
		if (response && response.data) {
			// Store token and user
			if (response.data.token) {
				localStorage.setItem("token", response.data.token);
			}
			if (response.data.user) {
				localStorage.setItem("authUser", JSON.stringify(response.data.user));
			}
			return response;
		} else {
			console.error("No data found in the response.");
			return null;
		}
	} catch (err) {
		console.error("Error logging in:", err.message || err);
		throw err;
	}
}

export async function validateToken() {
	try {
		const response = await apiClient.post("/api/auth/validate");
		return response;
	} catch (err) {
		console.error("Error validating token:", err.message || err);
		throw err;
	}
}

export async function getEvents() {
	try {
		const response = await apiClient.get("/api/events");
		if (response && response.data) {
			return response;
		} else {
			console.error("No data found in the response.");
			return null;
		}
	} catch (err) {
		console.error("Error fetching events:", err.message || err);
		return null;
	}
}

export async function getEvent(event_id) {
	try {
		const response = await apiClient.get(`/api/events/${event_id}`);
		return response;
	} catch (err) {
		console.error("Error fetching event:", err.message || err);
		return null;
	}
}


// POST:

export async function postEvent(
	publisher,
	host,
	event_name,
	event_start,
	event_end,
	event_description,
	created_at,
	category,
	is_online,
	venue,
	venue_address,
	is_free,
	cost_in_gbp,
	is_limit,
	attendee_limit,
	thumbnail
) {
	try {
		const response = await apiClient.post("/api/events", {
			publisher,
			host,
			event_name,
			event_start,
			event_end,
			event_description,
			created_at,
			category,
			is_online,
			venue,
			venue_address,
			is_free,
			cost_in_gbp,
			is_limit,
			attendee_limit,
			thumbnail,
		});
		return response;
	} catch (err) {
		console.error("Error posting event:", err.message || err);
		throw err;
	}
}

export async function postUser(
	first_name,
	last_name,
	display_name,
	email,
	user_password,
	is_admin
) {
	try {
		const response = await apiClient.post("/api/users", {
			first_name,
			last_name,
			display_name,
			email,
			user_password,
			is_admin,
		});
		// Store token and user if signup successful
		if (response && response.data && response.data.token) {
			localStorage.setItem("token", response.data.token);
		}
		if (response && response.data && response.data.user) {
			localStorage.setItem("authUser", JSON.stringify(response.data.user));
		}
		return response;
	} catch (err) {
		console.error("Error posting user:", err.message || err);
		throw err;
	}
}

// PATCH:

export async function patchEvent(
	event_id,
	publisher,
	host,
	event_name,
	event_start,
	event_end,
	event_description,
	created_at,
	category,
	is_online,
	venue,
	venue_address,
	is_free,
	cost_in_gbp,
	is_limit,
	attendee_limit,
	thumbnail
) {
	try {
		const response = await apiClient.patch(`/api/events/${event_id}`, {
			publisher,
			host,
			event_name,
			event_start,
			event_end,
			event_description,
			created_at,
			category,
			is_online,
			venue,
			venue_address,
			is_free,
			cost_in_gbp,
			is_limit,
			attendee_limit,
			thumbnail,
		});
		return response;
	} catch (err) {
		console.error("Error patching event:", err.message || err);
		throw err;
	}
}

// DELETE:

export async function deleteEvent(event_id) {
	try {
		const response = await apiClient.delete(`/api/events/${event_id}`);
		return response;
	} catch (err) {
		console.error("Error deleting event:", err.message || err);
		throw err;
	}
}
