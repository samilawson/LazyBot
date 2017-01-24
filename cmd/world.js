exports.run = (bot, msg, params = []) => {
  const embed = new Discord.RichEmbed();
  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?q=numregions+numnations+featuredregion`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor('World Statistics', bot.user.avatarURL)
      .setTitle('NationStates.net')
      .setDescription('wew lad')
      .setThumbnail(bot.user.avatarURL)
      .addField('Number of Regions', obj.WORLD.NUMREGIONS, true)
      .addField('Number of Nations', obj.WORLD.NUMNATIONS, true)
      .addField('Today\'s Featured Region', obj.WORLD.FEATUREDREGION)
      .setFooter(`Generated on ${date} at ${time}`)
      msg.channel.sendEmbed(embed);
    })
  })
}
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "world",
  description: "Gives the number of regions, number of nations, and the featured region of NationStates.",
  usage: "world"
};
