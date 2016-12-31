//LazyBot, by Melorian Republic
const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = ".";
const fs = require("fs");
var request = require('superagent');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
var TOKEN = process.env.TOKEN;
bot.on("ready", () => {
   	bot.user.setGame(".help");
  	console.log("I am ready!");
});

bot.on("message", msg => {
	if (msg.content.startsWith(prefix + "nat")){
        let args = msg.content.split(" ").slice(1);
        var nat = args.join("_");
        msg.channel.sendMessage('http://www.nationstates.net/nation=' + nat);
    } else if (msg.content.startsWith(prefix + "reg")){
        let regs = msg.content.split(" ").slice(1);
        var reg = regs.join("_");
        msg.channel.sendMessage('http://www.nationstates.net/region=' + reg);
    } else if(msg.content.startsWith(prefix + "help")){
    	msg.channel.sendMessage("```" + "LazyBot Commands: \n .nat <nation name> links to the Nationstates page of the nation \n .reg <region name> links to the region page of the region \n .size <region name> gives the number of nations in a region \n .economy <nation name> gives the GDP \n .population <nation name> gives the population \n .WA <nation name> gives the WA membership \n .industry <nation name> gives the major industry \n .flag <nation name> \n .delegate <region name> \n .priority <nation name> \n .income <nation name> \n .desc <nation name> \n .activity <nation name> \n .influence <nation name> \n .leader <nation name> \n .tax <nation name>" + "```" );
    } else if(msg.content.startsWith(prefix + "size")){
    	let arg = msg.content.split(" ").slice(1);
    	var name = arg.join("_");
    	console.log(name);
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?region=' + name + '&q=numnations').end((err, res) => {
    		console.log(res.text);
    		var second = res.text.replace(/[^0-9]/g, "");
    		console.log(second);
    		var final = second.toLocaleString('en-US');
    		console.log(final);
    		msg.channel.sendMessage("Number of nations in " + name + ": " + final);
    	});
    } else if(msg.content.startsWith(prefix +"economy")){
    	let input = msg.content.split(" ").slice(1);
    	var nametwo = input.join("_");
    	console.log(nametwo);
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + nametwo + '&q=gdp').end((err, res) => {
    		console.log(res.text);
    		var third = res.text.replace(/[^0-9]/g,"");
    		console.log(third);
    		var next = third * 1;
    		var last = next.toLocaleString('en-US');
    		console.log(last);
    		msg.channel.sendMessage(nametwo + "'s GDP: $" + last);
    	});
    } else if(msg.content === "RIP"){
    	msg.channel.sendMessage("Yeah, RIP");
    } else if(msg.content === "Hail Satan"){
    	msg.channel.sendFile("https://media2.giphy.com/media/77f2SrKYNOnYs/200_s.gif");
    } else if(msg.content.startsWith(prefix + "info")){
    	msg.channel.sendMessage("```This bot is run by Melorian Republic, and was written in Javascript!```");
    } else if(msg.content.startsWith(prefix + "population")){
    	let inputtwo = msg.content.split(" ").slice(1);
    	var namethree = inputtwo.join("_");
    	console.log(namethree);
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + namethree + '&q=population').end((err, res) => {
    		console.log(res.text);
    		var fourth = res.text.replace(/[^0-9]/g, "");
    		console.log(fourth);
    		var lasttwo = fourth * 1000000;
    		console.log(lasttwo);
    		var finaltwo = lasttwo.toLocaleString();
    		console.log(finaltwo);
    		msg.channel.sendMessage(namethree + "'s population: " + finaltwo);
    	});

    } else if(msg.content.startsWith(prefix + "WA")){
    	let inputthree = msg.content.split(" ").slice(1);
    	var namefour = inputthree.join("_");
    	console.log(namefour);
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + namefour + '&q=wa').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(namefour + "'s WA status: " + stripped);
    		
    	});
    } else if(msg.content.startsWith(prefix + "industry")){
    	let inputfour = msg.content.split(" ").slice(1);
    	var namefive = inputfour.join("_");
    	console.log(namefive);
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + namefive + '&q=majorindustry').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(namefive + "'s Major Industry: " + stripped);
    	});
    } else if(msg.content.startsWith(prefix + "flag")){
    	let input = msg.content.split(" ").slice(1);
    	var name = input.join("_");
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=flag').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendFile(stripped);
    	});
    } else if(msg.content.startsWith(prefix + "delegate")){
    	let input = msg.content.split(" ").slice(1);
    	var name = input.join("_");
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?region=' + name + '&q=delegatevotes+delegateauth').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(stripped);
    	});
    }else if(msg.content.startsWith(prefix + "priority")){
    	let input = msg.content.split(" ").slice(1);
    	var name = input.join("_");
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=govtpriority').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(name + "'s Government Priority: " + stripped);
    	});
    }else if(msg.content.startsWith(prefix + "income")){
    	let input = msg.content.split(" ").slice(1);
    	var name = input.join("_");
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=income').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		var final = stripped * 1;
    		var endfinal = final.toLocaleString();
    		console.log(endfinal);
    		msg.channel.sendMessage(name + "'s Average Income: $" + endfinal);
    	});
    }else if(msg.content.startsWith(prefix + "desc")){
    	let input = msg.content.split(" ").slice(1);
    	var name = input.join("_");
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=industrydesc').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(stripped);
    	});
    }else if(msg.content.startsWith(prefix + "influence")){
    	let input = msg.content.split(" ").slice(1);
    	var name = input.join("_");
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=influence').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(name + "'s Influence: " + stripped);
    	});
    }else if(msg.content.startsWith(prefix + "activity")){
    	let input = msg.content.split(" ").slice(1);
    	var name = input.join("_");
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=lastactivity').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(name + "'s Last Activity: " + stripped);
    	});
    }else if(msg.content.startsWith(prefix + "leader")){
    	let input = msg.content.split(" ").slice(1);
    	var name = input.join("_");
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=leader').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(name + "'s Leader: " + stripped);
    	});
    }else if(msg.content.startsWith(prefix + "tax")){
    	let input = msg.content.split(" ").slice(1);
    	console.log(input);
    	var name = input.join("_");
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=tax').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(name + "'s Tax: " + stripped);
    	});
    } else if (msg.content.startsWith(prefix + "TVT")){
    	let number = msg.guild.roles.find("name", "TVT Partisan").members.size;
    	msg.channel.sendMessage("There are " + number + " TVT Partisans here!");
    }  else if(msg.content=== (prefix + "rollone")){
        var diceOne  = Math.floor( Math.random() * 20) + 1;
        console.log(diceOne);
        msg.channel.sendMessage(diceOne);
    } else if (msg.content=== (prefix + 'rolltwo')){
        var diceOne = Math.floor( Math.random() * 20) + 1;
        var diceTwo = Math.floor(Math.random() * 20) + 1;
        console.log(diceOne);
        console.log(diceTwo);
        msg.channel.sendMessage(diceOne + " | " + diceTwo);
    }  else if (msg.content=== (prefix + "CTSN")){
        let number = msg.guild.roles.find("name", "CTSN Member").members.size;
        msg.channel.sendMessage("There are " + number + " CTSN Members here!");
    } else if (msg.content=== (prefix + "USSD")){
        let numberone = msg.guild.roles.find("name", "USSD Member").members.size;
        msg.channel.sendMessage("There are " + numberone + " USSD Members here!");
    } else if (msg.content.startsWith(prefix + "armysize")){
        let args = msg.content.split(" ").slice(1);
        var name = args.join("_");""
        console.log(name);
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
        
        
    } else if(msg.content === (prefix + "Exodus")){
        let numbertwo = msg.guild.roles.find("name", "Exodus Member").members.size;
        msg.channel.sendMessage("There are " + numbertwo + " Exodus members here!");
    } else if(msg.content === (prefix + "mods")){
        msg.channel.sendMesage("```" + "Our mods: Siberia, Vetelo, Melorian Republic, NuclearWaste123, and New Vapaus!" + "```");
    } else if(msg.content === (prefix + "rphelp")){
        msg.channel.sendMessage("```\nList of RP Commands:\n| .rollone \n| .rollTwo \n| .CTSN \n| .USSD \n| .Exodus" + "```");
    }
});

process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: \n + err.stack");
});
bot.on('guildCreate', Guild => {
  let toSend = [
 "\:white_check_mark: I've been invited to this server: " + Guild.name,
  "Guild ID: " + Guild.id,
  "Guild Members Count: " + Guild.memberCount,
  "Guild Region: " + Guild.region
];
bot.channels.get("263423925017378816").sendMessage(toSend);
});
bot.login(TOKEN);
