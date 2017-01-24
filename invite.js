exports.run = (bot, msg, params = []) => {
  msg.reply("Invite me to your server! https://discordapp.com/oauth2/authorize?client_id=259784917339078656&scope=bot&permissions=0");
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "invite",
  description: "Sends the url that you can invite LazyBot with.",
  usage: "invite"
};