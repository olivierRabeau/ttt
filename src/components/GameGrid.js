import React, { useEffect } from 'react';
import Case from './Case.js';
import styled from 'styled-components/macro';
import devices,{sizes} from '../styles/mediaQueries.js';
import { useState,useContext, useCallback } from 'react';
import nextPlayer from '../utilities/nextPlayer.js';
import findTheBestOption from '../utilities/findTheBestOption.js';
import winPatternScore from '../utilities/winPatternScore.js';
import mapSeqToPlayer from '../utilities/mapSeqToPlayer.js';
import Rules from "./Rules.js";
import OptionSetter from './OptionSetter.js';
import players from "../styles/themes.js"
import { userPreferences } from '../App.js';
import availableCases from '../utilities/availableCases.js';
//Organisation de la grille de jeu

const GameGrid = ({handleStateWins, handleNewGame}) => {
const [selected, setSelected] = useState(0);
const {userSettings}=useContext(userPreferences);
const initShadow=["none","none","none","none","none","none","none","none","none"];
const [shadow, setShadow] = useState(initShadow);

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
  turn:0, 
  winFlag:false
});

// Mise à jour du State suite à la sélection d'une case par un joueur
const next = useCallback((id) => {
  const upToDateState = nextPlayer(
    currentCase,
    id,
    players(userSettings.theming)[userSettings.start===0?userSettings.avatar:userSettings.computer].mark,
    players(userSettings.theming)[userSettings.start===0?userSettings.computer:userSettings.avatar].mark
    );
  setCurrentCase({
    displays:[...upToDateState.displays],
    sequence:[...upToDateState.sequence],
    turn:upToDateState.turn,
    winFlag:upToDateState.winFlag
  });
},[currentCase, userSettings])


const enter = (evt) =>{
  if(evt.target.id){
    const copiedShadow = [...initShadow];
    copiedShadow.splice(evt.target.id,1,"0 0 10px white");
    setShadow([...copiedShadow]);
  }
}

const leave = (evt) =>{
   setShadow([...initShadow]);
}

useEffect(()=>{  
  // temporisation ajoutée pour humaniser le temps de réaction de l'ordinateur 
  let isWon = false;
  if (winPatternScore(mapSeqToPlayer(currentCase.sequence),"AAA")>0) {
    handleStateWins(userSettings.start);
    isWon = true;
  }
  
  if (winPatternScore(mapSeqToPlayer(currentCase.sequence),"BBB")>0) {
    handleStateWins(userSettings.start===0?1:0);
    isWon = true;
  }

  if (isWon && !currentCase.winFlag) {
    setCurrentCase({
    displays:[...currentCase.displays], 
    sequence :[...currentCase.sequence], 
    turn:currentCase.turn,
    winFlag:true
    }); 
  }
  
  if (!isWon && (availableCases(currentCase.sequence).length>0) && currentCase.turn%2===(userSettings.start===0?1:0)) {
    const tempo = setTimeout(()=>next(findTheBestOption(currentCase.sequence,currentCase.turn,userSettings.cptrSkills)),500);  
    return ()=>clearTimeout(tempo);
  }

},[currentCase,selected,userSettings,handleStateWins, next]);

const initGame = ()=>{ 
  handleNewGame();  
     setCurrentCase({
        displays:[...initialDisplays], 
        sequence :[...initialSequence], 
        turn:0,
        winFlag:false
    });  
}

const Grid = ()=>{
  return(
    <Appli className="App">  
    {
    [0,1,2,3,4,5,6,7,8].map((element,index)=>        
        <Case              
              key={index} 
              idVal={index} 
              availability={currentCase.winFlag?false:currentCase.displays[index].availability} 
              imgFile={currentCase.displays[index].image}  
              handleClick={(evt)=>next(evt.target.id)} 
              handleMouseEnter={evt=>enter(evt)}
              handleMouseLeave={evt=>leave(evt)}
              shadow={shadow[index]}
              bgdC="black"
        ></Case>)
    }
    </Appli>
  );    
}

const GamePad = ()=>{
  return(
    <MiniContainer>
    {
    [0,1,2,3,4,5,6,7,8].map((element,index)=>        
        <Case              
              key={index} 
              idVal={index} 
              availability={currentCase.winFlag?false:currentCase.displays[index].availability} 
              imgFile={currentCase.displays[index].image}  
              handleClick={(evt)=>next(evt.target.id)} 
              handleMouseEnter={evt=>enter(evt)}
              handleMouseLeave={evt=>leave(evt)}
              shadow={shadow[index]}
              bgdC="black"
        ></Case>)
    }
      </MiniContainer> 
  );    
}

