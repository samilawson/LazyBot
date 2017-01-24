exports.run = (bot, msg, params = []) => {
  var newsAgency;
    if(params === "CNN"){
      newsAgency = "cnn";
    } else if(params === "BBC"){
      newsAgency = "bbc-news";
    } else if(params === "CNBC"){
      newsAgency = "cnbc";
    } else if(params === "Google"){
      newsAgency = "google-news";
    } else if(params === "ESPN"){
      newsAgency = "espn";
    } else if(params === "Reddit"){
      newsAgency = "reddit-r-all";
    } else if(params === "Reuters"){
      newsAgency = "reuters";
    }
    const embed = new Discord.RichEmbed();
    newsapi.articles({
    source: newsAgency, // required
    sortBy: 'top' // optional
  }).then(articlesResponse => {
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