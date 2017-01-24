exports.run = (bot, msg, params = []) => {
  
        var output = params.join(" ");
        
        bot.channels.get("264845260339806211").sendMessage("A suggestion was submitted from " + "**" + msg.member.guild.name + "**" + "```\n" + output + "\n```");

   

  msg.channel.sendMessage("Thank you for your suggestion! If you have any questions please join my server: https://discord.gg/TmQQddz");
    
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["suggestion"],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "suggest",
  description: "Allows you to send in a suggestion for the bot!",
  usage: "suggest <Suggestion here>"
};