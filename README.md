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

## Test accounts for logging in

**Here is a test user account:**
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

**And below is a test administrator account:**
<br>

email:

```
henry.brown@outlook.com
```

password:

```
Henry456
```

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
- PostgreSQL - **v12.x** or later (tested with v14.15 locally, **v17 recommended for production on Render**)
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

**Note:** This command connects to the default `postgres` database to create the new databases. Make sure PostgreSQL is running and you have permission to create databases.

<br>

6. And now seed the databases with this command:

```
npm run seed
```

<br>

Installation is now complete.
<br>
<br>

## Running the Backend Server

To start the backend server, run the following commands:

**Option 1: Set environment variable in the same command:**

```
PGDATABASE=event_highway npm run start
```

**Option 2: Set environment variable separately (persists in current terminal session):**

```
export PGDATABASE=event_highway
npm run start
```

<br>

If you see this message in the console: `Listening on 9090...`, you have successfully started the backend server.

**Note:** Make sure PostgreSQL is running on your system. The server will connect to the `event_highway` database.
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
   <br><br>

You should now be able to view the welcome page for Event Highway! You can proceed to use the website without being logged in, but this will only allow you to view events that are currently listed on the site. To access more features, you'll need to either create an account, or login to an existing account. There are two test account for each account type at the top of the readme file.
<br>
<br>

## Deploying the Database to Render

This guide will walk you through deploying your PostgreSQL database to Render, a managed database hosting service.

### Step 1: Create a Render Account

1. Go to [render.com](https://render.com) and sign up for a free account
2. Verify your email address

### Step 2: Create a PostgreSQL Database

1. In the Render dashboard, click **"New +"** button
2. Select **"PostgreSQL"** from the dropdown
3. Configure your database:
   - **Name**: `event-highway-db` (or any name you prefer)
   - **Database**: Leave as default (will be auto-generated)
   - **User**: Leave as default (will be auto-generated)
   - **Region**: Choose the region closest to your users
   - **PostgreSQL Version**: Select **14** or **15** (recommended)
   - **Plan**: Select **Free** for development (256 MB RAM, 1 GB storage)
4. Click **"Create Database"**

### Step 3: Get Your Connection String

1. Once the database is created, click on it to open the database dashboard
2. Find the **"Connections"** section
3. Copy the **"Internal Database URL"** (if deploying backend to Render) or **"External Connection String"** (if backend is elsewhere)
   - The connection string looks like: `postgresql://user:password@hostname:port/database`
4. **Important**: Save this connection string securely - you won't be able to see the password again!

### Step 4: Set Up Database Schema

You have two options to set up your database schema:

**Option A: Using psql (Recommended for first-time setup)**

1. Install PostgreSQL client tools if you haven't already
2. Connect to your Render database using the external connection string:
   ```bash
   psql "postgresql://user:password@hostname:port/database"
   ```
3. Run the production schema file:

   ```bash
   # From your project root
   psql "your-render-connection-string" -f backend/database/schema-production.sql
   ```

   Or manually copy and paste the contents of `backend/database/schema-production.sql` into psql.

4. Exit psql: `\q`

**Option B: Using a Migration Script**

1. Set the `DATABASE_URL` environment variable:
   ```bash
   export DATABASE_URL="postgresql://user:password@hostname:port/database"
   ```
2. Create a production seed script or modify the existing one to work with `DATABASE_URL`

### Step 5: Seed the Production Database

1. Set your `DATABASE_URL` environment variable:
   ```bash
   export DATABASE_URL="your-render-connection-string"
   ```
2. Run the seed script:
   ```bash
   cd backend
   NODE_ENV=production npm run seed-prod
   ```

**Note**: Make sure your seed script handles the `DATABASE_URL` format correctly. The connection.js file is already configured to use `DATABASE_URL` in production mode.

### Step 6: Configure Your Backend for Production

When deploying your backend (to Render, Heroku, Railway, etc.), set the following environment variable:

- **`DATABASE_URL`**: Your Render database connection string
- **`NODE_ENV`**: Set to `production`

The backend will automatically:

- Use the `DATABASE_URL` for database connections
- Enable SSL (required by Render)
- Use appropriate connection pool settings

### Important Notes

- **Free Tier Limitations**:

  - 256 MB RAM, 1 GB storage
  - Database expires after 90 days of inactivity
  - For production, consider upgrading to a paid plan

- **Security**:

  - Never commit your `DATABASE_URL` to version control
  - Use environment variables in your hosting platform
  - The connection string contains sensitive credentials

- **Backups**:

  - Render provides automatic daily backups on paid plans
  - Free tier doesn't include backups - export your data regularly

- **Connection Limits**:
  - Free tier: Limited concurrent connections
  - Production: Consider connection pooling (already configured in connection.js)

### Troubleshooting

**Connection Issues:**

- Make sure you're using the correct connection string (internal vs external)
- Verify SSL is enabled (already configured in connection.js)
- Check that your IP is allowed (Render allows all IPs by default for external connections)

**Schema Issues:**

- Ensure you've run the schema creation commands
- Verify table names match your code exactly
- Check that foreign key constraints are set up correctly

**Seeding Issues:**

- Make sure `NODE_ENV=production` is set
- Verify `DATABASE_URL` is correctly formatted
- Check that seed data matches your schema constraints
  <br>
  <br>
  I hope you have an incredible experience with Event Highway!
  <br>
