const Bet = require("../models/bet.js");
const User = require("../models/user.js");
const UserBet = require("../models/userbet.js");
const mongoose = require("mongoose");
const Discord = require("discord.js");

module.exports = {
  name: "bet",
  description: "Miser sur un pari",
  args: true,
  usage: "<identifiant pari> <1/N/2> <mise>",
  async execute(bot, message, args) {
    await message.delete();

    // les champs obligatoires
    let idBet = args[0];
    let libBet = args[1];
    let stake = args[2];

    let bet = await Bet.findOne({ numBet: idBet }).populate("user");

    if (!bet) {
      return message.reply(
        `Le pari avec l'identifiant ${idBet} ne semble pas exister`
      );
    }

    let user = await User.findOne({ userID: message.author.id });

    // Penser à décommenter pour la prod
    // if (user._id.equals(bet.user._id)) {
    //   console.log("je passe ici");
    //   return message.reply(
    //     "**Tu ne peux pas parier sur ton propre pari, Petit malin va!**"
    //   );
    // }

    //Enregistrement en base
    const userBet = new UserBet({
      _id: mongoose.Types.ObjectId(),
      bet: bet._id,
      user: user._id,
      libBet: libBet,
      stake: stake
    });

    userBet
      .save()
      .then(result => console.log(result))
      .catch(err => console.log(err));

    // un beau message
    let embed = new Discord.RichEmbed()
      .setTitle("Pari effectué !")
      .setColor("#8ce309")
      .setThumbnail(message.author.displayAvatarURL)
      .addField("Description", `#${bet.numBet}\t ${bet.description}`)
      .addField("Pronostique", libBet, true)
      .addField("Mise", `${stake} €`, true);

    let odds = bet.GetOdds(libBet);
    let potentialGain = parseFloat(stake) * odds;

    embed.addField("Cote", odds);
    embed.addField("Gain Potentiel", `**${potentialGain.toFixed(2)}**`, true);

    message.channel.send(embed);
  }
};