const Selected = ()=>{
  switch (selected) {
    case 0:
      return <Grid></Grid>;
    case 1:    
      return <OptionSetter/>;
    case 2:
      return <Rules></Rules>;
    default:
  } 
};


  return (
    <Container> 

          <DisplayFrame>
          <Logo src="LogoPerso3.png" style={{visibility:selected===0?"visible":"hidden"}}></Logo>
              <Selected/>
          </DisplayFrame>

          <ControlPanel>       

              <GamePad/>

              <ButtonGroup>
                          <Button 
                          type="button" 
                          onClick={initGame}
                          disabled={selected===0?false:true}
                          >New</Button>                  
                          <Button 
                          type="button" 
                          onClick={()=>setSelected(2)}
                          disabled={selected===0?false:true}
                          >Rules</Button>
                          <Button 
                          type="button" 
                          onClick={()=>selected===0?setSelected(1):setSelected(0)}
                          style={{color:selected===0?null:"white", boxShadow:selected===0?null:"0 0 10px white"}}
                          >{selected===0?"Settings":"Done"}</Button> 
              </ButtonGroup>

          </ControlPanel>

    </Container>   
    
  );
}

export default GameGrid;

//--------------------------------CSS IN JS------------------------------


const Logo = styled('img')`
position:absolute; 
bottom:20px; 
left:-25px; 
height:40px; 
width:30px; 
${devices.tablet} {
bottom:30px; 
left:-25px; 
height:60px; 
width:40px; 
}
margin:0.5rem;
border:1px solid white;
border-radius:0.5rem; 
box-shadow:0 0 10px white;
:hover{
  transform:scale(130%);
}
`

const DisplayFrame = styled('div')`
position:relative; 
width:18rem;
height:18rem;
border-radius:1rem;
margin-bottom:0.5rem;
display:flex;
flex-direction:row;
justify-content:center;
align-items:center;
${devices.tablet} {
  width:24rem;
  height:24rem;
}
`



const Container = styled('div')`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin-top:1rem;  
`

const MiniContainer = styled('div')`
display:none;
margin:1rem;
grid-template-rows:repeat(3,1fr);
grid-template-columns:repeat(3,1fr);
grid-auto-flow:row;
gap:0.1rem;
${devices.tablet} and (max-width:${sizes.laptop}){
  display:grid;
}
img{
border : 1px solid grey;
border-radius:1rem;
width:3.2rem;
height:3.2rem;
}
`
const ControlPanel=styled('div')`
margin-top:2rem;
width:100%;
display:flex;
flex-direction:row;
justify-content:center;
gap:0.1rem;
margin:auto;
${devices.tablet} and (max-width:${sizes.laptop}){
  position:absolute;
  right:0;
  top:40%;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  z-index:-1;
}
`
const ButtonGroup =styled('div')`
display:grid;
grid-template-columns:repeat(3,5rem);
justify-content:center;
align-items:center;
margin-top:1rem;
gap:1rem;

${devices.laptop}{
  grid-template-columns:repeat(3,7rem);
  gap:0.5rem;
}

${devices.tablet} and (max-width:${sizes.laptop}){
  display:flex;
  margin:1rem;
  height:10rem;
  width:10rem;
  flex-direction:column;
  gap:0.5rem; 
}
`
const Appli = styled('div')`
position:relative;
display:grid;
z-index:2;
grid-template-rows:repeat(3,1fr);
grid-template-columns:repeat(3,1fr);
gap:0.2rem;
>img{
  border : 1px solid grey;
border-radius:1rem;
width:5.2rem;
height:5.2rem;
margin:0.2rem;
  :hover{
    transform:scale(105%);     
  }
  ${devices.tablet} {
    width:7rem;
    height:7rem;
    margin:0.2rem;
  }
}

${devices.tablet} {
  grid-template-rows:repeat(3,7.4rem);
  grid-template-columns:repeat(3,7.4rem);
}
`
const Button = styled('button')`

background-color:blue;
color:black;

padding:0.5rem;
font-weight:bold;

border:none;
border-radius:0.5rem;


font-size:1rem;

:hover{
  box-shadow:0 0 10px white;
  color:white;
}

${devices.tablet} and (max-width:${sizes.laptop}){
  width:10rem;
  font-size:1.2rem;
}

:disabled{
  visibility: hidden; 
}
`