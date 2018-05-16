const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class UserinfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      group: 'util',
      memberName: 'userinfo',
      description: 'Gets info on the given user!',
      
      examples: ['userinfo @user'],
      args: [
                {
                    key: 'member',
                    prompt: 'Which user would you like to get info on?',
                    type: 'user'
                }
      ]
    })
  }

  async run(msg, args) {
    const { member } = args;
     const embed = new RichEmbed();
   
  embed.setColor(3447003)
  .setTitle(`User info for ${member.username}`)
  .setThumbnail(`${member.avatarURL}`)
  .addField(`User Id`, `${member.id}`, true)
  .addField(`Time Created`, `${member.createdAt}`, true)
  .addField(`Discriminator`, `${member.discriminator}`, true)
  .addField(`Is Bot`, `${member.bot}`, true)
  .addField('Playing',  member.presence.game != null ? member.presence.game.name : "Nothing", true)
  .addField('Status', `${member.presence.status}`, true)
msg.embed(embed);
  }
};
