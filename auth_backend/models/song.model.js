import mongoose, {Schema} from "mongoose";

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
export const History = mongoose.model("history", SongSchema);
export const Liked = mongoose.model("liked", SongSchema);