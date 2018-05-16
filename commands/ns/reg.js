const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
var request = require('superagent');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');


module.exports = class RegCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reg',
      group: 'ns',
      memberName: 'reg',
      description: 'Gets region info',
      
      examples: ['reg The Pacific'],
      args: [
        {
            key: 'text',
            prompt: 'Please enter a valid region name.',
            type: 'string'
        }
    ]
      })
    
  }

  async run(msg, args) {
    
var first = args.text.split(" ");
      const name = first.join("_");

        const embed = new RichEmbed();
  const now = new Date();
   const date = moment(now).format("MMM/DD/YYYY"); //This is better. 
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?region=${name}&q=founder+name+numnations+power+tags+flag+delegate`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor(obj.REGION.NAME, `${obj.REGION.FLAG}`)
      .setTitle(`Region Info for ${obj.REGION.NAME}`)
      
      .setThumbnail(`${obj.REGION.FLAG}`)
      .addField(`Founder`, obj.REGION.FOUNDER, true)
      .addField(`Number of Nations`, obj.REGION.NUMNATIONS, true)
      .addField(`Power`, obj.REGION.POWER, true)
      .addField(`WA Delegate`, obj.REGION.DELEGATE, true)
      .addField(`Link`, "https://www.nationstates.net/region=" + name)
  .setFooter(`Tags: ${obj.REGION.TAGS[0].TAG}`)
      
      msg.embed(embed);
    })
  })
   .catch((err) => {
        if(err){
          msg.channel.sendMessage("\:x: " +  "`" + "Error: Invalid Region" + "`"); //checks to see if the region exists
        }
      })
  }
};