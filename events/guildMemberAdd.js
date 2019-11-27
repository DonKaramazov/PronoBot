const Discord = require('discord.js');
const User = require("../models/user.js")
const mongoose = require("mongoose");


module.exports = (client, member) => {
    let embed = new Discord.RichEmbed()
        .setColor("#0099ff")
        .setTitle('Bienvenue sur le serveur')
        .setDescription('En arrivant sur le serveur, tu es directement enregistré dans les participants pour les pronotiques')
        .addField('Les modalités', 'compte personnel : 200€\ncompte bookmaker: 5000€')
        .setTimestamp()
        .setImage(client.user.avatarURL);

    const user = new User({
        _id: mongoose.Types.ObjectId(),
        username: member.user.username,
        userID: member.id,
        PersonalFunds: 200,
        BookmakerFunds: 5000
    });

    user.save()
        .then(result => console.log(result))
        .catch(err => console.error(err))

    member.send(embed);
}