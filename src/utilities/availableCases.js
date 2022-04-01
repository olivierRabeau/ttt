const availableCases = (sequence) =>{
    const seq=JSON.parse(JSON.stringify(sequence));
    const availables = [0,1,2,3,4,5,6,7,8];    
    let idx =undefined;

    for (let k=0;k<seq.length;k++){
     if (seq[k]!==null) {
       idx= availables.findIndex((element)=>element===parseInt(seq[k]));
       availables.splice(idx,1);
     } 
    }

    // diversification du jeu de l'ordinateur
    // permutations de n éléments d'un ensemble qui en contient n
    let n = availables.length;
    let index = null;
    let reArranged =[];
    while (n!==0){
      index = Math.floor(Math.random()*n);
      reArranged.push(availables.splice(index,1)[0]);    
      n--;
    }
   
    return reArranged;
}

export default availableCases;