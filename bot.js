const Discord = require('discord.js')
const config = require('../secrets/discord-credentials.json')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const client = new Discord.Client()

var time
var usdValue


client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

var xmlhttp = new XMLHttpRequest();
var url = "https://api.coindesk.com/v1/bpi/currentprice.json";
		
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4  &&  this.status == 200) {
    var json = JSON.parse(this.responseText);
    parseJson(json);
  }		
};

function parseJson(json) {
	time = "Last Updated : " + json["time"]["updated"];
	usdValue = "1 BTC equals $" + json["bpi"]["USD"]["rate"];
  }

xmlhttp.open("GET", url, true);
xmlhttp.send();

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'btc') {
		message.channel.send(time + "\n" + usdValue);
	} 
});

client.login(config.token)

