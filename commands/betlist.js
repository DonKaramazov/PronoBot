const Bets = require("../models/bet.js");
const User = require("../models/user.js");
const mongoose = require("mongoose");
const Discord = require("discord.js");

module.exports = {
  name: "betlist",
  description: "Liste les paris en cours",
  async execute(bot, message, args) {
    await message.delete();

    Bets.find()
      .populate("user")
      .exec(function(err, bets) {
        if (err) console.error(err);

        let embed = new Discord.RichEmbed()
          .setTitle("Liste des paris en cours")
          .setColor("#4000FF");

        let list = "";
        for (var i = 0; i < bets.length; i++) {
          var bet = bets[i];
          list += `\n#${bet.numBet} **${bet.description}**\xa0\xa0*${bet.domOdds} / ${bet.drawOdds} / ${bet.extOdds}*\xa0\xa0 par ***${bet
            .user.username}***`;
        }

        embed.addField("Liste", list);

        message.channel.send(embed);
      });
  }
};
