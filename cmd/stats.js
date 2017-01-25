exports.run = (bot, msg, params = []) => {
  const embed = new Discord.RichEmbed();
         const now = new Date();
         const date = moment(now).format("MMM/DD/YYYY");
         const time = moment(now).format("H:mm:ss");
        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        var quotes = [
    'Look ma! no hands', 'wew lad', 'never gonna give you up', 'REEEEEEEEEEEEEEEE', 'You\'re terminated!'
    ]
    
    const randomNumber = Math.floor(Math.random() * (quotes.length));
        embed.setColor(3447003)
        .setAuthor("LazyBot", `${bot.user.avatarURL}`)
        .setTitle("LazyBot Stats")
        .setDescription(`${quotes[randomNumber]}`)
        .setThumbnail(`${bot.user.avatarURL}`)
        .addField(`❯ Info`, `By FirstComrade17#6842`, true)
        .addField(`❯ Lib`, `Discord.js`, true)
        .addField(`❯ Bot Version`, `2.0`, true)
        .addField(`❯ Uptime`, `${duration}`, true)
        .addField(`❯ Memory`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        .addField(`❯ Servers`, `${bot.guilds.size.toLocaleString()}`, true)
        .addField(`❯ Channels`, `${bot.channels.size.toLocaleString()}`, true)
        .addField(`❯ Users`, `${bot.users.size.toLocaleString()}`, true)
         .setFooter(`Generated on ${date} at ${time}`)
        msg.channel.sendEmbed(embed);
    
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "stats",
  description: "Gives some cool stats about LazyBot!",
  usage: "stats"
};
