import express from "express";
import dbConnect from "./config/index.js";
import authRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
const port = 8000;

// dotenv config
dotenv.config();
// Use CORS to allow all origins
app.use(cors());

// OR specify the allowed origins
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Your frontend's origin (Vite dev server)
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // If your frontend and backend need to share cookies
//   })
// );

// mongo db connection
dbConnect();
// middelware
app.use(express.json());
// routes
app.use("/api/v1/user", authRoute);
app.use("/api/v1/admin", adminRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
