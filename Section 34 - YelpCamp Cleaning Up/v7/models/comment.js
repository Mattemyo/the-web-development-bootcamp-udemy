const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    text: String,
    author: String
  },
  { usePushEach: true }
);

module.exports = mongoose.model("Comment", commentSchema);
