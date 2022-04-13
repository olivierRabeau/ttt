import arrayRandom from "./arrayRandom";

const availableCases = (sequence) =>{
    const seq=[...sequence];
    const availables = [0,1,2,3,4,5,6,7,8];    
    let idx =undefined;

    for (let k=0;k<seq.length;k++){
     if (seq[k]!==null) {
       idx= availables.findIndex((element)=>element===parseInt(seq[k]));
       availables.splice(idx,1);
     } 
    }
    // permutation des éléments    
    return  arrayRandom(availables);

}

export default availableCases;