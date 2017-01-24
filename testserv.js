exports.run = (bot, msg, params = []) => {
  msg.reply("Come to my server! https://discord.gg/TmQQddz");
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["LazyBotHQ"],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "testserv",
  description: "Sends an invite to LazyBotHQ",
  usage: "testserv"
};