-- Production Schema for Event Highway
-- Use this schema when setting up your production database on Render or other hosting services
-- Note: This schema matches what seed.js creates, including UNIQUE constraints
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    display_name VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    -- Increased size for hashed passwords
    is_admin BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS events (
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
-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_publisher ON events(publisher);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_start ON events(event_start);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_display_name ON users(display_name);