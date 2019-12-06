var mysql = require('mysql');

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
		
		var sql1 = "INSERT INTO `etudiant`(`nom`, `prenom`,`promo_etudiante`) VALUES ('"+params[0]+"','"+params[1]+"',"+params[2]+")";
		 this.conn.query(sql1, function(err, results) {
            if (err) throw err;
            console.log("Insert a record!");
        });
		
		var sql2 = "SELECT MAX(id_etudiant)AS MAX FROM `etudiant`"
		this.conn.query(sql2, function(err, results) {
            if (err) throw err;
            //console.log(results[0].MAX);
			msg.reply("Bienvenue au CESI : "+params[0]+" "+params[1]+", ton numéro d'identifiant étudiant est le : "+results[0].MAX)
        });
	}
	
	getCoursDuJour(msg,params){
		
		//var sql1 = "SELECT * FROM `cours` WHERE promotion = (SELECT promotion FROM `etudiant` WHERE id_etudiant = "+params[0]+") and Date_cours = CURDATE()";    
		try {
		  var sql1 = "SELECT * FROM cours INNER JOIN intervenant ON cours.intervenant_cours = intervenant.id_intervenant  WHERE promotion = (SELECT promo_etudiante FROM `etudiant`WHERE id_etudiant = "+params[0]+") and Date_cours = CURDATE()   "
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
	
	getCoursDeLaSemaine(msg,params){
		
		//var sql1 = "SELECT * FROM `cours` WHERE promotion = (SELECT promotion FROM `etudiant` WHERE id_etudiant = "+params[0]+") and Date_cours = CURDATE()";    
		
		 // var sql1 = "SELECT *,DATE_FORMAT(Date_cours,, '%Y/%m/%d') FROM cours INNER JOIN intervenant ON cours.intervenant_cours = intervenant.id_intervenant  WHERE promotion = (SELECT promo_etudiante FROM `etudiant`WHERE id_etudiant = "+params[0]+" ) and Date_cours >= DATE_FORMAT(DATE_SUB(now(),interval weekday(now()) day ), '%Y/%m/%d') ORDER BY Date_cours ASC;";
			var sql1 = "SELECT *,DATE_FORMAT(Date_cours, '%d/%m/%Y')AS date_format FROM cours INNER JOIN intervenant ON cours.intervenant_cours = intervenant.id_intervenant  WHERE promotion = (SELECT promo_etudiante FROM `etudiant`WHERE id_etudiant = "+params[0]+" ) and Date_cours >= DATE_FORMAT(DATE_SUB(now(),interval weekday(now()) day ), '%Y/%m/%d') ORDER BY Date_cours ASC;";
			this.conn.query(sql1, function(err, results) {
            if (err) throw err;
            //console.log("cours du jours!");
			//console.log(results);
			if(results != ""){
				var res ="";
				for (var i = 0; i < results.length; i++) {
					res += "Cours de : "+results[i].intitule+", avec "+results[i].nom_i+" "+results[i].prenom_i+", le : "+results[i].date_format+"\n";
				}
				msg.reply("Semaine de cours : "+res);
			}else{
				msg.reply("Vous n'avez pas de cours cette semaine ");
			}
			
        });
	
	}


		getCoursDeDemain(msg,params){
		
		//var sql1 = "SELECT * FROM `cours` WHERE promotion = (SELECT promotion FROM `etudiant` WHERE id_etudiant = "+params[0]+") and Date_cours = CURDATE()";    
		
		 // var sql1 = "SELECT *,DATE_FORMAT(Date_cours,, '%Y/%m/%d') FROM cours INNER JOIN intervenant ON cours.intervenant_cours = intervenant.id_intervenant  WHERE promotion = (SELECT promo_etudiante FROM `etudiant`WHERE id_etudiant = "+params[0]+" ) and Date_cours >= DATE_FORMAT(DATE_SUB(now(),interval weekday(now()) day ), '%Y/%m/%d') ORDER BY Date_cours ASC;";
			var sql1 = "SELECT *,DATE_FORMAT(Date_cours, '%d/%m/%Y')AS date_format FROM cours INNER JOIN intervenant ON cours.intervenant_cours = intervenant.id_intervenant  WHERE promotion = (SELECT promo_etudiante FROM `etudiant`WHERE id_etudiant = "+params[0]+" )  and Date_cours = DATE_FORMAT(DATE_ADD(now(), INTERVAL 1 DAY ), '%Y/%m/%d') ORDER BY Date_cours ASC;";
			this.conn.query(sql1, function(err, results) {
            if (err) throw err;
            //console.log("cours du jours!");
			//console.log(results);
			if(results != ""){
				var res ="";
			
				msg.reply("Cours de : "+results[0].intitule+", avec "+results[0].nom_i+" "+results[0].prenom_i+", le : "+results[0].date_format+"\n");
			}else{
				msg.reply("Vous n'avez pas de cours demain ");
			}
			
        });
		}
}
module.exports=BDD  //rends visible la classe depuis l'exterieur