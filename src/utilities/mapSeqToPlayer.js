// transforme [1,0,5,4,3,6,8,7,2] en ["B","A","A","A","B","A","B","B","A"]

const mapSeqToPlayer = (twoDimSquareTab,fillWith=null)=>{
    const gridSequence =[];
      for (let j =0;j<twoDimSquareTab.length;j++){ 
           gridSequence[j]=fillWith;
      }
      let idx=undefined;
      for (let j =0;j<twoDimSquareTab.length;j++){ 
        idx = twoDimSquareTab[j];
        if (idx!==null) gridSequence[idx] =(j%2===0)?"A":"B";
      }
      return gridSequence;
  }

  export default mapSeqToPlayer;
