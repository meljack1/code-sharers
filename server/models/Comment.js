const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//This will be a subdocument of Snippet
const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
    },
    commentAuthor: {
        type : String,
        required: true
    },
    commentDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = commentSchema;