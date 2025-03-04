const express = require("express");
const cors = require("cors");
const path = require("path");
const os = require("os");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Get Local IP (for Android)
const networkInterfaces = os.networkInterfaces();
let localIP = "localhost"; // Default for iOS

for (const iface of Object.values(networkInterfaces)) {
  for (const details of iface) {
    if (details.family === "IPv4" && !details.internal) {
      localIP = details.address; // Use LAN IP for Android
    }
  }
}

// Debugging
console.log(`Starting server on ${localIP}...`);

// Load JSON data
const shoes = require("./db.json");

// Serve images statically
app.use("/images", express.static(path.join(__dirname, "..", "assets")));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the NBA Shoes API! Use /shoes to get data.");
});

app.get("/shoes", (req, res) => {
  console.log("Received request for /shoes");
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
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server is running at:`);
  console.log(`🔹 Local:   http://localhost:${port}`);
  console.log(`🔹 Network: http://${localIP}:${port}`);
});
