// Reçoit la sequence et determine si une solution gagnante existe
// Retourne un score qui correspond au nombre de d'alignements gagnants

// Aspect technique : pour une grille de jeu 3x3
// Paramètre ["A", null, "B", "A", "A","B","A",null,"B"]
// Coordonnées correspondantes [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
// Formations des combinaisons de chaque ligne, colonne et diagonales de la grille de jeu.
// exemple ligne 2 : ["A", "A","A"] victoire pour A
// exemple colonne 2 : ["B", "B","B"] victoire pour B
// exemple diagonale montante : ["A", "B","B"] aucune possibilité de victoire
// exemple diagonale déscendante : ["A", "A","B"] aucune possibilité de victoire
// si un alignement comprend le winPattern recherché il contribue à augmenter le score de victoire de 1

// Mode d'utilisation 1 : Player one subit le jeu il doit parer la prochaine attaque.
// Player One doit jouer. Il simule le résultat de la prochaine action de son adversaire 
// en validant une à une chacune des case non cochées.
// Un score retourné supérieur à un indique une victoire possible et donc la case à bloquer impérativement. 

// Mode d'utilisation 2 : Player one mène le jeu il doit garder son avantage.
// Il simule le résultat de la prochaine action en validant une à une les cases libres, les autres cases libres
// sont simulées comme déjà sélectionnées par l'adversaire.
// L'objectif est de trouver la position qui réduit le plus possible les possibilités de victoire 
// pour l'adversaire. Le score doit être le plus bas possible pour player Two. 
// Reste ensuite à chercher si une position favorise un score important pour player One.
// Méthode de recherche identique à la précédente mais les autres cases
// sont simulées comme déjà sélectionnées par player One.
// Si une case favorise les deux situations elle est préférentielle sinon il faut choisir en priorité celle qui
// défavorise le plus l'adversaire. 

const winPatternIs = (gridSequence,winPattern)=>{
  const coords = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];

    const mapValuesToCoords = [[],[],[]];
    let score=0;   

    for (let i =0;i<9;i++){        
      mapValuesToCoords[coords[i][0]][coords[i][1]] = gridSequence[i];
    }

    const arrayRange = mapValuesToCoords[0].length;
    
    //Row
    let strRow=""; 
    for (let x=0;x<arrayRange;x++){ 
      strRow="";
      for (let y=0; y<arrayRange; y++){
          strRow = strRow.concat(mapValuesToCoords[x][y]);        
      }
      if (strRow.includes(winPattern)){
        score++;
      }
    }

    //Column
    let strCol="";
    for (let x=0;x<arrayRange;x++){ 
      strCol="";
      for (let y=0; y<arrayRange; y++){
        strCol = strCol.concat(mapValuesToCoords[y][x]);
      }
      if (strCol.includes(winPattern)){
        score++;
      }
    }

    // DiagDown
    let strDiagDown="";
    for (let x=0,y=0;x<arrayRange && y<arrayRange;x++,y++){       
        strDiagDown = strDiagDown.concat(mapValuesToCoords[x][y]);     
    }
    if (strDiagDown.includes(winPattern)){
      score++;
    }

    // DiagUp    
    let strDiagUp="";
    for (let x=2,y=0;x>=0 && y<arrayRange;x--,y++){ 
        strDiagUp = strDiagUp.concat(mapValuesToCoords[x][y]);
    } 
    if (strDiagUp.includes(winPattern)){
      score++;
    }     
    
return score;
}

export default winPatternIs;

