//LazyBot, by FirstComrade17
const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "//";
const fs = require("fs");
var request = require('superagent');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
const moment = require('moment');
require("moment-duration-format");
var TOKEN = process.env.TOKEN;
var yt = require('ytdl-core');
var mongoose = require('mongoose');
 const NewsAPI = require('newsapi');
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("Connected!");
});

var serverSchema = mongoose.Schema({
    name: String}, {
   versionKey: false
});
var settings = mongoose.model('settings', serverSchema);
bot.on("ready", () => {
    bot.user.setGame(`//help //invite | ${bot.guilds.size} Servers!`);
    console.log("I am ready!");
});

bot.on("message", msg => {
    if (msg.content.startsWith(prefix + "nat")){
        const embed = new Discord.RichEmbed();
  const args = msg.content.split(" ").slice(1);
  const name = args.join("_");

  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY"); //This is better. 
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${name}&q=name+gdp+population+region+wa+flag+fullname+influence+census;mode=score;scale=66`);

  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
        .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
        .setTitle(`Nation Info for ${obj.NATION.NAME}`)
        .setDescription(obj.NATION.FULLNAME)
        .setThumbnail(`${obj.NATION.FLAG}`)
        .addField('Region', obj.NATION.REGION, true)
        .addField('Influence', obj.NATION.INFLUENCE, true)
        .addField('Population', obj.NATION.POPULATION * 10000000, true)
        .addField('Economy', "$" + obj.NATION.GDP, true)
        .addField('WA Status?', obj.NATION.UNSTATUS, true)
        .addField('Endorsement Count', Math.round(obj.NATION.CENSUS[0].SCALE[0].SCORE), true)
        .addField('Link', "http://www.nationstates.net/nation=" + name)
        .setFooter(`Generated on ${date} at ${time}. For more extensive information, type //more <nation name>`)
      msg.channel.sendEmbed(embed);
      
    })
  })
        .catch((err) => {
        if(err){
          msg.channel.sendMessage("\:x: " +  "`" + "Error: Invalid Nation" + "`");
        }
      })
} else if(msg.content.startsWith(prefix + "reg")){
  const embed = new Discord.RichEmbed();
  const args = msg.content.split(" ").slice(1);
  const name = args.join("_");
  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?region=${name}&q=founder+name+numnations+power+tags+flag+delegate`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor(obj.REGION.NAME, `${obj.REGION.FLAG}`)
      .setTitle(`Region Info for ${obj.REGION.NAME}`)
      .setDescription(`wew lad`)
      .setThumbnail(`${obj.REGION.FLAG}`)
      .addField(`Founder`, obj.REGION.FOUNDER, true)
      .addField(`Number of Nations`, obj.REGION.NUMNATIONS, true)
      .addField(`Power`, obj.REGION.POWER, true)
      .addField(`WA Delegate`, obj.REGION.DELEGATE, true)
      .addField(`Link`, "https://www.nationstates.net/region=" + name)
  .addField(`Tags`, obj.REGION.TAGS[0].TAG)
      .setFooter(`Generated on ${date} at ${time}`)
      msg.channel.sendEmbed(embed);
    })
  })
   .catch((err) => {
        if(err){
          msg.channel.sendMessage("\:x: " +  "`" + "Error: Invalid Region" + "`");
        }
      })
} else if(msg.content.startsWith(prefix + "emb")){
  
  const args = msg.content.split(" ").slice(1);
  const name = args.join("_");
   const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?region=${name}&q=name+embassies`);
 result.then((res) => {
    parseString(res.text, {ignoreAttrs : true, mergeAttrs : true}, (err, obj) => {
 msg.channel.sendMessage("", {embed: {
  color: 3447003,
  author: {
    name: "LazyBot",
    icon_url: bot.user.avatarURL,
  },
  title: `Embassies for ${obj.REGION.NAME}`,
  icon_url: bot.user.avatarURL,
  fields: [
    {
      name: 'Embassies',
      value: `${obj.REGION.EMBASSIES[0].EMBASSY}`,
      inline: true
}
   
  ],
}});
 
    })
    
    })
