const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

const Promotion = require ('./promotion.js');
const BDD = require('./bdd.js');


var conn = new BDD('kevinnave_bdd', "mysql-kevinnave.alwaysdata.net","kevinnave","bddadmin");
 
 /*connexion bdd
var conn = mysql.createConnection({
  database: 'kevinnave_bdd',
  host: "mysql-kevinnave.alwaysdata.net",
  user: "kevinnave",
  password: "bddadmin"
});
 
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/




client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

	
  if (msg.content === 'ping') {
    msg.reply('pong');
  }else if (msg.content === 'inscription') {
    msg.reply('Pour t"inscrire ecrit !inscription Nom Prénom NumeroPromotion ');
	conn.getFormation(msg);
  }else if (msg.content === 'help') {
     msg.reply('Commande : ping , inscription,formation, !inscription, !coursDuJour, !coursDeLaSemaine');
  }else if (msg.content === 'formation') {
		conn.getFormation(msg);
  }else if (msg.content.startsWith('test')) {
		var message = msg.content.substring(5, msg.length)
		console.log(message);
		var params = message.split(' ');
		msg.reply(isNaN(params[0]));
  }
  

  
  if (msg.content.startsWith('!inscription')) {
	
	//msg.reply(etudiant.getPrenom());
	var message = msg.content.substring(13, msg.length)
	console.log(message);
	var params = message.split(' ');
	if(params.length>=3){
		
		conn.addEtudiant(msg,params);
		
	}else{
		msg.reply('Erreur : entrer !inscription Nom Prénom NumeroPromotion')
		msg.reply('Liste promotion : 1 RIL , 2 RIL DEVOPS')
	}

  }
  
  
   if (msg.content.startsWith('!coursDuJour')) {
	
	//msg.reply(etudiant.getPrenom());
	var message = msg.content.substring(13, msg.length)
	//console.log(message);
	var params = message.split(' ');
	//console.log("params 0 : "+params[0]+", params 1 :"+ params[1] )
	if(params.length>=1 && params[0] != ""){
		
		//console.log(params[0]);
		conn.getCoursDuJour(msg,params);
	}else{
		msg.reply('Erreur : entrer !coursDuJour votreIdentifiantEtudiant')
		
	}
	
   }
   	if (msg.content.startsWith('!coursDeLaSemaine')) {
	
	//msg.reply(etudiant.getPrenom());
	var message = msg.content.substring(18, msg.length)
	//console.log(message);
	var params = message.split(' ');
	//console.log("params 0 : "+params[0]+", params 1 :"+ params[1] )
	if(params.length>=1 && params[0] != ""){
		
		//console.log(params[0]);
		conn.getCoursDeLaSemaine(msg,params);
	}else{
		msg.reply('Erreur : entrer !coursDeLaSemaine votreIdentifiantEtudiant')
		
	}

   }
  
  if (msg.content.startsWith('!coursDeDemain')) {
	
	//msg.reply(etudiant.getPrenom());
	var message = msg.content.substring(15, msg.length)
	//console.log(message);
	var params = message.split(' ');
	//console.log("params 0 : "+params[0]+", params 1 :"+ params[1] )
	if(params.length>=1 && params[0] != ""){
		
		//console.log(params[0]);
		conn.getCoursDeDemain(msg,params);
	}else{
		msg.reply('Erreur : entrer !coursDeDemain votreIdentifiantEtudiant')
		
	}

   }
  
  
  
});



client.login(auth.token);

