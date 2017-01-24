exports.run = (bot, msg, params = []) => {
  const name = params.join("_");
   msg.channel.sendMessage("\:book: | https://en.wikipedia.org/wiki/" + name);

};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["command_alias1", "command_alias2"],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "wiki",
  description: "Gives a wikipedia link to the input query.",
  usage: "wiki <input here>"
};