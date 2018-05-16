const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const fs = require('fs');
const unames = JSON.parse(fs.readFileSync("./uname.json", "utf8"));
const request = require('superagent');
const Canvas = require('canvas-prebuilt');
const path = require('path');
const https = require('https')
const getProp = require('dotprop');
const lastfmapi = require('lastfmapi')
const lfm = new lastfmapi({
  'api_key': '1336029958418997879ebb165f5fbb3f'
})
module.exports = class FmImageCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'fmi',
      group: 'util',
      memberName: 'fmi',
      description: 'Shows your last.fm now playing on an image!',
      
      examples: ['fmi']
      
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
        let toImage = "";
        // WILL REWRITE 
     //var trackStream = lastfm.stream(`${unames[message.author.id].username}`);
     /*const result = request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${unames[msg.author.id].username}&api_key=1336029958418997879ebb165f5fbb3f&format=json&limit=1`);
     result.then((res) => {
         //parseString(res.text, (err, obj) => {
       const track = res.body.recenttracks.track[0];
       //const track = tracks[0];
        artist = track.artist['#text'];
        trackName = track.name;
       //let timestamp = new Date().getTime();
        album = track.album['#text'];
        cover = track.image[1]['#text'];
     })
     //})
     */
       const info = request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${unames[msg.author.id].username}&api_key=1336029958418997879ebb165f5fbb3f&format=json`);
       info.then((res) => {
        console.log(res.body.user.image[2]['#text'])
        toImage = res.body.user.image[2]['#text']
       })       
         
   
      const download = function(url){
       request.get(url).on('response', function(response){
         console.log(response.statusCode)
         console.log(response.headers['content-type'])
       }).pipe(fs.createWriteStream(path.join(__dirname, 'userAvatar.png')))
       
      
    }
    await download(toImage);
        
      

       const Image = Canvas.Image;
       const canvas = new Canvas(600, 150);
       const ctx = canvas.getContext('2d');
         const base =  new Image();
         const userAvatar =  new Image();
         const albumCover =  new Image();
         const generate = () => {
          
            ctx.drawImage(base, 0, 0);
           
           //ctx.createLinearGradient(0,0,600,150)
          userAvatar.onload = function(){
            ctx.drawImage(userAvatar, 530, 80, 590, 140);
          }
           albumCover.onload = function(){     
             ctx.drawImage(albumCover, 15, 15, 132, 132);
           }
             ctx.fillText(artist, 148, 80, 246);
             ctx.fillText(trackName, 148, 40, 246);
             ctx.fillText(album, 148, 120, 246);
             const imgData = ctx.getImageData(530, 80, 590, 140);
             const data = imgData.data;
             /*for (let i = 0; i < data.length; i += 4) {
                 data[i] = Math.max(255, data[i]);
             }*/
             ctx.putImageData(imgData, 530, 80);
             
         };
         base.src = await fs.readFileAsync(path.join(__dirname, 'base.png'));
         albumCover.src =  cover;
         userAvatar.src =  await fs.readFileAsync(path.join(__dirname, 'userAvatar.png'));
         //userAvatar.src = await userImage.image[1]['#text'];
         generate();
         var buf =  canvas.toBuffer()
         var toSend = fs.writeFileSync("test.png", buf);
         return msg.channel.send('', {file: 'test.png'})
         .catch(err => msg.channel.send(`${err,name}: ${err.message}`))
        }
    
    
  

  

 }
     
 

};