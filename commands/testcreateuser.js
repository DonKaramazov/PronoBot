
const User = require("../models/user.js")
const mongoose = require("mongoose");

//mongoose.connect()

module.exports = {
    name:"testCreateUser",
    description:"test",
    execute(bot,message,args){
        console.log("Je vais enregistrer un utilisateur");
        let rUser = message.mentions.members.first();

        const user = new User({
            _id: mongoose.Types.ObjectId(),
            username: rUser.user.username,
            userID: rUser.id,
            PersonalFunds: 200,
            BookmakerFunds: 5000
        });

        user.save()
        .then(result => console.log(result))
        .catch(err => console.error(err))

        message.reply(`L'utilisateur ${rUser.user.username} à été ajouté à la base de données!`)
    } 
 }