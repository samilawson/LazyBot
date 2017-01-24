exports.run = (bot, msg, params = []) => {
   if(!msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){
    msg.reply("\:x: I do not have permission(Manage Messages) to do that!");
  } else {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")){
    msg.reply("\:x: You do not have permission to do that!");
    }   else {
    
    let messagecount = parseInt(params[0]);
    msg.channel.fetchMessages({limit: messagecount})
        .then(messages => msg.channel.bulkDelete(messages));
        }
    }
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["prune"],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "purge",
  description: "Purges the specified amount of messages from the chat.",
  usage: "purge <1-100>"
};
