require('dotenv').config()
const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.BOT_USERNAME,
		password: process.env.OAUTH_TOKEN
	},
	channels: [ process.env.CHANNEL_NAME ]
});

var first = 0;
var second = 0;
var userList = [];

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;
	if(findUsername(tags) == -1 ) {
		addUsername(tags);
		countVote(message,channel);
	}
	if(message.toLowerCase() == '3') {
		console.log("userList")

		console.log(userList.length)
		console.log(first)
		console.log(second)
	}
});

client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();
	

	if(command === 'echo') {
		client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
	}
});

client.mods("channel")
.then((data) => {
    // data returns [moderators]
}).catch((err) => {
    //
});

//Kullanıcı adını listede arayan fonksiyon
let findUsername = (tags) =>{return userList.indexOf(tags.username)}
//Kullanıcı adını listeye ekleyen fonksiyon
let addUsername = (tags) =>{userList.push(tags.username)}
//Kullanılan oyları sayan fonksiyon
let countVote = (message, channel) =>{		
	if(message.toLowerCase() == '1') {
		first += 1;
		console.log(first)
		client.say(channel, `1. sınıf orospu çocuğu`);
	}
	if(message.toLowerCase() == '2') {
		second += 1;
		client.say(channel, `Amerigalı Şerif Samuel`);
	}
}
