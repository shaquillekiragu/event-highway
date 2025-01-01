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
  test("POST 201 - Adds an event to the database, given inputted information from the user", async () => {
    const {
      body: { event },
    } = await request(app)
      .post("/api/events")
      .send({
        publisher: "Henry Brown",
        host: "Amelia Events Ltd.",
        eventName: "Digital Future Conference",
        eventStart: "2025-01-15T10:00:00",
        eventEnd: "2025-01-15T16:30:00",
        eventDescription: "A conference.",
        createdAt: "2025-01-01T14:20:00",
        category: "Technology",
        isOnline: false,
        venue: "ExCel London",
        venueAddress:
          "One Western Gateway, Royal Victoria Dock, London E16 1XL",
        isFree: true,
        cost: 0,
        isLimit: true,
        attendeeLimit: 500,
        thumbnail:
          "https://example.com/thumbnails/digital_future_conference.jpg",
      })
      .expect(201);
    expect(event).toHaveProperty("publisher", "Henry Brown");
    expect(event).toHaveProperty("host", "Amelia Events Ltd.");
    expect(event).toHaveProperty("eventName", "Digital Future Conference");
    expect(event).toHaveProperty("eventStart", "2025-01-15T10:00:00");
    expect(event).toHaveProperty("eventEnd", "2025-01-15T16:30:00");
    expect(event).toHaveProperty(
      "eventDescription",
      "A conference exploring the latest trends in digital technology and innovation."
    );
    expect(event).toHaveProperty("createdAt", "2025-01-01T14:20:00");
    expect(event).toHaveProperty("category", "Technology");
    expect(event).toHaveProperty("isOnline", false);
    expect(event).toHaveProperty("venue", "ExCel London");
    expect(event).toHaveProperty(
      "venueAddress",
      "One Western Gateway, Royal Victoria Dock, London E16 1XL"
    );
    expect(event).toHaveProperty("isFree", true);
    expect(event).toHaveProperty("cost", 0);
    expect(event).toHaveProperty("isLimit", true);
    expect(event).toHaveProperty("attendeeLimit", 500);
    expect(event).toHaveProperty(
      "thumbnail",
      "https://example.com/thumbnails/digital_future_conference.jpg"
    );
  });
  test("POST 400 - Empty events object received", async () => {
    const {
      body: { msg },
    } = await request(app).post("/api/events").send({}).expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("POST 400 - Failing schema validation", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/events")
      .send({ publisher: "Harry Davis" })
      .expect(400);
    expect(msg).toBe("Bad Request");
  });
});

