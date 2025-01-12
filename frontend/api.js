import axios from "axios";

export default async function getEvents() {
  try {
    const response = await axios.get("http://localhost:9090/api/events");
    console.log(response.data, " <<< response data");
    return response;
  } catch (err) {
    console.error("Error fetching events:", err.message || err);
  }
}

export function getEvent(event_id) {
  return axios.get(`http://localhost:9090/api/events/:${event_id}`);
}

export function getUser(user_id) {
  return axios.get(`http://localhost:9090/api/users/:${user_id}`);
}

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
  return axios.patch(`http://localhost:9090/api/events/:${event_id}`, {
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

export function patchUser(
  user_id,
  first_name,
  last_name,
  display_name,
  email,
  user_password,
  is_admin
) {
  return axios.patch(`http://localhost:9090/api/users/:${user_id}`, {
    first_name,
    last_name,
    display_name,
    email,
    user_password,
    is_admin,
  });
}

export function deleteEvent(event_id) {
  return axios.delete(`http://localhost:9090/api/events/:${event_id}`);
}
