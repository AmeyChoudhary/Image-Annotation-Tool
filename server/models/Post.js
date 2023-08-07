const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    user_id: String,
    image_id: String,
    regions: [{id: Number, isComplete: Boolean, curr_point: {x: Number, y: Number}, color: String, points: [{x: Number, y: Number}]}]
  },
  { timestamps: true }
);

let Post = mongoose.model("post", postSchema);

module.exports = Post;