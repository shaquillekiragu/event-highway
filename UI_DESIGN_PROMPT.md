# UI Design Prompt for Event Highway

## Project Overview

Event Highway is a community-driven events platform built with React.js, Node.js, and PostgreSQL. The platform allows users to browse events, sign up for events, and integrate events with Google Calendar. The application has role-based access with regular users and admin users who can create and manage events.

**Tech Stack:**

- Frontend: React.js with Tailwind CSS
- Current Design Style: Minimalist black and white color scheme with simple borders and basic styling
- Layout: Header component with "Event Highway" branding, main content area, and footer

## Current Design Patterns

- **Color Scheme**: What you recommend
- **Typography**: What you recommend
- **Buttons**: What you recommend
- **Cards**: Border with rounded corners, simple layout
- **Layout**: Centered content with responsive grid systems for event listings
- **Header**: Split design with "Event" in black text and "Highway" in white text on black background

## Pages Requiring UI Designs

Please provide modern, professional UI designs for each of the following pages. The designs should be cohesive across all pages while maintaining the Event Highway brand identity. Consider modern web design principles including proper spacing, visual hierarchy, accessibility, and responsive design.

### 1. Welcome Page (`/`)

**Purpose**: Landing page for unauthenticated users
**Current Elements**:

- Welcome heading: "Welcome to Event Highway!"
- Login button (navigates to /login)
- Sign Up button (navigates to /signup)
- "Proceed without logging in" option with button (navigates to /events)

**User Flow**: Entry point for all users, allows guest browsing or authentication

---

### 2. Login Page (`/login`)

**Purpose**: User authentication
**Current Elements**:

- "Login:" heading
- Email address input field
- Password input field
- Login submit button
- Error messages for invalid email or password

**User Flow**: Authenticated users are redirected to /events after successful login

---

### 3. Sign Up Page (`/signup`)

**Purpose**: New user registration
**Current Elements**:

- "Sign Up:" heading
- Form fields:
  - First Name
  - Last Name
  - Display Name
  - Email
  - Password
  - Admin checkbox (is_admin)
- Submit button
- Loading state: "Signing you up..."
- Error message display

**User Flow**: After successful signup, user is automatically logged in and redirected to /events

---

### 4. Events Page (`/events`)

**Purpose**: Browse all available events
**Current Elements**:

- Page title: "Events"
- Conditional header buttons based on user role:
  - **Admin users**: "Create Event" and "My Events" buttons
  - **Regular logged-in users**: "My Events" button only
  - **Guest users**: No buttons
- Grid layout displaying EventCard components (responsive: 1 column mobile, 2 columns tablet, 3 columns desktop)
- Loading state component
- Error message display

**User Flow**: Users can browse events, click on event cards to view details, or navigate to create/manage events if logged in

---

### 5. View Event Page (`/events/:event_id`)

**Purpose**: Display detailed information about a specific event
**Current Elements**:

- Event name (large heading)
- Event details displayed as list:
  - Date posted
  - Publisher
  - Category
  - Event Start (formatted datetime)
  - Event Finish (formatted datetime)
  - Host
  - Description
  - Venue information (or "This event is online")
  - Price (or "This event is free")
  - Attendee Limit (or "There is no attendee limit")
- Conditional action buttons:
  - **Logged-in users**: "Sign up for this event!" or "I'm no longer attending this event..." (toggles based on signup status)
  - **Admin users**: "Update Event" and "Delete Event" buttons at bottom
- Loading state component

**User Flow**: Users can view full event details, sign up/remove from their events, or manage the event (if admin)

---

### 6. Create Event Page (`/create-event`)

**Purpose**: Admin-only page for creating new events
**Current Elements**:

- Header: "Create a New Event" with helper text
- Large form with fields:
  - Event Name (text, required)
  - Host (text, required)
  - Event Start Time (datetime-local, required)
  - Event End Time (datetime-local, required)
  - Description (text, required)
  - Category (text, required)
  - Is Online checkbox
  - Venue Name (text, disabled if online)
  - Venue Address (text, disabled if online)
  - Is Free checkbox
  - Cost in GBP (number, disabled if free)
  - Has Attendee Limit checkbox
  - Attendee Limit (number, disabled if no limit)
  - Thumbnail (text)
- "Create Event" submit button
- Error message display
- Access control: Shows "NotAnAdmin" component if user is not admin

**User Flow**: Admin creates event, form validates, on success navigates to the new event's detail page

---

### 7. Update Event Page (`/update-event/:event_id`)

**Purpose**: Admin-only page for editing existing events
**Current Elements**:

- Header: "Update Event"
- Same form structure as Create Event but pre-populated with existing event data
- Loading state: "Loading..."
- "Update Event" submit button (implicit in form)
- Error message display
- Access control: Shows "NotAnAdmin" component if user is not admin

**User Flow**: Admin updates event details, form validates, on success navigates back to event detail page

---

### 8. My Events Page (`/my-events`)

**Purpose**: Display all events the logged-in user has signed up for
**Current Elements**:

- Page title: "My Events"
- Same grid layout as Events Page displaying EventCard components
- Empty state message: "You're currently signed up to no events..."

**User Flow**: Users can view and navigate to events they've registered for

---

## Design Requirements

Please provide UI designs that include:

1. **Modern Aesthetic**: Clean, professional design following current web design trends (2024-2025)
2. **Consistency**: Cohesive design language across all pages
3. **Visual Hierarchy**: Clear information architecture and content prioritization
4. **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
5. **Accessibility**: WCAG 2.1 AA compliance considerations (color contrast, focus states, etc.)
6. **User Experience**: Intuitive navigation, clear call-to-actions, helpful feedback states
7. **Component Reusability**: Design system with reusable components (buttons, cards, forms, etc.)
8. **Loading & Error States**: Thoughtful design for loading indicators and error messages
9. **Empty States**: Engaging empty state designs (e.g., "no events" messages)
10. **Form Design**: Modern, user-friendly form layouts with proper validation feedback

## Additional Context

- **EventCard Component**: Used throughout the app to display event previews with:

  - Host name (blue text)
  - Category (green text)
  - Event name (serif font, title)
  - Venue/Online status
  - Free/Price information
  - Attendee limit information
  - Event start and finish times
  - Hover effects (underline on title)

- **Header Component**: Always visible, shows:

  - "Event" text in black
  - "Highway" text in white on black background
  - Conditional navigation based on auth state
  - User display name when logged in
  - Logout button when authenticated

- **Footer Component**: Simple black footer with copyright text

## Deliverables Requested

For each page, please provide:

1. **Visual mockup/wireframe** description or layout structure
2. **Color palette** recommendations (can extend beyond black/white while maintaining brand)
3. **Typography** specifications (sizes, weights, hierarchy)
4. **Spacing system** (margins, padding, gaps)
5. **Component specifications** (buttons, inputs, cards, etc.)
6. **Responsive breakpoints** and layout adjustments
7. **Interaction states** (hover, active, focus, disabled)
8. **Accessibility considerations** for each page

Please ensure all designs work together as a cohesive system while improving upon the current minimalist black-and-white aesthetic with modern design principles.
