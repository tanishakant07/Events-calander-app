import { Event } from "../models/event.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {refreshAccessToken} from "./user.controller.js"


const createEvent = asyncHandler(async (req, res) => {  
  try {
    const { name, datetime, tag } = req.body;
    const userId = req.user.id;

    if (!name && !datetime) {
      throw new ApiError(400, "name or date/time cannot be empty");
    }

    const overlap = await Event.findOne({
      userId,
      datetime: {
        $gte: new Date(datetime),
        $lt: new Date(new Date(datetime).getTime() + 60 * 60 * 1000), // Add 60 minutes
      },
    });    

    if (overlap) {
      throw new ApiError(404, "Event overlaps with an existing event");
    }

    const event = new Event({ userId, name, datetime, tag });    
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const listEvents = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10, skip = 0 } = req.query;

    const events = await Event.find({ userId })
      .sort({ datetime: 1 })
      .limit(Number(limit))
      .skip(Number(skip));

    const totalEvents = await Event.countDocuments({ userId });

    res.status(200).json(
      new ApiResponse(200, { events, total: totalEvents }, "Events fetched successfully")
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export {
  createEvent,
  listEvents,
};

