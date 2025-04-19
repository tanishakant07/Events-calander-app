# Events Calendar App

The **Events Calendar App** is a full-stack application that enables users to create, manage, and view events in a calendar interface. It incorporates robust authentication, seamless event scheduling, and a user-friendly interface.
[Watch Demo Video](https://drive.google.com/file/d/14ZBUkowaq4zj8t-H5hNUtBCYXpgEWSYX/view?usp=sharing)

## Features

### Backend
- **User Authentication**: Register and login functionalities using JWT.
- **Event Management**:
  - Create events with attributes such as name, datetime, and tags.
  - Prevent overlapping events for the same user.
  - List events with filter, sort, and pagination options.
- **Google Calendar Sync (Bonus)**: 
  - Enable/disable syncing of events with Google Calendar.
  - Check for event overlaps with Google Calendar.

### Frontend
- **Login UI**: Simple login screen for user authentication.
- **Calendar UI**:
  - Displays a weekly view with hourly divisions.
  - Showcases user events.
  - Allows adding events via a popup form.
- **Search Feature (Bonus)**: Search and view other users' events.

## Tech Stack
- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation

### Prerequisites
- Node.js and npm
- MongoDB (Local or Cloud-based)
- A Google account for Calendar integration (Bonus)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-repo>/events-calendar-app.git
   cd events-calendar-app/backend
