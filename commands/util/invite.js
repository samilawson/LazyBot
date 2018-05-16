const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class InviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      group: 'util',
      memberName: 'invite',
      description: 'Sends a link with which you can invite the bot!',
      
      examples: ['invite']
      
    })
  }

  async run(msg) {
    msg.say("Invite me to your server! https://discordapp.com/oauth2/authorize?client_id=259784917339078656&scope=bot&permissions=8")
  }
};