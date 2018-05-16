const { RichEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

exports.run = (client, member) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data/servers.json')));
  const guild = member.guild;

  if (!data[guild.id]) data[guild.id] = {"joinDM": "disabled"};
  if (data[guild.id].joinDM && data[guild.id].joinDM !== 'disabled') member.send(data[guild.id].joinDM);

  if (!data[guild.id]) data[guild.id] = {"joinMessage": "disabled"};
  if (data[guild.id].joinMessage && data[guild.id].joinMessage !== 'disabled') {
    let joinMessage = data[guild.id].joinMessage;
    if (data[guild.id].joinMessage.includes('{user}')) {
      let message = joinMessage.replace('{user}', member.user);
      guild.defaultChannel.send(message);
    } else {
      guild.defaultChannel.send(joinMessage);
    }
  }

  if (!data[guild.id]) data[guild.id] = {"joinRole": "disabled", "joinlog": "disabled"};
  if (data[guild.id].joinRole && data[guild.id].joinRole !== 'disabled') {
    let joinRole = data[guild.id].joinRole;
    let role = guild.roles.find('name', joinRole);
    if (!role) return guild.defaultChannel.send(`:no_entry_sign: **Error:** Couldn't add join role. Reason: \`${joinRole}\` isn't a role on this server!`);
    if (!guild.member(client.user).hasPermission('ADMINISTRATOR')) return guild.defaultChannel.send(':no_entry_sign: **Error:** I couldn\'t add the join role because I don\'t have the **Manage Roles** permission!');
    if (data[guild.id].joinlog) {
      if (member.user.bot) return guild.channels.find('name', 'join-log').send(`Didn't add the join role to **${member.user.username}** because it is a bot.`);
        member.addRole(role.id);
        guild.channels.find('name', 'join-log').send(`Added the join role of \`${joinRole}\` to **${member.user.username}**.`);
    } else if (!data[guild.id].joinlog) {
        if (member.user.bot) return;
          member.addRole(role);
      }
  }

  
}