const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const fs = require("fs");
const path = require("path");
module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'moderation',
      memberName: 'kick',
      description: 'Kicks the given user!',
      
      examples: ['kick @user reason'],
      args: [
        {
          key: 'member',
          prompt: 'Which user would you like to kick?',
          type: 'member'
        },
        {
          key: 'reason',
          prompt: 'What is the reason you kicked this user?',
          type: 'string',
          default: ''
        }
]
      
    })

  }

  async run(msg, args) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data/servers.json'), 'utf8'));
const { member, reason } = args;
    if (member.user.id === this.client.user.id) return msg.reply(':no_entry_sign: I can\'t kick myself \\:P');
    const botMember = await msg.guild.fetchMember(this.client.user);
    if (!botMember.hasPermission('KICK_MEMBERS')) return msg.reply(':no_entry_sign: I don\'t have **Kick Members** permission!');
   
    const m = await msg.say('*Kicking user...*');
    await member.kick();
    const modlogData = data[msg.guild.id] ? data[msg.guild.id] : {modlog: 'disabled'};
    if (modlogData.modlog === 'disabled') {
      m.edit(`**${member.user.username}**#${member.user.discriminator} has been kicked.`);
    } else
    if (modlogData.modlog === 'enabled') {
      const embed = new RichEmbed();
      const today = new Date();
      const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const channel = msg.guild.channels.find('name', 'mod-log').id;
      embed.setColor(0xFFA500)
           .setAuthor(member.user.username, member.user.avatarURL)
           .setTitle('User Kicked:')
           .setDescription(`${member.user.username}#${member.user.discriminator} (${member.user.id})`)
           .addField('Reason:', reason)
           .addField('Responsible Moderator:', `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`)
           .setFooter(`${date} at ${time}`);
      this.client.channels.get(channel).send({ embed }).catch(err => {
        return msg.reply(':no_entry_sign: **Error:** I couldn\'t send the kick embed in #mod-log. Please make sure I have access to #mod-log!');
      });
      m.edit(`**${member.user.username}**#${member.user.discriminator} has been kicked and logged in the #mod-log.`);
    } else {
      m.edit(`**${member.user.username}**#${member.user.discriminator} has been kicked.`);
}
  }
};