const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const fs = require("fs");
const moment = require("moment");
require("moment-duration-format");
const path = require('path');
module.exports = class WarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            group: 'moderation',
            memberName: 'warn',
            description: 'Warns the given user.',
            examples: ['warn @user'],
            guildOnly: true,
            args: [
        {
                    key: 'member',
                    prompt: 'What user would you like to warn?',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'Why are you warning this user?\n',
                    type: 'string'
}
      ]
        });
    }
    hasPermission(msg) {
        return msg.member.hasPermission('KICK_MEMBERS');
}
      async run(msg, args) {
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data/servers.json'), 'utf8'));
        const { member, reason } = args;
        if (member.user.id === this.client.user.id) return msg.reply(':no_entry_sign: I can\'t warn myself \\:P');

    const modlogData = data[msg.guild.id] ? data[msg.guild.id] : {modlog: 'disabled'};
        if (modlogData.modlog === 'disabled') {
            msg.reply(`:no_entry_sign: The modlog must be enabled for me to issue warnings. Type, \`${this.client.commandPrefix}toggle modlog\` to enable it.`);
        } else
        if (modlogData.modlog === 'enabled') {
            const embed = new RichEmbed();
            const today = new Date();
            const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const channel = msg.guild.channels.find('name', 'mod-log').id;
            embed.setColor(0xFFFF00)
                   .setAuthor(member.user.username, member.user.avatarURL)
                     .setTitle('User Warned:')
                     .setDescription(`${member.user.username}#${member.user.discriminator} (${member.user.id})`)
                     .addField('Reason:', reason)
                     .addField('Responsible Moderator:', `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`)
                     .setFooter(`${date} at ${time}`);
            this.client.channels.get(channel).send({ embed }).catch(err => {
                return msg.reply(':no_entry_sign: **Error:** I couldn\'t send the warning embed in the #mod-log. Please make sure I have access to a channel called mod-log!');
            });
            msg.say(`<@${member.user.id}>, :no_entry_sign: This is a warning!\n${reason}`);
        } else {
            msg.reply(`:no_entry_sign: The modlog must be enabled for me to issue warnings. Type, \`${this.client.commandPrefix}toggle modlog\` to enable it.`);
}



      }
  };