import './App.css';
import GameGrid from './components/GameGrid.js'
import styled from 'styled-components/macro'
import Player from './components/Player';
import Title from './components/Title'
import {useState } from 'react';




function App() {
const [current,setCurrent]=useState({
players:[
  {
    picture:"./Tom.png",
    logo:"./rond.png",
    wins:0
  },
  {
    picture:"./Jerry.png",
    logo:"./cross.png",
    wins:0
  }
],
play:{
  win:false,
  winner:null
}
});

const updateWins = (player) => {
  const playersArray = [...current.players];
  playersArray[player].wins+=1;
  setCurrent({
    players : [...playersArray],
    play:{
      win:true,
      winner:player
    },
    initGame:true
  })
}

const newGame = () => {
  setCurrent({
    players : [...current.players],
    play:{
      win:false,
      winner:null
    },
    initGame:true
  })
}

return (
    <Container> 
    <StyledHeader>
            <Title></Title>          
    </StyledHeader> 
    <StyledMain style={{display:"flex"}}>
        <One>
            <Player 
                picturePath={current.players[0].picture} 
                logoPath={current.players[0].logo} 
                winGames={current.players[0].wins}
                winGame={(current.play.win && (current.play.winner===0))?true:false}
            ></Player> 
        </One>
        <Grid>  
          <GameGrid handleStateWins={updateWins} handleNewGame={newGame} newGame={current.initGame}></GameGrid>
        </Grid>
        <Two>
            <Player
                picturePath={current.players[1].picture} 
                logoPath={current.players[1].logo} 
                winGames={current.players[1].wins}
                winGame={(current.play.win && (current.play.winner===1))?true:false}
            ></Player>  
        </Two>
      </StyledMain>  
<StyledFooter>

</StyledFooter>

  
</Container>
  );
}

const One = styled('div')`
order:1; 
text-align:start;
@media screen and (max-width:1220px) {
  order:1;               
}
`
const Two = styled('div')`
order:3; 
text-align:start;
@media screen and (max-width:1220px) {
  order:2;               
}
`
const Grid = styled('div')`
order:2; 
@media screen and (max-width:1220px) {
  order:3;                
}
`
const Form = styled('div')`
width:20rem;
height:40rem;
background-color:blue;
border-top-right-radius:1rem;
border-bottom-right-radius:1rem;
`
const StyledHeader = styled.div`
border-bottom:1px solid #333333;
display:flex;
flex-direction:row;
justify-content:center;
align-items:center;
margin:auto;
width:80vw;
height:6rem;
@media screen and (max-width:1220px) {
  height:5rem;               
}
`
const StyledFooter = styled('div')`
bottom:-20px;
border-top:1px solid #333333;
width:80vw;
margin:auto;
`

const Container = styled('div')`
display:grid;
grid-template-rows :8rem auto 10rem;
@media screen and (max-width:1220px) {
  grid-template-rows :5rem auto 10rem;          
}
`
const StyledMain = styled('div')`
display:flex;
flex-direction:row;
justify-content:center;
align-items:center;
margin-top:2rem;
@media screen and (max-width:1220px) {
    flex-direction:column;
    margin-top:0;              
}
`


export default App;


