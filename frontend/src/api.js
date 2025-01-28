import axios from "axios";

// GET:

export async function getEvents() {
  try {
    const response = await axios.get("http://localhost:9090/api/events");
    console.log(response.data, " <<< response data");
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

export function getEvent(event_id) {
  return axios.get(`http://localhost:9090/api/events/${event_id}`);
}

export function getUsers() {
  return axios.get("http://localhost:9090/api/users");
}

export function getUser(user_id) {
  return axios.get(`http://localhost:9090/api/users/${user_id}`);
}

// POST:

export function postEvent(
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
  return axios.post("http://localhost:9090/api/events", {
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
}

export function postUser(
  first_name,
  last_name,
  display_name,
  email,
  user_password,
  is_admin
) {
  return axios.post("http://localhost:9090/api/users", {
    first_name,
    last_name,
    display_name,
    email,
    user_password,
    is_admin,
  });
}

// PATCH:

export function patchEvent(
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
  return axios.patch(`http://localhost:9090/api/events/${event_id}`, {
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
}

// DELETE:

export function deleteEvent(event_id) {
  if (window.confirm("Are you sure you want to delete this event?")) {
    return axios.delete(`http://localhost:9090/api/events/${event_id}`);
  }
  return null;
}
