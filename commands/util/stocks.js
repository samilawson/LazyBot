const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const Markit = require('markit-on-demand');
module.exports = class StocksCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stocks',
      group: 'util',
      memberName: 'stocks',
      description: 'Gives the trading at and opening value for the specified stock. To find a list of company symbols, search here: http://finance.yahoo.com/lookup?bypass=true',
      
      examples: ['stocks AAPL']
      
    })
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed();
    Markit.getQuote(args)
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
  }
};