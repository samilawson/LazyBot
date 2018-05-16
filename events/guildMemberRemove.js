const { RichEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

exports.run = (client, member) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data/servers.json')));
  const guild = member.guild;

  if (!data[guild.id]) data[guild.id] = {"leaveMessage": "disabled"};
  if (data[guild.id].leaveMessage && data[guild.id].leaveMessage !== 'disabled') {
    let leaveMessage = data[guild.id].leaveMessage;
    if (leaveMessage.includes('{user}')) {
      let message = leaveMessage.replace('{user}', member.user);
      guild.defaultChannel.send(message);
    } else {
      guild.defaultChannel.send(leaveMessage);
    }
  }


}