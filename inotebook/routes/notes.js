const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Notes = require("../models/Notes");

// Route 1 : get all the notes using: get "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    return res.json(notes);
  } catch (error) {
    console.error(err.Message);
    res.status(500).send("Some error occured");
  }
});

// Route 2 : add a new notes using: post "/api/notes/createnotes". login required
router.post(
  "/createnotes",
  fetchuser,
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title should be atleast 3 character"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description should be atleast 3 character"),
  ],

  async (req, res) => {
    try {
      const result = validationResult(req);

      if (!result) {
        return res.status(400).json({ error: result.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savenote = await note.save();

      return res.json(savenote);
    } catch (error) {
      console.error(err.Message);
      res.status(500).send("Some error occured");
    }
  }
);

// Route 3 : update an existing node using: put "/api/notes/updatenote". login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNotes = {};

    if (title) {
      newNotes.title = title;
    }
    if (description) {
      newNotes.description = description;
    }
    if (tag) {
      newNotes.tag = tag;
    }

    // find the note to be updated and update it

    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNotes },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.error(err.Message);
    res.status(500).send("Some error occured");
  }
});

// Route 4 : delete an existing node using: delete "/api/notes/deletenote". login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not found");
    }

    // check for the valid user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.error(err.Message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
