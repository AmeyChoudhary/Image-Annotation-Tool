const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userAnnotationsSchema = new Schema(
  {
    user_id: String,
    image_id: String,
    regions: [{id: String, isComplete: Boolean, is_editable: Boolean, color: String, points: [{x: Number, y: Number}]}]
  },
  { timestamps: true }
);

let UserAnnotations = mongoose.model("post", userAnnotationsSchema);

module.exports = UserAnnotations;