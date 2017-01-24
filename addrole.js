exports.run = (bot, msg, params = []) => {
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
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "addrole",
  description: "Adds a role to the given member.",
  usage: "addrole @user <role name>"
};