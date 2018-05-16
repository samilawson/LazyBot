const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class SupportCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'support',
      group: 'util',
      memberName: 'support',
      description: 'Sends an invite to LazyBot HQ!',
      
      examples: ['support']
      
    })
  }

  async run(msg) {
    msg.reply("Come to my server! https://discord.gg/TmQQddz");
  }
};