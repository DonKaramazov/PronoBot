const mongoose = require("mongoose");

const betSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    username: String,
    description: String,
    domOdds: Number,
    drawOdds: Number,
    extOdds: Number,
    minBetValue: { type:Number,min: 1},
    maxBetValue: { type:Number,default: 1000},
    result: String,
    date: { type: Date, default: Date.now },
    isLock: {type: Boolean, default: false }
});

module.exports = mongoose.model("Bet",betSchema);