describe("/api/users", () => {
  test("POST 201 - Adds a user to the database, given inputted information from the user", async () => {
    const {
      body: { user },
    } = await request(app)
      .post("/api/users")
      .send({
        firstName: "Oleksandr",
        lastName: "Usyk",
        displayName: "Oleksandr Usyk",
        email: "oleks.usyk@gmail.com",
        userPassword: "usyk987",
        isAdmin: false,
      })
      .expect(201);
    expect(user).toHaveProperty("firstName", "Oleksandr");
    expect(user).toHaveProperty("lastName", "Usyk");
    expect(user).toHaveProperty("displayName", "Oleksandr Usyk");
    expect(user).toHaveProperty("email", "oleks.usyk@gmail.com");
    expect(user).toHaveProperty("userPassword", "usyk987");
    expect(user).toHaveProperty("isAdmin", false);
  });
  test("POST 400 - Empty user object received", async () => {
    const {
      body: { msg },
    } = await request(app).post("/api/users").send({}).expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("POST 400 - Failing schema validation", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/users")
      .send({ firstName: "Oleksandr" })
      .expect(400);
    expect(msg).toBe("Bad Request");
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
        publisher: "Sophia Green",
        host: "Tech Innovations Inc.",
        eventName: "AI and the Future of Work",
        eventStart: "2025-02-10T09:00:00",
        eventEnd: "2025-02-10T15:00:00",
        eventDescription:
          "A deep dive into how artificial intelligence is shaping the future of work and automation across industries.",
        createdAt: "2025-01-05T12:30:00",
        category: "AI & Technology",
        isOnline: true,
        venue: null,
        venueAddress: null,
        isFree: false,
        cost: 100,
        isLimit: true,
        attendeeLimit: 200,
        thumbnail: "https://example.com/thumbnails/ai_future_of_work.jpg",
      })
      .expect(200);
    expect(event).toHaveProperty("eventId");
    expect(event).toHaveProperty("publisher", "Sophia Green");
    expect(event).toHaveProperty("host", "Tech Innovations Inc.");
    expect(event).toHaveProperty("eventName", "AI and the Future of Work");
    expect(event).toHaveProperty("eventStart", "2025-02-10T09:00:00");
    expect(event).toHaveProperty("eventEnd", "2025-02-10T15:00:00");
    expect(event).toHaveProperty(
      "eventDescription",
      "A deep dive into how artificial intelligence is shaping the future of work and automation across industries."
    );
    expect(event).toHaveProperty("createdAt", "2025-01-05T12:30:00");
    expect(event).toHaveProperty("category", "AI & Technology");
    expect(event).toHaveProperty("isOnline", true);
    expect(event).toHaveProperty("venue", null);
    expect(event).toHaveProperty("venueAddress", null);
    expect(event).toHaveProperty("isFree", false);
    expect(event).toHaveProperty("cost", 100);
    expect(event).toHaveProperty("isLimit", true);
    expect(event).toHaveProperty("attendeeLimit", 200);
    expect(event).toHaveProperty(
      "thumbnail",
      "https://example.com/thumbnails/ai_future_of_work.jpg"
    );
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
        publisher: "Sophia Green",
        host: "Tech Innovations Inc.",
        eventName: "AI and the Future of Work",
        eventStart: "2025-02-10T09:00:00",
        eventEnd: "2025-02-10T15:00:00",
        eventDescription:
          "A deep dive into how artificial intelligence is shaping the future of work and automation across industries.",
        createdAt: "2025-01-05T12:30:00",
        category: "AI & Technology",
        isOnline: true,
        venue: null,
        venueAddress: null,
        isFree: false,
        cost: 100,
        isLimit: true,
        attendeeLimit: 200,
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
        publisher: "Sophia Green",
        host: "Tech Innovations Inc.",
        eventName: "AI and the Future of Work",
        eventStart: "2025-02-10T09:00:00",
        eventEnd: "2025-02-10T15:00:00",
        eventDescription:
          "A deep dive into how artificial intelligence is shaping the future of work and automation across industries.",
        createdAt: "2025-01-05T12:30:00",
        category: "AI & Technology",
        isOnline: true,
        venue: null,
        venueAddress: null,
        isFree: false,
        cost: 100,
        isLimit: true,
        attendeeLimit: 200,
        thumbnail: "https://example.com/thumbnails/ai_future_of_work.jpg",
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
        publisher: "Sophia Green",
        host: "Tech Innovations Inc.",
        eventName: "AI and the Future of Work",
        eventStart: "2025-02-10T09:00:00",
        eventEnd: "2025-02-10T15:00:00",
        eventDescription:
          "A deep dive into how artificial intelligence is shaping the future of work and automation across industries.",
        createdAt: "2025-01-05T12:30:00",
        category: "AI & Technology",
        isOnline: true,
        venue: null,
        venueAddress: null,
        isFree: false,
        cost: 100,
        isLimit: true,
        attendeeLimit: 200,
        thumbnail: "https://example.com/thumbnails/ai_future_of_work.jpg",
      })
      .expect(404);
    expect(msg).toBe("event not found");
  });
  test("DELETE 204 - Responds with a 204 status code for the deleted event with the given eventId", async () => {
    await request(app).delete("/api/events/1").expect(204);
  });
  test("DELETE 400 - Invalid id given", async () => {
    const {
      body: { msg },
    } = await request(app).delete("/api/events/notAnId").expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("DELETE 404 - Event with that id does not exist", async () => {
    const {
      body: { msg },
    } = await request(app).delete("/api/events/999").expect(404);
    expect(msg).toBe("Event not found");
  });
});

describe("/api/users/:userId", () => {
  test("", () => {});
});
