const mongoose = require("mongoose");

const EventSchema = new Schema({
  start: Date,
  end: Date,
  title: String,
});

const Event = model("Event", EventSchema);

module.exports = Event;
