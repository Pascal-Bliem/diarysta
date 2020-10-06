const mongoose = require("mongoose");

const EntrySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now
    },
    mood: {
        type: Number,
        required: true
    },
    activities: {
        type: [String],
        default: []
    },
    note: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("entry", EntrySchema);