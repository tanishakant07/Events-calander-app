import express from "express";
import { createEvent, listEvents } from "../controllers/events.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",verifyJWT, createEvent);
router.get("/", verifyJWT, listEvents);

export default router;