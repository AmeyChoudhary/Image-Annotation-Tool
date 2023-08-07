const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ImageUrlSchema = new Schema(
    {
        image_id: String,
        url: String
    },
    {timestamps: true}
);

let ImageUrl = mongoose.model("ImageUrl", ImageUrlSchema);

module.exports = ImageUrl;

// https://localhost::3031/posts/newimg