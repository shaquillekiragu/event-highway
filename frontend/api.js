import axios from "axios";

export default function getEvents() {
  return axios.get("https://www.eventbriteapi.com/v3/events/event_id");
}

export function getEvent(event_id) {
  return axios.get(`https://www.eventbriteapi.com/v3/events/:${event_id}`);
}
