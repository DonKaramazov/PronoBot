const { percevalQuotes } = require('../Json/quotes.json');

module.exports = {
    name:'perceval',
    description:'affiche une *punchline* de Perceval le Gallois',
    execute(bot,message,args){
        var quote =  percevalQuotes[Math.floor(Math.random()*percevalQuotes.length)]
        return message.reply('***' + quote + '***')
    },
}