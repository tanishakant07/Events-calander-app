import express from "express";
import { registerUser, loginUser, checkUserExistence } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/exists", checkUserExistence);

export default router;