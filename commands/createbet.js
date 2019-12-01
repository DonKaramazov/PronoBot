const Bet = require("../models/bet.js");
const User = require("../models/user.js");
const mongoose = require("mongoose");
const Discord = require("discord.js");

module.exports = {
  name: "createbet",
  description: "Créer un pari",
  args: true,
  usage: "<description> <1> <N> <2> [miseMin] [miseMax]",
  async execute(bot, message, args) {
    await message.delete();

    // les champs obligatoire todo les facultatifs
    let desc = args[0];
    let dom = args[1];
    let draw = args[2];
    let ext = args[3];

    //Le user associé
    User.findOne({ userID: message.author.id }, function(err, user) {
      if (err) throw err;

      console.log(user);
      //todo -- les vérifications de type
      const bet = new Bet({
        _id: mongoose.Types.ObjectId(),
        user: user._id,
        description: desc,
        domOdds: dom,
        drawOdds: draw,
        extOdds: ext
      });

      bet
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));

      //Afficher le pari
      let embed = new Discord.RichEmbed()
        .setTitle("Pari proposé")
        .setColor("#4000FF")
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Description", bet.description)
        .addField(
          "cotes",
          `${bet.domOdds} / ${bet.drawOdds} / ${bet.extOdds} `,
          true
        )
        .addField("Identifiant pari", `**${bet.numBet}**`);

      message.channel.send(embed);
    });
  }
};
