const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const fs = require("fs");

const client = new CommandoClient({
    commandPrefix: '//',
    owner: '213251218154192896',
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['ns', 'NationStates'],
        ['fun', 'Fun'],
        ['util', 'Utilities'],
        ['moderation', 'Moderation']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

fs.readdir(`${__dirname}/events/`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const eventFunction = require(`${__dirname}/events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
});
});

    client.on('ready', () => {
    console.log('Logged in!');
    client.user.setActivity('//help | //invite');
});


    client.login('MjU5Nzg0OTE3MzM5MDc4NjU2.Ddzu_Q.hqMv4wFNSUufEenTVh5uQPvu_vM');


    //cd C:\Users\Sam L\Documents\LazyBot
    //259784917339078656