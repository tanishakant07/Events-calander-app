import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({
    path: './env'
});

const app = express();
app.use(express.json());
app.use(
    cors({origin: "http://localhost:5000", // Frontend URL
    credentials: true, // Allow credentials (cookies)
    }));
app.use(cookieParser());

// Database Connection
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
