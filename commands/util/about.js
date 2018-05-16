const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AboutCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'about',
      group: 'util',
      memberName: 'about',
      description: 'Sends info about the bot!',
      
      examples: ['about']
      
    })
  }

  async run(msg) {
    const embed = new RichEmbed();
  embed.setColor(0x161370)
  .setTitle(`LazyBot Info`)
  .addField(`Author`, `FirstComrade17`)
  .addField(`Language and Stuff`, `Javascript, discord.js`)
  .addField(`Special Features`,'\n```http\nNationstates.net functionality\nUtilities, like stocks, with more added often!\nRole management!\n```')
  .addField(`Invite Link`, `[Invite me!](https://discordapp.com/oauth2/authorize?client_id=259784917339078656&scope=bot&permissions=0)`)
  
  .setFooter(`Thanks for your support!`)
msg.embed(embed);
  }
};