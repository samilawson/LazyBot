const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
var request = require('superagent');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
module.exports = class MoreCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'more',
      group: 'ns',
      memberName: 'more',
      description: 'Sends more information on a given nation!',
      
      examples: ['more <nation name>'],
      args: [
                {
                    key: 'nation',
                    prompt: 'Which nation would you like to view?',
                    type: 'string'
                }

      ]
      
    })
  }

  async run(msg, args) {
    const { nation } = args;
    const first = nation.split(" ");
    const name = first.join("_");
const embed = new RichEmbed();
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
      msg.embed(embed);
    })
  })
   .catch((err) => {
        if(err){
          msg.say("\:x: " +  "`" + "Error: Invalid Nation" + "`");
        }
})
  }
};