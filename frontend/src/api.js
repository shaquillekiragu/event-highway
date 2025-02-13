import axios from "axios";

// GET:

export async function getEvents() {
  try {
    const response = await axios.get("http://localhost:9090/api/events");
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
    const response = await axios.get(
      `http://localhost:9090/api/events/${event_id}`
    );
    return response;
  } catch (err) {
    console.error("Error fetching event:", err.message || err);
    return null;
  }
}

export async function getUsers() {
  try {
    const response = await axios.get("http://localhost:9090/api/users");
    return response;
  } catch (err) {
    console.error("Error fetching users:", err.message || err);
    return null;
  }
}

export async function getUser(user_id) {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/users/${user_id}`
    );
    return response;
  } catch (err) {
    console.error("Error fetching user:", err.message || err);
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
    const response = await axios.post("http://localhost:9090/api/events", {
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
    return null;
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
    const response = await axios.post("http://localhost:9090/api/users", {
      first_name,
      last_name,
      display_name,
      email,
      user_password,
      is_admin,
    });
    return response;
  } catch (err) {
    console.error("Error posting user:", err.message || err);
    return null;
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
    const response = await axios.patch(
      `http://localhost:9090/api/events/${event_id}`,
      {
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
      }
    );
    return response;
  } catch (err) {
    console.error("Error patching event:", err.message || err);
    return null;
  }
}

// DELETE:

export async function deleteEvent(event_id) {
  try {
    const response = await axios.delete(
      `http://localhost:9090/api/events/${event_id}`
    );
    return response;
  } catch (err) {
    console.error("Error deleting event:", err.message || err);
    return null;
  }
}
