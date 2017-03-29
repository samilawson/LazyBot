const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
var request = require('superagent');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
exports.run = (bot, msg, params = []) => {
const embed = new Discord.RichEmbed();
  const now = new Date();
   const date = moment(now).format("MMM/DD/YYYY"); //This is better. 
  const time = moment(now).format("H:mm:ss");

request.get('https://www.nationstates.net/cgi-bin/api.cgi?wa=2&q=lastresolution').end((err, res) => {
        console.log(res.text);
        var second = res.text.replace(/(<([^>]+)>)/ig,"");
        console.log(second);
   second = second.replace(/[\[\]']+/g,'');
        msg.channel.sendMessage(second);
      });

};


exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [""],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "sc",
  description: "Gives the last Security Council Resolution that was voted on.",
  usage: "sc"
};
