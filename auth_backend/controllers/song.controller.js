import { History, Liked } from "../models/song.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const fetchHistory = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, lastDate } = req.query;

  let conditions = { user: req.user.id };
  const totalRecords = await History.countDocuments(conditions);
  const totalPages = Math.ceil(totalRecords / limit + 1);

  if (lastDate) {
    conditions.date = { $lt: new Date(lastDate) };
  }

  const notes = await History.find(conditions)
    .sort({ date: -1 }) // Sort by date in descending order
    .skip((page == 1 ? 0 : page - 2) * limit)
    .limit(limit);

  res.json({
    totalPages,
    currentPage: page,
    totalRecords,
    data: notes,
  });
});

export const addHistory = asyncHandler(async (req, res) => {
  try {
    const jsonData = req.body;

    const foundData = await History.findOne({
      "music.videoId": jsonData.music.videoId,
    });

    if (foundData) {
      // Data with the specified videoId was found
      foundData.date = Date.now();
      await foundData.save();
      console.log(foundData);
    } else {
      // No data with the specified videoId was found
      const history = new History({
        music: jsonData.music,
        user: req.user.id,
      });

      // Save the document to the database
      const savedHistory = await history.save();

      res.json(savedHistory);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export const fetchLiked = asyncHandler(async (req, res) => {
  try {
    const items = await Liked.find({ user: req.user.id }).sort({ date: -1 });
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

    // Check if the item with the specified videoId exists in the Liked model
    const itemExists = await Liked.findOne({
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
    const foundData = await Liked.findOne({
      "music.videoId": jsonData.music.videoId,
    });

    if (foundData) {
      console.log("Already Liked");
    } else {
      // No data with the specified videoId was found
      const history = new Liked({
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
    await Liked.deleteOne({ user: userId, "music.videoId": videoId });
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
