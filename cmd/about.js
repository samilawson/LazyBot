const Discord = require("discord.js");
exports.run = (bot, msg, params = []) => {
  const embed = new Discord.RichEmbed();
  embed.setColor(0x161370)
  .setTitle(`LazyBot Info`)
  .addField(`Author`, `FirstComrade17`)
  .addField(`Language and Stuff`, `Javascript, discord.js`)
  .addField(`Special Features`,`\n```http\nNationstates.net Functionality\nUtilities, like stocks! With more added often!\nRole management!\n````)
  .addField(`Invite Link`, `[Invite me!](https://discordapp.com/oauth2/authorize?client_id=259784917339078656&scope=bot&permissions=0)`)
  .addField(`Website`, `[Click me!](lazybot.comeze.com)`)
  .setFooter(`Thanks for your support!`)
  msg.channel.sendEmbed(embed);
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
