exports.run = (bot, msg, params = []) => {
  const max = 4462;
    msg.channel.sendMessage('http://explosm.net/comics/' + (Math.floor(Math.random()* max) + 1));
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "funny",
  description: "Gives a random Cyanide and Happiness comic.",
  usage: "funny"
};
