const Discord = require("discord.js");
exports.run = (bot, msg, params = []) => {
  let name = msg.guild.id;
    
    console.log(name);
    let embed = new Discord.RichEmbed();
    var emojis = bot.guilds.get(name).emojis.map(e => e).join(": ");
    if(emojis === undefined){
      emojis = "\u200b";
    }
    const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
    embed
    .setColor(3447003)
    .setAuthor(`${bot.guilds.get(name).name}`, bot.guilds.get(name).iconURL)
    .setTitle(`${bot.guilds.get(name).name}` , "Server Info")
    .setDescription("wew")
    .setThumbnail(bot.guilds.get(name).iconURL)
    .addField(`❯ Server ID`, name, true)
    .addField(`❯ Owner`, `${bot.guilds.get(name).owner}`, true)
    .addField(`❯ Region`, `${bot.guilds.get(name).region}`, true)
    .addField(`❯ Created On`, `${bot.guilds.get(name).createdAt}`, true)
    .addField(`❯ Member Count`, `${bot.guilds.get(name).memberCount}`, true)
    .addField(`❯ Default Channel`, `${bot.guilds.get(name).defaultChannel}`, true)
    .addField(`❯ Channels`, `${bot.guilds.get(name).channels.map(c => c.name).join(", ")}`)
    .addField(`❯ Roles`, `${bot.guilds.get(name).roles.map(r => r.name).join(", ")}`)
    .setFooter(`Generated on ` + date + ` at ` + time)
    msg.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "serverinfo",
  description: "Gives information about the server in which you give the command.",
  usage: "serverinfo"
};
