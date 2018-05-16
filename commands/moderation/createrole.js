const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class CreateRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'createrole',
      group: 'moderation',
      memberName: 'createrole',
      description: 'Creates a role(no perms)!',
      
      examples: ['createrole updates']
      
    })
  }

  async run(msg, args) {
   
      let rolename = args;
      console.log(rolename);
      let guild = msg.member.guild;
      guild.createRole({ name: rolename })
      .then(role => {
        msg.reply("\:white_check_mark: Role Created: " + rolename + "!");
      }).catch(console.error);
    } 
    
    
  
};