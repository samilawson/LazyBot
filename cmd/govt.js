const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
var request = require('superagent');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
exports.run = (bot, msg, params = []) => {
  const name = params.join("_");
  const embed = new Discord.RichEmbed();
  const now = new Date();
   const date = moment(now).format("MMM/DD/YYYY"); //This is better. 
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${name}&q=govt+name+flag+fullname`);

  result.then((res) => {
    parseString(res.text, (err, obj) => {
      console.log(obj);
      embed.setColor(3447003)
        .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
        .setTitle(`Government Info for ${obj.NATION.NAME}`)
        .setDescription(obj.NATION.FULLNAME)
        .setThumbnail(`${obj.NATION.FLAG}`)
        .addField('Administration', obj.NATION.GOVT[0].ADMINISTRATION + "%", true)
        .addField('Defense', obj.NATION.GOVT[0].DEFENCE + "%", true)
        .addField('Education', obj.NATION.GOVT[0].EDUCATION + "%", true)
        .addField('Environment', obj.NATION.GOVT[0].ENVIRONMENT + "%", true)
        .addField('Healthcare', obj.NATION.GOVT[0].HEALTHCARE + "%", true)
        .addField('Commerce', obj.NATION.GOVT[0].COMMERCE + "%", true)
        .addField('International Aid', obj.NATION.GOVT[0].INTERNATIONALAID + "%", true)
        .addField('Law and Order', obj.NATION.GOVT[0].LAWANDORDER + "%", true)
        .addField('Public Transport', obj.NATION.GOVT[0].PUBLICTRANSPORT + "%", true)
        .addField('Social Equality', obj.NATION.GOVT[0].SOCIALEQUALITY + "%", true)
        .addField('Spirituality', obj.NATION.GOVT[0].SPIRITUALITY + "%", true)
        .setFooter(`Generated on ${date} at ${time}.`)
      msg.channel.sendEmbed(embed);
      
    })
  })
        .catch((err) => {
        if(err){
          msg.channel.sendMessage("\:x: " +  "`" + "Error: Invalid Nation" + "`"); //checks to see if the nation exists
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
  name : "govt",
  description: "Gives the major categories of government spending for the specified nation.",
  usage: "govt <nation name>"
};
