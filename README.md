# Event Highway

## Description

This project serves as a community-driven events platform, Event Highway, designed to allow users to browse and sign up for local events while integrating them seamlessly into their Google Calendar. Built using JavaScript, ReactJS, and Node.js, the platform provides a user-friendly interface for community members to discover events, register attendance, and add events to their calendars via the Google Calendar API. Staff members have additional functionalities such as secure sign-in, event creation, and management, ensuring the platform remains dynamic and flexible. The backend leverages Express.js to serve RESTful API endpoints and uses PostgreSQL as the database solution, with the backend server being run locally.
<br>
<br>

## Link to the Deployed Frontend

Follow this link to access the live site:

https://event-highway.netlify.app/
<br>
<br>

## Tech Stack

**Frontend:**

- HTML & CSS
- Javascript
- ReactJS
- Axios

**Backend:**

- Node.js
- ExpressJS
- PostgreSQL
- Jest
- Supertest
  <br>

## Minimum Versions

You will need to have these versions or newer for the following technologies in order to run this project:

- Node.js - **v20.9.0** or newer
- PostgreSQL - **v20.x** or later
  <br>

## Installation and Backend Setup

**Instructions:**
<br>

1. Clone this repository:

```
https://github.com/shaquillekiragu/event-highway.git
```

2. Once you've opened the repository, at the repository's root create a `.env.test` and `.env.development` file, and declare the variable below in each .env file, assigning the corresponding values to each variable as shown below.
<br>

.env.test:

```
PGDATABASE=event_highway_test
```

.env.development:

```
PGDATABASE=event_highway
```

<br>

3. Now you need to open the change directory into the backend folder. Do this by running the following command:

```
cd backend
```

<br>

4. Now you need to install all of the required dependencies for the backend locally. Run this command:

```
npm install
```

<br>

5. Next, create the test and development databases by running:

```
npm run setup-dbs
```

<br>

6. And now seed the databases with this command:

```
npm run seed
```

<br>

Installation is now complete.
<br>
<br>

## Testing

In order to test the API endpoints on this server, run the following commands:

```
npm run test
```
<br>

If this fails, try running:

```
createdb event_highway_test
```

Then run the first command again.
<br>
<br>

## Running the Database Locally

To set and run the event_highway database, run the two following commands one at a time:

```
export PGDATABASE=event_highway
```
```
npm run start
```

<br>

If you see this message in the console: `PGDATABASE: event_highway Listening on 9090...`, you have successfully set up this project's backend.
<br>
<br>

## Running the Frontend Locally

**Instructions:**

1. Now that the backend has been setup and tested, to open the project UI you'll need to change directory into the frontend directory. Do this by running the following commands:

```
cd ..
cd frontend
```

<br>

2. Now you'll need to install all of the required repository dependencies for the frontend. Run:

```
npm install
```

<br>

3. And lastly, to open the vite app in a browser, run:

```
npm run dev
```

<br>

4. Open the provided localhost URL in your browser.
   <br>

5. You should now be able to view the welcome page for Event Highway! You can proceed to use the website without being logged in, but this will only allow you to view events that are currently listed on the site. To access more features, you'll need to either create an account, or login to an existing account.
   Scroll to the bottom of this README file to access both test account you can use for accessing additional features by logging in, both as a user or as an event admin.
   <br>

## Test accounts for logging in

Here is a test user account:
<br>

email:

```
amelia.walker@gmail.com
```

password:

```
AmeliaPass123
```

<br>

And below is a test administrator account:
<br>

email:

```
henry.brown@outlook.com
```

password:

```
Henry456
```

<br>
I hope you have an incredible experience with Event Highway!
<br>
