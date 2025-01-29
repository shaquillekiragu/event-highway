const request = require("supertest");
const app = require("../app.js");
const db = require("../database/connection.js");
const seed = require("../database/seeding/seed.js");
const data = require("../database/data/testData/index.js");
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
    events.forEach((event) => {
      expect(event).toHaveProperty("event_id");
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
      expect(event).toHaveProperty("venue_address");
      expect(event).toHaveProperty("is_free");
      expect(event).toHaveProperty("cost_in_gbp");
      expect(event).toHaveProperty("is_limit");
      expect(event).toHaveProperty("attendee_limit");
      expect(event).toHaveProperty("thumbnail");
      expect(typeof event.event_id).toBe("number");
      expect(typeof event.publisher).toBe("string");
      expect(typeof event.host).toBe("string");
      expect(typeof event.event_name).toBe("string");
      expect(typeof event.event_start).toBe("string");
      expect(typeof event.event_end).toBe("string");
      expect(typeof event.event_description).toBe("string");
      expect(typeof event.created_at).toBe("string");
      expect(typeof event.category).toBe("string");
      expect(typeof event.is_online).toBe("boolean");
      expect(typeof event.venue).toMatch(/^(string|object)$/);
      expect(typeof event.venue_address).toMatch(/^(string|object)$/);
      expect(typeof event.is_free).toBe("boolean");
      expect(typeof event.cost_in_gbp).toMatch(/^(number|object)$/);
      expect(typeof event.is_limit).toBe("boolean");
      expect(typeof event.attendee_limit).toMatch(/^(number|object)$/);
      expect(typeof event.thumbnail).toMatch(/^(string|object)$/);
    });
  });
  test("GET 200 - Responds with a list if all events if no query given after query character", async () => {
    const {
      body: { events },
    } = await request(app).get("/api/events?").expect(200);
    events.forEach((event) => {
      expect(event).toHaveProperty("event_id");
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
      expect(event).toHaveProperty("venue_address");
      expect(event).toHaveProperty("is_free");
      expect(event).toHaveProperty("cost_in_gbp");
      expect(event).toHaveProperty("is_limit");
      expect(event).toHaveProperty("attendee_limit");
      expect(event).toHaveProperty("thumbnail");
      expect(typeof event.event_id).toBe("number");
      expect(typeof event.publisher).toBe("string");
      expect(typeof event.host).toBe("string");
      expect(typeof event.event_name).toBe("string");
      expect(typeof event.event_start).toBe("string");
      expect(typeof event.event_end).toBe("string");
      expect(typeof event.event_description).toBe("string");
      expect(typeof event.created_at).toBe("string");
      expect(typeof event.category).toBe("string");
      expect(typeof event.is_online).toBe("boolean");
      expect(typeof event.venue).toMatch(/^(string|object)$/);
      expect(typeof event.venue_address).toMatch(/^(string|object)$/);
      expect(typeof event.is_free).toBe("boolean");
      expect(typeof event.cost_in_gbp).toMatch(/^(number|object)$/);
      expect(typeof event.is_limit).toBe("boolean");
      expect(typeof event.attendee_limit).toMatch(/^(number|object)$/);
      expect(typeof event.thumbnail).toMatch(/^(string|object)$/);
    });
  });
  test("POST 201 - Adds an event to the database, given inputted information from the user", async () => {
    const {
      body: { event },
    } = await request(app)
      .post("/api/events")
      .send({
        publisher: "Ye",
        host: "Amelia Events Ltd.",
        event_name: "Digital Future Conference",
        event_start: "2025-01-15T10:00:00",
        event_end: "2025-01-15T16:30:00",
        event_description:
          "A conference exploring the latest trends in digital technology and innovation.",
        created_at: "2025-01-01T14:20:00",
        category: "Technology",
        is_online: false,
        venue: "ExCel London",
        venue_address:
          "One Western Gateway, Royal Victoria Dock, London E16 1XL",
        is_free: true,
        cost_in_gbp: 0,
        is_limit: true,
        attendee_limit: 500,
        thumbnail:
          "https://example.com/thumbnails/digital_future_conference.jpg",
      })
      .expect(201);
    expect(event).toHaveProperty("publisher", "Ye");
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
      "venue_address",
      "One Western Gateway, Royal Victoria Dock, London E16 1XL"
    );
    expect(event).toHaveProperty("is_free", true);
    expect(event).toHaveProperty("cost_in_gbp", 0);
    expect(event).toHaveProperty("is_limit", true);
    expect(event).toHaveProperty("attendee_limit", 500);
    expect(event).toHaveProperty(
      "thumbnail",
      "https://example.com/thumbnails/digital_future_conference.jpg"
    );
  });
  test("POST 400 - Empty events object received", async () => {
    const obj = {};
    const {
      body: { msg },
    } = await request(app).post("/api/events").send(obj).expect(400);
    const objLength = Object.keys(obj).length;
    expect(objLength).toBe(0);
    expect(msg).toBe("Bad Request");
  });
  test("POST 400 - Failing schema validation", async () => {
    const obj = { publisher: "Ye" };
    const {
      body: { msg },
    } = await request(app).post("/api/events").send(obj).expect(400);
    const objLength = Object.keys(obj).length;
    expect(objLength).not.toBe(16);
    expect(msg).toBe("Bad Request");
  });
});

