exports.run = (bot, msg, params = []) => {
  if(msg.author.id != "213251218154192896") return;
  var announcement = params.join(" ");
  console.log(announcement);
  bot.guilds.forEach(guild => { guild.defaultChannel.sendMessage(announcement) });
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "announce",
  description: "Restricted to the bot owner!",
  usage: "announce <announcement here>"
};