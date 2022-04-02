import availableCases from "./availableCases";
import mapSeqToPlayer from "./mapSeqToPlayer";
import winPatternIs from "./winpattern"

async function findTheBestOption (currentSequence, currentTurn){

    // Ordinateur player
    // winGame est le flag principal; Priorité haute -> victoire assurée.

    // winOption est le flag secondaire.Priorité moyenne -> victoire possible.

    // Si wingame puis winOption sont à false, 
    // Le bot cherche à géner le jeu de l'adversaire -> Possibilité de match nul recherché

    let winGame=false;
    let winOption=false;
    let bestPositionToPlay=undefined;
    let biggestScore = 0;
    let score=0;
    let hypotheticSequence=undefined;
    let gridPicture=undefined;
    let sequence = availableCases(currentSequence)

    // affecter true à cette variable permet de visualiser la séquence de résolution de l'ordinateur
    let displayMessage = false;


    if (displayMessage) console.log("findTheBestOption : ", currentSequence);

    // L'ordinateur a-t-il une possibilité de victoire actuellement ?
    for (let i =0;i<sequence.length;i++){
      hypotheticSequence = JSON.parse(JSON.stringify(currentSequence)); 
      hypotheticSequence[currentTurn]= sequence[i];
      gridPicture = await mapSeqToPlayer (hypotheticSequence);
      if (winPatternIs (gridPicture,((currentTurn)%2===0)?"AAA":"BBB")>0)  {
        bestPositionToPlay=sequence[i];
        winGame = true;
        if (displayMessage) console.log("L'ordinateur gagne en ",bestPositionToPlay);
        break;
      }
    }
    
    // Le joueur a-t-il une possibilité de victoire au prochain coup ?  
    if (!winGame) {
      for (let i =0;i<sequence.length;i++){    
        hypotheticSequence = JSON.parse(JSON.stringify(currentSequence)); 
        hypotheticSequence[currentTurn+1]= sequence[i];
        gridPicture = await mapSeqToPlayer (hypotheticSequence);
          if (winPatternIs (gridPicture,((currentTurn+1)%2===0)?"AAA":"BBB")>0) {
            bestPositionToPlay=sequence[i];
            winGame = true;
            if (displayMessage) console.log("Le joueur gagne en ",bestPositionToPlay);
            break;
          } 
        }
    }

            // L'ordinateur peut-il créer une double ou une simple option de victoire en un coup?
            if (!winGame) {
              let nextOpponentTurnSequence=undefined;
              for (let i =0;i<sequence.length;i++){    
                hypotheticSequence = JSON.parse(JSON.stringify(currentSequence)); 
                hypotheticSequence[currentTurn]= sequence[i];
                nextOpponentTurnSequence = availableCases(hypotheticSequence);
                let cptr=0;
                for (let j =0;j<nextOpponentTurnSequence.length;j++){               
                      hypotheticSequence[currentTurn+2]= nextOpponentTurnSequence[j];
                      gridPicture = await mapSeqToPlayer (hypotheticSequence);             
                      if (winPatternIs (gridPicture,((currentTurn)%2===0)?"AAA":"BBB")) cptr++;
                }
                if (cptr>1) {
                  bestPositionToPlay=sequence[i];
                  winGame = true;
                  console.log("L'ordinateur peut créer une double option de victoire en ",bestPositionToPlay);
                  break;
                } else if (cptr===1){
                  bestPositionToPlay=sequence[i];
                  winOption = true;
                  if (displayMessage) console.log("L'ordinateur peut se créer pour le prochain tour une option de victoire en ",bestPositionToPlay);
                }
              }
            }    

    // Le joueur peut-il créer une double ou une simple option de victoire en un coup?
    if (!winGame) {
      let nextOpponentTurnSequence=undefined;
      for (let i =0;i<sequence.length;i++){    
        hypotheticSequence = JSON.parse(JSON.stringify(currentSequence)); 
        hypotheticSequence[currentTurn+1]= sequence[i];
        nextOpponentTurnSequence = availableCases(hypotheticSequence);
        let cptr=0;
        for (let j =0;j<nextOpponentTurnSequence.length;j++){               
              hypotheticSequence[currentTurn+3]= nextOpponentTurnSequence[j];
              gridPicture = await mapSeqToPlayer (hypotheticSequence);             
              if (winPatternIs (gridPicture,((currentTurn+1)%2===0)?"AAA":"BBB")) cptr++;
        }
        if (cptr>1) {
          bestPositionToPlay=sequence[i];
          winGame = true;
          if (displayMessage) console.log("Le joueur a une double option de victoire en ",bestPositionToPlay);
          break;
        } else if (cptr===1){
          bestPositionToPlay=sequence[i];
          winOption = true;
          if (displayMessage) console.log("Le joueur se crée pour le prochain tour une option de victoire en ",bestPositionToPlay);
        }
      }
    }   

    if (!winGame) {
      // Comment réduire le nombre de possibilités d'alignement du joueur  
      for (let i =0;i<sequence.length;i++){  
        hypotheticSequence = JSON.parse(JSON.stringify(currentSequence)); 
        hypotheticSequence[currentTurn]= sequence[i];
        gridPicture = await mapSeqToPlayer (hypotheticSequence,((currentTurn+1)%2===0)?"A":"B");
        score = await winPatternIs(gridPicture,((currentTurn)%2===0)?"BBB":"AAA");
        // si la case centrale n'est pas prise c'est la meilleure option
        if (sequence[i]===4){
          bestPositionToPlay = sequence[i];
          if (displayMessage) console.log("La case centrale est la meilleure option");
          break;
        } 
        // au second tour priorité aux coins de la grille de jeu
        if (currentTurn>0 && currentTurn<=2){
          switch (sequence[i]) {
            case 0:
            case 2:
            case 6:
            case 8:
              bestPositionToPlay = sequence[i];
              if (displayMessage) console.log("Les coins constituent une option nécessaire jusqu'au troisième tour");
              break;  
            default:    
          }
          break;
        }
        // position qui handicape le plus le joueur
        if (!winOption && score>=biggestScore) {
          bestPositionToPlay = sequence[i];
          biggestScore=score;
          if (displayMessage) console.log("handicap adversaire ",bestPositionToPlay);
        }
      }
        
    
    }
    return bestPositionToPlay;
}

    export default findTheBestOption;