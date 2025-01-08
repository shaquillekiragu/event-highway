DROP TABLE IF EXISTS myEvents;

CREATE TABLE myEvents (
    event_id SERIAL PRIMARY KEY,
    displayName VARCHAR(50) NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    event_start TIMESTAMP NOT NULL,
    event_end TIMESTAMP NOT NULL,
    event_description VARCHAR(250) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    category VARCHAR(25) NOT NULL,
    is_online BOOLEAN NOT NULL,
    venue VARCHAR(100),
    is_free BOOLEAN NOT NULL,
    cost_in_gbp INT,
    is_limit BOOLEAN NOT NULL,
    attendee_limit INT,
    thumbnail VARCHAR(250)
);

INSERT INTO myEvents (author, event_name, event_start, event_end, event_description, created_at, venue, is_online, attendee_limit)
VALUES
(),
();