const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        user_id: String,
        type: String
    },
    {timestamps: true}
);

let Users = mongoose.model("Users", UserSchema);

module.export = Users;