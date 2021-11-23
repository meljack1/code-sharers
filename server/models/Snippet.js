const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = require("./Comment")

const snippetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [commentSchema]
});

const Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;