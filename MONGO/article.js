const mongoose = require("mongoose");

const articleModel = mongoose.Schema({
    title: String,
    author: String,
    body: String,
    date:{type: Date, default: Date.now},
    special: Boolean,
    resume: {
        contest: String,
        author: String,
    }
});

module.exports = articleModel; 