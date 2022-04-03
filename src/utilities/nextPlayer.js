// Mise à jour du State de la grille de jeu

const nextPlayer = (currentState, id, playerMark,computerMark) =>{
const deepCpdState = JSON.parse(JSON.stringify(currentState));
const displays = deepCpdState.displays;
const sequence = deepCpdState.sequence;
const turn = deepCpdState.turn;

// l'Id de la case sélectionnée est ajoutée dans la séquence 
//(ex:Id = 6 et turn = 3) [8,0,2,null,null,null,null,null,null] devient [8,0,2,6,null,null,null,null,null]
sequence.splice(parseInt(turn),1,parseInt(id));

// Mise à jour de l'affichage de la case sélectionnée
// L'image du joueur est affichée, la case devient indisponible

displays.splice(parseInt(id),1, 
          {
            availability:false,
            image:(turn%2===0)?playerMark:computerMark
          }
);

// Le tour de jeu est incrémenté de 1

deepCpdState.turn+=1;

// Le state mis à jour est retourné

return (deepCpdState); 
}


export default nextPlayer;