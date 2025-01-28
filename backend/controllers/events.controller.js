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
    return response.status(200).send({ events });
  } catch (err) {
    next(err);
  }
}

async function getEvent(request, response, next) {
  try {
    const { event_id } = request.params;
    const event = await fetchEvent(event_id);
    return response.status(200).send({ event });
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
    const formatDate = (date) => new Date(date).toISOString().slice(0, 19);
    event.event_start = formatDate(event.event_start);
    event.event_end = formatDate(event.event_end);
    event.created_at = formatDate(event.created_at);
    return response.status(201).send({ event });
  } catch (err) {
    next(err);
  }
}

// async function validatePublisher(publisher) {
//   const { rows } = await db.query(
//     `SELECT * FROM users WHERE display_name = $1;`,
//     [publisher]
//   );
//   if (!rows.length) {
//     throw {
//       status: 400,
//       msg: `Invalid publisher: ${publisher} does not exist.`,
//     };
//   }
// }

async function patchEvent(request, response, next) {
  try {
    const { event_id } = request.params;
    console.log(event_id, " <<< event_id patchEvent controller");
    const {
      host,
      event_name,
      event_start,
      event_end,
      event_description,
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

    const event = await updateEvent(
      event_id,
      host,
      event_name,
      event_start,
      event_end,
      event_description,
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
    return response.status(200).send({ event });
  } catch (err) {
    next(err);
  }
}

async function deleteEvent(request, response, next) {
  try {
    const { event_id } = request.params;
    const event = await removeEvent(event_id);
    return response.status(204).send({ event });
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
