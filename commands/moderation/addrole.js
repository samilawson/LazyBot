const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AddroleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'addrole',
      group: 'moderation',
      memberName: 'addrole',
      description: 'Adds a role to the given user!',
      
      examples: ['addrole @user role'],
      args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to add a role to?',
                    type: 'user'
                },
                {
                  key: 'role',
                  prompt: 'Which role would you like to add?',
                  type: 'string'
                }
            ]
      
    })
  }

  async run(msg, args) {
    const { user, role } = args; 
if(!msg.guild.member(this.client.user).hasPermission("MANAGE_GUILD")){
    msg.reply("\:x: I do not have permission(Manage Roles) to do that!");
  } else {
  if(!msg.member.hasPermission("MANAGE_GUILD")){
    msg.reply("\:x: You do not have permission to do that!");
  } else {
    console.log(msg.content);
    
    
    let role = msg.guild.roles.find("name", `${role}`);
    console.log(role);
    let member = msg.guild.member(user);
    member.addRole(role).catch(console.error);
    msg.reply("\:white_check_mark: Role " + role + " added!");

  }
}
  }
};