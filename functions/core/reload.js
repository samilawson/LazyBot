module.exports = function(bot, command) {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`../../cmd/${command}`);
      bot.commands.delete(command);
      bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) bot.aliases.delete(alias);
      });

      bot.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, cmd.help.name);
      });
      delete require.cache[require.resolve(`../../cmd/${command}`)];
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
