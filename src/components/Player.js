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
          <BigContent>
              {winGame?
                <ReactPlayer
                  url={moviePath}
                  playing={true}
                  muted={true}
                
                  playbackRate={movieSpeed}
                  style={{backgroundColor:"red"}}                  
                />:<Picture src={picturePath} id ="Tom"></Picture> 
              }
          </BigContent>
          <SmallContent>
              <Picture src={picturePath} id ="Tom"></Picture>
          </SmallContent>          
        </StyledContent>
        <StyledFooter>
          <Message style={{visibility:winGame?"visible":"hidden", color:"yellow"}}>"Win the game"</Message>
        </StyledFooter>
    </Card>
  )
}

export default Player

//--------------------------------CSS IN JS------------------------------

const SmallContent =styled('div')`
display:block;
${devices.laptop} {
  display:none; 
}
`
const BigContent =styled('div')`
display:none;
${devices.laptop} {
  display:block;
}
`
const Card = styled('div')`
display:flex;
border-radius:1rem;
flex-direction:row;
align-items:center;
justify-content:center;
border-bottom:1px solid grey;
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
width:40rem;
@media screen and (max-width:1220px) {
  width:auto;
  order:1;
}
`
const StyledFooter = styled('div')`
padding:1rem;
@media screen and (max-width:1220px) {
  display:none;
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
margin:0.5rem;
}

`
const WinPoint=styled('img')`
height:2.5rem;
width:2.5rem;
margin:0.5rem;
border:1px solid white;
border-radius:0.5rem;
@media screen and (max-width:1220px) {
  height:1.5rem;
  width:1.5rem;
  margin:0.25rem;
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
@media screen and (max-width:1220px) {
display:none;
}
`
const MessageSmall =styled(Message)`
display:none;
font-size:1rem;
padding:0.5rem;
width:100%;
@media screen and (max-width:1220px) {
display:inline;
}
`
const WinPointRow = styled('div')`
display:flex;
flex-direction:row;
`