.catch((err) => {
  if(err){
    msg.channel.sendMessage("\:x: Error! Invalid region name or exceeded character limit(2000)!");
  }
 })
}
else if(msg.content.startsWith(prefix + "world")){
  const embed = new Discord.RichEmbed();
  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?q=numregions+numnations+featuredregion`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor('World Statistics', bot.user.avatarURL)
      .setTitle('NationStates.net')
      .setDescription('wew lad')
      .setThumbnail(bot.user.avatarURL)
      .addField('Number of Regions', obj.WORLD.NUMREGIONS, true)
      .addField('Number of Nations', obj.WORLD.NUMNATIONS, true)
      .addField('Today\'s Featured Region', obj.WORLD.FEATUREDREGION)
      .setFooter(`Generated on ${date} at ${time}`)
      msg.channel.sendEmbed(embed);
    })
  })
} else if(msg.content.startsWith(prefix + "more")){
  const embed = new Discord.RichEmbed();
  const args = msg.content.split(" ").slice(1);
  console.log(args);
  const name = args.join("_");
  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?nation=${name}&q=name+govtpriority+income+lastactivity+leader+tax+capital+category+flag+fullname+majorindustry`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
      .setTitle('More Nation Stats')
      .setDescription(`${obj.NATION.FULLNAME}`)
      .setThumbnail(`${obj.NATION.FLAG}`)
      .addField('Category', obj.NATION.CATEGORY, true)
      .addField('Government Priority', obj.NATION.GOVTPRIORITY, true)
      .addField('Major Industry', obj.NATION.MAJORINDUSTRY, true)
      .addField('Leader', obj.NATION.LEADER, true)
      .addField('Capital', obj.NATION.CAPITAL, true)
      .addField('Tax', obj.NATION.TAX, true)
      .addField('Average Income', obj.NATION.INCOME, true)
      .addField('Last Activity', obj.NATION.LASTACTIVITY, true)
      .setFooter(`Generated on ${date} at ${time}`)
      msg.channel.sendEmbed(embed);
    })
  })
   .catch((err) => {
        if(err){
          msg.channel.sendMessage("\:x: " +  "`" + "Error: Invalid Nation" + "`");
        }
      })
}
       
    else if(msg.content.startsWith(prefix + "stats")){
        const embed = new Discord.RichEmbed();
         const now = new Date();
         const date = moment(now).format("MMM/DD/YYYY");
         const time = moment(now).format("H:mm:ss");
        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        var quotes = [
    'Look ma! no hands', 'wew lad', 'never gonna give you up', 'REEEEEEEEEEEEEEEE', 'You\'re terminated!'
    ]
    
    const randomNumber = Math.floor(Math.random() * (quotes.length));
        embed.setColor(3447003)
        .setAuthor("LazyBot", `${bot.user.avatarURL}`)
        .setTitle("LazyBot Stats")
        .setDescription(`${quotes[randomNumber]}`)
        .setThumbnail(`${bot.user.avatarURL}`)
        .addField(`❯ Info`, `By FirstComrade17#6842`, true)
        .addField(`❯ Lib`, `Discord.js`, true)
        .addField(`❯ Bot Version`, `2.0`, true)
        .addField(`❯ Uptime`, `${duration}`, true)
        .addField(`❯ Memory`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        .addField(`❯ Servers`, `${bot.guilds.size.toLocaleString()}`, true)
        .addField(`❯ Channels`, `${bot.channels.size.toLocaleString()}`, true)
        .addField(`❯ Users`, `${bot.users.size.toLocaleString()}`, true)
         .setFooter(`Generated on ${date} at ${time}`)
        msg.channel.sendEmbed(embed);
    }else if(msg.content.startsWith(prefix + "help")){
        msg.author.sendMessage("__**LazyBot Commands**__ \n \n **//nat <nation name>** gives a bunch of nation info, type **//more <nation name>** for more nation info \n **//reg <region name>** gives info about a region \n **//desc <nation name>** gives a description of the nation's economy \n **//rphelp** brings up a list of RP commands \n **//invite** sends the url to invite this bot to your server \n **//testserv** sends an invite to my Bot HQ \n **//suggest** leave me a suggestion! \n **//emb <region name>** gives a list of embassies \n **//stats** gives all kinds of stats \n **//ping** Pong! \n **//wiki <input>** gives the wikipedia page of the input if it is valid \n **//funny** gives a random Cyanide & Happiness Comic \n **//serverinfo** gives info about the server \n **//kick <mention a user>** Kicks the mentioned user, only works if the kicker has kick member perms \n **//addrole <metion user> <role name>** Adds the given role to the mentioned user \n **//removerole <mention user> <role name>** same as //addrole but removes it \n **//news** will ask for a news outlet and will give the top four headlines \n Be on the lookout for easter eggs!");
      msg.reply("Help has arrived! Check your DMs!");
    } else if(msg.content === "RIP"){
        msg.channel.sendMessage("Yeah, RIP");
    } else if(msg.content === "Hail Satan"){
        msg.channel.sendFile("https://media2.giphy.com/media/77f2SrKYNOnYs/200_s.gif");
    } else if(msg.content === "Haha long boy"){
        msg.channel.sendFile("https://cdn.discordapp.com/attachments/219540913959993344/268360510896865281/image.jpg");
    } else if(msg.content === "dissolve the state"){
        msg.channel.sendFile("https://cdn.discordapp.com/attachments/219540913959993344/268361037240074240/image.jpg");
    } else if(msg.content === "Mother Prussia"){
        msg.channel.sendFile("https://cdn.discordapp.com/attachments/219540913959993344/268361057607614465/image.jpg");
    } else if(msg.content === "daddy dab"){
        msg.channel.sendFile("https://cdn.discordapp.com/attachments/219540913959993344/268361126243205121/image.jpg");
    } else if(msg.content === "catching mexicans"){
        msg.channel.sendFile("https://cdn.discordapp.com/attachments/219540913959993344/268520835826974720/image.png");
    } //else if(msg.content.startsWith(prefix + "info")){
        //msg.channel.sendMessage("```This bot is run by Melorian Republic, and was written in Javascript!```");
     else if(msg.content.startsWith(prefix + "industry")){
        let inputfour = msg.content.split(" ").slice(1);
        var namefive = inputfour.join("_");
        console.log(namefive);
        request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + namefive + '&q=majorindustry').end((err, res) => {
            console.log(res.text);
            var xml = res.text;
            var stripped = xml.replace(/(<([^>]+)>)/ig,"");
            console.log(stripped);
            msg.channel.sendMessage(namefive + "'s Major Industry: " + stripped);
        });
    } 
    else if(msg.content.startsWith(prefix + "desc")){
        let input = msg.content.split(" ").slice(1);
        var name = input.join("_");
        request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=industrydesc').end((err, res) => {
            console.log(res.text);
            var xml = res.text;
            var stripped = xml.replace(/(<([^>]+)>)/ig,"");
            console.log(stripped);
            msg.channel.sendMessage(stripped);
        });
    }  else if(msg.content=== (prefix + "rollone")){
        var diceOne  = Math.floor( Math.random() * 20) + 1;
        console.log(diceOne);
        msg.channel.sendMessage(diceOne);
    } else if (msg.content=== (prefix + 'rolltwo')){
        var diceOne = Math.floor( Math.random() * 20) + 1;
        var diceTwo = Math.floor(Math.random() * 20) + 1;
        console.log(diceOne);
        console.log(diceTwo);
        msg.channel.sendMessage(diceOne + " | " + diceTwo);
    }  else if (msg.content=== (prefix + "size")){
        let number = msg.guild.roles.find("name", "CTSN Member").members.size;
        msg.channel.sendMessage("There are " + number + " CTSN Members here!");
    }  else if (msg.content.startsWith(prefix + "armysize")){
        let args = msg.content.split(" ").slice(1);
        var name = args.join("_");""
        console.log(name);
        request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=population').end((err, res) => {
            //if(err) throw err;
            console.log(res.text);
            //var xml = res.text;
            var numbero = res.text.replace(/(<([^>]+)>)/ig,"");
            console.log(numbero);
            var size = (numbero * 1000000);
            console.log(size);
            var final = size * .05;
            console.log(final);
            var endresult = final.toLocaleString();
            console.log(endresult);
            msg.channel.sendMessage("Army Size: " + endresult);
        
            
        });
        
        
    } else if(msg.content === (prefix + "rphelp")){
        msg.channel.sendMessage("```\nList of RP Commands:\n //rollone \n //rolltwo \n" + "```");
    } else if(msg.content.startsWith(prefix + "invite")){
        msg.reply("Invite me to your server! https://discordapp.com/oauth2/authorize?client_id=259784917339078656&scope=bot&permissions=0");
    } else if(msg.content.startsWith(prefix + "testserv")){
        msg.reply("Come to my server! https://discord.gg/TmQQddz");
    } else if(msg.content.startsWith( prefix + "suggest")){
        let args = msg.content.split(" ").splice(1);
        console.log(args);
        var output = args.join(" ");
        console.log(output);
        bot.channels.get("264845260339806211").sendMessage("A suggestion was submitted from " + "**" + msg.member.guild.name + "**" + "```\n" + output + "\n```");

   

  msg.channel.sendMessage("Thank you for your suggestion! If you have any questions please join my server: https://discord.gg/TmQQddz");
    } else if(msg.content.startsWith(prefix + "ping")){
        msg.channel.sendMessage( 'Ping' ).then( message => {
        message.edit( `\:ping_pong: Pong! ( took: ${ message.createdTimestamp - msg.createdTimestamp } ms )` );
        }
    );
} else if(msg.content.startsWith(prefix + "wiki")){
  const args = msg.content.split(" ").slice(1);
const name = args.join("_");
 msg.channel.sendMessage("\:book: | https://en.wikipedia.org/wiki/" + name);
}
   else if(msg.content.startsWith(prefix + "funny")){
  const max = 4462;
    msg.channel.sendMessage('http://explosm.net/comics/' + (Math.floor(Math.random()* max) + 1));
} else if(msg.content.startsWith(prefix + "serverinfo")){
    let name = msg.guild.id;
    
    console.log(name);
    let embed = new Discord.RichEmbed();
    var emojis = bot.guilds.get(name).emojis.map(e => e).join(": ");
    if(emojis === undefined){
      emojis = "\u200b";
    }
    const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
    embed
    .setColor(3447003)
    .setAuthor(`${bot.guilds.get(name).name}`, bot.guilds.get(name).iconURL)
    .setTitle(`${bot.guilds.get(name).name}` , "Server Info")
    .setDescription("wew")
    .setThumbnail(bot.guilds.get(name).iconURL)
    .addField(`❯ Server ID`, name, true)
    .addField(`❯ Owner`, `${bot.guilds.get(name).owner}`, true)
    .addField(`❯ Region`, `${bot.guilds.get(name).region}`, true)
    .addField(`❯ Created On`, `${bot.guilds.get(name).createdAt}`, true)
    .addField(`❯ Member Count`, `${bot.guilds.get(name).memberCount}`, true)
    .addField(`❯ Default Channel`, `${bot.guilds.get(name).defaultChannel}`, true)
    .addField(`❯ Channels`, `${bot.guilds.get(name).channels.map(c => c.name).join(", ")}`)
    .addField(`❯ Roles`, `${bot.guilds.get(name).roles.map(r => r.name).join(", ")}`)
    .setFooter(`Generated on ` + date + ` at ` + time)
    msg.channel.sendEmbed(embed);
  
} else if(msg.content.startsWith(prefix + "announce")){
  if(msg.author.id != "213251218154192896") return;
  let args = msg.content.split(" ").splice(1);
  var announcement = args.join(" ");
  console.log(announcement);
  bot.guilds.forEach(guild => { guild.defaultChannel.sendMessage(announcement) });
}/* else if(msg.content.startsWith(prefix + "userinfo")){
    
    let embed = new Discord.RichEmbed();
    var name = msg.content.split(" ").splice(1);
    console.log(name);
    var final = name.join(" ");
    console.log(final);
    var username = bot.users.find('username', final).id;
   
    const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
    
    embed.setColor(3447003)
    .setAuthor(final, `${bot.users.get(username).avatarURL}`)
    .setTitle(`User Info for ${final}`)
    .setDescription('User info')
    .setThumbnail(`${bot.users.get(username).avatarURL}`)
    .addField('User ID', `${username}`, true)
    .addField('Nickname', bot.users.get(username).nickname, true)
    .addField('Account Created', `${bot.users.get(username).createdAt}`, true)
    .addField(`Joined Server at`, `${msg.guild.members.get(username).joinedAt}`, true)
    .addField('Playing', bot.users.get(username).presence.game != null ? bot.users.get(username).presence.game.name : "Nothing", true)
    .addField(`Discrim`, `${bot.users.get(username).discriminator}`, true)
    .addField(`Bot?`, `${bot.users.get(username).bot}`, true)
    .addField(`Roles`, `${msg.guild.members.get(username).roles.map(r => r.name).join(", ")}`, true)
    .setFooter(`Generated on ` + date + ` at ` + time)
    msg.channel.sendEmbed(embed);
    
  
}*/ else if(msg.content.startsWith(prefix + "kick")){
  if(!msg.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
    msg.reply("\:x: I do not have permission(Kick Members) to do that!");
  } else {
  if (!msg.member.hasPermission("KICK_MEMBERS")) {
   msg.reply("\:x: You do not have permission to do that!");
  } else {
    let userToKick = msg.mentions.users.first();
    msg.guild.member(userToKick).kick();
    msg.reply("\:white_check_mark: Kicked!");
  }
}
} else if(msg.content.startsWith(prefix + "createrole")){
  if(!msg.guild.member(bot.user).hasPermission("MANAGE_GUILD")){
    msg.reply("\:x: I do not have permission(Manage Roles) to do that!");
  } else {
  if(!msg.member.hasPermission("MANAGE_GUILD")){
    msg.reply("\:x: You do not have permission to do that!");
  } else{
  let args = msg.content.split(" ").slice(1);
  console.log(args);
  let rolename = args.join(" "); 
  console.log(rolename);
  let guild = msg.member.guild;
  guild.createRole({ name: rolename })
  .then(role => {
    msg.reply("\:white_check_mark: Role Created: " + rolename + "!");
  }).catch(console.error);
} 
}
} else if(msg.content.startsWith(prefix + "addrole")){
  if(!msg.guild.member(bot.user).hasPermission("MANAGE_GUILD")){
    msg.reply("\:x: I do not have permission(Manage Roles) to do that!");
  } else {
  if(!msg.member.hasPermission("MANAGE_GUILD")){
    msg.reply("\:x: You do not have permission to do that!");
  } else {
    console.log(msg.content);
    
    let args = msg.content.split(" ").splice(2);
    let name = args.join(" ");
    console.log(name);
    let role = msg.guild.roles.find("name", `${name}`);
    console.log(role);
    let member = msg.guild.member(msg.mentions.users.first());
    member.addRole(role).catch(console.error);
    msg.reply("\:white_check_mark: Role " + name + " added!");

  }
}
}  else if(msg.content.startsWith(prefix + "removerole")){
  if(!msg.guild.member(bot.user).hasPermission("MANAGE_GUILD")){
    msg.reply("\:x: I do not have permission(Manage Roles) to do that!");
  } else {
  if(!msg.member.hasPermission("MANAGE_GUILD")){
    msg.reply("\:x: You do not have permission to do that!");
  } else {
    console.log(msg.content);
    
    let args = msg.content.split(" ").splice(2);
    let name = args.join(" ");
    console.log(name);
    let role = msg.guild.roles.find("name", `${name}`);
    console.log(role);
    let member = msg.guild.member(msg.mentions.users.first());
    member.removeRole(role).catch(console.error);
    msg.reply("\:white_check_mark: Role " + name + " removed!");
}
  }
}  else if(msg.content.startsWith(prefix + "news")){
  msg.reply('Please enter a valid news key: cnn, the_washington_post, the_wall_street_journal, google-news, espn, reddit-r-all, or reuters')
  .then(() => {
  msg.channel.awaitMessages(response => response.content === "cnn" || response.content === "the_washington_post" || response.content === "the_wall_street_journal" || response.content === "google-news" || response.content === "espn" || response.content === "reddit-r-all" || response.content === "reuters", {
    max: 1,
    time: 12000,
    errors: ['time'],
  })
  .then((collected) => {
    console.log(collected.first().content);
    const embed = new Discord.RichEmbed();
    newsapi.articles({
    source: collected.first().content, // required
    sortBy: 'top' // optional
  }).then(articlesResponse => {
    console.log(articlesResponse);
 
      embed.setColor(3447003)
      .setTitle(`Latest News for ${collected.first().content}`)
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
   

} else if (msg.content.startsWith(prefix + "purge")) {
  if(!msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){
    msg.reply("\:x: I do not have permission(Manage Messages) to do that!");
  } else {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")){
    msg.reply("\:x: You do not have permission to do that!");
    }   else {
    let params = msg.content.split(" ").slice(1);
    let messagecount = parseInt(params[0]);
    msg.channel.fetchMessages({limit: messagecount})
        .then(messages => msg.channel.bulkDelete(messages));
        }
    }
}/* else if(msg.content.startsWith(prefix + "enablewelcome")){
    var guildfrom = msg.member.guild.id;
    var check = new settings({ name: guildfrom + " enabled" });
    check.save(function (err, fluffy) {
  if (err) return console.error(err);
});
    msg.channel.sendMessage("Welcome message enabled!"); 
} else if(msg.content.startsWith(prefix + "disablewelcome")){
    let guildid = msg.member.guild.id;
 var query = {'name': guildid + " enabled"};
newData = { 'name': guildid + " disabled"};
settings.findOneAndUpdate(query, newData, {upsert:true}, function(err, doc){
    if (err) return console.log("Error");
    return console.log("succesfully saved");
});   
    msg.channel.sendMessage("Welcome message disabled!");
}*/
});

process.on("unhandledRejection", err => {
    console.error(`Uncaught Promise Error: \n + ${err.stack}`);
});

bot.on('guildCreate', Guild => {
  let toSend = [
 "\:white_check_mark: I've been invited to this server: " + Guild.name,
  "Guild ID: " + Guild.id,
  "Guild Members Count: " + Guild.memberCount,
  "Guild Region: " + Guild.region
];

bot.channels.get("263423925017378816").sendMessage(toSend);
});
bot.on('guildDelete', Guild => {
  let toSend = [
    "\:x: I've been removed from: " + Guild.name,
    "Guild ID: " + Guild.id,
"Guild Members Count: " + Guild.memberCount,
  "Guild Region: " + Guild.region
];

bot.channels.get("263423925017378816").sendMessage(toSend);
});
bot.on('guildMemberAdd', member => {
 
  let guildid = member.guild.id;
  
     /* function getPerms(res){
    var perms = function(res){
        return function(err, data){
            if (err){
                console.log('error occured');
                return;
            }
            
            console.log(data);
        }
    }

    var final = settings.find({'name': guildid + " enabled"},perms(res));
    console.log(final);
    var enabled = final.search("enabled");
    if(enabled === 7){*/
       let guild = member.guild;
    var msg;
    msg = `Welcome ${member} to ${member.guild.name}`;
    guild.defaultChannel.sendMessage(msg);
   /* } else {
  console.log("Error message disabled!");
    }
*/



});
bot.on('guildMemberRemove', member => {
  let guild = member.guild;
    var msg; 
    msg = `See ya later ${member}!`;
    guild.defaultChannel.sendMessage(msg);
});



bot.login(TOKEN);
