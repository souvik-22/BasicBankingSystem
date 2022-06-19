const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bankingRoutes = require("./routes/banking.route");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8082;

const DB_URI = process.env.MONGODB_URL;

mongoose
  .connect(`${DB_URI}`)
  .then(() => console.log("Connected to TSF Banking System Database"))
  .catch((e) => console.log("Failed to connect to DB", e));

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TSF Banking System Backend Server...");
});

app.use("/v1", bankingRoutes);

app.listen(PORT, () => {
  console.log("TSF Banking System Backend Server running at", PORT);
});
