const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
var request = require('superagent');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');

module.exports = class TriggeredCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nat',
            group: 'ns',
            memberName: 'nat',
            description: 'Gets information for the given nation.',
            examples: ['nat Melorian Republic'],
            args: [
        {
            key: 'text',
            prompt: 'Please enter a valid nation name.',
            type: 'string'
        }
    ]
        });
    }
      run(msg, args) {
      	
      var first = args.text.split(" ");
      const name = first.join("_");

      	const embed = new RichEmbed();
  const now = new Date();
   const date = moment(now).format("MMM/DD/YYYY"); //This is better. 
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${name}&q=name+gdp+population+currency+animal+region+wa+flag+fullname+motto+influence+census;mode=score;scale=66`);

  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
        .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
        .setTitle(`Nation Info for ${obj.NATION.FULLNAME}`)
        .setDescription(`${obj.NATION.MOTTO}`)
        .setThumbnail(`${obj.NATION.FLAG}`)
        .addField('Region', obj.NATION.REGION, true)
        .addField('Influence', obj.NATION.INFLUENCE, true)
        .addField('Population', obj.NATION.POPULATION * 10000000, true)
        .addField('Economy', "$" + obj.NATION.GDP, true)
        .addField('Currency', `${obj.NATION.CURRENCY}`, true)
        .addField('Animal', `${obj.NATION.ANIMAL}`, true)
        .addField('WA Status?', obj.NATION.UNSTATUS, true)
        .addField('Endorsement Count', Math.round(obj.NATION.CENSUS[0].SCALE[0].SCORE), true)
        .addField('Link', "http://www.nationstates.net/nation=" + name)
        .setFooter(`Generated on ${date} at ${time}. For more extensive information, type //more <nation name>`)
      msg.embed(embed);
      
    })
  })
        .catch((err) => {
        if(err){
          msg.say("\:x: " +  "`" + "Error: Invalid Nation" + "`"); //checks to see if the nation exists
        }
      })
}
      };



