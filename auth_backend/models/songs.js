const mongoose = require("mongoose");
const { Schema } = mongoose;
const SongSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  music: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const History = mongoose.model("history", SongSchema);
const Liked = mongoose.model("liked", SongSchema);
module.exports = {History, Liked};