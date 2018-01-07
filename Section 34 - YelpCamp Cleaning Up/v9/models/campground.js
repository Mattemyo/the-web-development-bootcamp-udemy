const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String,
    author: {
      
    }
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  { usePushEach: true }
);

module.exports = mongoose.model("Campground", campgroundSchema);
