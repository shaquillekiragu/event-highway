const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeding/seed.js");
const data = require("../db/data/testData/index.js");
const endpointsList = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe.skip("/api/healthcheck", () => {
  test("Checks for a response with the status code of 200", () => {
    return request(app).get("/api/healthcheck").expect(200);
  });
});

describe.skip("/api", () => {
  test("GET 200 - Responds with a JSON object containing a list of available endpoints", async () => {
    const {
      body: { endpoints },
    } = await request(app).get("/api").expect(200);
    expect(endpoints).toEqual(endpointsList);
  });
});

describe("/api/events", () => {
  test.only("GET 200 - Responds with a list of events", async () => {
    const {
      body: { events },
    } = await request(app).get("/api/events").expect(200);
    events.forEach((event) => {
      expect(event).toHaveProperty("publisher");
      expect(event).toHaveProperty("host");
      expect(event).toHaveProperty("event_name");
      expect(event).toHaveProperty("event_start");
      expect(event).toHaveProperty("event_end");
      expect(event).toHaveProperty("event_description");
      expect(event).toHaveProperty("created_at");
      expect(event).toHaveProperty("category");
      expect(event).toHaveProperty("is_online");
      expect(event).toHaveProperty("venue");
      expect(event).toHaveProperty("venueAddress");
      expect(event).toHaveProperty("is_free");
      expect(event).toHaveProperty("cost");
      expect(event).toHaveProperty("is_limit");
      expect(event).toHaveProperty("attendee_limit");
      expect(event).toHaveProperty("thumbnail");
    });
  });
  test("GET 200 - Responds with a list if all events if no query given after query character", async () => {
    const {
      body: { events },
    } = await request(app).get("/api/events?").expect(200);
    events.forEach((event) => {
      console.log(event, " << event");
      expect(event).toHaveProperty("publisher");
      expect(event).toHaveProperty("host");
      expect(event).toHaveProperty("event_name");
      expect(event).toHaveProperty("event_start");
      expect(event).toHaveProperty("event_end");
      expect(event).toHaveProperty("event_description");
      expect(event).toHaveProperty("created_at");
      expect(event).toHaveProperty("category");
      expect(event).toHaveProperty("is_online");
      expect(event).toHaveProperty("venue");
      expect(event).toHaveProperty("venueAddress");
      expect(event).toHaveProperty("is_free");
      expect(event).toHaveProperty("cost");
      expect(event).toHaveProperty("is_limit");
      expect(event).toHaveProperty("attendee_limit");
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
        event_name: "Digital Future Conference",
        event_start: "2025-01-15T10:00:00",
        event_end: "2025-01-15T16:30:00",
        event_description: "A conference.",
        created_at: "2025-01-01T14:20:00",
        category: "Technology",
        is_online: false,
        venue: "ExCel London",
        venueAddress:
          "One Western Gateway, Royal Victoria Dock, London E16 1XL",
        is_free: true,
        cost: 0,
        is_limit: true,
        attendee_limit: 500,
        thumbnail:
          "https://example.com/thumbnails/digital_future_conference.jpg",
      })
      .expect(201);
    expect(event).toHaveProperty("publisher", "Henry Brown");
    expect(event).toHaveProperty("host", "Amelia Events Ltd.");
    expect(event).toHaveProperty("event_name", "Digital Future Conference");
    expect(event).toHaveProperty("event_start", "2025-01-15T10:00:00");
    expect(event).toHaveProperty("event_end", "2025-01-15T16:30:00");
    expect(event).toHaveProperty(
      "event_description",
      "A conference exploring the latest trends in digital technology and innovation."
    );
    expect(event).toHaveProperty("created_at", "2025-01-01T14:20:00");
    expect(event).toHaveProperty("category", "Technology");
    expect(event).toHaveProperty("is_online", false);
    expect(event).toHaveProperty("venue", "ExCel London");
    expect(event).toHaveProperty(
      "venueAddress",
      "One Western Gateway, Royal Victoria Dock, London E16 1XL"
    );
    expect(event).toHaveProperty("is_free", true);
    expect(event).toHaveProperty("cost", 0);
    expect(event).toHaveProperty("is_limit", true);
    expect(event).toHaveProperty("attendee_limit", 500);
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
    expect(event).toHaveProperty("event_name");
    expect(event).toHaveProperty("event_start");
    expect(event).toHaveProperty("event_end");
    expect(event).toHaveProperty("event_description");
    expect(event).toHaveProperty("created_at");
    expect(event).toHaveProperty("category");
    expect(event).toHaveProperty("is_online");
    expect(event).toHaveProperty("venue");
    expect(event).toHaveProperty("venueAddress");
    expect(event).toHaveProperty("is_free");
    expect(event).toHaveProperty("cost");
    expect(event).toHaveProperty("is_limit");
    expect(event).toHaveProperty("attendee_limit");
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
        event_name: "AI and the Future of Work",
        event_start: "2025-02-10T09:00:00",
        event_end: "2025-02-10T15:00:00",
        event_description:
          "A deep dive into how artificial intelligence is shaping the future of work and automation across industries.",
        created_at: "2025-01-05T12:30:00",
        category: "AI & Technology",
        is_online: true,
        venue: null,
        venueAddress: null,
        is_free: false,
        cost: 100,
        is_limit: true,
        attendee_limit: 200,
        thumbnail: "https://example.com/thumbnails/ai_future_of_work.jpg",
      })
      .expect(200);
    expect(event).toHaveProperty("eventId");
    expect(event).toHaveProperty("publisher", "Sophia Green");
    expect(event).toHaveProperty("host", "Tech Innovations Inc.");
    expect(event).toHaveProperty("event_name", "AI and the Future of Work");
    expect(event).toHaveProperty("event_start", "2025-02-10T09:00:00");
    expect(event).toHaveProperty("event_end", "2025-02-10T15:00:00");
    expect(event).toHaveProperty(
      "event_description",
      "A deep dive into how artificial intelligence is shaping the future of work and automation across industries."
    );
    expect(event).toHaveProperty("created_at", "2025-01-05T12:30:00");
    expect(event).toHaveProperty("category", "AI & Technology");
    expect(event).toHaveProperty("is_online", true);
    expect(event).toHaveProperty("venue", null);
    expect(event).toHaveProperty("venueAddress", null);
    expect(event).toHaveProperty("is_free", false);
    expect(event).toHaveProperty("cost", 100);
    expect(event).toHaveProperty("is_limit", true);
    expect(event).toHaveProperty("attendee_limit", 200);
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
        event_name: "AI and the Future of Work",
        event_start: "2025-02-10T09:00:00",
        event_end: "2025-02-10T15:00:00",
        event_description:
          "A deep dive into how artificial intelligence is shaping the future of work and automation across industries.",
        created_at: "2025-01-05T12:30:00",
        category: "AI & Technology",
        is_online: true,
        venue: null,
        venueAddress: null,
        is_free: false,
        cost: 100,
        is_limit: true,
        attendee_limit: 200,
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
        event_name: "AI and the Future of Work",
        event_start: "2025-02-10T09:00:00",
        event_end: "2025-02-10T15:00:00",
        event_description:
          "A deep dive into how artificial intelligence is shaping the future of work and automation across industries.",
        created_at: "2025-01-05T12:30:00",
        category: "AI & Technology",
        is_online: true,
        venue: null,
        venueAddress: null,
        is_free: false,
        cost: 100,
        is_limit: true,
        attendee_limit: 200,
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
        event_name: "AI and the Future of Work",
        event_start: "2025-02-10T09:00:00",
        event_end: "2025-02-10T15:00:00",
        event_description:
          "A deep dive into how artificial intelligence is shaping the future of work and automation across industries.",
        created_at: "2025-01-05T12:30:00",
        category: "AI & Technology",
        is_online: true,
        venue: null,
        venueAddress: null,
        is_free: false,
        cost: 100,
        is_limit: true,
        attendee_limit: 200,
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
  test("GET 200 - Responds with a single user by userId", async () => {
    const {
      body: { user },
    } = await request(app).get("/api/users/1").expect(200);
    expect(user).toHaveProperty("firstName");
    expect(user).toHaveProperty("lastName");
    expect(user).toHaveProperty("displayName");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("userPassword");
    expect(user).toHaveProperty("isAdmin");
  });
  test("GET 400 - Invalid id given", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/users/notAnId").expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("GET 404 - User with that id does not exist", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/users/999").expect(404);
    expect(msg).toBe("User not found");
  });
  test("PATCH 200 - Responds with a user with correctly updated user property values", async () => {
    const {
      body: { user },
    } = await request(app)
      .patch("/api/users/1")
      .send({
        firstName: "Mia",
        lastName: "Harrison",
        displayName: "Mia Harrison",
        email: "mia.harrison@example.com",
        userPassword: "MiaSecurePass01",
        isAdmin: false,
      })
      .expect(200);
    expect(user).toHaveProperty("firstName", "Mia");
    expect(user).toHaveProperty("lastName", "Harrison");
    expect(user).toHaveProperty("displayName", "Mia Harrison");
    expect(user).toHaveProperty("email", "mia.harrison@gmail.com");
    expect(user).toHaveProperty("userPassword", "MiaSecurePass01");
    expect(user).toHaveProperty("isAdmin", false);
  });
  test("PATCH 400 - Empty user object received", async () => {
    const {
      body: { msg },
    } = await request(app).patch("/api/users/1").send({}).expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("PATCH 400 - Failing schema validation", async () => {
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/users/1")
      .send({
        firstName: "Mia",
        lastName: "Harrison",
        displayName: "Mia Harrison",
        email: "mia.harrison@example.com",
        userPassword: "MiaSecurePass01",
        isAdmin: 56,
      })
      .expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("PATCH 400 - Invalid id given", async () => {
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/users/notAnId")
      .send({
        firstName: "Mia",
        lastName: "Harrison",
        displayName: "Mia Harrison",
        email: "mia.harrison@example.com",
        userPassword: "MiaSecurePass01",
        isAdmin: false,
      })
      .expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("PATCH 404 - User with that id does not exist", async () => {
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/users/999")
      .send({
        firstName: "Mia",
        lastName: "Harrison",
        displayName: "Mia Harrison",
        email: "mia.harrison@example.com",
        userPassword: "MiaSecurePass01",
        isAdmin: false,
      })
      .expect(404);
    expect(msg).toBe("user not found");
  });
});
