const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
  const NewsAPI = require('newsapi');
let newsapi = new NewsAPI('0b3a687275104852a2b8e5c013dbc3b5');
exports.run = (bot, msg, params = []) => {
  const news = params[1];
  /* msg.reply('Please enter a valid news key: CNN, Washingon Post, WSJ (Wall Street Journal), google, espn, Reddit, or Reuters')
  .then(() => {
  msg.channel.awaitMessages(response => response.content === "CNN" || response.content === "Washington Post" || response.content === "WSJ" || response.content === "google" || response.content === "espn" || response.content === "Reddit" || response.content === "Reuters", {
    max: 1,
    time: 15000,
    errors: ['time'],
  })
  .then((collected) => {
    console.log(collected.first().content); */
    var newsAgency;
    if(news === "CNN"){
      newsAgency = "cnn";
    } else if(news === "Washington Post"){
      newsAgency = "the-washington-post";
    } else if(news === "WSJ"){
      newsAgency = "the-wall-street-journal";
    } else if(news === "google"){
      newsAgency = "google-news";
    } else if(news === "espn"){
      newsAgency = "espn";
    } else if(news === "Reddit"){
      newsAgency = "reddit-r-all";
    } else if(news === "Reuters"){
      newsAgency = "reuters";
    } 
    const embed = new Discord.RichEmbed();
    newsapi.articles({
    source: newsAgency, // required
    sortBy: 'top' // optional
    })
  .then(articlesResponse => {
    console.log(articlesResponse);
 
     embed.setColor(3447003)
      .setTitle(`Latest News for ${params}`)
      .setThumbnail(`${articlesResponse.articles[0]["urlToImage"]}`)
      .addField(`Top Headlines`, `[${articlesResponse.articles[0]["title"]}](${articlesResponse.articles[0]["url"]})`, true)
       .addField(`\u200b`,`[${articlesResponse.articles[1]["title"]}](${articlesResponse.articles[1]["url"]})`, true)
      .addField(`\u200b`,`[${articlesResponse.articles[2]["title"]}](${articlesResponse.articles[2]["url"]})`, true)
      .addField(`\u200b`,`[${articlesResponse.articles[3]["title"]}](${articlesResponse.articles[3]["url"]})`, true)
      .addField(`\u200b`,`[${articlesResponse.articles[4]["title"]}](${articlesResponse.articles[4]["url"]})`, true)
      msg.channel.sendEmbed(embed);
      
      
    })
    })
    .catch(() => {
      msg.channel.sendMessage('\:x: Oops! Something went wrong!');
    
})
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "news",
  description: "Gives news for CNN, BBC, CNBC, Google, ESPN, Reddit, or Reuters.",
  usage: "news <CNN>"
};
