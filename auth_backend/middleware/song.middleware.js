import {Song} from "../models/song.model.js";
import {ErrorHandler} from "../utils/ErrorHandler.js";

/**
 * @middleware addSong
 * @desc Ensures the song exists in the database.
 *       If not, creates it and attaches it to req.song.
 * @access Private (used internally by other routes)
 */
export const addSong = async (req, res, next) => {
  try {
    if(!req.userId)
        return next(new ErrorHandler(401, "Unauthorized"));

    const { song } = req.body;

    // ✅ Basic validation
    if (!song || typeof song !== "object") {
      return next(new ErrorHandler(400, "Missing or invalid 'song' object in body"));
    }

    const { videoId, title } = song;
    if (!videoId || !title) {
      return next(new ErrorHandler(400, "Both 'videoId' and 'title' are required"));
    }

    // ✅ Find or create song
    let songDoc = await Song.findOne({ videoId });
    if (!songDoc) {
      songDoc = await Song.create(song);
    }

    // ✅ Attach to request for next middleware/controller
    req.song = songDoc;
    next();
  } catch (error) {
    console.error("Error in addSong middleware:", error);
    return next(new ErrorHandler(500, "Failed to process song"));
  }
};
