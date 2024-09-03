import express from "express";
import dbConnect from "./config/index.js";
import authRoute from "./routes/user.route.js";
const app = express();
const port = 8000;

// mongo db connection
dbConnect();
// middelware
app.use(express.json());
// routes
app.use("/api/v1/user", authRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
