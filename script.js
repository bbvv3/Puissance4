let couleur = "jaune";

etatDuJeu = [0, 0, 0, 0, 0, 0, 0];

/**************************************************************************************************/

function testHorizontal(pos,couleur){ //pos = coordonée ex [2,4]
    let compteur = 1;
    for (let i = pos[1]-1; i > 0; i--){
        const valeur = "#ligne".concat(pos[0]," .col",i);
        const coord = document.querySelector(valeur).getAttribute("title")
        if (coord == couleur){
            compteur++;
            if (compteur==4){return true}
        }else{break}
    }
    for (let i = pos[1]+1; i < 8; i++){
        const valeur = "#ligne".concat(pos[0]," .col",i);
        const coord = document.querySelector(valeur).getAttribute("title")
        if (coord == couleur){
            compteur++;
            if (compteur==4){return true}
        }else{break}
    }
    return false;
}

/**************************************************************************************************/

function testVertical(pos,couleur){ //pos = coordonée ex [2,4]
    let compteur = 1;
    for (let i = pos[0]-1; i > 0; i--){
        const valeur = "#ligne".concat(i," .col",pos[1]);
        const coord = document.querySelector(valeur).getAttribute("title")
        if (coord == couleur){
            compteur++;
            if (compteur==4){return true}
        }else{break}
    }
    for (let i = pos[0]+1; i < 7; i++){
        const valeur = "#ligne".concat(i," .col",pos[1]);
        const coord = document.querySelector(valeur).getAttribute("title")
        if (coord == couleur){
            compteur++;
            if (compteur==4){return true}
        }else{break}
    }
    return false;
}

/**************************************************************************************************/

function testDiagonal1(pos,couleur){ //pos = coordonée ex [2,4]
    let compteur = 1;
    for (let i = 1; (pos[0]+i < 7)&&(pos[1]-i  > 0); i++){
        const valeur = "#ligne".concat(pos[0]+i," .col",pos[1]-i);
        const coord = document.querySelector(valeur).getAttribute("title");
        if (coord == couleur){
            compteur++;
            if (compteur==4){return true}
        }else{break}
    } 
    for (let i = 1; (pos[0]-i > 0)&&(pos[1]+i  < 8); i++){
        const valeur = "#ligne".concat(pos[0]-i," .col",pos[1]+i);
        const coord = document.querySelector(valeur).getAttribute("title");
        if (coord == couleur){
            compteur++;
            if (compteur==4){return true}
        }else{break}
    } 
    return false;
}

/**************************************************************************************************/

function testDiagonal2(pos,couleur){ //pos = coordonée ex [2,4]
    let compteur = 1;
    for (let i = 1; (pos[0]+i < 7)&&(pos[1]+i  < 8); i++){
        const valeur = "#ligne".concat(pos[0]+i," .col",pos[1]+i);
        const coord = document.querySelector(valeur).getAttribute("title");
        if (coord == couleur){
            compteur++;
            if (compteur==4){return true}
        }else{break}
    } 
    for (let i = 1; (pos[0]-i > 0)&&(pos[1]-i > 0); i++){
        const valeur = "#ligne".concat(pos[0]-i," .col",pos[1]-i);
        const coord = document.querySelector(valeur).getAttribute("title");
        if (coord == couleur){
            compteur++;
            if (compteur==4){return true}
        }else{break}
    } 
    return false;
}

/**************************************************************************************************/

function modal(texte,encre){
    let panneau = document.getElementById("myModal");
    let titre = document.querySelector("#myModal h1");
    panneau.style.display = "block";
    titre.innerText = texte;
    switch (encre){
        case 'jaune': titre.style.color = '#FFAF00';
        break;
        case 'rouge': titre.style.color = '#FF0000';
        break;
        default : titre.style.color = 'black';
    }
    setTimeout(function(){panneau.style.display = "none"},2000);
}

/**************************************************************************************************/

function test(pos,couleur){
    let bool = false;
    if (testHorizontal(pos,couleur)){modal("Puissance 4",couleur)}
    else{
         if (testVertical(pos,couleur)){modal("Puissance 4",couleur)}
         else{
            if (testDiagonal1(pos,couleur)){modal("Puissance 4",couleur)}
            else{
                if (testDiagonal2(pos,couleur)){modal("Puissance 4",couleur)}
            }    
        }
    }
}

/**************************************************************************************************/

function etatColonne(col){
    if (etatDuJeu[col-1] < 6){
        return true;
    }else return false;
}

/**************************************************************************************************/

function place(col){
    if (etatColonne(col)){
        let valeur = "#ligne".concat(etatDuJeu[col-1]+1, " .col", col);
        let cellule = document.querySelector(valeur)
        if (couleur === "jaune"){
            cellule.style.backgroundImage = "url('./images/Jaune.png')";
            cellule.setAttribute("title", "jaune");
            etatDuJeu[col-1]++;
            test([etatDuJeu[col-1], col],couleur);
            couleur = "rouge";
        }else{
            cellule.style.backgroundImage = "url('./images/Rouge.png')";
            cellule.setAttribute("title", "rouge");
            etatDuJeu[col-1]++;
            test([etatDuJeu[col-1], col],couleur);
            couleur = "jaune";
        };
    }else {
        let somme = 0;
        for (let i in etatDuJeu){
            somme += etatDuJeu[i];
            if (somme == 42){modal("Egalité","noir")}
        }
    }
}
        
/**************************************************************************************************/

function nouvellePartie(){
    for (let i = 1; i < 7; i++){
        for (let j = 1; j < 8; j++){
            let value = "#ligne".concat(i," .col",j);
            let cellule = document.querySelector(value);
            cellule.setAttribute("title","vide");
            cellule.style.backgroundImage ="url('./images/case_vide.png')";
        }
    }
    etatDuJeu = [0,0,0,0,0,0,0];
    couleur = "jaune";

}

/**************************************************************************************************/

function prevision(col){
    if (etatColonne(col)){
        let valeur = "#ligne".concat(etatDuJeu[col-1]+1, " .col", col);
        let cellule = document.querySelector(valeur);
        if (couleur === "jaune"){
            cellule.style.backgroundImage = "url('./images/Jaune.png')";
        }else{
            cellule.style.backgroundImage = "url('./images/Rouge.png')";
        }
    }
}

/**************************************************************************************************/

function sortie(col){
    if (etatColonne(col)){
        let valeur = "#ligne".concat(etatDuJeu[col-1]+1, " .col", col);
        let cellule = document.querySelector(valeur);
        cellule.style.backgroundImage = "url('./images/case_vide.png')";
    }
}