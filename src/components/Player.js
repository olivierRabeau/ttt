import React, { useEffect, useState } from 'react'
import styled from "styled-components/macro"
import devices, {sizes} from '../styles/mediaQueries';
import { keyframes } from 'styled-components';
import ReactPlayer from "react-player";

const Player = ({picturePath,logoPath,moviePath,movieSpeed,winGames,winGame}) => {
const [current,setCurrent] =useState({
  pointsOnFive:0
})

useEffect(()=>{
  if (winGame) setCurrent({pointsOnFive:winGames})
},[winGames, winGame]);

  return (
    <Card>
        
        <StyledHeader >
            <MessageSmall style={{visibility:winGame?"visible":"hidden", color:"yellow"}}>"Win the game"</MessageSmall>
            <WinPointRow>         
                <WinPoint src={current.pointsOnFive>0?logoPath:null}></WinPoint>
                <WinPoint src={current.pointsOnFive>1?logoPath:null}></WinPoint>
                <WinPoint src={current.pointsOnFive>2?logoPath:null}></WinPoint>
                <WinPoint src={current.pointsOnFive>3?logoPath:null}></WinPoint>
                <WinPoint src={current.pointsOnFive>4?logoPath:null}></WinPoint>
            </WinPointRow>   
        </StyledHeader>

        <StyledContent>

              <Picture src={picturePath} id ="Tom"></Picture>
            
        </StyledContent>
        <StyledFooter>
          <Message style={{visibility:winGame?"visible":"hidden", color:"yellow"}}>"Win the game"</Message>
        </StyledFooter>
    </Card>
  )
}

export default Player

//--------------------------------CSS IN JS------------------------------

const Card = styled('div')`
display:flex;
border-radius:1rem;
flex-direction:row;
align-items:center;
justify-content:center;
border-bottom:1px solid grey;
margin:1rem;
${devices.laptop} {
  flex-direction:column;
  border:none;
  margin:0.5rem;
}
`
const StyledHeader=styled('div')`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
order:2;  
${devices.laptop} {
order:1;
}
`
const StyledContent = styled('div')`
display:flex;
flex-direction:row;
justify-content:center;
order:1;
${devices.laptop}{
  order:2;
}
`
const StyledFooter = styled('div')`
display:none;
order:3;
${devices.laptop} { {
  display:block;
}
`
const Picture=styled('img') `
width:5rem;
border-radius:10rem;
${devices.laptop} {
  width:17.5rem;
  border-radius:2rem;
  margin:0.5rem;
}
${devices.desktop} {
width:35rem;
border-radius:2rem;
margin:2rem;
}

`
const WinPoint=styled('img')`
height:1.5rem;
width:1.5rem;
margin:0.25rem;

border:1px solid white;
border-radius:0.5rem;
${devices.laptop}{
  height:2rem;
  width:2rem;
  margin:0.5rem;
}
${devices.desktop}{
  height:2.5rem;
  width:2.5rem;
  margin:0.5rem;
}
`
const blink= keyframes`
  from{opacity:1;}
  to{opacity:0}
`
const Message=styled('span')`
animation: ${blink} 0.5s linear alternate;
animation-iteration-count: infinite;
font-size:3rem;
display:none;
${devices.laptop} {
  display:inline;
  order:3;
  font-size:2rem;
}
`
const MessageSmall =styled(Message)`
display:inline;
font-size:1rem;
padding:0.5rem;
width:100%;
${devices.laptop} { {
display:none;
}
`
const WinPointRow = styled('div')`
display:flex;
flex-direction:row;
`