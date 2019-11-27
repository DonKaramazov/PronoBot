const fs = require('fs')
const Discord = require('discord.js')
const Enmap = require("enmap");
const { prefix, token } = require('./config.json')
const client = new Discord.Client()


//On ajoute à la chaine les require du folder 'events'
fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName,(...args) => eventHandler(client,...args))
  })
})

client.commands = new Enmap();

client.mongoose = require('./utils/mongoose.js');

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Chargement de la commande ${commandName}`);
    client.commands.set(commandName, props);
  });
});


client.mongoose.init();
client.login(token)