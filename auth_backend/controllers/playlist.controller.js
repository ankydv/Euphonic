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
    const playlists = await Playlist.find({ userId })
 .sort({ createdAt: -1 })
 .select('_id name songs')
 .lean();

    res.status(200).json({
      playlists: playlists.map(playlist => ({
      id: playlist._id,
      name: playlist.name,
      songCount: playlist.songs.length,
      }))
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return next(new ErrorHandler(500, "Internal server error"));
  } 
};

export const addSongToPlaylist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { playlistId, playlistName } = req.body;
    const song = req.song; // Provided by middleware

    if (!song) return next(new ErrorHandler(500, "Song not processed by middleware"));
    if (!playlistId && !playlistName)
      return next(new ErrorHandler(400, "Either playlistId or playlistName is required"));

    let playlist;

    if (playlistId) {
      playlist = await Playlist.findOne({ _id: playlistId, user: userId });
      if (!playlist) return next(new ErrorHandler(404, "Playlist not found"));
    } else {
      playlist = await Playlist.findOne({ name: playlistName, userId });

      if (!playlist) {
        playlist = await Playlist.create({
          name: playlistName,
          userId,
          isDefault: playlistName.toLowerCase() === "favourites", // optional flag
          songs: [],
        });
      }
    }

    playlist.songs.addToSet(song._id);
    await playlist.save();

    res.status(200).json({
      success: true,
      message: "Song added to playlist successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    next(new ErrorHandler(500, "Failed to add song to playlist"));
  }
};


/**
 * @route   POST /api/playlist/add
 * Adds a song to multiple playlists efficiently using MongoDB's updateMany.
 * If a playlist doesn't exist (with playlistName), it will be created.
 * 
 * Expects:
 *  - req.userId (from auth middleware)
 *  - req.song (from addSong middleware)
 *  - req.body.playlists: array of { playlistId?, playlistName? }
 */
export const addSongToPlaylists = async (req, res, next) => {
  try {
    const userId = req.userId;
    const song = req.song;
    const { playlists } = req.body;

    if (!song) return next(new ErrorHandler(400, "Song data missing"));
    if (!Array.isArray(playlists) || playlists.length === 0)
      return next(new ErrorHandler(400, "No playlists provided"));

    // Separate existing playlists and new ones to create
    const playlistIds = playlists
      .filter(p => p.playlistId)
      .map(p => p.playlistId);

    const newPlaylistNames = playlists
      .filter(p => !p.playlistId && p.playlistName)
      .map(p => p.playlistName);

    // Create new playlists if names provided
    const createdPlaylists = await Promise.all(
      newPlaylistNames.map(name =>
        Playlist.create({ name, userId, songs: [] })
      )
    );

    // Combine existing and newly created playlist IDs
    const allPlaylistIds = [
      ...playlistIds,
      ...createdPlaylists.map(p => p._id)
    ];

    // Update all playlists in a single DB operation
    const result = await Playlist.updateMany(
      { _id: { $in: allPlaylistIds }, userId },
      { $addToSet: { songs: song._id } }
    );

    res.status(200).json({
      success: true,
      message: "Song added to selected playlists successfully",
      updatedCount: result.modifiedCount,
      createdPlaylists
    });
  } catch (error) {
    console.error("Error in addSongToMultiplePlaylists:", error);
    next(new ErrorHandler(500, "Failed to add song to playlists"));
  }
};


export const removeSongFromPlaylist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { playlistId, songId } = req.params;

    if (!playlistId || !songId)
      return next(new ErrorHandler(400, "playlistId and songId are required"));

    // Find the playlist
    const playlist = await Playlist.findOne({ _id: playlistId, userId });
    if (!playlist) return next(new ErrorHandler(404, "Playlist not found"));

    // Check if song exists in playlist
    const songExists = playlist.songs.includes(songId);
    if (!songExists)
      return next(new ErrorHandler(404, "Song not found in playlist"));

    // Remove song
    playlist.songs.pull(songId);
    await playlist.save();

    return res.status(200).json({
      success: true,
      message: "Song removed from playlist successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error removing song from playlist:", error);
    next(new ErrorHandler(500, "Failed to remove song from playlist"));
  }
};

export const deletePlaylist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { playlistId } = req.params;

    if (!playlistId)
      return next(new ErrorHandler(400, "playlistId is required"));

    // Find playlist and ensure ownership
    const playlist = await Playlist.findOne({ _id: playlistId, userId });
    if (!playlist) return next(new ErrorHandler(404, "Playlist not found"));

    await Playlist.deleteOne({ _id: playlistId, userId });

    return res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      deletedPlaylistId: playlistId,
    });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    next(new ErrorHandler(500, "Failed to delete playlist"));
  }
};