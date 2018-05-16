const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ClockCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'clock',
      group: 'util',
      memberName: 'clock',
      description: 'Shows time from around the world!',
      
      examples: ['clock']
      
    })
  }

  async run(msg) {
    const today = new Date();
  const hours = today.getHours();
  const rest =  ":" + today.getMinutes() + ":" + today.getSeconds();
  const embed = new Discord.RichEmbed();
  
  embed.setColor(3447003)
     
      .setTitle(`World Clock`)
      .setThumbnail(`https://openclipart.org/image/2400px/svg_to_png/233143/United-Globe.png`)
      .addField('Moscow', (hours + 3) + rest, true)
      .addField('Capetown', (hours + 2) + rest, true)
      .addField('Paris', (hours + 1) + rest, true)
      .addField('London', hours + rest, true)
      .addField('Brasilia', (hours - 3) + rest, true)
      .addField('New York', (hours - 5) + rest, true)
      .addField('Chicago', (hours - 6) + rest, true)
      .addField('Los Angeles', (hours - 8) + rest, true)
      .addField('Tokyo', (hours + 9) + rest, true)
      .addField('Beijing', (hours + 8) + rest, true)
      console.log(embed);
      msg.channel.sendEmbed(embed);
  }
};