CREATE TABLE events (
    eventId SERIAL PRIMARY KEY,
    publisher VARCHAR(40) NOT NULL REFERENCES users(displayName),
    host VARCHAR(50) NOT NULL,
    eventName VARCHAR(100) NOT NULL,
    eventStart DATETIME NOT NULL,
    eventEnd DATETIME NOT NULL,
    eventDescription VARCHAR(250) NOT NULL,
    createdAt DATETIME NOT NULL,
    category VARCHAR(25) NOT NULL,
    isOnline BOOLEAN NOT NULL,
    venue VARCHAR(50),
    venueAddress VARCHAR(100),
    isFree BOOLEAN NOT NULL,
    cost INT,
    isLimit BOOLEAN NOT NULL,
    attendeeLimit INT,
    thumbnail VARCHAR(250)
);

INSERT INTO events (publisher, host, eventName, eventStart, eventEnd, eventDescription, createdAt, category, isOnline, venue, venueAddress, isFree, cost, isLimit, attendeeLimit, thumbnail)
VALUES
(),
();