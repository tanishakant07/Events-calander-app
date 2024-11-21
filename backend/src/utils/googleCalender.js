import { google } from "googleapis";

// Initialize OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

// Get Google Calendar Client
const getGoogleCalendarClient = (token) => {
  oauth2Client.setCredentials({ access_token: token });
  return google.calendar({ version: "v3", auth: oauth2Client });
};

// Check for Event Overlap
const checkCalendarOverlap = async (token, datetime) => {
  const calendar = getGoogleCalendarClient(token);
  const start = new Date(datetime).toISOString();
  const end = new Date(datetime.getTime() + 3600000).toISOString(); // 1 hour duration

  const events = await calendar.events.list({
    calendarId: "primary",
    timeMin: start,
    timeMax: end,
    singleEvents: true,
  });

  return events.data.items && events.data.items.length > 0;
};

// Create Google Calendar Event
const createGoogleCalendarEvent = async (token, event) => {
  const calendar = getGoogleCalendarClient(token);

  await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: event.summary,
      description: event.description,
      start: { dateTime: new Date(event.start).toISOString() },
      end: { dateTime: new Date(event.end).toISOString() },
    },
  });
};

module.exports = {
  getGoogleCalendarClient,
  checkCalendarOverlap,
  createGoogleCalendarEvent,
};
