//http://www.tapmusic.net/collage.php?user=FirstComrade17&type=7day&size=5x5&caption=true
const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const http = require('http');
const fs = require('fs');
const unames = JSON.parse(fs.readFileSync("./data/unames.json", "utf8"));

module.exports = class ChartCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'chart',
      group: 'util',
      memberName: 'chart',
      description: 'Sends your lastfm chart (based on your inputted time period)!',
      
      examples: ['chart username'],
      args: [
        {
          key: 'time period',
          prompt: 'What time period would you like to display? (Defaults to 7 days)',
          type: 'string',
          default: '7day',
          validate: text => {
            if(text == "7day" || text == "1month" || text == "3month" || text == "6month" || text == "12month" || text == "overall") return true;
            return "Error, parameter must match 7day, 1month, 3month, 6month, 12month, or overall!"
          }

        }
      ]
      
    })
  }

  async run(msg, args) {
    if(!unames[msg.author.id]){
        msg.channel.send(`@${msg.author.id}, you don't seem to have your username set! Type !register *username* to set it!`);
    }else{
      
    var file = fs.createWriteStream("file.jpg");
    var request = await http.get(`http://www.tapmusic.net/collage.php?user=${unames[msg.author.id].username}&type=${args}&size=5x5&caption=true`, function(response) {
   response.pipe(file);
  setTimeout(function(){msg.say('', {file: 'file.jpg'})}, 3000);
});
  }
}
};