CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    display_name VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    user_password VARCHAR(20) NOT NULL,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    publisher VARCHAR(40) NOT NULL REFERENCES users(display_name),
    host VARCHAR(50) NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    event_start TIMESTAMP NOT NULL,
    event_end TIMESTAMP NOT NULL,
    event_description VARCHAR(250) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    category VARCHAR(25) NOT NULL,
    is_online BOOLEAN NOT NULL,
    venue VARCHAR(100),
    venue_address VARCHAR(100),
    is_free BOOLEAN NOT NULL,
    cost_in_gbp INT,
    is_limit BOOLEAN NOT NULL,
    attendee_limit INT,
    thumbnail VARCHAR(250)
);