describe("/api/users", () => {
  test("GET 200 - Responds with a list of users", async () => {
    const {
      body: { users },
    } = await request(app).get("/api/users").expect(200);
    users.forEach((user) => {
      expect(user).toHaveProperty("user_id");
      expect(user).toHaveProperty("first_name");
      expect(user).toHaveProperty("last_name");
      expect(user).toHaveProperty("display_name");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("user_password");
      expect(user).toHaveProperty("is_admin");
      expect(typeof user.user_id).toBe("number");
      expect(typeof user.first_name).toBe("string");
      expect(typeof user.last_name).toMatch(/^(string|object)$/);
      expect(typeof user.display_name).toBe("string");
      expect(typeof user.email).toBe("string");
      expect(typeof user.user_password).toBe("string");
      expect(typeof user.is_admin).toBe("boolean");
    });
  });
  test("POST 201 - Adds a user to the database, given inputted information from the user", async () => {
    const {
      body: { user },
    } = await request(app)
      .post("/api/users")
      .send({
        first_name: "Oleksandr",
        last_name: "Usyk",
        display_name: "Oleksandr Usyk",
        email: "oleks.usyk@gmail.com",
        user_password: "usyk987",
        is_admin: false,
      })
      .expect(201);
    expect(user).toHaveProperty("first_name", "Oleksandr");
    expect(user).toHaveProperty("last_name", "Usyk");
    expect(user).toHaveProperty("display_name", "Oleksandr Usyk");
    expect(user).toHaveProperty("email", "oleks.usyk@gmail.com");
    expect(user).toHaveProperty("user_password", "usyk987");
    expect(user).toHaveProperty("is_admin", false);
  });
  test("POST 400 - Empty user object received", async () => {
    const obj = {};
    const {
      body: { msg },
    } = await request(app).post("/api/users").send(obj).expect(400);
    const objLength = Object.keys(obj).length;
    expect(objLength).toBe(0);
    expect(msg).toBe("Bad Request");
  });
  test("POST 400 - Failing schema validation", async () => {
    const obj = { first_name: "Oleksandr" };
    const {
      body: { msg },
    } = await request(app).post("/api/users").send(obj).expect(400);
    const objLength = Object.keys(obj).length;
    expect(objLength).not.toBe(6);
    expect(msg).toBe("Bad Request");
  });
});

