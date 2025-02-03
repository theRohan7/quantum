import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
]

app.use(cors({
    origin: function (origin, callback) {

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORSpolicy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))


import authRoutes from "./Routes/auth.route.js";

app.use("/api/auth", authRoutes);

export { app }
