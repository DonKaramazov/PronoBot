const { prefix } = require("../config.json");

module.exports = {
  name: "help",
  description:
    "Liste toute les commandes ou les infos à propos d'une commande spécifique",
  usage: "[command name]",
  /*cooldown: 5,*/
  async execute(bot, message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Voici la liste de toutes mes commandes:");
      data.push(commands.map(command => command.name).join(", "));
      data.push(
        `\nTu peux envoyer \`${prefix}help [commandName]\` pour avoir les infos sur la commande!`
      );

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply(
            "Je t'ai envoyé un message privé avec toutes mes commandes!"
          );
        })
        .catch(error => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "it seems like I can't DM you! Do you have DMs disabled?"
          );
        });
    }

    //traitement de la commande spécifique
    const name = args[0].toLowerCase();
    const command = commands.get(name);

    if (!command) return message.reply("Ce nest pas une commande valide!");

    data.push(`**Nom:** ${command.name}`);

    if (command.aliases) data.push(`**Alias:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    //data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });
  }
};
