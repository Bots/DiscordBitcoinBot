const Discord = require('discord.js')
const config = require('../secrets/discord-credentials.json')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

// global vars
const client = new Discord.Client()
const xmlhttp = new XMLHttpRequest();
const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
let time
let usdValue

// connect to Discord
client.login(config.token)
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})
		
// get JSON
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4  &&  this.status == 200) {
		let json = JSON.parse(this.responseText);
    	parseJson(json);
  }		
};

// parse JSON
function parseJson(json) {
	time = "Last Updated : " + json["time"]["updated"];
	usdValue = "1 BTC equals $" + json["bpi"]["USD"]["rate"];
  }

// post message in Discord when bot is pinged
client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'btc') {
		message.channel.send(time + "\n" + usdValue);
	} 
});