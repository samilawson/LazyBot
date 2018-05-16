const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const fs = require('fs');
const unames = JSON.parse(fs.readFileSync("./data/unames.json", "utf8"));
const request = require('superagent');
const yt = require('youtube-dl');

module.exports = class FmYtCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'fmyt',
      group: 'util',
      memberName: 'fmyt',
      description: 'Sends a youtube link to your now playing on last.fm!',
      
      examples: ['fmyt']
      
    })
  }

  async run(msg) {
    if(!unames[msg.author.id]){
        msg.channel.send(`@${msg.author.id}, you don't seem to have your username set! Type !register *username* to set it!`);

    }else{
        const result = request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${unames[msg.author.id].username}&api_key=1336029958418997879ebb165f5fbb3f&format=json&limit=1`);
        result.then((res) => {
            //parseString(res.text, (err, obj) => {
          const track = res.body.recenttracks.track[0];
          const searchTerm = "ytsearch:"+track.name + " " + track.artist['#text'];
          yt.getInfo(searchTerm, [ '-q', '--skip-download', '--no-warnings', '--format=bestaudio[protocol^=http]' ], (err, info) => {
            if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
              let errorMessage;
              if (err && err.stack.includes('No video results')) {
                errorMessage = "Video not found!";
              } else {
                  errorMessage = "Oops! Something went wrong!";
              }
              msg.say(errorMessage);
            }
            msg.channel.send(`${info.title}` + ` (views: ${info.view_count})` + ' https://youtu.be/' + info.id);
        });

        });
    }
  }
};