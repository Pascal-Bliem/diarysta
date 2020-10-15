const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const config = require("config");
const { body, validationResult, check } = require("express-validator");
const Entry = require("../models/Entry");

// @route   GET api/entries
// @desc    Get all of the user's entries
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
        res.json(entries);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error while getting user's entries.");
    }
});

// @route   POST api/entries
// @desc    Add new entry
// @access  Private
router.post("/", [auth,
    [
        // validate the user input
        check("mood", "Mood is required and has to be between 0 and 4").isInt({ min: 0, max: 4 })
    ]
], async (req, res) => {
    // if there are any validation errors send back a 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { date, mood, activities, note } = req.body;

    try {
        // create new contact
        const newEntry = new Entry({
            user: req.user.id,
            date,
            mood,
            activities,
            note
        });
        //  save to database
        const entry = await newEntry.save()
        // and send back to client
        res.json(entry);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error while adding new entry." });
    }
});

// @route   PUT api/entries/:id
// @desc    Update an entry
// @access  Private
router.put("/:id", [auth,
    [
        check("mood", "Mood is required and has to be between 0 and 4").isInt({ min: 0, max: 4 })
    ]
], async (req, res) => {
    const { date, mood, activities, note } = req.body;

    // Build an entry object
    const entryFields = {};
    if (date) entryFields.date = date;
    if (mood) entryFields.mood = mood;
    if (activities) entryFields.activities = activities;
    if (note) entryFields.note = note;

    try {
        // get the entry from the database
        let entry = await Entry.findById(req.params.id);

        if (!entry) return res.status(404).json({ message: "Entry not found" });

        // ensure user owns entry
        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }
        // update the entry
        entry = await Entry.findByIdAndUpdate(req.params.id, { $set: entryFields }, { new: true });
        // send updated entry to client
        res.json(entry);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error while updating an entry." });
    }
});

// @route   DELETE api/entries/:id
// @desc    Delete an entry
// @access  Private
router.delete("/:id", auth, async (req, res) => {
    try {
        // get the entry from the database
        let entry = await Entry.findById(req.params.id);

        if (!entry) return res.status(404).json({ message: "Entry not found" });

        // ensure user owns entry
        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }
        // delete the entry
        await Entry.findByIdAndRemove(req.params.id);
        // send message to client
        res.json({ message: "Entry removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error while deleting entry." });
    }
});

module.exports = router;