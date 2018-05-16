const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class FunnyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'funny',
      group: 'fun',
      memberName: 'funny',
      description: 'Sends a random Cyanide and Happiness comic!',
      
      examples: ['funny']
      
    })
  }

  async run(msg) {
const max = 4665;
msg.say('http://explosm.net/comics/' + (Math.floor(Math.random()* max) + 1));
  }
};