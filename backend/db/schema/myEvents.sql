DROP TABLE IF EXISTS myEvents;

CREATE TABLE myEvents (
    eventId SERIAL PRIMARY KEY,
    creatorName VARCHAR(50) NOT NULL,
    eventName VARCHAR(100) NOT NULL,
    eventStart TIMESTAMP NOT NULL,
    eventEnd TIMESTAMP NOT NULL,
    eventDescription VARCHAR(250) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    category VARCHAR(25) NOT NULL,
    isOnline BOOLEAN NOT NULL,
    venue VARCHAR(50),
    isFree BOOLEAN NOT NULL,
    cost INT,
    isLimit BOOLEAN NOT NULL,
    attendeeLimit INT,
    thumbnail VARCHAR(250)
);

INSERT INTO myEvents (author, eventName, eventStart, eventEnd, eventDescription, createdAt, venue, isOnline, attendeeLimit)
VALUES
(),
();