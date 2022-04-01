import React, { useEffect } from 'react';
import Case from './Case.js';
import styled from 'styled-components/macro';
import { useState } from 'react';
import nextPlayer from '../utilities/nextPlayer.js';
import findTheBestOption from '../utilities/findTheBestOption.js';
import winPatternIs from '../utilities/winpattern.js';
import mapSeqToPlayer from '../utilities/mapSeqToPlayer.js';
import Rules from "./Rules.js"


//Organisation de la grille de jeu

const GameGrid = ({handleStateWins}) => {
const [message, setMessage] = useState('');
const [winner, setWinner]=useState({win:false,name:""});
const [selected, setSelected] = useState(0);

// initialisation du State
let initialDisplays=[];
let initialSequence=[];
  
for (let i = 0; i< 9; i++){
    initialDisplays[i] = { availability:true, image:null };
    initialSequence[i] = null;
}  

const [currentCase, setCurrentCase] = useState({
  displays:[...initialDisplays], 
  sequence :[...initialSequence], 
  turn:0
});

// Mise à jour du State suite à la sélection d'une case par un joueur
const next = (id) => {
  const upToDateState = nextPlayer(currentCase,id);
  setCurrentCase({
    displays:[...upToDateState.displays],
    sequence:[...upToDateState.sequence],
    turn:upToDateState.turn
  });
}

useEffect(()=>{  
  // temporisation ajoutée pour humaniser le temps de réaction de l'ordinateur
if (currentCase.turn%2===0) {
  const tempo = setTimeout(()=>findTheBestOption(currentCase.sequence,currentCase.turn).then(value=>next(value)),500);  
  return ()=>clearTimeout(tempo);
}
if (winPatternIs(mapSeqToPlayer(currentCase.sequence),"AAA")>0) handleStateWins(0);
if (winPatternIs(mapSeqToPlayer(currentCase.sequence),"BBB")>0) handleStateWins(1);
},[currentCase.sequence,currentCase.turn]
);

const initGame = ()=>{
  
  setCurrentCase({
    displays:[...initialDisplays], 
    sequence :[...initialSequence], 
    turn:0
  })
}

const Grid = ()=>{
  return(
    [0,1,2,3,4,5,6,7,8].map((element,index)=>      
    <Case
          key={index} 
          idVal={index} 
          availability={currentCase.displays[index].availability} 
          imgFile={currentCase.displays[index].image}  
          handleClick={(evt)=>next(evt.target.id)}         
    ></Case>)
  );    
}

const Selected = ()=>{
  switch (selected) {
    case 0:
      return <Rules></Rules>;
    case 1:    
      return <Options></Options>
    case 2:
      return <Rules></Rules>
    default:
      // code block
  } 
};

  return (
    <Container>    
      <Appli className="App"> 
                  {(selected===0)?<Grid/>:<Selected/>}  
      </Appli>   
      <ControlPanel>
                  <Button 
                  type="button" 
                  onClick={initGame}
                  disabled={selected===0?false:true}
                  >New game</Button>                  
                  <Button 
                  type="button" 
                  onClick={()=>selected===0?setSelected(2):setSelected(0)}
                  disabled={selected===0?false:true}
                  >Rules</Button>
                  <Button 
                  type="button" 
                  onClick={()=>selected===0?setSelected(1):setSelected(0)}
                  style={{color:selected===0?null:"white", boxShadow:selected===0?null:"0 0 10px white"}}
                  >{selected===0?"Options":"Valider"}</Button> 

      </ControlPanel>
    </Container>   
  );
}

const Container = styled('div')`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:0;  
`

const ControlPanel=styled('div')`
margin-top:2rem;
width:100%;
display:flex;
flex-direction:row;
justify-content:space-around;
`

const Options = styled('form')`
position:absolute;
top:0;
width:30rem;
height:30rem;
border-radius:1rem;
background:black;
@media screen and (max-width:1220px) {
  width:22.4rem;
  height:22.4rem; 
}
`

const Appli = styled('div')`
position:relative;
display:grid;

grid-template-rows:repeat(3,10rem);
grid-template-columns:repeat(3,10rem);

@media screen and (max-width:1220px) {
  grid-template-rows:repeat(3,7.4rem);
  grid-template-columns:repeat(3,7.4rem);
}
`
const Button = styled('button')`

background-color:blue;
color:black;
font-size:1.2rem;
padding:0.5rem;
font-weight:bold;
width:8rem;
border:none;
border-radius:0.5rem;
:hover{
  box-shadow:0 0 10px white;
  color:white;
}
@media screen and (max-width:1220px) {
  left:0.5rem;
  width:7rem;
  font-size:1rem;
}
:disabled{
  visibility: hidden; 
}
`

export default GameGrid;
