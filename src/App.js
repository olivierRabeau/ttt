import './App.css';
import GameGrid from './components/GameGrid.js'
import styled from 'styled-components/macro'
import Player from './components/Player';
import Title from './components/Title'
import {useState,createContext, useEffect } from 'react';
import players from "../src/styles/themes";

export const userPreferences = createContext();

function App() {
  const [userSettings, setUserSettings] = useState({
    start:0,
    cptrSkills:2,
    theming:"avengers",
    avatar:0,
    computer:1
  });
const value = {userSettings, setUserSettings};

const [current,setCurrent]=useState({
players:[
  {
    picture:players(userSettings.theming)[userSettings.avatar].picture,
    logo:players(userSettings.theming)[userSettings.avatar].mark,
    movie:players(userSettings.theming)[userSettings.avatar].movie,
    speed:0.7,
    wins:0
  },
  {
    picture:players(userSettings.theming)[userSettings.computer].picture,
    logo:players(userSettings.theming)[userSettings.computer].mark,
    movie:players(userSettings.theming)[userSettings.computer].movie,
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



const first=0;
const second=1;

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
      <userPreferences.Provider value={value}>
        <StyledHeader>
                <Title></Title>          
        </StyledHeader> 
        <StyledMain style={{display:"flex"}}>
            <One>
                <Player 
                    picturePath={players(userSettings.theming)[userSettings.avatar].picture} 
                    logoPath={players(userSettings.theming)[userSettings.avatar].mark} 
                    moviePath={players(userSettings.theming)[userSettings.avatar].movie}
                    movieSpeed={current.players[first].speed}
                    winGames={current.players[first].wins}
                    winGame={(current.play.win && (current.play.winner===0))?true:false}
                ></Player> 
            </One>
            <Grid>  
              
              <GameGrid handleStateWins={updateWins} handleNewGame={newGame} firstToPlay={1}></GameGrid>
            
            </Grid>
            <Two>
                <Player
                    picturePath={players(userSettings.theming)[userSettings.computer].picture} 
                    logoPath={players(userSettings.theming)[userSettings.computer].mark} 
                    moviePath={players(userSettings.theming)[userSettings.computer].movie}
                    movieSpeed={current.players[second].speed}
                    winGames={current.players[second].wins}
                    winGame={(current.play.win && (current.play.winner===1))?true:false}
                ></Player>  
            </Two>
          </StyledMain>  
    <StyledFooter>

    </StyledFooter>
    </userPreferences.Provider>

 
 
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


