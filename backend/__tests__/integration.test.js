// REPLACE **** AND inc_votes WITH CORRECTIONS

const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/testData/index.js");
const endpointsList = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("/api/healthcheck", () => {
  test("Checks for a response with the status code of 200", () => {
    return request(app).get("/api/healthcheck").expect(200);
  });
});

describe("/api", () => {
  test("GET 200 - Responds with a JSON object containing a list of available endpoints", async () => {
    const {
      body: { endpoints },
    } = await request(app).get("/api").expect(200);
    expect(endpoints).toEqual(endpointsList);
  });
});

describe("/api/events", () => {
  test("GET 200 - Responds with a list of events", async () => {
    const {
      body: { events },
    } = await request(app).get("/api/events").expect(200);
    // expect(events).toHaveLength(13);
    events.forEach((event) => {
      expect(event).toHaveProperty("eventId");
      expect(event).toHaveProperty("publisher");
      expect(event).toHaveProperty("host");
      expect(event).toHaveProperty("eventName");
      expect(event).toHaveProperty("eventStart");
      expect(event).toHaveProperty("eventEnd");
      expect(event).toHaveProperty("eventDescription");
      expect(event).toHaveProperty("createdAt");
      expect(event).toHaveProperty("category");
      expect(event).toHaveProperty("isOnline");
      expect(event).toHaveProperty("venue");
      expect(event).toHaveProperty("venueAddress");
      expect(event).toHaveProperty("isFree");
      expect(event).toHaveProperty("cost");
      expect(event).toHaveProperty("isLimit");
      expect(event).toHaveProperty("attendeeLimit");
      expect(event).toHaveProperty("thumbnail");
    });
  });
  test("GET 200 - Responds with a list if all events if no query given after query character", async () => {
    const {
      body: { events },
    } = await request(app).get("/api/events?").expect(200);
    // expect(events).toHaveLength(13);
    events.forEach((event) => {
      expect(event).toHaveProperty("eventId");
      expect(event).toHaveProperty("publisher");
      expect(event).toHaveProperty("host");
      expect(event).toHaveProperty("eventName");
      expect(event).toHaveProperty("eventStart");
      expect(event).toHaveProperty("eventEnd");
      expect(event).toHaveProperty("eventDescription");
      expect(event).toHaveProperty("createdAt");
      expect(event).toHaveProperty("category");
      expect(event).toHaveProperty("isOnline");
      expect(event).toHaveProperty("venue");
      expect(event).toHaveProperty("venueAddress");
      expect(event).toHaveProperty("isFree");
      expect(event).toHaveProperty("cost");
      expect(event).toHaveProperty("isLimit");
      expect(event).toHaveProperty("attendeeLimit");
      expect(event).toHaveProperty("thumbnail");
    });
  });
});

