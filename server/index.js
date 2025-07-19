const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Mongo model
const Event = require("./models/Event");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Pulsed Backend is Running");
});

// --- SOCKET CONNECTION LOGIC ---
let analyticsInterval; // Global ref to control interval lifecycle

io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  io.emit("activeUsers", io.engine.clientsCount);

  // Start interval only on the first connection
  if (io.engine.clientsCount === 1) {
    analyticsInterval = setInterval(async () => {
      try {
        const now = new Date();
        const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
        const oneMinuteAgo = new Date(now - 60 * 1000);

        const totalEvents = await Event.countDocuments({
          timestamp: { $gte: twentyFourHoursAgo }
        });

        const avgScrollDepthResult = await Event.aggregate([
          { $match: { type: "scroll", timestamp: { $gte: oneMinuteAgo } } },
          { $group: { _id: null, avgScroll: { $avg: "$scrollDepth" } } }
        ]);
        const avgScrollDepth = avgScrollDepthResult[0]?.avgScroll || 0;

        const avgSessionDurationResult = await Event.aggregate([
          { $match: { type: "timeOnPage", timestamp: { $gte: oneMinuteAgo } } },
          { $group: { _id: null, avgDuration: { $avg: "$sessionDuration" } } }
        ]);
        const avgSessionDuration = avgSessionDurationResult[0]?.avgDuration || 0;

        const activeUsers = io.engine.clientsCount;

        // Send analytics
        io.emit("analyticsUpdate", {
          totalEvents,
          activeUsers,
          avgScrollDepth,
          avgSessionDuration
        });

        // Real-time chart events (last 5 min)
        const recentEvents = await Event.find({
          timestamp: { $gte: new Date(now - 5 * 60 * 1000) }
        })
          .sort({ timestamp: 1 })
          .limit(50);

        io.emit("realtimeEventsForChart", recentEvents);
      } catch (error) {
        console.error("Error in analytics aggregation interval:", error);
      }
    }, 3000); // every 3 seconds
  }

  // User event from client
  socket.on("userEvent", async (data) => {
    console.log(`Received user event from ${socket.id}:`, data);
    try {
      await Event.create({ ...data, timestamp: new Date() });
      // No need to emit analytics instantly; handled in interval
    } catch (error) {
      console.error("Error saving event:", error);
      socket.emit("serverError", "Failed to process event");
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`👋 User disconnected: ${socket.id}`);
    io.emit("activeUsers", io.engine.clientsCount);

    if (io.engine.clientsCount === 0 && analyticsInterval) {
      clearInterval(analyticsInterval);
      console.log("Analytics aggregation interval stopped.");
    }
  });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});
