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
    const { event_id } = request.params;
    const event = await fetchEvent(event_id);
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
    } = request.body;
    console.log(is_free, " <<< is_free");
    const event = await insertEvent(
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
    );
    console.log(event, " <<< event");
    response.status(201).send({ event });
  } catch (err) {
    next(err);
  }
}

async function patchEvent(request, response, next) {
  try {
    const { event_id } = request.params;
    const { changedProperty, newValue } = request.body;
    const event = await updateEvent(event_id, changedProperty, newValue);
    response.status(200).send({ event });
  } catch (err) {
    next(err);
  }
}

async function deleteEvent(request, response, next) {
  try {
    const { event_id } = request.params;
    const event = await removeEvent(event_id);
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
