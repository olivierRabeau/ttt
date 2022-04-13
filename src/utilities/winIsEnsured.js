import mapSeqToPlayer from "./mapSeqToPlayer";
import availableCases from "./availableCases";
import winPatternScore from "./winPatternScore";

const winIsEnsured = (playedSequence, turn=0, fillEmptyWith=null, firstToPlayWP="AAA", secondToPlayWP="BBB") =>{
    let hypotheticSequence=undefined;
    let gridPicture=undefined;
    let bestPositionToPlay=undefined;  
    let winScore=0;
    const notLinkedCells = [...availableCases(playedSequence)];
    
    let displayDebug=false;

      for (let i =0;i<notLinkedCells.length;i++){
        hypotheticSequence = [...playedSequence]; 
        hypotheticSequence[turn]= notLinkedCells[i];
        if (displayDebug) console.log("hypotheticSequence ", hypotheticSequence) 
        gridPicture = mapSeqToPlayer (hypotheticSequence,fillEmptyWith); 
        winScore = winPatternScore (gridPicture,((turn)%2===0)?firstToPlayWP:secondToPlayWP);        
        if (winScore>0) {
          bestPositionToPlay = hypotheticSequence[turn];
          break;
        }      
      }

      return bestPositionToPlay;
}

export default winIsEnsured;