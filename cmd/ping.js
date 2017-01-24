exports.run = (bot, msg, params = []) => {
  msg.channel.sendMessage( 'Ping' ).then( message => {
        message.edit( `\:ping_pong: Pong! ( took: ${ message.createdTimestamp - msg.createdTimestamp } ms )` );
        }
    );

};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "ping",
  description: "Pong! (Response time).",
  usage: "ping"
};
