const Bet = require("../models/bet.js")
const mongoose = require("mongoose");

module.exports = {
    name:"createbet",
    description:"Créer un pari",
    args:true,
    usage:'<description> <1> <N> <2> <miseMin> <miseMax>',
    execute(bot,message,args){
    
        // les champs obligatoire todo les facultatifs
        let desc = args[0];
        let dom = args[1];
        let draw = args[2];
        let ext = args[3];

        //todo -- les vérifications de type



        const bet = new Bet({
            _id: mongoose.Types.ObjectId(),
            userID: message.author.id,
            username: message.author.username,
            description : desc,
            domOdds : dom,
            drawOdds : draw,
            extOdds : ext 
        });


        // todo -- beau message
        bet.save()
        .then(result => console.log(result))
        .catch(err => console.error(err))
    } 
 }