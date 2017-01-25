const Discord = require("discord.js");
  const NewsAPI = require('newsapi');
let newsapi = new NewsAPI('0b3a687275104852a2b8e5c013dbc3b5');
exports.run = (bot, msg, params = []) => {
  
   msg.reply('Please enter a valid news key: CNN, Washingon Post, WSJ (Wall Street Journal), google, espn, Reddit, or Reuters')
  .then(() => {
  msg.channel.awaitMessages(response => response.content === "CNN" || response.content === "Washington Post" || response.content === "WSJ" || response.content === "google" || response.content === "espn" || response.content === "Reddit" || response.content === "Reuters", {
    max: 1,
    time: 15000,
    errors: ['time'],
  })
  .then((collected) => {
    console.log(collected.first().content);
    var newsAgency;
    if(collected.first().content === "CNN"){
      newsAgency = "cnn";
    } else if(collected.first().content === "Washington Post"){
      newsAgency = "the_washington_post";
    } else if(collected.first().content === "WSJ"){
      newsAgency = "the_wall_street_journal";
    } else if(collected.first().content === "google"){
      newsAgency = "google-news";
    } else if(collected.first().content === "espn"){
      newsAgency = "espn";
    } else if(collected.first().content === "Reddit"){
      newsAgency = "reddit-r-all";
    } else if(collected.first().content === "Reuters"){
      newsAgency = "reuters";
    }
    const embed = new Discord.RichEmbed();
    newsapi.articles({
    source: newsAgency, // required
    sortBy: 'top' // optional
  }).then(articlesResponse => {
    console.log(articlesResponse);
 
      embed.setColor(3447003)
      .setTitle(`Latest News for ${newsAgency}`)
      .setThumbnail(`http://www.vtc.edu/sites/default/files/news-3.jpg`)
      .addField(`Headline`, `${articlesResponse.articles[0]["title"]}`, true)
      .addField(`Link`, `${articlesResponse.articles[0]["url"]}`, true)
      .addField(`Headline`, `${articlesResponse.articles[1]["title"]}`, true)
      .addField(`Link`, `${articlesResponse.articles[1]["url"]}`, true)
      .addField(`Headline`, `${articlesResponse.articles[2]["title"]}`, true)
      .addField(`Link`, `${articlesResponse.articles[2]["url"]}`, true)
      .addField(`Headline`, `${articlesResponse.articles[3]["title"]}`, true)
      .addField(`Link`, `${articlesResponse.articles[3]["url"]}`, true)
      msg.channel.sendEmbed(embed);
      
    })
    })
    .catch(() => {
      msg.channel.sendMessage('\:x: Oops! Something went wrong!');
    })
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
