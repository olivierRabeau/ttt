import availableCases from "./availableCases";
import mapSeqToPlayer from "./mapSeqToPlayer";
import winPatternScore from "./winPatternScore"
import winIsEnsured from "./winIsEnsured";
import doubleWinPattern from "./doubleWinPattern";


const findTheBestOption = (currentSequence, currentTurn, computerSkills) =>{

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
    let nextTurn = parseInt(currentTurn)+1;
    let allowed =[true,true,true,true,true,true,true]
    let skills ={
      cptrWinCR:0,
      plrWinNR:1,
      cptrDblWP:2,
      plrDblWP:3,
      center:4,
      corners:5,
      preventOpp:6
    }
    
    switch (computerSkills) {
        case 1:
            allowed[skills.cptrDblWP]=false;
            allowed[skills.plrDblWP]=false;
            allowed[skills.plrWinNR]=Math.floor(Math.random()*5)>0?true:false;
            // two-thirds
            allowed[skills.center]=Math.floor(Math.random()*3)<2?true:false;
            allowed[skills.corners]=Math.floor(Math.random()*3)<2?true:false;
            allowed[skills.preventOpp]=Math.floor(Math.random()*3)<2?true:false;
            break;
              case 2:
                allowed[skills.plrWinNR]=Math.floor(Math.random()*5)<1?true:false;
                allowed[skills.cptrDblWP]=false;
                allowed[skills.plrDblWP]=false;
                // one-fifth
                allowed[skills.center]=Math.floor(Math.random()*5)<1?true:false;
                allowed[skills.corners]=Math.floor(Math.random()*5)<1?true:false;
                allowed[skills.preventOpp]=Math.floor(Math.random()*5)<1?true:false;
                break;
            default:
               // all allowed
    }
 

    let displayMessage = false;

    let computerWinCurrentRound =winIsEnsured (currentSequence,currentTurn);   
    if (allowed[skills.cptrWinCR] && computerWinCurrentRound!==undefined) {
      bestPositionToPlay = computerWinCurrentRound;
      winGame=true;
      if (displayMessage) console.log("computer wins in ",bestPositionToPlay);
    }
    
    let playerWinNextRound =winIsEnsured (currentSequence,nextTurn);   
    if (allowed[skills.plrWinNR] && playerWinNextRound!==undefined && !winGame) {
      bestPositionToPlay = playerWinNextRound;
      winGame=true;
      if (displayMessage) console.log("player wins in ",bestPositionToPlay);
    }

    let computerDoubleWinPattern = doubleWinPattern (currentSequence,currentTurn);   
    if (allowed[skills.cptrDblWP] && computerDoubleWinPattern!==undefined && !winGame) {
      bestPositionToPlay = computerDoubleWinPattern;
      winGame=true;
      if (displayMessage) console.log("computer double win pattern in ",bestPositionToPlay);
    }

    let playerDoubleWinPattern = doubleWinPattern (currentSequence,nextTurn);   
    if (allowed[skills.plrDblWP] && playerDoubleWinPattern!==undefined && !winGame) {
        bestPositionToPlay = playerDoubleWinPattern;
        winGame=true;
        if (displayMessage) console.log("player double win pattern in ",bestPositionToPlay);
    }           
    
    if (!winGame){
                  // Comment réduire le nombre de possibilités d'alignement du joueur  
                  for (let i =0;i<sequence.length;i++){  
                    hypotheticSequence = [...currentSequence]; 
                    hypotheticSequence[currentTurn]= sequence[i];
                    
                    gridPicture =  mapSeqToPlayer (hypotheticSequence, ((currentTurn+1)%2===0)?"A":"B");
                    score =  winPatternScore(gridPicture,((currentTurn)%2===0)?"BBB":"AAA");
                    // si la case centrale n'est pas prise c'est la meilleure option
                    if (allowed[skills.center] && sequence[i]===4){
                      bestPositionToPlay = sequence[i];
                      winOption=true;
                      if (displayMessage) console.log("La case centrale est la meilleure option");
                      break;
                    } 
                    // au second tour priorité aux coins de la grille de jeu
                    if (allowed[skills.corners] && currentTurn>0 && !winOption ){
                      switch (sequence[i]) {
                        case 0:
                        case 2:
                        case 6:
                        case 8:
                          bestPositionToPlay = sequence[i];
                          winOption=true;
                          if (displayMessage) console.log("Les coins constituent une option nécessaire jusqu'au troisième tour");
                          break;  
                        default:    
                      }          
                    }
                    // position qui handicape le plus le joueur
                    if (allowed[skills.preventOpp] && !winOption && score>=biggestScore) {
                      bestPositionToPlay = sequence[i];
                      biggestScore=score;
                      if (displayMessage) console.log("handicap adversaire ",bestPositionToPlay);
                    }
                  }    
    }
    if (bestPositionToPlay===undefined) {
      bestPositionToPlay = sequence[Math.floor(Math.random()*sequence.length)];
      if (displayMessage) console.log("random ",bestPositionToPlay);
    }
    return bestPositionToPlay;
}

    export default findTheBestOption;




    