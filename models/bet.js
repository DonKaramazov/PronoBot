const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection(
  "mongodb://localhost:27017/PronoSpm"
);

autoIncrement.initialize(connection);

const betSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  domOdds: Number,
  drawOdds: Number,
  extOdds: Number,
  minBetValue: { type: Number, min: 1 },
  maxBetValue: { type: Number, default: 1000 },
  result: String,
  date: { type: Date, default: Date.now },
  isLock: { type: Boolean, default: false }
});

betSchema.plugin(autoIncrement.plugin, {
  model: "Bet",
  field: "numBet",
  startAt: 7
});

//methods
betSchema.methods.GetOdds = function GetOdds(libBet) {
  let odds;

  switch (libBet) {
    case "1":
      odds = this.domOdds;
      break;
    case "N":
      odds = this.drawOdds;
      break;
    case "2":
      odds = this.extOdds;
      break;
    //todo lancer une exception
    default:
      break;
  }

  return odds;
};

module.exports = mongoose.model("Bet", betSchema);
