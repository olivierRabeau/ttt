const winPatternScore = (gridSequence,winPattern)=>{
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

export default winPatternScore;

