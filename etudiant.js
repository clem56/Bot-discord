class Etudiant{

	//constructor(){
	//}
	
	constructor(nom,prenom){
	this.nom = nom;
	this.prenom = prenom;
	}
	
	
	getPrenom(){
		return this.prenom;	
	}
	getIdentite(){
		return this.nom +' '+ this.prenom;	
	}
}

module.exports=Etudiant


	
	