describe("/api/events/:event_id", () => {
  test("GET 200 - Responds with a single event by event_id", async () => {
    const {
      body: { event },
    } = await request(app).get("/api/events/1").expect(200);
    expect(event).toHaveProperty("event_id");
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
    expect(event).toHaveProperty("venue_address");
    expect(event).toHaveProperty("is_free");
    expect(event).toHaveProperty("cost_in_gbp");
    expect(event).toHaveProperty("is_limit");
    expect(event).toHaveProperty("attendee_limit");
    expect(event).toHaveProperty("thumbnail");
    expect(typeof event.event_id).toBe("number");
    expect(typeof event.publisher).toBe("string");
    expect(typeof event.host).toBe("string");
    expect(typeof event.event_name).toBe("string");
    expect(typeof event.event_start).toBe("string");
    expect(typeof event.event_end).toBe("string");
    expect(typeof event.event_description).toBe("string");
    expect(typeof event.created_at).toBe("string");
    expect(typeof event.category).toBe("string");
    expect(typeof event.is_online).toBe("boolean");
    expect(typeof event.venue).toMatch(/^(string|object)$/);
    expect(typeof event.venue_address).toMatch(/^(string|object)$/);
    expect(typeof event.is_free).toBe("boolean");
    expect(typeof event.cost_in_gbp).toMatch(/^(number|object)$/);
    expect(typeof event.is_limit).toBe("boolean");
    expect(typeof event.attendee_limit).toMatch(/^(number|object)$/);
    expect(typeof event.thumbnail).toMatch(/^(string|object)$/);
  });
  test("GET 400 - Invalid data type for id given", async () => {
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
        host: "Tech Innovations Inc.",
        event_name: "AI and the Future of Work",
        event_start: "2025-02-10T09:00:00",
        event_end: "2025-02-10T15:00:00",
        event_description:
          "A deep dive into how artificial intelligence is shaping the future of work and automation across industries.",
        category: "AI & Technology",
        is_online: true,
        venue: null,
        venue_address: null,
        is_free: false,
        cost_in_gbp: 100,
        is_limit: true,
        attendee_limit: 200,
        thumbnail: "https://example.com/thumbnails/ai_future_of_work.jpg",
      })
      .expect(200);
    expect(event).toHaveProperty("event_id", 1);
    expect(event).toHaveProperty("publisher", "Barry Bonds");
    expect(event).toHaveProperty("host", "Tech Innovations Inc.");
    expect(event).toHaveProperty("event_name", "AI and the Future of Work");
    expect(event).toHaveProperty("event_start");
    expect(event.event_start).toMatch(/^2025-02-10T09:00:00(\.000Z)?$/);
    expect(event).toHaveProperty("event_end");
    expect(event.event_end).toMatch(/^2025-02-10T15:00:00(\.000Z)?$/);
    expect(event).toHaveProperty(
      "event_description",
      "A deep dive into how artificial intelligence is shaping the future of work and automation across industries."
    );
    expect(event).toHaveProperty("created_at");
    expect(event.created_at).toMatch(/^2024-12-25T09:30:00(\.000Z)?$/);
    expect(event).toHaveProperty("category", "AI & Technology");
    expect(event).toHaveProperty("is_online", true);
    expect(event).toHaveProperty("venue", null);
    expect(event).toHaveProperty("venue_address", null);
    expect(event).toHaveProperty("is_free", false);
    expect(event).toHaveProperty("cost_in_gbp", 100);
    expect(event).toHaveProperty("is_limit", true);
    expect(event).toHaveProperty("attendee_limit", 200);
    expect(event).toHaveProperty(
      "thumbnail",
      "https://example.com/thumbnails/ai_future_of_work.jpg"
    );
  });
  test("PATCH 400 - Empty event object received", async () => {
    const obj = {};
    const {
      body: { msg },
    } = await request(app).patch("/api/events/1").send(obj).expect(400);
    const objLength = Object.keys(obj).length;
    expect(objLength).toBe(0);
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
        venue_address: null,
        is_free: false,
        cost_in_gbp: 100,
        is_limit: true,
        attendee_limit: 200,
        thumbnail: 65,
      })
      .expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("PATCH 400 - Invalid data type for id given", async () => {
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
        venue_address: null,
        is_free: false,
        cost_in_gbp: 100,
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
        venue_address: null,
        is_free: false,
        cost_in_gbp: 100,
        is_limit: true,
        attendee_limit: 200,
        thumbnail: "https://example.com/thumbnails/ai_future_of_work.jpg",
      })
      .expect(404);
    expect(msg).toBe("Event not found");
  });
  test("DELETE 204 - Responds with a 204 status code for the deleted event with the given event_id", async () => {
    await request(app).delete("/api/events/1").expect(204);
  });
  test("DELETE 400 - Invalid data type for id given", async () => {
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

describe("/api/users/:user_id", () => {
  test("GET 200 - Responds with a single user by user_id", async () => {
    const {
      body: { user },
    } = await request(app).get("/api/users/1").expect(200);
    expect(user).toHaveProperty("user_id");
    expect(user).toHaveProperty("first_name");
    expect(user).toHaveProperty("last_name");
    expect(user).toHaveProperty("display_name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("user_password");
    expect(user).toHaveProperty("is_admin");
    expect(typeof user.user_id).toBe("number");
    expect(typeof user.first_name).toBe("string");
    expect(typeof user.last_name).toMatch(/^(string|object)$/);
    expect(typeof user.display_name).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(typeof user.user_password).toBe("string");
    expect(typeof user.is_admin).toBe("boolean");
  });
  test("GET 400 - Invalid data type for id given", async () => {
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
});
