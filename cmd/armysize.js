exports.run = (bot, msg, params = []) => {
  const name = params.join("_");
  request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=population').end((err, res) => {
            //if(err) throw err;
            console.log(res.text);
            //var xml = res.text;
            var numbero = res.text.replace(/(<([^>]+)>)/ig,"");
            console.log(numbero);
            var size = (numbero * 1000000);
            console.log(size);
            var final = size * .05;
            console.log(final);
            var endresult = final.toLocaleString();
            console.log(endresult);
            msg.channel.sendMessage("Army Size: " + endresult);
        
            
        });
        
        
    
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["army"],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "armysize",
  description: "Gives the armysize of a NationStates nation(population x .05).",
  usage: "armysize <nation name>"
};
