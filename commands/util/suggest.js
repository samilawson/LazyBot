const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const superagent = require('superagent');
module.exports = class SuggestCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'suggest',
      group: 'util',
      memberName: 'suggest',
      description: 'Sends a suggestion to LazyBot HQ!',
      
      examples: ['suggest <suggestion>'],
      args: [
                {
                    key: 'suggestion',
                    prompt: 'What would you like to suggest?',
                    type: 'string'
                }

      ]
      
    })
  }

  async run(msg, args) {

    const { suggestion } = args;
    const content = `A suggestion was submitted from **${msg.member.guild.name}**\n${suggestion}`;
    const id = ' 264845260339806211';
    new Promise((resolve, reject)=> {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
      .set(`Authorization`, `Bot MjY0ODUwNTE0OTA5MzMxNDU2.C0mlNw.-fEkhcmlo2QyFvoEisXNGohDrBE`).send({ content })
      .end((err, res) => {
        if(err) {
          reject(err);
          msg.reply("There was an error submitting your suggestion, please try again later!");

        } else {
          resolve(res);
          msg.say("Thank you for your suggestion! If you have any questions please join my server: https://discord.gg/TmQQddz");
        }
      });
    });
  }
};