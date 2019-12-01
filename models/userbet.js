// Table d'association entre User et Bet
// Stock l'ensemble des paris effectués par le joueurs

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userBetSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  bet: { type: Schema.Types.ObjectId, ref: "Bet" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  libBet: String,
  stake: String,
  result: { type: String, default: "" },
  state: { type: String, default: "Pending" }
});

module.exports = mongoose.model("UserBet", userBetSchema);
