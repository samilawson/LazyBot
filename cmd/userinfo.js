const Discord = require("discord.js");
exports.run = (bot, msg, params = []) => {
let member = msg.mentions.users.first();
  const embed = new Discord.RichEmbed();
   
  embed.setColor(3447003)
  .setTitle(`User info for ${member.username}`)
  .setThumbnail(`${member.avatarURL}`)
  .addField(`❯ User Id`, `${member.id}`, true)
  .addField(`❯ Time Created`, `${member.createdAt}`, true)
  .addField(`❯ Discriminator`, `${member.discriminator}`, true)
  .addField(`❯ Is Bot`, `${member.bot}`, true)
  .addField('❯ Playing',  member.presence.game != null ? member.presence.game.name : "Nothing", true)
  .addField('❯ Status', `${member.presence.status}`, true)
  msg.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "userinfo",
  description: "Gives information about the mentioned user.",
  usage: "userinfo @mentioned user"
};
