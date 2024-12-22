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
    const {
      publisher,
      host,
      eventName,
      eventStart,
      eventEnd,
      eventDescription,
      createdAt,
      category,
      isOnline,
      venue,
      isFree,
      cost,
      isLimit,
      attendeeLimit,
      thumbnail,
    } = request.params;
    const event = await insertEvent(
      publisher,
      host,
      eventName,
      eventStart,
      eventEnd,
      eventDescription,
      createdAt,
      category,
      isOnline,
      venue,
      isFree,
      cost,
      isLimit,
      attendeeLimit,
      thumbnail
    );
    response.status(201).send({ event });
  } catch (err) {
    next(err);
  }
}

async function patchEvent(request, response, next) {
  try {
    const { eventId } = request.params;
    const { changedProperty, newValue } = request.body;
    const event = await updateEvent(eventId, changedProperty, newValue);
    response.status(200).send({ event });
  } catch (err) {
    next(err);
  }
}

async function deleteEvent(request, response, next) {
  try {
    const { eventId } = request.params;
    const event = await removeEvent(eventId);
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
