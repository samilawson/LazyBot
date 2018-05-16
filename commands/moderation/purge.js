const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class PurgeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      group: 'moderation',
      memberName: 'purge',
      description: 'Purges the given number of messages (maximum is 100)!',
      
      examples: ['purge 15'],
      args: [
                {
                    key: 'messagecount',
                    prompt: 'How many messages would you like to purge?',
                    type: 'integer'
                }

      ]
      
    })
  }

  async run(msg, args) {
const { messagecount } = args;
    if(!msg.guild.member(this.client.user).hasPermission("MANAGE_MESSAGES")){
    msg.reply("\:x: I do not have permission(Manage Messages) to do that!");
  } else {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")){
    msg.reply("\:x: You do not have permission to do that!");
    }   else {
    
  
    msg.channel.fetchMessages({limit: messagecount})
        .then(messages => msg.channel.bulkDelete(messages));
        }
}

  }
};