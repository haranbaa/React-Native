const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging: Check if server is running
console.log("Starting server...");

// Load JSON data
const shoes = require("./db.json");

// Serve images statically
app.use("/images", express.static(path.join(__dirname, "..", "assets")));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the NBA Shoes API! Use /shoes to get data.");
});

app.get("/shoes", (req, res) => {
  console.log("Received request for /shoes"); // Debugging log
  res.json(shoes);
});

app.get("/shoes/:id", (req, res) => {
  const shoe = shoes.find((s) => s.id == req.params.id);
  if (shoe) {
    res.json(shoe);
  } else {
    res.status(404).send({ message: "Shoe not found" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
