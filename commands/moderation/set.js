const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, '..', '..', 'data/servers.json');

module.exports = class SetCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'set',
			group: 'moderation',
			memberName: 'set',
			description: 'Sets the given feature.',
      details: 'Anybody with administrator perms can set certain features: \njoinmessage, joindm, joinrole, and leavemessage.',
			examples: ['set joinrole Members', 'set joinmessage Welcome {user} to the server!', 'set leavemessage disabled'],
			guildOnly: true,
			args: [
				{
					key: 'feature',
					prompt: 'Which feature would you like to set?\n',
					type: 'string'
				},
        {
          key: 'to',
          prompt: 'What would you like to set the feature to?\n',
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
    const { to } = args;

    function set(feature) {

      if (feature === 'JOINMESSAGE') {
				if (!data[msg.guild.id]) data[msg.guild.id] = {'joinMessage': 'disabled'};
        if (to === 'disabled') {
          data[msg.guild.id].joinMessage = 'disabled';
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(':white_check_mark: The join message is now **disabled**.');
        } else {
          data[msg.guild.id].joinMessage = to;
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(`:white_check_mark: The join message is now set to:\n${to}`);
        }
      } else

      if (feature === 'LEAVEMESSAGE') {
				if (!data[msg.guild.id]) data[msg.guild.id] = {'leaveMessage': 'disabled'};
        if (to === 'disabled') {
          data[msg.guild.id].leaveMessage = 'disabled';
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(':white_check_mark: The leave message is now **disabled**.');
        } else {
          data[msg.guild.id].leaveMessage = to;
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(`:white_check_mark: The leave message is now set to:\n${to}`);
        }
      } else

      if (feature === 'JOINDM') {
				if (!data[msg.guild.id]) data[msg.guild.id] = {'joinDM': 'disabled'};
        if (to === 'disabled') {
          data[msg.guild.id].joinDM = 'disabled';
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(':white_check_mark: The join DM is now **disabled**.');
        } else {
          data[msg.guild.id].joinDM = to;
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(`:white_check_mark: The join DM is now set to:\n${to}`);
        }
      } else

      if (feature === 'JOINROLE') {
				if (!data[msg.guild.id]) data[msg.guild.id] = {'joinRole': 'disabled'};
        if (to === 'disabled') {
          data[msg.guild.id].joinRole = 'disabled';
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(':white_check_mark: The join role is now **disabled**.');
        } else {
          data[msg.guild.id].joinRole = to;
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          msg.reply(`:white_check_mark: The join role is now set to **${to}**`);
        }
      } else {
        msg.reply(':no_entry_sign: That\'s not a valid feature. Avaliable features include:\njoinmessage, joindm, joinrole and leavemessage.');
      }
    }

    set(feature);
  }
};