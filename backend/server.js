const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const API_PREFIX = process.env.API_PREFIX || "/api/v1";

dotenv.config();
const app = express();

const allowedOrigins = process.env.CLIENT_DEV_URLS.split(",");
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, //--> if cookie ya auth tokens ko header me bhejte hain to credential true krte hain
  })
);
app.use(express.json({limit: '50mb'})); // for parsing application/json data with increased limit
app.use(express.urlencoded({ extended: true , limit: '50mb'})); // for parsing application/x-www-form-urlencoded with increased limit
app.use(`${API_PREFIX}/users`, userRoutes);  // all users req from here

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
