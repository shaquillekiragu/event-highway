# Event Highway

## Description

This project serves as a community-driven events platform, Event Highway, designed to allow users to browse and sign up for local events while integrating them seamlessly into their Google Calendar. Built using JavaScript, ReactJS, and Node.js, the platform provides a user-friendly interface for community members to discover events, register attendance, and add events to their calendars via the Google Calendar API. Staff members have additional functionalities such as secure sign-in, event creation, and management, ensuring the platform remains dynamic and flexible. The backend leverages Express.js to serve RESTful API endpoints and uses PostgreSQL as the database solution, with the backend server being run locally.

## Minimum Versions

You will need to have these versions or newer for the following technologies in order to run this project:

- Node.js - **v20.9.0** or newer
- PostgreSQL - **v20.x** or later

## Installation

**Instructions:**

1. Clone this repository:

```
https://github.com/shaquillekiragu/event-highway.git
```

2. Once you've opened the repo, at the repository's root create a `.env.test` and `.env.development` file, and declare the variable below in each .env file, assigning the corresponding values to each variable as shown below.

.env.test:

```
PGDATABASE=event_highway_test
```

.env.development:

```
PGDATABASE=event_highway
```

3. To install all of the required dependencies for this repo locally, run this command:

```
npm install
```

4. Next, create the test and development databases by running:

```
npm run setup-dbs
```

5. And now seed the databases with this command:

```
npm run seed
```

Installation is now complete.

## Testing

In order to test the API endpoints on this server, run the following command:

```
npm run test
```

This command will run the integration tests for the api endpoints, as well as the utilities tests for the seeding functions.
