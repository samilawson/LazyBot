const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "//";
const TOKEN = process.env.TOKEN;
const parser = require('rss-parser');
bot.on("ready", () => {
    bot.user.setGame(`Welcome to Model Grassroots!`);
    console.log("I am ready!");
});

bot.on("message", msg => {

if(msg.content.startsWith(prefix + "info")){
	msg.channel.sendMessage("Grassrootsbot, a pathetically simple bot written in javascript by FirstComrade17. (lib = discord.js");
}
parser.parseURL('https://www.reddit.com/r/modelgrassroots/.rss', function(err, parsed) {
  console.log(parsed.feed.title);
  parsed.feed.entries.forEach(function(entry) {
    console.log(entry.title + ':' + entry.link);
    
  })
})
});

bot.on('guildMemberAdd', member => {
  let guild = member.guild;
    var msg;
    msg = `Welcome ${member} to ${member.guild.name}`;
    guild.defaultChannel.sendMessage(msg);
    let role = member.guild.roles.find("name", "Member").id;
    member.addRole(role);
});
bot.on('guildMemberRemove', member => {
  let guild = member.guild;
    var msg; 
    msg = `See ya later ${member}!`;
    guild.defaultChannel.sendMessage(msg);
});




bot.login("MjcwNzAyMzY1NDA3OTY5Mjgx.C2AjUw.klef0D5nBWGeZHnfv98yXGH5e20");
//rss-parser v2.5.2
//cd C:\Users\Sam L\Documents\GitHub\LazyBot