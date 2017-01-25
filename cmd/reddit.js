const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
var r = require("nraw");
var Reddit = new r("Testbot v0.0.1 by FirstComrade17");
exports.run = (bot, msg, params = []) => {
  Reddit.subreddit(params).new().limit(5).exec(function(data){
   
    console.log(data.data.children[0].data.title);
    const embed = new Discord.RichEmbed();
  
  embed.setColor(3447003)
     
      .setTitle(`Latest Posts for: ${data.data.children[0].data.subreddit}`)
      .setThumbnail(`${data.data.children[0].data.thumbnail}`)
      .addField(`\u200b`, `[${data.data.children[0].data.title}](${data.data.children[0].data.url})`, true)
      .addField(`\u200b`, `[${data.data.children[1].data.title}](${data.data.children[1].data.url})`, true)
      .addField(`\u200b`, `[${data.data.children[2].data.title}](${data.data.children[2].data.url})`, true)
      .addField(`\u200b`, `[${data.data.children[3].data.title}](${data.data.children[3].data.url})`, true)
      .addField(`\u200b`, `[${data.data.children[4].data.title}](${data.data.children[4].data.url})`, true)
      msg.channel.sendEmbed(embed);
       })
    
  

};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "reddit",
  description: "Gets the five newest posts from a subreddit(somewhat unstable).",
  usage: "reddit <subredditname>"
};
