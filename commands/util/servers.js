const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ServersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'servers',
      group: 'util',
      memberName: 'servers',
      description: 'Gets the number of servers LazyBot is on!',
      
      examples: ['servers']
      
    })
  }

  async run(msg) {
    msg.say('On **' + this.client.guilds.size.toLocaleString() + '** servers!');
  }
};