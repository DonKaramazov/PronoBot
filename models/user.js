const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    PersonalFunds: Number,
    BookmakerFunds: Number
});

module.exports = mongoose.model("User",userSchema);