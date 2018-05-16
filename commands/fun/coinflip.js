const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class CoinflipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'coinflip',
      group: 'fun',
      memberName: 'coinflip',
      description: 'Flips a coin!',
      
      examples: ['coinflip']
      
    })
  }

  async run(msg) {
    var coin = ["Heads!", "Tails!"]
  const randomNumber = Math.floor(Math.random() * (coin.length));
msg.say(coin[randomNumber]);
  }
};