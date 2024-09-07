const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  sessionType: {
    type: String,
    required: true,
  },
  participants: [
    {
      email: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const sessionSchema = mongoose.model('Session', SessionSchema);

module.exports = sessionSchema;
