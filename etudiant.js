class Etudiant{
	
	constructor(nom,prenom,promotion){
	this.nom = nom;
	this.prenom = prenom;
	this.promotion = promotion;
	}
	
	getNom(){
		return this.nom;	
	}
	getPrenom(){
		return this.prenom;	
	}
	getPromo(){
		return this.promo;	
	}
	getIdentite(){
		return this.nom +' '+ this.prenom;	
	}
}

module.exports=Etudiant


	
	


