const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const request = require('superagent');
const parseString = require('xml2js').parseString;
const xml2js = require('xml2js');
const googleTranslate = require('google-translate')(process.env.GOOG);
module.exports = class TranslateCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'translate',
      group: 'util',
      memberName: 'translate',
      description: 'Allows you to translate what you say into another lagnguage. For a list of language codes, see https://sites.google.com/site/tomihasa/google-language-codes',
      
      examples: ['translate ESP Hello']
      
    })
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed();

const langTo = args[0];
var toTranslate = args.slice(1).join(" ");
 console.log(langTo);
 console.log(toTranslate);
googleTranslate.translate(toTranslate, langTo, function(err, translated){
 console.log(translated);
 embed.setColor(3447003)
 .addField('', '```\n' + translated + '\n ```')
msg.channel.sendEmbed(embed); 
});
  }
};