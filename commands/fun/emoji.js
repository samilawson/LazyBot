const { Command } = require('discord.js-commando');

module.exports = class EmojiCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'emoji',
      group: 'fun',
      memberName: 'emoji',
      description: 'Gets the custom emojis of a guild if any exist.',
      examples: ['emoji']
      })
    }
  

   run(msg) {
    let emojis;
    if(msg.guild.emojis.size === 0) emojis = "There are no custom emojis on this server."
      else emojis = `${msg.guild.name}'s Custom Emojis: \n ${msg.guild.emojis.map(e => e).join(' ')}`;
    msg.say(emojis);
  }
}
