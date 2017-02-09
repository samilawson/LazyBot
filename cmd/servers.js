exports.run = (bot, msg, params = []) => {
  msg.channel.sendMessage('On ' + bot.guilds.size.toLocaleString() + ' servers!');

        
    

};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "servers",
  description: "Server count command.",
  usage: "servers"
};
