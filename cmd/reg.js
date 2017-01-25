exports.run = (bot, msg, params = []) => {
  const embed = new Discord.RichEmbed();
  const name = params.join("_");
  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?region=${name}&q=founder+name+numnations+power+tags+flag+delegate`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor(obj.REGION.NAME, `${obj.REGION.FLAG}`)
      .setTitle(`Region Info for ${obj.REGION.NAME}`)
      .setDescription(`wew lad`)
      .setThumbnail(`${obj.REGION.FLAG}`)
      .addField(`Founder`, obj.REGION.FOUNDER, true)
      .addField(`Number of Nations`, obj.REGION.NUMNATIONS, true)
      .addField(`Power`, obj.REGION.POWER, true)
      .addField(`WA Delegate`, obj.REGION.DELEGATE, true)
      .addField(`Link`, "https://www.nationstates.net/region=" + name)
  .addField(`Tags`, obj.REGION.TAGS[0].TAG)
      .setFooter(`Generated on ${date} at ${time}`)
      msg.channel.sendEmbed(embed);
    })
  })
   .catch((err) => {
        if(err){
          msg.channel.sendMessage("\:x: " +  "`" + "Error: Invalid Region" + "`");
        }
      })

};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["region"],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "reg",
  description: "Gives the flag, founder, number of nations, power, WA delegate, and the link of the specified region.",
  usage: "reg <region name>"
};
