import mongoose, {Schema} from "mongoose";

const SongSchema = new Schema({
  videoId: { type: String, required: true, unique: true }, // YouTube/Spotify/etc ID
  title: { type: String, required: true },
  keywords: { type: [String], index: true }, 
  author: { type: String },
  lengthSeconds: { type: Number },
  thumbnail: { 
    thumbnails:[
      { url: String, width: Number, height: Number }
    ]
   },   // array of thumbnail URLs 
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
HistorySchema.index({ userId: 1, playedAt: -1 });

export const Song = mongoose.model("Song", SongSchema);
export const Playlist = mongoose.model("Playlist", PlaylistSchema);
export const History = mongoose.model("history", HistorySchema);