const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const Etudiant = require ('./etudiant.js');


var mysql = require('mysql');
 
var conn = mysql.createConnection({
  database: 'kevinnave_bdd',
  host: "mysql-kevinnave.alwaysdata.net",
  user: "kevinnave",
  password: "bddadmin"
});
 

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }else if (msg.content === 'inscription') {
    msg.reply('Pour t"inscrire ecrit !inscription avec ton nom et prénom ?');
  }
  if (msg.content.startsWith('!inscription')) {
	
	//msg.reply(etudiant.getPrenom());
	var message = msg.content.substring(13, msg.length)
	console.log(message);
	var params = message.split(' ');
	if(params.length>=2){
		
		console.log(params[0]);
		let etudiant = new Etudiant(params[0],params[1]);
		msg.reply(etudiant.getIdentite())
		
	}else{
		msg.reply('Erreur : entrer !inscription Nom Prénom')
	}

  }
});
client.login(auth.token);

