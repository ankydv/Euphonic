import mongoose, {Schema} from "mongoose";

const SongSchema = new Schema({
  songId: { type: String, required: true, unique: true }, // YouTube/Spotify/etc ID
  title: { type: String, required: true },
  artist: { type: String },
  album: { type: String },
  duration: { type: Number },
  thumbnail: { type: String },
  url: { type: String }, // streamable URL
  metadata: { type: Schema.Types.Mixed }, // for any additional info (tags, mood, etc.)
}, { timestamps: true });




const PlaylistSchema = new Schema({
  userId: { type: String, required: true }, // Clerk user ID
  name: { type: String, required: true },
  description: { type: String },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  isDefault: { type: Boolean, default: false }, // for “Liked Songs”
  thumbnail: { type: String }, // optional cover image
}, { timestamps: true });

const HistorySchema = new Schema({
  userId: { type: String, required: true },
  song: { type: Schema.Types.ObjectId, ref: "Song", required: true },
  playedAt: { type: Date, default: Date.now }
});

export const Song = mongoose.model("Song", SongSchema);
export const Playlist = mongoose.model("Playlist", PlaylistSchema);
export const History = mongoose.model("history", HistorySchema);