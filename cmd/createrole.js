exports.run = (bot, msg, params = []) => {
   if(!msg.guild.member(bot.user).hasPermission("MANAGE_GUILD")){
    msg.reply("\:x: I do not have permission(Manage Roles) to do that!");
  } else {
  if(!msg.member.hasPermission("MANAGE_GUILD")){
    msg.reply("\:x: You do not have permission to do that!");
  } else{
 
  let rolename = params.join(" "); 
  console.log(rolename);
  let guild = msg.member.guild;
  guild.createRole({ name: rolename })
  .then(role => {
    msg.reply("\:white_check_mark: Role Created: " + rolename + "!");
  }).catch(console.error);
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
  name : "createrole",
  description: "Creates a role(no perms).",
  usage: "createrole <role name>"
};
