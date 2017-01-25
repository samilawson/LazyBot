exports.run = (bot, msg, params = []) => {
	 if (!params[0]) {
   msg.author.sendMessage("__**LazyBot Commands**__ \n \n **//nat <nation name>** gives a bunch of nation info, type **//more <nation name>** for more nation info \n **//reg <region name>** gives info about a region \n **//desc <nation name>** gives a description of the nation's economy \n **//rphelp** brings up a list of RP commands \n **//invite** sends the url to invite this bot to your server \n **//testserv** sends an invite to my Bot HQ \n **//suggest** leave me a suggestion! \n **//emb <region name>** gives a list of embassies \n **//stats** gives all kinds of stats \n **//ping** Pong! \n **//wiki <input>** gives the wikipedia page of the input if it is valid \n **//funny** gives a random Cyanide & Happiness Comic \n **//serverinfo** gives info about the server \n **//kick <mention a user>** Kicks the mentioned user, only works if the kicker has kick member perms \n **//addrole <metion user> <role name>** Adds the given role to the mentioned user \n **//removerole <mention user> <role name>** same as //addrole but removes it \n **//news** will ask for a news outlet and will give the top four headlines \n **//clock** gives a world clock \n **//reddit** allows you to search a subreddit and get the 5 newest posts \n Be on the lookout for easter eggs!");
      msg.reply("Help has arrived! Check your DMs!");
  } else {
  let command = params[0];
  if(bot.commands.has(command)) {
    command = bot.commands.get(command);
    msg.channel.sendCode("asciidoc", `= ${command.help.name} = \n${command.help.description}\nusage ::` + "//" + `${command.help.usage}`);
}
}
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "help",
  description: "Gives a list of commands!",
  usage: "help"
};
