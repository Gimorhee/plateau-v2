const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connect DB
connectDB();

// Server Routes
const Auth = require("./routes/api/auth.js");

app.use("/api/auth", Auth);

// Run Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server runnin on ${PORT}!`);
});
