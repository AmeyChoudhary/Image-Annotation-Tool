const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ModAnnotationsSchema = new Schema(
  {
    user_id: String,
    image_id: String,
    regions: [{id: String, isComplete: Boolean, is_editable: Boolean, color: String, points: [{x: Number, y: Number}]}]
  },
  { timestamps: true }
);

let ModAnnotations = mongoose.model("ModAnnotations", ModAnnotationsSchema);

module.exports = ModAnnotations;