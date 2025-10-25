import { Playlist } from "../models/song.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const fetchLiked = asyncHandler(async (req, res) => {
  try {
    const items = await Playlist.find({ user: req.user.id }).sort({ date: -1 });
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

export const isLiked = asyncHandler(async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const userId = req.user.id;

    // Check if the item with the specified videoId exists in the Playlist model
    const itemExists = await Playlist.findOne({
      user: userId,
      "music.videoId": videoId,
    });

    // Send the result as JSON response
    return res.json({ exists: Boolean(itemExists) });
  } catch (error) {
    console.error("Error checking item existence:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export const addLiked = asyncHandler(async (req, res) => {
  try {
    const jsonData = req.body;
    foundData = await Playlist.findOne({
      "music.videoId": jsonData.music.videoId,
    });

    if (foundData) {
      console.log("Already Playlist");
    } else {
      // No data with the specified videoId was found
      const history = new Playlist({
        music: jsonData.music,
        user: req.user.id,
      });
      console.log("liked");
      // Save the document to the database
      const savedHistory = await history.save();

      res.json(savedHistory);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export const deleteLiked = asyncHandler(async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const userId = req.user.id;
    //find the song to be deleteed and deleted it
    await Playlist.deleteOne({ user: userId, "music.videoId": videoId });
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
