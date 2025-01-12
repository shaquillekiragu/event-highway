import axios from "axios";

export default function getEvents() {
  return axios.get("https://localhost:9090/api/events");
}

export function getEvent(event_id) {
  return axios.get(`https://localhost:9090/api/events/:${event_id}`);
}

export function getUser(user_id) {
  return axios.get(`https://localhost:9090/api/users/:${user_id}`);
}

export function postEvent() {
  return axios.post("https://localhost:9090/api/events");
}

export function postUser() {
  return axios.post("https://localhost:9090/api/users");
}

export function patchEvent(event_id) {
  return axios.patch(`https://localhost:9090/api/events/:${event_id}`);
}

export function patchUser(user_id) {
  return axios.patch(`https://localhost:9090/api/users/:${user_id}`);
}

export function deleteEvent(event_id) {
  return axios.delete(`https://localhost:9090/api/events/:${event_id}`);
}

modoule.exports = {
  getEvent,
  getUser,
  postEvent,
  postUser,
  patchEvent,
  patchUser,
  deleteEvent,
};
