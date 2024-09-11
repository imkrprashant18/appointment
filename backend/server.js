import express from "express";
import dbConnect from "./config/index.js";
import authRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import doctorRoute from "./routes/doctor.route.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const port = 8000;

// dotenv config
dotenv.config();

// handling cors
// CORS configuration
const corsOptions = {
  origin: "*", // Update this to match your frontend's URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
// mongo db connection
dbConnect();
// middelware
app.use(express.json());
// routes
app.use("/api/v1/user", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/doctor", doctorRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
