const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'util',
            memberName: 'stats',
            description: 'Gives client stats.',
            examples: ['stats'],
            
        });
    }
      run(msg) {

      	const embed = new RichEmbed();
      	const now = new Date();
         const date = moment(now).format("MMM/DD/YYYY");
         const time = moment(now).format("H:mm:ss");
        const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        embed.setColor(3447003)
        .setAuthor("LazyBot", `${this.client.user.avatarURL}`)
        .setTitle("LazyBot Stats")
        .setThumbnail(`${this.client.user.avatarURL}`)
        .addField(`Info`, `By FirstComrade17#6842`, true)
        .addField(`Lib`, `Discord.js`, true)
        .addField(`Bot Version`, `3.0.0`, true)
        .addField(`Uptime`, `${duration}`, true)
        .addField(`Memory`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        .addField(`Servers`, `${this.client.guilds.size.toLocaleString()}`, true)
        .addField(`Channels`, `${this.client.channels.size.toLocaleString()}`, true)
        .addField(`Users`, `${this.client.users.size.toLocaleString()}`, true)
         .setFooter(`Generated on ${date} at ${time}`)
        msg.embed(embed);
}
};

      