const Discord = require("discord.js");
exports.run = (bot, msg, params = []) => {
  const name = params.join("_");
  const embed = new Discord.RichEmbed();
   const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?nation=${name}&q=name+govtpriority+income+lastactivity+leader+tax+capital+category+flag+fullname+majorindustry`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
      .setTitle('More Nation Stats')
      .setDescription(`${obj.NATION.FULLNAME}`)
      .setThumbnail(`${obj.NATION.FLAG}`)
      .addField('Category', obj.NATION.CATEGORY, true)
      .addField('Government Priority', obj.NATION.GOVTPRIORITY, true)
      .addField('Major Industry', obj.NATION.MAJORINDUSTRY, true)
      .addField('Leader', obj.NATION.LEADER, true)
      .addField('Capital', obj.NATION.CAPITAL, true)
      .addField('Tax', obj.NATION.TAX, true)
      .addField('Average Income', obj.NATION.INCOME, true)
      .addField('Last Activity', obj.NATION.LASTACTIVITY, true)
      .setFooter(`Generated on ${date} at ${time}`)
      msg.channel.sendEmbed(embed);
    })
  })
   .catch((err) => {
        if(err){
          msg.channel.sendMessage("\:x: " +  "`" + "Error: Invalid Nation" + "`");
        }
      })

};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "more",
  description: "Gives the full name, flag, category, goverenment priority, major industry, leader, capital, tax, average income, and latest activity of the specified nation.",
  usage: "more <nation name>"
};
