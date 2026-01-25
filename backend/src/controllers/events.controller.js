const {
	fetchEvents,
	fetchEvent,
	insertEvent,
	updateEvent,
	removeEvent,
} = require("../models/events.model");

const { convertPostgresTimestampToUnix } = require("../utils/datetime");

async function getEvents(request, response, next) {
	try {
		const events = await fetchEvents();
		events.forEach((event) => {
			event.event_start = convertPostgresTimestampToUnix(event.event_start);
			event.event_end = convertPostgresTimestampToUnix(event.event_end);
			event.created_at = convertPostgresTimestampToUnix(event.created_at);
		});
		return response.status(200).send({ events });
	} catch (err) {
		next(err);
	}
}

async function getEvent(request, response, next) {
	try {
		const { event_id } = request.params;
		const event = await fetchEvent(event_id);
		event.event_start = convertPostgresTimestampToUnix(event.event_start);
		event.event_end = convertPostgresTimestampToUnix(event.event_end);
		event.created_at = convertPostgresTimestampToUnix(event.created_at);
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
		event.event_start = convertPostgresTimestampToUnix(event.event_start);
		event.event_end = convertPostgresTimestampToUnix(event.event_end);
		event.created_at = convertPostgresTimestampToUnix(event.created_at);
		return response.status(201).send({ event });
	} catch (err) {
		next(err);
	}
}

async function patchEvent(request, response, next) {
	try {
		const { event_id } = request.params;
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
		event.event_start = convertPostgresTimestampToUnix(event.event_start);
		event.event_end = convertPostgresTimestampToUnix(event.event_end);
		event.created_at = convertPostgresTimestampToUnix(event.created_at);
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
