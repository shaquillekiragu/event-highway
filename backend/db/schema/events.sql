CREATE TABLE events (
    eventId SERIAL PRIMARY KEY,
    publisher VARCHAR(40) NOT NULL REFERENCES users(displayName),
    host VARCHAR(50) NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    event_start TIMESTAMP NOT NULL,
    event_end TIMESTAMP NOT NULL,
    event_description VARCHAR(250) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    category VARCHAR(25) NOT NULL,
    is_online BOOLEAN NOT NULL,
    venue VARCHAR(50),
    venue_address VARCHAR(100),
    is_free BOOLEAN NOT NULL,
    cost INT,
    is_limit BOOLEAN NOT NULL,
    attendee_limit INT,
    thumbnail VARCHAR(250)
);

INSERT INTO events (publisher, host, event_name, event_start, event_end, event_description, created_at, category, is_online, venue, venue_address, is_free, cost, is_limit, attendee_limit, thumbnail)
VALUES
(),
();