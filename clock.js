exports.run = (bot, msg, params = []) => {
  const today = new Date();
  var hours = today.getHours();
  const rest =  ":" + today.getMinutes() + ":" + today.getSeconds();
  const embed = new Discord.RichEmbed();
  
  embed.setColor(3447003)
     
      .setTitle(`World Clock`)
      .setThumbnail(`https://openclipart.org/image/2400px/svg_to_png/233143/United-Globe.png`)
      .addField('Moscow', (hours + 3) + rest, true)
      .addField('Capetown', (hours + 2) + rest, true)
      .addField('Paris', (hours + 1) + rest, true)
      .addField('London', hours + rest, true)
      .addField('Brasilia', (hours - 3) + rest, true)
      .addField('New York', (hours - 5) + rest, true)
      .addField('Chicago', (hours - 6) + rest, true)
      .addField('Los Angeles', (hours - 8) + rest, true)
      .addField('Tokyo', (hours + 9) + rest, true)
      .addField('Beijing', (hours + 8) + rest, true)
      console.log(embed);
      msg.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: false, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "clock",
  description: "Gives a world clock with different cities.",
  usage: "clock"
};