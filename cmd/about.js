exports.run = (bot, msg, params = []) => {
  msg.channel.sendMessage("Check out my features here: http://lazybot.comeze.com/index.html");
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "about",
  description: "Gives a link to the LazyBot website!",
  usage: "about"
};
