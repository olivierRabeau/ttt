import mapSeqToPlayer from "./mapSeqToPlayer";
import availableCases from "./availableCases";
import winPatternScore from "./winPatternScore";

const doubleWinPattern = (playedSequence, turn=0, fillEmptyWith=null, firstToPlayWP="AAA", secondToPlayWP="BBB") =>{
    let hypotheticSequence=undefined;
    let hypotheticSequenceNextRound=undefined;
    let gridPicture=undefined;
    let bestPositionToPlay=undefined;  
    let winScore=0;
    const notLinkedCells = [...availableCases(playedSequence)];

      for (let i =0;i<notLinkedCells.length-1;i++){
        hypotheticSequence = [...playedSequence]; 
        hypotheticSequence[turn]= notLinkedCells[i];
              let notLinkedCellsNextRound = [...availableCases(hypotheticSequence)]   
              let cptr=0;          
              for (let j =0;j<notLinkedCellsNextRound.length;j++){ 
                hypotheticSequenceNextRound = [...hypotheticSequence];
                if ((turn+2)<9) {
                  hypotheticSequenceNextRound[turn+2]= notLinkedCellsNextRound[j];
                  gridPicture = mapSeqToPlayer (hypotheticSequenceNextRound,fillEmptyWith);
                  winScore = winPatternScore (gridPicture,((turn+2)%2===0)?firstToPlayWP:secondToPlayWP);
                       if (winScore>0) cptr++;    
                }
              }
        if (cptr>1) {
          bestPositionToPlay = notLinkedCells[i];
          break;
        }  
      }

      return bestPositionToPlay;
}

export default doubleWinPattern;