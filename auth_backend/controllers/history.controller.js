import {History} from "../models/song.model.js";
import {ErrorHandler} from "../utils/ErrorHandler.js";

/**
 * @route   GET /api/history
 * @desc    Get paginated user history (newest first)
 * @access  Private
 * @query   ?lastId=<ObjectId>&limit=<number>
 */
export const getHistory = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return next(new ErrorHandler(401, "User not authenticated"));
    }

    const { lastId, limit = 5 } = req.query;

    const conditions = { user: userId };
    if (lastId) {
      // Fetch items *older* than this ID (since Mongo IDs increase over time)
      conditions._id = { $lt: lastId };
    }

    const history = await History.find(conditions)
      .sort({ _id: -1 }) // Newest first
      .limit(Number(limit))
      .populate("song") // Optional: populate song details
      .lean();

    return res.status(200).json({
      success: true,
      count: history.length,
      nextCursor: history.length > 0 ? history[history.length - 1]._id : null,
      history,
    });
  } catch (error) {
    console.error("Error in getHistory:", error);
    return next(new ErrorHandler(500, "Failed to fetch user history"));
  }
};


/**
 * @route   POST /api/history/add
 * @desc    Add a song play to user’s history (expects addSong middleware before)
 * @access  Private (Clerk-authenticated)
 */
export const addHistory = async (req, res, next) => {
  try {
    const userId = req.userId;
    const song = req.song;

    if (!song || !song._id) {
      return next(new ErrorHandler(400, "Song data missing or invalid"));
    }

    const history = await History.create({
      userId,
      song: song._id,
      playedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Song added to history",
      history,
    });
  } catch (error) {
    console.error("Error in addHistory:", error);
    return next(new ErrorHandler(500, "Failed to add song to history"));
  }
};
