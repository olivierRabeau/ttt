import availableCases from "./availableCases";
import mapSeqToPlayer from "./mapSeqToPlayer";
import winPatternIs from "./winpattern"

async function findTheBestOption (currentSequence, currentTurn){

    // Ordinateur player
    let winGame=false;
    let bestPositionToPlay=undefined;
    let biggestScore = 0;
    let score=0;
    let hypotheticSequence=undefined;
    let gridPicture=undefined;
    let sequence = availableCases(currentSequence)
    
    // L'ordinateur a-t-il une possibilité de victoire actuellement ?
    for (let i =0;i<sequence.length;i++){
      hypotheticSequence = JSON.parse(JSON.stringify(currentSequence)); 
      hypotheticSequence[currentTurn]= sequence[i];
      gridPicture = await mapSeqToPlayer (hypotheticSequence);
      if (winPatternIs (gridPicture,((currentTurn)%2===0)?"AAA":"BBB")>0)  {
        bestPositionToPlay=sequence[i];
        winGame = true;
        //console.log("L'ordinateur gagne en ",bestPositionToPlay);
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
            //console.log("Le joueur gagne en ",bestPositionToPlay);
            break;
          } 
        }
    }

            // L'ordinateur peut-il créer une double option de victoire en un coup?
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
                  //console.log("L'ordinateur peut créer une double option de victoire en ",bestPositionToPlay);
                  break;
                }
              }
            }    

    // Le joueur peut-il créer une double option de victoire en un coup?
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
          //console.log("Le joueur a une double option de victoire en ",bestPositionToPlay);
          break;
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
          break;
        } 
        // au second tour priorité aux coins de la grille de jeu
        if (currentTurn>0 && currentTurn<2){
          switch (sequence[i]) {
            case 0:
            case 2:
            case 6:
            case 8:
              bestPositionToPlay = sequence[i];
              break;  
            default:    
          }
          //console.log("position en coin alea ",bestPositionToPlay);
          break;
        }
        // position qui handicape le plus le joueur
        if (score>=biggestScore) {
          bestPositionToPlay = sequence[i];
          biggestScore=score;
          //console.log("handicap adversaire ",bestPositionToPlay);
        }
      }
        
    
    }
    return bestPositionToPlay;
}

    export default findTheBestOption;