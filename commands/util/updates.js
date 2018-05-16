const { Command } = require('discord.js-commando');

module.exports = class UpdatesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'updates',
      group: 'util',
      memberName: 'updates',
      description: 'Gives you the updates role at LazyBot HQ.',
      details: 'Only used for LazyBot HQ.',
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  async run(msg) {
    if (msg.guild.id !== '216659428915544064') return;
    const role = msg.guild.roles.find('name', 'updates');
    if (msg.member.roles.has(role.id)) {
        msg.member.removeRole(role).catch(e => { msg.reply(e) });
        msg.reply(':no_entry_sign: You will no longer recieve updates on this server.')
    } else if (!msg.member.roles.has(role.id)) {
        msg.member.addRole(role).catch(e => { msg.reply(e) });
        msg.reply(':white_check_mark: You will now recieve updates on this server.');
    }
  }
}