const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const got = require('got')

module.exports = class GithubCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'gh',
      group: 'util',
      memberName: 'gh',
      description: 'Searches github!',
      
      examples: ['gh lazybot']
      
    })
  }

  async run(msg, args) {
    let input = args;
/*
    if (input.indexOf('/') !== -1) {
        let repo = safeRepo(input);
        

        const res = await got(`https://api.github.com/repos/${repo}`, { json: true });
        const json = res.body;
        if (json.message === 'Not Found') {
            msg.error('That repository could not be found!');
        }
        const embed = new RichEmbed()
        .setTitle(json.full_name)
        .setDescription(json.description)
        .setAuthor(`${[json.owner.login](json.owner.html_url)}`)
        .addField(`Primary Language:`, `${json.language}`)
        .addField(`:house:`, `[Home page](${json.html_url})}`, true)
        .addField(`:negative_squared_cross_mark:`, `[Downloads](${json.html_url}/releases)`, true)
        .addField(`:exclamation:`, `[Issues](${json.html_url}/issues)`)
        .setFooter(`Do *git clone ${json.clone_url}* to clone this repo`)
        msg.channel.send(embed)
    } else {
*/
        const res = await got(`https://api.github.com/search/repositories?q=${input.split(" ").join('+')}`, { json: true });
        const json = res.body;
        if (json.total_count < 1) {
            throw `No results found for '${input.split(" ").join(' ')}'`;
        }

  
        msg.channel.send(':white_check_mark: Top 3 results:');

        json.items.slice(0, 3).forEach(item => {
            msg.channel.send(`Here's what I found: ${item.html_url}`);
        });
    }
/*
function safeRepo(input) {
    if (input.indexOf('/') === -1) {
        return;
    }

    let user = input.substr(0, input.indexOf('/'));
    input = input.substr(input.indexOf('/') + 1);
    let repo = input.indexOf('/') === -1 ? input : input.substr(0, input.indexOf('/'));
    return `${user}/${repo}`;
}*/



};