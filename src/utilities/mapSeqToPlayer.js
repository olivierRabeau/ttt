// La lettre A est toujours associée à celui qui débute la partie

// transforme [1,0,5,4,3,6,8,7,2] en ["B","A","A","A","B","A","B","B","A"]

const mapSeqToPlayer = (arraySequence,fillEmptyWith=null)=>{

   const mappedSequence = [];
   let idx=undefined;

      for (let j =0; j<arraySequence.length; j++){ 
        mappedSequence[j]=fillEmptyWith;
      }
      for (let j =0; j<arraySequence.length; j++){ 
        
        idx = arraySequence[j];

        if (idx!==null) mappedSequence[idx]=(j%2===0)?"A":"B";

      }

      return mappedSequence;
  }

  export default mapSeqToPlayer;
