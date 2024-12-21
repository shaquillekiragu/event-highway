const {
  fetchEvents,
  fetchEvent,
  insertEvent,
  updateEvent,
  removeEvent,
} = require("../models/events.model");

async function getEvents(request, response, next) {
  try {
    const events = await fetchEvents();
    response.status(200).send({ events });
  } catch (err) {
    next(err);
  }
}

async function getEvent(request, response, next) {
  try {
    const { eventId } = request.params;
    const event = await fetchEvent(eventId);
    response.status(200).send({ event });
  } catch (err) {
    next(err);
  }
}

async function postEvent(request, response, next) {
  try {
  } catch (err) {
    next(err);
  }
}

async function patchEvent(request, response, next) {
  try {
  } catch (err) {
    next(err);
  }
}

async function deleteEvent(request, response, next) {
  try {
    const { eventId } = request.params;
    const event = removeEvent(eventId);
    response.status(204).send({ event });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getEvents,
  getEvent,
  postEvent,
  patchEvent,
  deleteEvent,
};
