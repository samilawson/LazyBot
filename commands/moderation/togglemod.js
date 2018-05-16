const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, '..', '..', 'data/servers.json');

module.exports = class ToggleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'toggle',
			group: 'moderation',
			memberName: 'toggle',
			description: 'Toggles the modlog.',
      details: 'Anybody with administrator perms can toggle the modlog or no invite.',
			examples: ['toggle modlog', 'toggle noinvite'],
			guildOnly: true,
			args: [
				{
					key: 'feature',
					prompt: 'What feature would you like to toggle?\n',
					type: 'string'
				}
			],
      throttling: {
        usages: 1,
        duration: 10
      }
		});
	}

  hasPermission(msg) {
    return msg.member.hasPermission('ADMINISTRATOR') || msg.author.id === msg.guild.ownerID;
  }

  run(msg, args) {
		const data = JSON.parse(fs.readFileSync(jsonPath), 'utf8');
    const feature = args.feature.toUpperCase();

    function toggle(feature) {

     
      if (feature === 'NOINVITE') {
				if (!data[msg.guild.id]) data[msg.guild.id] = {'noinvite': 'disabled'};
        if (data[msg.guild.id].noinvite === 'enabled') {
          data[msg.guild.id].noinvite = 'disabled';
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(':white_check_mark: The no invite feature is now **disabled**.');
        } else
        if (!data[msg.guild.id].noinvite === 'disabled') {
          data[msg.guild.id].noinvite = 'enabled';
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(':white_check_mark: The no invite feature is now **enabled**.');
        } else {
          data[msg.guild.id].noinvite = 'enabled';
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(':white_check_mark: The no invite feature is now **enabled**.');
        }
      } else

      if (feature === 'MODLOG') {
				if (!data[msg.guild.id]) data[msg.guild.id] = {'modlog': 'disabled'};
        if (data[msg.guild.id].modlog === 'enabled') {
          data[msg.guild.id].modlog = 'disabled';
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          const channel = msg.guild.channels.find('name', 'mod-log');
          channel.delete().catch(err => {
            msg.reply(':no_entry_sign: **Error:** I couldn\'t delete the #mod-log channel. Make sure I have perms!');
          });
          msg.reply(':white_check_mark: The modlog is now **disabled**.');
        } else
        if (data[msg.guild.id].modlog === 'disabled') {
            data[msg.guild.id].modlog = 'enabled';
            fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
            msg.reply(':white_check_mark: The modlog is now **enabled**.');
            msg.guild.createChannel('mod-log', 'text')
            .then(modlog => {
              modlog.send(`You have enabled the modlog. To disable this and delete this channel, just type \`toggle modlog\``);
            });
        } else {
            data[msg.guild.id].modlog = 'enabled';
            fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
            msg.reply(':white_check_mark: The modlog is now **enabled**.');
            msg.guild.createChannel('mod-log', 'text')
            .then(modlog => {
              modlog.send(`You have enabled the modlog. To disable this and delete this channel, just type \`toggle modlog\``);
            });
        
      
        }
      } else {
        msg.reply(':no_entry_sign:' + " Please make sure you entered a valid feature!");
      }
    }

    toggle(feature);
  }
};