const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const fs = require('fs');
const unames = JSON.parse(fs.readFileSync("./uname.json", "utf8"));
const request = require('superagent');


module.exports = class FMCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'fm',
      group: 'util',
      memberName: 'fm',
      description: 'Shows your current song on last.fm!',
      
      examples: ['fm']
      
    })
  }

  async run(msg) {
    if(!unames[msg.author.id]){
        msg.channel.send(`@${msg.author.id}, you don't seem to have your username set! Type !register *username* to set it!`);

    }else{
        let artist = "";
        let trackName = "";
        let album = "";
        let cover = "";
     //var trackStream = lastfm.stream(`${unames[message.author.id].username}`);
     const result = request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${unames[msg.author.id].username}&api_key=1336029958418997879ebb165f5fbb3f&format=json&limit=1`);
     result.then((res) => {
         
       const track = res.body.recenttracks.track[0];
       //const track = tracks[0];
        artist = track.artist['#text'];
        trackName = track.name;
       //let timestamp = new Date().getTime();
        album = track.album['#text'];
       cover = track.image[0]['#text'];
       let url = 'https://www.last.fm/user/' + unames[msg.author.id].username;
         const embed = new RichEmbed()
         .setColor(3447003)
         .setThumbnail(track.image[0]['#text'])
         .addField(`Now playing:`,`**[${unames[msg.author.id].username}](${url})**` + ` | **${trackName}** by *${artist}*, from *${album}*`,true)
         
        
         msg.channel.send({embed});
     
        })
    
}
  }
};
//https://www.last.fm/user/