const request = require("superagent");
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
exports.run = (bot, msg, params = []) => {
  const name = params.join("_");
  const result = request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=population+govt');
           
            result.then((res) => {
            parseString(res.text, (err, obj) => {
            console.log(obj);
            var numero = obj.NATION.POPULATION;
            var size = (numero * 1000000);
            console.log(size);
            var modifier = ((obj.NATION.GOVT[0].DEFENCE/100)* 1000000);
            if (size > 10000000 && size < 50000000){
            	msg.channel.sendMessage("Army Size: " + (1500000 + modifier));
            } else if (size > 50000000 && size < 100000000){
            	msg.channel.sendMessage("Army Size: " + (1750000 + modifier));
            } else if (size > 100000000 && size < 500000000){
            	msg.channel.sendMessage("Army Size: " + (2000000 + modifier));
            } else if (size > 500000000 && size < 1000000000){
            	msg.channel.sendMessage("Army Size: " + (2250000 + modifier));
            } else if (size > 1000000000 && size < 5000000000){
            	msg.channel.sendMessage("Army Size: " + (2500000 + modifier));
            } else if (size > 5000000000 && size < 10000000000){
            	msg.channel.sendMessage("Army Size: " + (2750000 + modifier));
            } else if(size > 10000000000){
            	msg.channel.sendMessage("Army Size: " + (3000000 + modifier));
            }
            
        
            
        
           
    })
  })
       
        
   
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["army"],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "armysize",
  description: "Gives the armysize of a NationStates nation.",
  usage: "armysize <nation name>"
};
