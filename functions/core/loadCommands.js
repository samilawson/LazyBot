const fs = require("fs");

module.exports = bot => {
  bot.commands.clear();
  bot.aliases.clear();
  fs.readdir("./cmd/", (err, files) => {
    if (err) console.error(err);
    files = files.filter(f => { return f.slice(-3) === ".js"; });
    let [c, a] = [0,0];
    files.forEach(f => {
      let props = require(`../../cmd/${f}`);
      bot.commands.set(props.help.name, props);
      c++;
      props.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
        a++;
      });
    });
    files.forEach(f => {
      delete require.cache[require.resolve(`../../cmd/${f}`)];
    });
    bot.log(`Loaded ${c} commands, with ${a} aliases.`);
  });
};
