# Event Highway

## Description

This project serves as a community-driven events platform, Event Highway, designed to allow users to browse and sign up for local events while integrating them seamlessly into their Google Calendar. Built using JavaScript, ReactJS, and Node.js, the platform provides a user-friendly interface for community members to discover events, register attendance, and add events to their calendars via the Google Calendar API. Staff members have additional functionalities such as secure sign-in, event creation, and management, ensuring the platform remains dynamic and flexible. The backend leverages Express.js to serve RESTful API endpoints and uses PostgreSQL as the database solution, with the backend server being run locally.

## Minimum Versions

You will need to have these versions or newer for the following technologies in order to run this project:

- Node.js - **v20.9.0** or newer
- PostgreSQL - **v20.x** or later


## Installation and Backend Setup

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

3. Now you need to open the change directory into the backend folder. Do this by running the following command:

```
cd backend
```

4. Now you need to install all of the required dependencies for the backend locally. Run this command:

```
npm install
```

5. Next, create the test and development databases by running:

```
npm run setup-dbs
```

6. And now seed the databases with this command:

```
npm run seed
```

Installation is now complete.


## Testing

In order to test the API endpoints on this server, run the following command:

```
npm run test
```


## Running the Database Locally

To set and run the event_highway database, run the two following commands one at a time:

```
export PGDATABASE=event_highway
npm run start
```

If you see this message in the console: ```PGDATABASE: event_highway Listening on 9090...```, you have successfully set up this project's backend.


## Running the Frontend Locally

**Instructions:**

1. Now that the backend has been setup and tested, to open the project UI you'll need to change directory into the frontend directory. Do this by running the following commands:

```
cd ..
cd frontend
```

2. Now you'll need to install all of the required repository dependencies for the frontend. Run:

```
npm install
```

3. And lastly, to open the vite app in a browser, run:

```
npm run dev
```

4. Open the provided localhost URL in your browser.

5. You should now be able to view the welcome page for Event Highway! You can proceed to use the website without being logged in, but this will only allow you to view events that are currently listed on the site. To access more features, you'll need to either create an account, or login to an existing account.
Scroll to the bottom of this README file to access both test account you can use for accessing additional features by logging in, both as a user or as an event admin.

## Link to the Deployed Frontend

Follow this link to access the live site:

https://event-highway.netlify.app/


## Test accounts for logging in

Here is a test user account:

email:
```
liam.thompson@yahoo.com
```

password:
```
SecurePass123
```

Test event administrator account:

email: ```
```
password: ```
```


I hope you have an incredible experience with Event Highway!
