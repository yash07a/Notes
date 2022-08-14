const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Get all the notes of a user using get /api/notes/fetchallnotes Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
});

// Add the notes of a user using post /api/notes/addnote Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "invalid title").isLength({ min: 3 }),
    body("description", "minimum character length 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are any errors in validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
);

// Update the notes of a user using put /api/notes/updatenote. Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    // A newnote object
    const { title, description, tag } = req.body;
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
    //finding whether the note exists to update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Notes not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Sorry,Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
});

// Delete the notes of a user using delete /api/notes/deletenote. Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //finding whether the note exists to delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Notes not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Sorry,Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note is deleted", note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
});

module.exports = router;
