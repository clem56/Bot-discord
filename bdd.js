var mysql = require('mysql');
const Etudiant = require ('./etudiant.js');
class BDD{
	
	
	
	constructor(db,host,user,mdp){
		this.conn = mysql.createConnection({
		  database: db,
		  host: host,
		  user: user,
		  password: mdp
		});
 
	this.conn.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	});

	}
	
	getFormation(msg){
		var res;
		var queryPromotion = "SELECT * FROM `promotion`"
		this.conn.query(queryPromotion, function(err, results) {
            if (err) throw err;
			for (var i = 0; i < results.length; i++) {
			  res += results[i].id_promo+" "+results[i].formation+",";
			}
			msg.reply('Liste promotion : '+res);
        });
		return res;
	}
	
	addEtudiant(msg,params){
		let etudiant = new Etudiant(params[0],params[1],params[2]);
		var sql1 = "INSERT INTO `etudiant`(`nom`, `prenom`,`promo_etudiante`) VALUES ('"+params[0]+"','"+params[1]+"',"+params[2]+")";
		 this.conn.query(sql1, function(err, results) {
            if (err) throw err;
            console.log("Insert a record!");
        });
		
		var sql2 = "SELECT MAX(id_etudiant)AS MAX FROM `etudiant`"
		this.conn.query(sql2, function(err, results) {
            if (err) throw err;
            //console.log(results[0].MAX);
			msg.reply("Bienvenue au CESI : "+etudiant.getIdentite()+", ton numéro d'identifiant étudiant est le : "+results[0].MAX)
        });
	}
	
	getCoursDuJour(msg,params){
		
		//var sql1 = "SELECT * FROM `cours` WHERE promotion = (SELECT promotion FROM `etudiant` WHERE id_etudiant = "+params[0]+") and Date = CURDATE()";    
		try {
		  var sql1 = "SELECT * FROM cours INNER JOIN intervenant ON cours.intervenant_cours = intervenant.id_intervenant  WHERE promotion = (SELECT promo_etudiante FROM `etudiant`WHERE id_etudiant = "+params[0]+") and Date = CURDATE()   "
			this.conn.query(sql1, function(err, results) {
            if (err) throw err;
            //console.log("cours du jours!");
			//console.log(results);
			if(results != ""){
				msg.reply("Vous avez cours de : "+results[0].intitule+", avec "+results[0].nom_i+" "+results[0].prenom_i);
			}else{
				msg.reply("Vous n'avez pas de cours aujourd'hui ");
			}
			
        });
		}
		catch(error) {
		  msg.reply("Une erreur est survenue vérifié vos données d'entrée")
		 
		}
		
	}

	
}

module.exports=BDD