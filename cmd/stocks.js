const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Markit = require('markit-on-demand')
exports.run = (bot, msg, params = []) => {
  const embed = new Discord.RichEmbed();
  Markit.getQuote(params)
    .then(( res ) => {
        console.log('Results:', res);
        embed.setColor(3447003)
        .setTitle(`${res.Name}`)
          .addField(`Trading at`, `$${res.LastPrice}`)
        .addField(`Open`, `$${res.Open}`)

      msg.channel.sendEmbed(embed);
    })
.catch(() => {
  if(err){
  msg.channel.sendMessage("\:x: Oops! Something went wrong! Make sure you typed a valid stock symbol. Search for them here: http://finance.yahoo.com/lookup?bypass=true");
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
  name : "stocks",
  description: "Gives the trading at and opening value for the specified stock. To find a list of company symbols, search here: http://finance.yahoo.com/lookup?bypass=true",
  usage: "stocks <stocksymbol>"
};
