const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('superagent')
module.exports = class WikipediaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'wiki',
      group: 'util',
      memberName: 'wiki',
      description: 'Searches wikipedia!',
      
      examples: ['wiki Richard Nixon'],
      args:[ 
          {
              key: "search term",
              prompt: "the search term",
              type: "string"
          }
      ]
      
    })
  }

  async run(msg, args) {
   
        let options = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=1&formatversion=2&titles=${args}`;
        
  
      let response = await request(options);
      response = response.query.pages[0];
      data = [
        {
          name: response.title,
          value: `${response.extract}`
        }
      ];
      thumbnail = response.thumbnail ? response.thumbnail.source : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png';
    

    msg.channel.send({
      embed: {
        color: color,
        title: 'Wikipedia',
        description: description,
        fields: data,
        thumbnail: {
          url: thumbnail
        },
        footer: {
          text: 'Powered by Wikipedia'
        }
      }
    })
  }
};