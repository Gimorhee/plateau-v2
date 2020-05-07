const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("?");
});

// Server Routes
const Auth = require("./routes/api/auth.js");

app.use("/api/auth", Auth);

// Run Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server runnin on ${PORT}!`);
});
