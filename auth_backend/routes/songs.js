const express = require("express");
const {History, Liked} = require("../models/songs");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

//route 1 :get all the notes using:get"/api/notes/fetchallnotes" login requered

router.get("/fetchhistory", fetchuser, async (req, res) => {
  try {
    const notes = await History.find({ user: req.user.id }).sort({ date: -1 });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
//route 2 :get all the notes using:post"/api/notes/addhistory" login required

router.post('/addhistory',fetchuser, async (req, res) => {
  try {
    const jsonData = req.body;

    foundData = await History.findOne({ "music.videoId": jsonData.music.videoId })

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
    res.status(500).send('Internal Server Error');
  }
});

router.get("/fetchliked", fetchuser, async (req, res) => {
  try {
    const items = await Liked.find({ user: req.user.id }).sort({ date: -1 });
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
//route 2 :get all the notes using:post"/api/notes/addhistory" login required

router.get("/checkLiked/:videoId", fetchuser, async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const userId = req.user.id;

   // Check if the item with the specified videoId exists in the Liked model
    const itemExists = await Liked.findOne({ user: userId, "music.videoId": videoId });

    // Send the result as JSON response
    return res.json({ exists: Boolean(itemExists) });
  } catch (error) {
    console.error("Error checking item existence:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post('/addliked',fetchuser, async (req, res) => {
  try {
    const jsonData = req.body;
    foundData = await Liked.findOne({ "music.videoId": jsonData.music.videoId })

      if (foundData) {
        console.log('Already Liked')
      } else {
        // No data with the specified videoId was found
        const history = new Liked({
          music: jsonData.music,
          user: req.user.id,
        });
        console.log('liked')
        // Save the document to the database
        const savedHistory = await history.save();
    
        res.json(savedHistory);
      }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//route 3 : update an existing note using:post"/api/notes/updatenote" login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//route 4 : delete an existing note using:delete"/api/notes/deletenote" login required
router.delete("/deleteLiked/:videoId", fetchuser, async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const userId = req.user.id;
    //find the song to be deleteed and deleted it
    await Liked.deleteOne({ user: userId, "music.videoId": videoId });
    res.json({ Success: "Note has been deleted"});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
