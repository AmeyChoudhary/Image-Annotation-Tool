const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let DatasetSchema = new Schema(
    {
        dataset_name: String,
        image_ids: [{image_id: String}],
        labels: [{name: String, color: String}]
    }
);

let Datasets = mongoose.model("Datasets", DatasetSchema);

module.exports = Datasets;