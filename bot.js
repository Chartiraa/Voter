import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update } from "firebase/database";
import 'dotenv/config';
import tmi from 'tmi.js';

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: "AIzaSyAqNC-8LxXz5ouobcXKLE-exRbyP5oaum0",
	authDomain: "voter-7195f.firebaseapp.com",
	databaseURL: "https://voter-7195f-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "voter-7195f",
	storageBucket: "voter-7195f.appspot.com",
	messagingSenderId: "79931227348",
	appId: "1:79931227348:web:2c131b480c41f9ad5c8f41",
	measurementId: "G-TM5HESHXRH"
  };

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

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
openRecord(first,second);
var myInt = setInterval(function () {
    updateRecord(first, second);
}, 500);

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
function openRecord(first, second) {
	const db = getDatabase();
	set(ref(db, 'Vote/Hype'), {
	  First: first,
	  Second: second,
	});
  }
function updateRecord(first, second) {
	const db = getDatabase();
  
	// A post entry.
	const postData = {
	  First: first,
	  Second: second
	};
    
	// Write the new post's data simultaneously in the posts list and the user's post list.
	const updates = {};
	updates['Vote/Hype'] = postData;
  
	return update(ref(db), updates);
  }
