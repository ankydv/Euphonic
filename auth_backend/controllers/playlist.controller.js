import {Playlist} from "../models/song.model.js";
import {ErrorHandler} from "../utils/ErrorHandler.js";

/**
 * @route   POST /api/playlist/create
 * @desc    Create a new playlist for the authenticated user
 * @access  Private (Clerk-authenticated)
 */
export const createPlaylist = async (req, res, next) => {
  try {
    const { name, description, thumbnail } = req.body;
    const userId = req.userId; // Comes from Clerk middleware

    if (!name) {
      return next(new ErrorHandler(400, "Playlist name is required"));
    }

    const newPlaylist = await Playlist.create({
      userId,
      name,
      description,
      thumbnail,
    });

    res.status(201).json({
      message: "Playlist created successfully",
      playlist: newPlaylist,
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    return next(new ErrorHandler(500, "Internal server error"));
  }
};

/**
 * @route   GET /api/playlist/
 * @desc    Get all playlists for the authenticated user
 * @access  Private (Clerk-authenticated)
 */
export const getPlaylists = async (req, res, next) => {
  try {
    const userId = req.userId; // Comes from Clerk middleware
    const playlists = await Playlist.find({ userId }).populate("songs");

    res.status(200).json({
      playlists,
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return next(new ErrorHandler(500, "Internal server error"));
  } 
};