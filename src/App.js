import './App.css';
import devices,{sizes} from "../src/styles/mediaQueries"
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
  console.log("updateWins ", player);
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
                    movieSpeed={current.players[0].speed}
                    winGames={current.players[0].wins}
                    winGame={(current.play.win && (current.play.winner===0))?true:false}
                ></Player> 
            </One>
            <Grid>  
              
              <GameGrid handleStateWins={updateWins} handleNewGame={newGame} firstToPlay={userSettings.start}></GameGrid>
            
            </Grid>
            <Two>
                <Player
                    picturePath={players(userSettings.theming)[userSettings.computer].picture} 
                    logoPath={players(userSettings.theming)[userSettings.computer].mark} 
                    moviePath={players(userSettings.theming)[userSettings.computer].movie}
                    movieSpeed={current.players[1].speed}
                    winGames={current.players[1].wins}
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
${devices.tablet} {
  order:3;                
}
${devices.laptop} {
  order:1;                
}
`
const Two = styled('div')`
order:2; 
text-align:start;
${devices.tablet} {
  order:1;               
}
${devices.laptop} {
  order:3;                
}
`
const Grid = styled('div')`
order:3; 
${devices.tablet} {
  order:2;                
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
}
`
const StyledFooter = styled('div')`
bottom:-20px;
border-top:1px solid #333333;
width:80vw;
margin:auto;
display:none;
${devices.laptop}{
  display:block;
}
`
const Container = styled('div')`
display:grid;
grid-template-rows :repeat(3,auto);

`
const StyledMain = styled('div')`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
${devices.laptop}and (max-width:${sizes.desktop}){
  margin-top:2rem;
}
${devices.laptop} {
  flex-direction:row;           
}
`
export default App;


