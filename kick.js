exports.run = (bot, msg, params = []) => {
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
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "kick",
  description: "Kick command.",
  usage: "kick @user"
};