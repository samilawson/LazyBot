const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
var request = require('superagent');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');

module.exports = class WorldCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'world',
      group: 'ns',
      memberName: 'world',
      description: 'Gets info about NationStates.net!',
      
      examples: ['world']
      
    })
  }

  async run(msg) {
     const embed = new RichEmbed();
  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?q=numregions+numnations+featuredregion`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor('World Statistics', this.client.user.avatarURL)
      .setTitle('NationStates.net')
      
      .setThumbnail(this.client.user.avatarURL)
      .addField('Number of Regions', obj.WORLD.NUMREGIONS, true)
      .addField('Number of Nations', obj.WORLD.NUMNATIONS, true)
      .addField('Today\'s Featured Region', obj.WORLD.FEATUREDREGION)
      .setFooter(`Generated on ${date} at ${time}`)
      msg.embed(embed);
    })
  })
  }
};