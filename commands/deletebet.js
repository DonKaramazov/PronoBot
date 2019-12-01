const Bet = require("../models/bet.js");
const User = require("../models/user.js");
const mongoose = require("mongoose");
const Discord = require("discord.js");

module.exports = {
  name: "deletebet",
  description:
    "Supprime un pari proposé.\nSi une personne à déjà effectué un pari, l'opération est impossible.\nEn cas d'urgence, contacter l'administrateur.",
  args: true,
  usage: "<identifiant pari>",
  async execute(bot, message, args) {
    let betID = args[0];

    let bet = await Bet.findOne({ numBet: betID }).populate("user");

    if (!bet) {
      return message.reply(
        `Le pari avec l'identifiant ${betID} ne semble pas ou plus exister`
      );
    }

    let user = await User.findOne({ userID: message.author.id });

    // Penser à décommenter pour la prod
    if (user._id.equals(bet.user._id) === false) {
      return message.reply(
        "**Tu ne peux pas supprimer le pari d'un autre petit malin ;)!**"
      );
    }

    bet
      .delete()
      .then(result => console.log(result))
      .catch(err => console.log(err));

    let embed = new Discord.RichEmbed()
      .setTitle("Pari supprimé !")
      .setColor("#8ce309")
      .setThumbnail(message.author.displayAvatarURL)
      .addField("Description", `#${bet.numBet}\t ${bet.description}`);

    message.channel.send(embed);
  }
};
