
    exports.run = (bot, msg, params = []) => {
  if (params > 100){
    		msg.channel.sendMessage("\:x: Error! Please enter a number 1-100!");
    	} else if(params < 0){
    		msg.channel.sendMessage("\:x: Error! Please enter a number 1-100!");
    	} else {
        var diceOne  = Math.floor( Math.random() * params) + 1;
        console.log(diceOne);
        msg.channel.sendMessage(diceOne);
    }
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "command",
  description: "Command Description",
  usage: "command <argument>"
};