describe("/api/events/:eventId", () => {
  test("GET 200 - Responds with a single event by eventId", async () => {
    const {
      body: { event },
    } = await request(app).get("/api/events/1").expect(200);
    expect(event).toHaveProperty("eventId");
    expect(event).toHaveProperty("publisher");
    expect(event).toHaveProperty("host");
    expect(event).toHaveProperty("eventName");
    expect(event).toHaveProperty("eventStart");
    expect(event).toHaveProperty("eventEnd");
    expect(event).toHaveProperty("eventDescription");
    expect(event).toHaveProperty("createdAt");
    expect(event).toHaveProperty("category");
    expect(event).toHaveProperty("isOnline");
    expect(event).toHaveProperty("venue");
    expect(event).toHaveProperty("venueAddress");
    expect(event).toHaveProperty("isFree");
    expect(event).toHaveProperty("cost");
    expect(event).toHaveProperty("isLimit");
    expect(event).toHaveProperty("attendeeLimit");
    expect(event).toHaveProperty("thumbnail");
  });
  test("GET 400 - Invalid id given", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/events/notAnId").expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("GET 404 - Event with that id does not exist", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/events/999").expect(404);
    expect(msg).toBe("Event not found");
  });
  test("PATCH 200 - Responds with an event with correctly updated event property values", async () => {
    const {
      body: { event },
    } = await request(app)
      .patch("/api/events/1")
      .send({
        publisher: "",
        host: "",
        eventName: "",
        eventStart: "",
        eventEnd: "",
        eventDescription: "",
        createdAt: "",
        category: "",
        isOnline: false,
        venue: "",
        venueAddress: "",
        isFree: true,
        cost: NULL,
        isLimit: false,
        attendeeLimit: NULL,
        thumbnail: "",
      })
      .expect(200);
    expect(event).toHaveProperty("eventId");
    expect(event).toHaveProperty("publisher");
    expect(event).toHaveProperty("host");
    expect(event).toHaveProperty("eventName");
    expect(event).toHaveProperty("eventStart");
    expect(event).toHaveProperty("eventEnd");
    expect(event).toHaveProperty("eventDescription");
    expect(event).toHaveProperty("createdAt");
    expect(event).toHaveProperty("category");
    expect(event).toHaveProperty("isOnline");
    expect(event).toHaveProperty("venue");
    expect(event).toHaveProperty("venueAddress");
    expect(event).toHaveProperty("isFree");
    expect(event).toHaveProperty("cost");
    expect(event).toHaveProperty("isLimit");
    expect(event).toHaveProperty("attendeeLimit");
    expect(event).toHaveProperty("thumbnail");
  });
  test("PATCH 400 - Empty event object received", async () => {
    const {
      body: { msg },
    } = await request(app).patch("/api/events/1").send({}).expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("PATCH 400 - Failing schema validation", async () => {
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/events/1")
      .send({
        publisher: "",
        host: "",
        eventName: "",
        eventStart: "",
        eventEnd: "",
        eventDescription: "",
        createdAt: "",
        category: "",
        isOnline: false,
        venue: "",
        venueAddress: "",
        isFree: true,
        cost: NULL,
        isLimit: false,
        attendeeLimit: NULL,
        thumbnail: 65,
      })
      .expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("PATCH 400 - Invalid id given", async () => {
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/events/notAnId")
      .send({
        publisher: "",
        host: "",
        eventName: "",
        eventStart: "",
        eventEnd: "",
        eventDescription: "",
        createdAt: "",
        category: "",
        isOnline: false,
        venue: "",
        venueAddress: "",
        isFree: true,
        cost: NULL,
        isLimit: false,
        attendeeLimit: NULL,
        thumbnail: "",
      })
      .expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("PATCH 404 - Event with that id does not exist", async () => {
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/events/999")
      .send({
        publisher: "",
        host: "",
        eventName: "",
        eventStart: "",
        eventEnd: "",
        eventDescription: "",
        createdAt: "",
        category: "",
        isOnline: false,
        venue: "",
        venueAddress: "",
        isFree: true,
        cost: NULL,
        isLimit: false,
        attendeeLimit: NULL,
        thumbnail: "",
      })
      .expect(404);
    expect(msg).toBe("event not found");
  });
  test("GET 200 - Responds with a single event, this time with a ****, by eventId ", async () => {
    const {
      body: { event },
    } = await request(app).get("/api/events/1").expect(200);
    expect(event).toHaveProperty("eventId");
    expect(event).toHaveProperty("publisher");
    expect(event).toHaveProperty("host");
    expect(event).toHaveProperty("eventName");
    expect(event).toHaveProperty("eventStart");
    expect(event).toHaveProperty("eventEnd");
    expect(event).toHaveProperty("eventDescription");
    expect(event).toHaveProperty("createdAt");
    expect(event).toHaveProperty("category");
    expect(event).toHaveProperty("isOnline");
    expect(event).toHaveProperty("venue");
    expect(event).toHaveProperty("venueAddress");
    expect(event).toHaveProperty("isFree");
    expect(event).toHaveProperty("cost");
    expect(event).toHaveProperty("isLimit");
    expect(event).toHaveProperty("attendeeLimit");
    expect(event).toHaveProperty("thumbnail");
  });
});
