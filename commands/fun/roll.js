const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'fun',
      memberName: 'roll',
      description: 'Rolls a die with the given maximum number!',
      
      examples: ['roll 100'],
      args: [
                {
                    key: 'params',
                    prompt: 'How many sides should the dice be?',
                    type: 'integer'
                }

      ]
      
    })
  }

  async run(msg, args) {
    const { params } = args;
    if (params > 500){
        msg.say("\:x: Error! Please enter a number 1-500!");
      } else if(params < 0){
        msg.say("\:x: Error! Please enter a number 1-500!");
      } else {
        var diceOne  = Math.floor( Math.random() * params) + 1;
      
        msg.say(diceOne);
}
  }
};