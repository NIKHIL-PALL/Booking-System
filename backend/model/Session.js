const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  sessionType: {
    type: String,
    required: true,
  },
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User"  },
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

const session = mongoose.model("Session", SessionSchema);

module.exports = session;
