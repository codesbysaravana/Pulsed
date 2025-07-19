const mongoose = require("mongoose");

//name the schema
const eventSchema = new mongoose.Schema({
    //type indicates what kind of event this document is about.
    type: {
        type: String,
        required: true,
        enum: ['click', 'scroll', 'timeOnPage', 'customEvent']
    },

    timestamp: {
        type: Date, //sets date
        default: Date.now //if none sets now date
    },

    //Indicates how far down the page the user scrolled
    scrollDepth: {
        type: Number,
        min: 0, //top
        max: 100 //bottom
    },

    //Tracks how long the user stayed on a page/session.
    sessionDuration: {
        type: Number,
        min: 0
    },

    userId: String,
    pageUrl: String,
    elementId: String,

} , {
    timestamps: true // Adds `createdAt` and `updatedAt` fields automatically
})

module.exports = mongoose.model("Event", eventSchema); 
//compiles into a model The first argument "Event" becomes the name of my collections