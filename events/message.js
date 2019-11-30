const { prefix } = require("../config.json");

module.exports = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `Tu n'as pas fourni d'arguments, ${message.author}`;

    if (command.usage)
      reply += `\nLe bon usage est : \`${prefix}${command.name} ${command.usage}\``;

    return message.channel.send(reply);
  }

  try {
    console.log("Execution de la commande : " + commandName);
    command.execute(client, message, args);
  } catch (error) {
    console.error(error);
    return message.reply(error);
  }
};
