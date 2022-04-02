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
    picture:"./Jerry.png",
    logo:"rond.png",
    movie:"hulk.mp4",
    speed:0.7,
    wins:0
  },
  {
    picture:"./Tom.png",
    logo:"cross.png",
    movie:"spidy.mp4",
    speed:0.5,
    wins:0
  }
],
play:{
  win:false,
  winner:null
}
});

const updateWins = (player) => {
  if (!current.play.win) {
      const playersArray = [...current.players];
      playersArray[player].wins+=1;
      console.log(playersArray);
      setCurrent({
      players : [...playersArray],
      play:{
        win:true,
        winner:player
      }
    })
  }
}


const PLAYER=1;
const COMPUTER=0;
const first=1;
const second=0;

const newGame = () => {
  setCurrent({
    players : [...current.players],
    play:{
      win:false,
      winner:null
    }
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
                picturePath={current.players[first].picture} 
                logoPath={current.players[first].logo} 
                moviePath={current.players[first].movie}
                movieSpeed={current.players[first].speed}
                winGames={current.players[first].wins}
                winGame={(current.play.win && (current.play.winner===0))?true:false}
            ></Player> 
        </One>
        <Grid>  
          <GameGrid handleStateWins={updateWins} handleNewGame={newGame} firstToPlay={COMPUTER}></GameGrid>
        </Grid>
        <Two>
            <Player
                picturePath={current.players[second].picture} 
                logoPath={current.players[second].logo} 
                moviePath={current.players[second].movie}
                movieSpeed={current.players[second].speed}
                winGames={current.players[second].wins}
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


