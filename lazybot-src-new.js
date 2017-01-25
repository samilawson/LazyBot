const Discord = require("discord.js");
const bot = new Discord.Client({ fetchAllMembers: true });
const fs = require("fs");
const moment = require("moment");
var request = require('superagent');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
require("moment-duration-format");
var r = require("nraw");
var Reddit = new r("Testbot v0.0.1 by FirstComrade17");
 const NewsAPI = require('newsapi');
let newsapi = new NewsAPI('0b3a687275104852a2b8e5c013dbc3b5');

const TOKEN = process.env.TOKEN;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.commandInhibitors = new Discord.Collection();
bot.functions = {};
const prefix = "//";
// Load the contents of the `/cmd/` folder and each file in it.
fs.readdir("./functions/core", (err, files) => {
  bot.functions.core = {};
  if (err) console.error(err);
  files.forEach(f=> {
    let name = f.split(".")[0];
    bot.functions.core[name] = require(`./functions/core/${f}`);
  });
  console.log(`Loaded ${files.length} core functions`);
 
  bot.functions.core.loadCommands(bot);
 
});
fs.readdir(`./cmd/`, (err, files) => {
  if(err) console.error(err);
  console.log(`Loading a total of ${files.length} commands.`);
  // Loops through each file in that folder
  files.forEach(f=> {
    // require the file itself in memory
    let props = require(`./cmd/${f}`);
    console.log(`Loading Command: ${props.help.name}. :ok_hand:`);
    // add the command to the Commands Collection
    bot.commands.set(props.help.name, props);
    // Loops through each Alias in that command
    props.conf.aliases.forEach(alias => {
      // add the alias to the Aliases Collection
      bot.aliases.set(alias, props.help.name);
    });
  });
});

bot.on('message', msg => {
  // Ignore message with no prefix for performance reasons
  if(!msg.content.startsWith(prefix)) return;
  // Get the command by getting the first part of the message and removing  the prefix.
  var command = msg.content.split(" ")[0].slice(prefix.length);
  // Get the params in an array of arguments to be used in the bot
  var params = msg.content.split(" ").slice(1);
  // run the `elevation` function to get the user's permission level
 
  let cmd;
  // Check if the command exists in Commands
  if (bot.commands.has(command)) {
    // Assign the command, if it exists in Commands
    cmd = bot.commands.get(command)
  // Check if the command exists in Aliases
  } else if (bot.aliases.has(command)) {
    // Assign the command, if it exists in Aliases
    cmd = bot.commands.get(bot.aliases.get(command));
  }

  if(cmd) {
    // Check user's perm level against the required level in the command
    if (perms < cmd.conf.permLevel) return;
    // Run the `exports.run()` function defined in each command.
    cmd.run(bot, msg, params);
  }
});

bot.on("ready", () => {
  console.log(`Lazybot: Ready to serve ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);
  bot.user.setGame(`//help //invite | ${bot.guilds.size} Servers!`);
});

bot.on("error", console.error);
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
 
       let guild = member.guild;
    var msg;
    msg = `Welcome ${member} to ${member.guild.name}`;
    guild.defaultChannel.sendMessage(msg);
});
bot.on('guildMemberRemove', member => {
  let guild = member.guild;
    var msg; 
    msg = `See ya later ${member}!`;
    guild.defaultChannel.sendMessage(msg);
});


bot.login(TOKEN);
