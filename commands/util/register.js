const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const fs = require('fs')
module.exports = class RegisterCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'register',
      group: 'util',
      memberName: 'register',
      description: 'Register your last.fm account here!',
      
      examples: ['register username']
      
    })
  }

  async run(msg, args) {
    const unames = JSON.parse(fs.readFileSync("./data/unames.json", "utf8"));
    let toId = msg.author.id;
        if(!unames[toId]){
            unames[msg.author.id] = {
                username: args
            }
          
        fs.writeFile("./data/unames.json", JSON.stringify(unames), (err) => {
            if (err) console.error(err)
          });
          msg.channel.send('Registered!');
        }
  }
};