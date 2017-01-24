exports.run = (bot, msg, params = []) => {
  const name = params.join("_");
  const embed = new Discord.RichEmbed();
  const now = new Date();
   const date = moment(now).format("MMM/DD/YYYY"); //This is better. 
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${name}&q=name+gdp+population+region+wa+flag+fullname+influence+census;mode=score;scale=66`);

  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
        .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
        .setTitle(`Nation Info for ${obj.NATION.NAME}`)
        .setDescription(obj.NATION.FULLNAME)
        .setThumbnail(`${obj.NATION.FLAG}`)
        .addField('Region', obj.NATION.REGION, true)
        .addField('Influence', obj.NATION.INFLUENCE, true)
        .addField('Population', obj.NATION.POPULATION * 10000000, true)
        .addField('Economy', "$" + obj.NATION.GDP, true)
        .addField('WA Status?', obj.NATION.UNSTATUS, true)
        .addField('Endorsement Count', Math.round(obj.NATION.CENSUS[0].SCALE[0].SCORE), true)
        .addField('Link', "http://www.nationstates.net/nation=" + name)
        .setFooter(`Generated on ${date} at ${time}. For more extensive information, type //more <nation name>`)
      msg.channel.sendEmbed(embed);
      
    })
  })
        .catch((err) => {
        if(err){
          msg.channel.sendMessage("\:x: " +  "`" + "Error: Invalid Nation" + "`");
        }
      })
}
};

exports. = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["nation"],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "nat",
  description: "Gives the region, influence, population, economy, WA status, endorsement count, and link to the specified nation.",
  usage: "nat <nation name>"
};