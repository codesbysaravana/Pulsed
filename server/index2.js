//get as require express, http, serverfromsocketio, mongoose, cors, dotenv
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");

require('dotenv').config();

const app = express();
const server = http.createServer(app); //Create an HTTP server from the Express app
const io = new Server(server, {
    cors: {
        origin: '*', //allow from all origins
        methods: ['GET', 'POST'] //allow methods HTTP
    }
});

//importing model mongoose
const Event = require("./models/Event");

app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully!'))
    .catch((err) => console.log("❌ MongoDB connection error:", err));

app.get('/', (req, res) => {
    res.send("Pulsed Backend is Running");
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    //showing active users to newly connected
    io.emit('activeUsers', io.engine.clientsCount);

    let analyticsInterval; // This ensures analytics are sent periodically, not just on every single event

    //handle user Event, data is the event
    socket.on('userEvent', async(data) => {
        console.log(`Received user Data from ${socket.id}:`, data);
        //save in MongoDB;
        try {
            const newEvent = await Event.create({ ...data, timeStamp: new Date()}); //new event in monogDB
            console.log(`DocumentEvent created in MongoDB`, newEvent);

            const totalEvents = await Event.countDocuments(); //get current total docs

            //update live analytics to all connected
            io.emit('analyticsUpdate', {
                totalEvents: totalEvents, 
            });
        } catch(error) {
            console.error(`Error saving event or fetching analytics`, error); //log error
            socket.emit('serverError', 'Failed to process event'); //emit error back to client
        }
    });

    //Handling client disconnection
    socket.on('disconnect', () => {
        console.log(`User Disconnected: ${socket.id}`);
        io.emit('activeUsers', io.engine.clientsCount); 
    });
});

//Starting the entire backend server
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(`Connected to MONGODB URI`);
})

