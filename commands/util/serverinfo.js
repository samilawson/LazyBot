const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
module.exports = class ServerInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      group: 'util',
      memberName: 'serverinfo',
      description: 'Gets information about the server you are in!',
      
      examples: ['serverinfo']
      
    })
  }

  async run(msg) {
    let name = msg.guild.id;
    
    
    let embed = new RichEmbed();
    var emojis = this.client.guilds.get(name).emojis.map(e => e).join(": ");
    if(emojis === undefined){
      emojis = "\u200b";
    }
    const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
    embed
    .setColor(3447003)
    .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
    .setTitle(`${msg.guild.name}` , "Server Info")
   
    .setThumbnail(msg.guild.iconURL)
    .addField(`Server ID`, name, true)
    .addField(`Owner`, `${msg.guild.owner.user.username}`, true)
    .addField(`Region`, `${msg.guild.region}`, true)
    .addField(`Created On`, `${msg.guild.createdAt}`, true)
    .addField(`Member Count`, `${msg.guild.memberCount}`, true)
    .addField(`Default Channel`, `${msg.guild.defaultChannel}`, true)
    .addField(`Channels`, `${msg.guild.channels.map(c => c.name).join(", ")}`)
    .addField(`Roles`, `${msg.guild.roles.size}`)
    .setFooter(`Generated on ` + date + ` at ` + time)
msg.embed(embed);
  }
};